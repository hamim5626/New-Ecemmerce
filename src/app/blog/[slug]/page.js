"use client";

import SectionBanner from "@/components/reusable/SectionBanner";
import Image from "next/image";
import blog1 from "../../../../public/blog1.png";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsLetter from "@/components/home/NewsLetter";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const { user } = useAuth();
  const token = user?.token || null;
  const blog_id = slug;

  // ✅ Fetch blog & comments
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/get/blog-details`,
          { blog_id }
        );
        if (res?.data?.status === true && res?.data?.data) {
          setBlog(res?.data?.data);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.response?.data?.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-comment`,
          { blog_id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status && res.data.data) {
          setComments(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching comments:", err?.message);
        toast.error(err?.response?.data?.message || "Failed to fetch comments");
      }
    };

    if (blog_id) {
      fetchBlog();
      if (token) {
        fetchComments();
      }
    }
  }, [blog_id, token]);

  // ✅ Submit comment
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("You must be logged in to comment");
      return;
    }

    const formattedData = {
      blog_id,
      name: data.name,
      email: data.email,
      comment: data.comment,
    };

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/comment-store`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        toast.success("Comment sent!");
        reset();

        // Re-fetch comments
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-comment`,
          { blog_id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status && res.data.data) {
          setComments(res.data.data);
        }
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (error) {
      toast.error(error.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div>
        <SectionBanner title="Blog" />
        <div className="container py-20 text-center">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <SectionBanner title="Blog" />
        <div className="container py-20 text-center text-red-500">
          {error || "Blog not found"}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionBanner title="Blog" />
      <div className="mt-8 md:mt-[120px] max-w-[983px] w-full px-4 mx-auto">
        <Image
          src={blog?.image || blog1.src}
          alt={blog?.title || "Blog image"}
          width={983}
          height={741}
          className="w-full h-auto max-h-[741px] object-cover object-center rounded-lg"
        />
      </div>

      <div className="my-12 md:my-[84px]">
        <div className="container px-4">
          {/* Blog Header */}
          <div className="mb-8">
            <p className="text-lg md:text-[28px] font-lato text-[#484848] mb-2">
              {formatDate(blog?.created_at)}
            </p>
            <h1 className="text-2xl md:text-[44px] font-prata text-heading mb-6">
              {blog?.title}
            </h1>
            <div
              className="text-base md:text-[24px] font-lato text-[#484848] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />
          </div>

          {/* Comments Section */}
          <div className="mt-12 md:mt-[90px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[78px]">
            {/* Dynamic Comments */}
            <div>
              {token ? (
                comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-4 md:gap-6 mb-6"
                    >
                      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-[#8a6e6e] flex items-center justify-center text-white text-base md:text-[20px] font-bold">
                        {comment.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-lato text-lg md:text-[28px] text-heading">
                          {comment.name}
                        </h4>
                        <p className="text-sm md:text-[18px] text-[#484848] font-lato">
                          {formatDate(comment.created_at)}
                        </p>
                        <p className="text-sm md:text-[18px] text-[#484848] font-lato">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No comments yet.</p>
                )
              ) : (
                <p className="text-gray-500 italic">Login to view comments.</p>
              )}
            </div>

            {/* Reply Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6 bg-[#FAF6ED] p-4 md:p-6 rounded-lg"
            >
              <h3 className="text-xl md:text-[28px] font-prata text-heading mb-2">
                Leave a Reply
              </h3>
              <p className="text-sm md:text-[16px] text-[#484848] font-lato mb-4">
                Your email will not be published. Required fields are marked
              </p>

              {/* Name */}
              <div>
                <Input
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                  className="w-full h-12 text-base bg-white"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full h-12 text-base bg-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>

              {/* Comment */}
              <div>
                <Textarea
                  placeholder="Comment"
                  {...register("comment", { required: true })}
                  className="w-full h-32 text-base resize-none bg-white"
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm">Comment is required</p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-heading text-white w-full h-[40px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Comment"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default BlogDetail;
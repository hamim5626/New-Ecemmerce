"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Login = ({ onOpenRegister, onOpenForgot }) => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return toast.error("Please enter both email and password.");
    }

    try {
      const res = await login({
        email: form.email,
        password: form.password,
      });
      console.log(res)
      if (res.status) {
        toast.success("Login successful!");
        // Optionally close modal or redirect
      } else {
        toast.error(res.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message || "Login failed.");
    }
  };

  return (
    <div>
      <DialogTitle>
        <p className="text-heading text-[40px] font-prata">Welcome</p>
        <p className="text-heading text-[18px] font-lato mt-[11px] font-normal">
          Please login here
        </p>
      </DialogTitle>

      <div className="grid gap-4 mt-8">
        <div className="grid gap-3">
          <Label className="text-secondary text-[18px] font-lato font-normal">
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="alexa.johnson@example.com"
            className="h-[45px] rounded-none text-heading"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-3">
          <Label className="text-secondary text-[18px] font-lato font-normal">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            className="h-[45px] rounded-none text-heading"
            value={form.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <Checkbox
            className="w-5 h-5"
            id="remember"
            name="remember"
            checked={form.remember}
            onCheckedChange={(checked) =>
              handleChange({ target: { name: "remember", type: "checkbox", checked } })
            }
          />
          <Label htmlFor="remember" className="text-heading font-lato text-[20px]">
            Remember me
          </Label>
        </div>
        <button
          type="button"
          onClick={onOpenForgot}
          className="text-primary text-[18px] font-lato font-normal hover:underline"
        >
          Forgot Password
        </button>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full h-[55px] text-white text-[21.33px] uppercase rounded-none mt-8"
      >
        Login
      </Button>

      <button
        type="button"
        onClick={onOpenRegister}
        className="w-full h-[55px] text-primary bg-white border border-primary text-[21.33px] uppercase rounded-none mt-6 hover:text-white hover:bg-heading hover:border-heading"
      >
        Register
      </button>
    </div>
  );
};

export default Login;

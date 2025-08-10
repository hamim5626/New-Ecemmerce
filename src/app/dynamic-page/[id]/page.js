"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import SectionBanner from "@/components/reusable/SectionBanner";

const DynamicPage = () => {
    const params = useParams();
    const { id } = params;

    const { data: pageData, loading, error } = useFetch(`/get-all/dynamic-page/content/${id}`);

    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        if (pageData) {
            setPageContent(pageData);
        }
    }, [pageData]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
                    <p className="text-gray-600">Something went wrong while loading the page content.</p>
                </div>
            </div>
        );
    }

    if (!pageContent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-600 mb-4">Page Not Found</h1>
                    <p className="text-gray-600">The requested page could not be found.</p>
                </div>
            </div>
        );
    }
    return (
        <div>
            {/* Page Banner */}
            <SectionBanner
                title={pageContent.title}
                subtitle="Dynamic Content"
            />

            {/* Page Content */}
            <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </div>
    );
};

export default DynamicPage;

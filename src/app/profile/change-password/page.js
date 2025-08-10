"use client";
import SectionBanner from "@/components/reusable/SectionBanner";
import ProtectedRoute from "@/components/reusable/ProtectedRoute";
import ChangePassword from "@/components/profile/ChangePassword";
import NewsLetter from "@/components/home/NewsLetter";

const ChangePasswordPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <SectionBanner title="Change Password" />
        <ChangePassword />
        <NewsLetter />
      </div>
    </ProtectedRoute>
  );
};

export default ChangePasswordPage;

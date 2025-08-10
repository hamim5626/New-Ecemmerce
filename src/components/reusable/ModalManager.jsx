"use client";

import { useState } from "react";
import { ReusableModal } from "../reusable/ReusableModal";
import Login from "../login/Login";
import Register from "../register/Register";
import ForgotPassword from "../forgotPassword/ForgotPassword";

const ModalManager = () => {
  const [modalType, setModalType] = useState(null); // 'login' | 'register' | 'forgot'

  // Handles modal open/close by type
  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <>
      {/* Login Modal */}
      <ReusableModal
        title="Login"
        className="bg-heading text-white cursor-pointer"
        open={modalType === "login"}
        onOpenChange={(open) => setModalType(open ? "login" : null)}
      >
        <Login
          onOpenRegister={() => openModal("register")}
          onOpenForgot={() => openModal("forgot")}
        />
      </ReusableModal>

      {/* Register Modal */}
      <ReusableModal
        title="Register"
        className="bg-white text-heading border border-primary hidden"
        open={modalType === "register"}
        onOpenChange={(open) => setModalType(open ? "register" : null)}
      >
        <Register onOpenLogin={() => openModal("login")} />
      </ReusableModal>

      {/* Forgot Password Modal */}
      <ReusableModal
        title="Forgot Password"
        className="bg-white text-heading border border-primary hidden"
        open={modalType === "forgot"}
        onOpenChange={(open) => setModalType(open ? "forgot" : null)}
      >
        <ForgotPassword />
      </ReusableModal>

      {/* Entry Button (optional, remove if triggering elsewhere like navbar) */}
      <div className="mt-8" >
        <button
          onClick={() => openModal("login")}
          className="bg-white text-heading border border-primary hidden"
        >
        Login
        </button>
      </div>
    </>
  );
};

export default ModalManager;

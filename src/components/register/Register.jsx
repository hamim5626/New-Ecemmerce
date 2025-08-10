"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import OtpVerify from "../otp-verify/OtpVerify";

const Register = ({ onOpenLogin }) => {
  const { signup, pendingUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.terms) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        terms_and_conditions: form.terms,
      });

      if (response.status) {
        toast.success("OTP sent to your email!");
      }
    } catch (err) {
      const errors = err?.response?.data?.data || {};
      Object.keys(errors).forEach((field) => {
        errors[field].forEach((msg) => toast.error(`${field}: ${msg}`));
      });
    }
  };

  // Show OTP input instead of form if pending
  if (pendingUser) return <OtpVerify />;

  return (
    <div>
      <DialogTitle>
        <p className="text-heading text-[40px] font-prata">Create New Account</p>
        <p className="text-heading text-[18px] font-lato mt-[11px] font-normal">
          Please Enter Details
        </p>
      </DialogTitle>

      <div className="grid gap-4 mt-8">
        <div className="grid gap-3">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Alexa Johnson"
            className="h-[45px] rounded-none"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-3">
          <Label>Email Address</Label>
          <Input
            type="email"
            name="email"
            placeholder="alexa.johnson@example.com"
            className="h-[45px] rounded-none"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-3">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            className="h-[45px] rounded-none"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-3">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            className="h-[45px] rounded-none"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <Checkbox
          className="w-5 h-5"
          id="terms"
          name="terms"
          checked={form.terms}
          onCheckedChange={(checked) =>
            handleChange({ target: { name: "terms", type: "checkbox", checked } })
          }
        />
        <Label htmlFor="terms" className="text-heading font-lato text-[20px]">
          I Agree The Terms & Conditions
        </Label>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full cursor-pointer h-[55px] text-white font-lato text-[21.33px] uppercase rounded-none mt-8"
      >
        Register
      </Button>

      <button
        type="button"
        onClick={onOpenLogin}
        className="w-full cursor-pointer h-[55px] text-primary bg-white border border-primary font-lato text-[21.33px] uppercase rounded-none mt-[21.33px] hover:text-white hover:bg-heading hover:border-heading"
      >
        Sign In
      </button>
    </div>
  );
};

export default Register;

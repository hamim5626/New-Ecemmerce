"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const OtpVerify = () => {
  
  const { pendingUser, verifyOtp } = useAuth();
  console.log(pendingUser);
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a complete 4-digit OTP.");
      return;
    }

    try {
      const res = await verifyOtp({ email: pendingUser?.email, otp });
      if (res.status) {
        toast.success("OTP verified. Account created successfully!");
      } else {
        toast.error("Invalid OTP or expired.");
      }
    } catch (err) {
      toast.error("Failed to verify OTP. Try again.");
    }
  };

  return (
    <div>
      <DialogTitle>
        <p className="text-heading text-[40px] font-prata">Verify OTP</p>
        <p className="text-heading text-[18px] font-lato mt-[11px] font-normal">
          Enter the 4-digit code sent to your email address.
        </p>
      </DialogTitle>

      <div className="grid gap-4 mt-8 w-full">
        <div className="grid gap-3 w-full">
          <Label className="text-secondary leading-[25.2px] text-[18px] font-lato font-normal">
            OTP
          </Label>
          <InputOTP className="!w-full" maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot className="w-full h-14" index={0} />
              <InputOTPSlot className="w-full h-14" index={1} />
              <InputOTPSlot className="w-full h-14" index={2} />
              <InputOTPSlot className="w-full h-14" index={3} />
              <InputOTPSlot className="w-full h-14" index={4} />
              <InputOTPSlot className="w-full h-14" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <Button
        onClick={handleVerify}
        className="cursor-pointer w-full h-[55px] text-white font-lato font-normal text-[21.33px] uppercase rounded-none mt-8"
      >
        Verify OTP
      </Button>
    </div>
  );
};

export default OtpVerify;

import { useState } from "react";
import { ReusableModal } from "../reusable/ReusableModal";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: password reset, 4: success
  const [resetToken, setResetToken] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/send-otp`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage("OTP sent successfully! Please check your email.");
        setStep(2);
      } else {
        setMessage(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage("An error occurred while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-otp`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.status) {
        setMessage("OTP verified successfully!");
        setResetToken(data.data.reset_token);
        setStep(3);
      } else {
        setMessage(data.message || "Failed to verify OTP");
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage("An error occurred while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== passwordConfirmation) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', passwordConfirmation);
      formData.append('reset_token', resetToken);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setStep(4); // Show success state
      } else {
        setMessage(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage("An error occurred while resetting password");
    } finally {
      setLoading(false);
    }
  };


  const renderStep1 = () => (
    <form onSubmit={handleSendOtp}>
      <DialogTitle asChild>
        <div className="text-center">
          <h1 className="text-heading text-[40px] font-prata">
            Forgot Password
          </h1>
          <p className="text-heading text-[18px] font-lato mt-[11px] font-normal">
            Enter your registered email address. We'll send you a code to reset your password.
          </p>
        </div>
      </DialogTitle>

      <div className="grid gap-4 mt-8">
        <div className="grid gap-3">
          <Label className="text-secondary leading-[25.2px] text-[18px] font-lato font-normal">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alexa.johnson@example.com"
            className={"h-[45px] rounded-none"}
            required
          />
        </div>
      </div>
      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${message.includes('successfully')
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
          }`}>
          {message}
        </div>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-[55px] text-[white] font-lato font-normal text-[21.33px] uppercase rounded-none mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleVerifyOtp}>
      <DialogTitle>
        <div className="text-center">
          <h1 className="text-heading text-[40px] font-prata">Verify OTP</h1>
          <p className="text-heading text-[18px] font-lato mt-[11px] font-normal">
            Enter the OTP sent to your email address.
          </p>
        </div>
      </DialogTitle>
      <div className="grid gap-4 mt-8">
        <div className="grid gap-3">
          <Label className="text-secondary leading-[25.2px] text-[18px] font-lato font-normal">
            OTP Code
          </Label>
          <Input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className={"h-[45px] rounded-none"}
            required
          />
        </div>
      </div>
      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${message.includes('successfully')
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
          }`}>
          {message}
        </div>
      )}
      <div className="flex gap-4 mt-8">
        <Button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 h-[55px] text-[white] font-lato font-normal text-[21.33px] uppercase rounded-none disabled:opacity-50 disabled:cursor-not-allowed bg-gray-500 hover:bg-gray-600"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 h-[55px] text-[white] font-lato font-normal text-[21.33px] uppercase rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleResetPassword}>
      <DialogTitle>
        <div className="text-center">
          <h1 className="text-heading text-[40px] font-prata">Reset Password</h1>
          <p className="text-heading text-[18px] font-lato mt-[11px] font-normal">
            Enter your new password.
          </p>
        </div>
      </DialogTitle>
      <div className="grid gap-4 mt-8">
        <div className="grid gap-3">
          <Label className="text-secondary leading-[25.2px] text-[18px] font-lato font-normal">
            New Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className={"h-[45px] rounded-none"}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label className="text-secondary leading-[25.2px] text-[18px] font-lato font-normal">
            Confirm Password
          </Label>
          <Input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm new password"
            className={"h-[45px] rounded-none"}
            required
          />
        </div>
      </div>
      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${message.includes('successfully')
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
          }`}>
          {message}
        </div>
      )}
      <div className="flex gap-4 mt-8">
        <Button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 h-[55px] text-[white] font-lato font-normal text-[21.33px] uppercase rounded-none disabled:opacity-50 disabled:cursor-not-allowed bg-gray-500 hover:bg-gray-600"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 h-[55px] text-[white] font-lato font-normal text-[21.33px] uppercase rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </form>
  );

  const renderStep4 = () => (
    <div className="text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Outer circle with glow */}
          <div className="w-20 h-20 rounded-full bg-amber-50/80 shadow-lg flex items-center justify-center">
            {/* Middle circle */}
            <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center">
              {/* Inner circle with checkmark */}
              <div className="w-12 h-12 rounded-full bg-amber-300 flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Heading */}
      <h1 className="text-heading text-[40px] font-prata mb-4">
        Password Update
        <br />
        Successfully
      </h1>

      {/* Confirmation Message */}
      <p className="text-heading text-[18px] font-lato mb-8 font-normal">
        Your password has been updated successfully
      </p>

    </div>
  );

  return (
    <div>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default ForgotPassword;

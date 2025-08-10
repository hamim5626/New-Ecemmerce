"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import axiosInstance from "@/lib/axiosInstance"
import { toast } from "sonner"
import axios from "axios"

const ChangePassword = () => {
  const { user } = useAuth()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  })
  
  // Error state
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }
const newFrom = new FormData()
newFrom.append("current_password", formData.current_password)
newFrom.append("new_password", formData.new_password)
newFrom.append("new_password_confirmation", formData.new_password_confirmation)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.current_password) {
      newErrors.current_password = "Current password is required"
    }
    
    if (!formData.new_password) {
      newErrors.new_password = "New password is required"
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters"
    }
    
    if (!formData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Please confirm your new password"
    } else if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Passwords do not match"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile/reset-password`,newFrom, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth_user")).token}`
        }
      })
      
      if (response.data?.status) {
        toast.success("Password updated successfully!")
        // Reset form
        setFormData({
          current_password: "",
          new_password: "",
          new_password_confirmation: ""
        })
      } else {
        toast.error(response.data?.message || "Failed to update password")
      }
    } catch (error) {
      console.error("Password update error:", error)
      if (error.response?.data?.errors) {
        // Handle validation errors from API
        setErrors(error.response.data.errors)
      } else {
        toast.error(error.response?.data?.message || "Failed to update password")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      current_password: "",
      new_password: "",
      new_password_confirmation: ""
    })
    setErrors({})
  }

  return (
    <div className="p-6 md:p-8 bg-[#FAF6ED] rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block !text-[22px] font-medium text-gray-800 mb-1">
            Current Password
          </label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full !text-[22px] pr-10 bg-white h-[75px] rounded-none ${
                errors.current_password ? "border-red-500" : ""
              }`}
              value={formData.current_password}
              onChange={(e) => handleInputChange("current_password", e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-transparent"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              type="button"
            >
              {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          {errors.current_password && (
            <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block !text-[22px] font-medium text-gray-800 mb-1">
            New Password
          </label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full !text-[22px] pr-10 bg-white h-[75px] rounded-none ${
                errors.new_password ? "border-red-500" : ""
              }`}
              value={formData.new_password}
              onChange={(e) => handleInputChange("new_password", e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-transparent"
              onClick={() => setShowNewPassword(!showNewPassword)}
              type="button"
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          {errors.new_password && (
            <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label htmlFor="confirmPassword" className="block !text-[22px] font-medium text-gray-800 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full !text-[22px] pr-10 bg-white h-[75px] rounded-none ${
                errors.new_password_confirmation ? "border-red-500" : ""
              }`}
              value={formData.new_password_confirmation}
              onChange={(e) => handleInputChange("new_password_confirmation", e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          {errors.new_password_confirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.new_password_confirmation}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Button
          variant="outline"
          className="flex-1 border-[1.5px] border-heading bg-transparent text-heading py-3 text-[22px] font-medium h-[75px]"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 bg-black hover:bg-gray-800 text-white py-3 text-[22px] font-medium h-[75px]"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Save"}
        </Button>
      </div>
    </div>
  )
}

export default ChangePassword;

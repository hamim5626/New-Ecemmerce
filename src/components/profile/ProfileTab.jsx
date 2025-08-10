"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfo from "./PersonalInfo"
import OrderHistory from "./OrderHistory"
import ChangePassword from "./ChangePassword"

const ProfileTab = () => {
  return (
    <div className="max-w-[1250px] mx-auto py-8 sm:py-16 lg:py-48 font-inter px-4 sm:px-6 lg:px-0">
      <Tabs defaultValue="profile-info" className="w-full">
        <TabsList className="flex flex-col sm:grid sm:grid-cols-3 bg-transparent border-b-2 border-gray-200 rounded-none h-auto p-0 gap-2 sm:gap-0">
          <TabsTrigger
            value="profile-info"
            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none text-gray-600 hover:text-gray-900 rounded-none border-b-2 border-transparent pb-2 pt-2 sm:pb-3 sm:pt-3 text-lg sm:text-xl lg:text-[28.478px] font-semibold mt-1"
          >
            Profile Info
          </TabsTrigger>
          <TabsTrigger
            value="order-history"
            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none text-gray-600 hover:text-gray-900 rounded-none border-b-2 border-transparent pb-2 pt-2 sm:pb-3 sm:pt-3 text-lg sm:text-xl lg:text-[28.478px] font-semibold mt-1"
          >
            Order history
          </TabsTrigger>
          <TabsTrigger
            value="change-password"
            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none text-gray-600 hover:text-gray-900 rounded-none border-transparent pb-2 pt-2 sm:pb-3 sm:pt-3 text-lg sm:text-xl lg:text-[28.478px] font-semibold mt-1"
          >
            Change password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile-info" className="mt-4 sm:mt-6">
          <PersonalInfo />
        </TabsContent>

        <TabsContent value="order-history" className="mt-4 sm:mt-6">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="change-password" className="mt-4 sm:mt-6">
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileTab

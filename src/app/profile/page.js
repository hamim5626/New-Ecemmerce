import NewsLetter from "@/components/home/NewsLetter";
import ProfileTab from "@/components/profile/ProfileTab";
import SectionBanner from "@/components/reusable/SectionBanner";
import ProtectedRoute from "@/components/reusable/ProtectedRoute";

const ProfileInfo = () =>{
    return(
        <ProtectedRoute>
            <div>
                <SectionBanner title="Profile Info" />
                <ProfileTab/>
                <NewsLetter/>
            </div>
        </ProtectedRoute>
    )
}

export default ProfileInfo;
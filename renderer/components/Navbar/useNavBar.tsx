import { useAuthState } from "@/contexts/AuthContext";
import useLogoutMutation from "@/hooks/services/useLogoutMutation";
import useIsMobile from "@/hooks/useIsMobile";
import { useRouter } from "next/router";

export default function useNavBar (){
    const { isOwner } = useAuthState();
    const { isLoggedIn } = useAuthState();
    const logoutMutation = useLogoutMutation();
    const router = useRouter();
    const isMobile = useIsMobile();
    const { userData } = useAuthState();
  

    const handleLogout = () => {
      logoutMutation.mutate();
      router.push('/');
    };

    return {
        isOwner,
        logoutMutation,
        isLoggedIn,
        userData,
        handleLogout
    }
}
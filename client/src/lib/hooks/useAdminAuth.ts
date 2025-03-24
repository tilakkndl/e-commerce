import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useAdminAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = () => {
      try {
        const userData = Cookies.get("userData");
        if (!userData) {
          router.replace("/signin");
          return;
        }

        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== "admin") {
          router.replace("/");
          return;
        }

        setIsAdmin(true);
        setIsLoading(false);
      } catch (error) {
        router.replace("/signin");
      }
    };

    checkAdminAccess();
  }, [router]);

  return { isLoading, isAdmin };
};

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";

interface props {
  children: React.ReactNode;
}

const PrivatRoute = ({ children }: props) => {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading</div>;
  }

  return <> {user && children}</>;
};

export default PrivatRoute;

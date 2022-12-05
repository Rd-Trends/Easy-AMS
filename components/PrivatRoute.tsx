import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import Loader from "./Loader"

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
    return <Loader />;
  }

  

  return <> {user && children}</>;
};

export default PrivatRoute;

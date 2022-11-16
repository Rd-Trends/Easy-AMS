import useSWR from "swr";
import { user } from "../interface";

const useUser = () => {
  const { data: user, error, mutate } = useSWR<user>("/api/auth");

  return {
    user,
    error,
    loading: !user && !error,
    mutate,
  };
};

export default useUser;

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../components/Logo";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../../hooks/useUser";
import * as yup from "yup";
import Button from "../../components/Button";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const PageWrapper = dynamic(() => import("../../components/PageWrapper"), {
  ssr: false,
});

interface formData {
  email: string;
  password: string | number;
  customError?: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("please enter a valid email address")
      .required("Your email address must be provided"),
    password: yup
      .string()
      .min(6, "Password length must be greater than six")
      .required("Please enter your password"),
  })
  .required();

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { user, mutate } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });

  const handleLogin = handleSubmit(async (data) => {
    setLoading(true);
    clearErrors("customError");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const user = await response.json();
      setLoading(false);
      mutate(user);
      router.push("/dashboard");
    }
    if (response.status === 401) {
      const err = await response.json();
      setLoading(false);
      setError("customError", { type: "custom", message: err.message });
    }
  });

  return (
    <PageWrapper>
      <div className="bg-body-bg dark:bg-dark-body-bg min-h-screen flex items-center justify-center py-12">
        <div className="bg-element-bg dark:bg-dark-element-bg text-font-color dark:text-dark-font-color shadow-xl w-11/12 md:w-5/12 lg:w-4/12 max-w-[400px] flex flex-col items-center py-8 px-4 rounded-lg font-extralight">
          <Logo />
          <p className="w-full mt-8 text-lg font-medium">Welcome back</p>
          <p className="w-full mt-1">Please sign in into your account</p>
          <form onSubmit={handleLogin} className="w-full mt-8">
            <label className=" block mb-4">
              email
              <input
                type="email"
                placeholder="johnDoe@gmail.com"
                className="block mt-1 border-2 dark:border-gray-700 w-full outline-none hover:border-primary dark:hover:border-primary py-2 px-4 rounded-md bg-transparent"
                {...register("email")}
              />
            </label>
            {errors?.email && (
              <p className=" -mt-2 mb-2 text-red-500">{errors.email.message}</p>
            )}
            <label htmlFor="password" className=" block">
              password
            </label>
            <div className="mt-1 border-2 dark:border-gray-700 hover:border-primary dark:hover:border-primary flex items-center rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="block border-none w-full outline-none py-2 px-4 rounded-md bg-transparent"
                {...register("password")}
              />
              <button
                className="mr-4 outline-none bg-transparent h-full py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors?.password && (
              <p className=" -mt-2 mb-2 text-red-500">
                {errors.password.message}
              </p>
            )}
            <Button loading={loading} width="full" className="mt-8">
              Sign in
            </Button>
            {errors?.customError && (
              <p className=" mt-2 text-red-500">
                {errors?.customError?.message}
              </p>
            )}
          </form>

          <div className="h-4 border-b border-gray-500 text-xl text-center my-5 mb-8 w-full">
            <span className="px-3 bg-element-bg dark:bg-dark-element-bg">
              or
            </span>
          </div>
          <Link
            href="/api/auth/google"
            className="flex items-center pl-4 rounded-md shadow-lg shadow-gray-300 dark:shadow-dark-body-bg bg-white w-full "
          >
            <FcGoogle size={30} />
            <span className="py-2 px-8 ml-4 bg-primary rounded-r-md w-full text-white">
              Sign in with Google
            </span>
          </Link>

          <p className="mt-5">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;

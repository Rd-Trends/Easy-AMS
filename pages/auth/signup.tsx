import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "../../components/Logo";
import { FcGoogle } from "react-icons/fc";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/Button";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Seo from "../../components/Seo";
import useURL from "../../hooks/useURL";

const PageWrapper = dynamic(() => import("../../components/PageWrapper"), {
  ssr: false,
});

interface formData {
  fullName: string;
  email: string;
  password: string | number;
  customError?: string;
}

const schema = yup
  .object({
    fullName: yup.string().required("Please enter your full name"),
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
const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const url = useURL();
  const { user } = useUser();

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

  const handleSignUp = handleSubmit(async (data) => {
    clearErrors("customError");
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      const user = await response.json();
      setLoading(false);
      router.push("/dashboard");
    }
    if (response.status >= 400) {
      const err = await response.json();
      setLoading(false);
      setError("customError", { type: "custom", message: err.message });
    }
  });

  return (
    <PageWrapper>
      <Seo
        url={url}
        seo={{
          title: "Sign Up - Easy-AMS",
          metaDesc: "Create your Easy-AMS account",
          metaKeywords:
            "Easy-AMS signup, create Easy-AMS account, register Easy-Ams",
        }}
        ogImage="/login-og.png"
      />
      <div className="bg-body-bg dark:bg-dark-body-bg min-h-screen flex items-center justify-center py-12">
        <div className="bg-element-bg dark:bg-dark-element-bg text-font-color dark:text-dark-font-color shadow-xl w-11/12 md:w-5/12 lg:w-4/12 max-w-[400px] flex flex-col items-center py-8 px-4 rounded-lg font-extralight">
          <Logo />
          <p className="w-full mt-8 text-lg font-medium">
            Easy Attendace Management
          </p>
          <p className="w-full mt-1">
            Please create an account to manage your attendance easily
          </p>
          <form onSubmit={handleSignUp} className="w-full mt-8">
            <label className=" block mb-4">
              Full Name
              <input
                type="text"
                placeholder="John Doe"
                className="block mt-1 border-2 dark:border-gray-700 w-full outline-none hover:border-primary dark:hover:border-primary py-2 px-4 rounded-md bg-transparent"
                {...register("fullName")}
              />
            </label>
            {errors?.fullName && (
              <p className=" -mt-2 mb-2 text-red-500">
                {errors.fullName.message}
              </p>
            )}
            <label className=" block mb-4">
              email
              <input
                type="email"
                placeholder="johnDoe@gmail.com"
                className="block mt-1 border-2 w-full dark:border-gray-700 outline-none hover:border-primary dark:hover:border-primary py-2 px-4 rounded-md bg-transparent"
                {...register("email")}
              />
            </label>
            {errors?.email && (
              <p className=" -mt-2 mb-2 text-red-500">{errors.email.message}</p>
            )}
            <label htmlFor="password" className=" block">
              password
            </label>
            <div className="mt-1 border-2  dark:border-gray-700 hover:border-primary dark:hover:border-primary flex items-center rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="block border-none w-full outline-none py-2 px-4 rounded-md bg-transparent"
                {...register("password")}
              />
              <button
                className="mr-4 py-2"
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
            <Button width="full" className="mt-8" loading={loading}>
              Sign up
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
              Sign up with Google
            </span>
          </Link>

          <p className="mt-5">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignUp;

import React from "react";
import dynamic from "next/dynamic";
import DashboardLayout from "../../layouts/DashboardLayout";
import useURL from "../../hooks/useURL";
import Seo from "../../components/Seo";

const PrivatRoute = dynamic(() => import("../../components/PrivatRoute"), {
  ssr: false,
});

const Help = () => {
  const url = useURL();
  return (
    <PrivatRoute>
      <Seo
        url={url}
        seo={{
          title: "Easy-AMS - Help",
          metaDesc:
            "Learn how to use Easy_AMS to manage, sign, create and take attendance",
          metaKeywords:
            "how to use Easy-AMS, Easy-AMS, how to create attendance using Easy-AMS, how to sign attendance using Easy-Ams",
        }}
        noindex={true}
        nofollow={true}
      />
      <DashboardLayout>
        <div className=" bg-element-bg dark:bg-dark-element-bg text-font-color dark:text-dark-font-color w-full py-8 px-4 rounded-md">
          <h2 className="text-2xl font-semibold md:text-3xl mb-4 md:mb-8">
            Watch the video below to learn how to create, manage and take
            attendance using Easy-AMS
          </h2>
          <div className="relative w-full block aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/E0awj7SnVbk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="rounded-md "
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </DashboardLayout>
    </PrivatRoute>
  );
};

export default Help;

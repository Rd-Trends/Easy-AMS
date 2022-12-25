import { NextSeo } from "next-seo";

interface props {
  seo: { title: string; metaDesc: string; metaKeywords: string };
  url: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: string;
}
const Seo = ({
  seo,
  url,
  noindex = false,
  nofollow = false,
  ogImage,
}: props) => {
  const { title, metaDesc, metaKeywords } = seo;

  return (
    <NextSeo
      title={title}
      description={metaDesc}
      canonical={url}
      noindex={noindex}
      nofollow={nofollow}
      openGraph={{
        type: "website",
        locale: "en_NG",
        url: url,
        title: title,
        description: metaDesc,
        images: [
          {
            url: ogImage
              ? `https://easy-ams.vercel.app/${ogImage}`
              : "https://easy-ams.vercel.app/easy-ams-og.png",
            width: 1280,
            height: 566,
            alt: "Og Image Alt",
          },
        ],
        site_name: "Easy-AMS",
      }}
      twitter={{
        handle: "@Rd_Trendz",
        site: "@Rd_Trendz",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[{ name: "keywords", content: metaKeywords }]}
    />
  );
};

Seo.defaultProps = {
  seo: {
    title: "Easy-AMS - Create, Take, Manage and Sign Attendance easily!",
    metaKeywords: "Attendance management system, Easy-AMS, manage attendance",
    metaDesc: ` Easy-AMS is an attendance management system that makes the work of managing and signing attendance easier and faster for corporatez bodies and individuals`,
  },
};

export default Seo;

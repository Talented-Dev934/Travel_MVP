import Text from "@/components/Answer/Text";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { AI_RESPONSE } from "@/utils/getOpenaiResponse";
import Images from "@/components/Answer/Images";
import { ToastContainer } from "react-toastify";
import { useJsApiLoader } from "@react-google-maps/api";
import { Work_Sans } from "next/font/google";
interface Props {}

const WorkSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const library = ["places"];
export default function Answer({}: Props): ReactElement {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: library as ["places"],
  });

  let response: AI_RESPONSE["response"];
  try {
    response = JSON.parse(router.query.result as string);
  } catch (e) {
    return <div></div>;
  }

  return (
    <div className={WorkSans.className}>
      <ToastContainer></ToastContainer>
      <div className="bg-black h-screen w-screen grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-[1.2fr_1fr] relative z-50 text-white overflow-hidden">
        <Text response={response}></Text>
        <Images isLoaded={isLoaded} response={response}></Images>
      </div>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      variants: {
        initialState: {
          opacity: 0,
        },
        animateState: {
          opacity: 1,
          transition: { duration: 1 },
        },
      },
    },
  };
}

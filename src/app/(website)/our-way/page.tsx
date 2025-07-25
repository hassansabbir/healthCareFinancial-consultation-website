"use client";

import { useState } from "react";
import Image from "next/image";
import howWeWorkImg from "@/assets/image (30).png";
import { motion } from "framer-motion";
import CircularMenu from "@/components/ui/website/ourWay/CircularMenu";
import { useGetOurWaysQuery } from "@/redux/apiSlices/ourWaySlice";
import { Spin } from "antd";
import { useGetPageDescriptionsQuery } from "@/redux/apiSlices/publicSlice";

const HowWeWorkPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("DIE");

  const { data: ourWays, isLoading } = useGetOurWaysQuery(undefined);

  const { data: pageDescription, isLoading: isPageDescriptionLoading } =
    useGetPageDescriptionsQuery(undefined);

  if (isLoading || isPageDescriptionLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  const ourWayDescription = pageDescription?.data?.ourway;
  const ourWaysInfo = ourWays?.data;
  //console.log(ourWaysInfo);

  const renderContent = () => {
    if (!ourWaysInfo || !ourWaysInfo?.length) {
      return <div>No contents available</div>;
    }

    const selectedContent = ourWaysInfo?.find(
      (content: any) => content?.label === selectedMenu
    );

    if (!selectedContent) {
      return <div>Select a menu item</div>;
    }

    return (
      <div>
        <h1 className="text-3xl font-bold mb-3">{selectedContent?.title}</h1>
        <p className="text-gray-600">{selectedContent?.description}</p>
        {selectedContent?.subDescription && (
          <p className="my-4 text-gray-600">
            {selectedContent?.subDescription}
          </p>
        )}
        <div>
          {selectedContent?.contents &&
            selectedContent?.contents?.length > 0 && (
              <ol className="list-decimal pl-5 space-y-4 my-5 text-gray-600">
                {selectedContent?.contents?.map((point: any, index: number) => (
                  <li key={index}>
                    <span className="font-semibold text-secondary">
                      {point.heading}:
                    </span>{" "}
                    {point.body}
                  </li>
                ))}
              </ol>
            )}
        </div>
        {selectedContent?.footer && (
          <p className="my-4 text-gray-600">{selectedContent?.footer}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="relative mb-20">
        <div className="relative">
          <Image
            src={howWeWorkImg}
            alt="howWeWorkImg"
            width={50000}
            height={50000}
            className="w-full h-[600px] object-cover"
          />
          {/* White overlay animations */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-white"
          />
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 right-0 h-full bg-white"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-[750px] absolute -bottom-20 right-20 p-10 rounded-2xl bg-[#032237] bg-opacity-30 backdrop-blur-md"
        >
          <h1 className="md:text-5xl text-3xl mb-5 font-bold bg-gradientBg text-transparent bg-clip-text leading-normal">
            What makes us different
          </h1>
          <p className="text-white md:text-lg text-md">{ourWayDescription}</p>
        </motion.div>
      </div>

      {/* Layout with menu and content */}
      <div className="container mx-auto py-20 pb-40 md:min-h-screen">
        <div className="md:flex gap-10">
          {/* Left Menu */}
          <div className="md:w-[35%] md:pb-0 pb-[450px] relative justify-start">
            {/* circle menu here */}
            <CircularMenu onSelect={setSelectedMenu} />
          </div>

          {/* Right Content */}
          <div
            className="md:w-[70%] p-7"
            style={{
              border: "4px solid transparent",
              borderRadius: "24px",
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(to right, #b99755, #F5EC9B, #b99755) border-box",
            }}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWorkPage;

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import LinkButton from "@/components/Shared/LinkButton";
import { sendGTMEvent } from "@next/third-parties/google";
import { useAddServerTrackingMutation } from "@/redux/services/serverTracking/serverTrackingApi";
import useGetURL from "@/utilities/hooks/useGetURL";

const Banner = () => {
  const swiperRef = useRef();
  const { data: sliders } = useGetAllSlidersQuery();

  const url = useGetURL();
  const [addServerTracking] = useAddServerTrackingMutation();

  useEffect(() => {
    sendGTMEvent({ event: "PageView", value: url });
    const data = {
      event: "PageView",
      data: {
        event_source_url: url,
      },
    };
    addServerTracking(data);
  }, [url]);

  const activeSliders = sliders?.results?.filter(
    (item) => item.status === "Active" && !item?.bottomBanner
  );

  return (
    <section className="relative lg:mb-10">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        slidesPerView={1}
        navigation
        className="mySwiper max-h-[600px]"
        loop
      >
        {activeSliders?.map((item) => {
          return (
            <SwiperSlide key={item?._id}>
              <LinkButton href={`/products?filter=${item?.category?.name}`}>
                <Image
                  src={
                    item?.attachment ??
                    "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                  }
                  alt={item?.name ?? "Demo"}
                  width={2500}
                  height={450}
                  className="h-[200px] lg:h-fit w-full"
                />
              </LinkButton>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex items-center justify-between gap-5 mt-10">
        <button
          className="z-10 lg:w-6 lg:h-6 flex items-center justify-center rounded-full bg-white text-primary border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[35%] lg:top-[45%] left-5 lg:left-10"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <FaAngleLeft className="text-xl" />
        </button>
        <button
          className="z-10 lg:w-6 lg:h-6 flex items-center justify-center rounded-full bg-white text-primary border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[35%] lg:top-[45%] right-5 lg:right-10"
          onClick={() => swiperRef.current.slideNext()}
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>
      <div className="custom-pagination flex justify-center space-x-2 absolute bottom-20 z-10 left-1/2"></div>
    </section>
  );
};

export default Banner;

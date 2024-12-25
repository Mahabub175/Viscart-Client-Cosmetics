"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { useGetAllSlidersQuery } from "@/redux/services/slider/sliderApi";
import LinkButton from "@/components/Shared/LinkButton";

const Banner = () => {
  const swiperRef = useRef();

  const { data: sliders } = useGetAllSlidersQuery();

  const activeSliders = sliders?.results?.filter(
    (item) => item.status === "Active"
  );

  return (
    <section className="relative">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        className="max-h-[600px] rounded-xl"
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
                  width={450}
                  height={450}
                  className="h-[150px] lg:h-fit w-full"
                />
              </LinkButton>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex items-center justify-between gap-5 mt-10">
        <button
          className="z-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-transparent text-primary border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[35%] lg:top-[45%] left-5 lg:left-10"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <FaAngleLeft className="text-xl" />
        </button>
        <button
          className="z-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-transparent text-primary border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[35%] lg:top-[45%] right-5 lg:right-10"
          onClick={() => swiperRef.current.slideNext()}
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>
    </section>
  );
};

export default Banner;

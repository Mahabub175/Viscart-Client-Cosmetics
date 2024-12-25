"use client";

import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

const Categories = () => {
  const swiperRef = useRef();
  const { data: categories } = useGetAllCategoriesQuery();

  const activeCategories = categories?.results?.filter(
    (item) => item?.status !== "Inactive"
  );

  return (
    <section className="-mt-10 lg:-mt-0 py-10 relative my-container bg-white shadow-xl p-5 rounded-xl">
      <h2 className="text-2xl lg:text-4xl font-bold text-center">
        Top Categories
      </h2>
      <div className="mt-10 hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {activeCategories?.slice(0, 9).map((category) => (
          <Link
            href={`/products?filter=${category?.name}`}
            key={category?._id}
            className="text-center relative"
          >
            <div className="group cursor-pointer overflow-hidden w-[250px] h-[250px] rounded-xl mx-auto">
              <Image
                src={
                  category?.attachment ??
                  "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                }
                alt={category?.name}
                width={250}
                height={250}
                className="group-hover:scale-110 duration-500 object-cover rounded-xl"
              />
            </div>
            <h3
              className={`font-bold text-xl absolute bottom-6 left-1/2 transform -translate-x-1/2 ${
                category?.attachment ? "text-white" : "text-primary"
              }`}
            >
              {category?.name}
            </h3>
          </Link>
        ))}
      </div>
      <div className="mt-10 md:hidden">
        {activeCategories?.length === 0 ? (
          <p className="text-center my-5">
            There is no brands available right now
          </p>
        ) : (
          <div className="relative">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 5 },
              }}
              navigation
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="mySwiper"
            >
              {activeCategories?.map((item) => {
                return (
                  <SwiperSlide key={item?._id}>
                    <Link href={`/products?filter=${item?.name}`}>
                      <div className="group cursor-pointer overflow-hidden w-[260px] h-[260px] rounded-xl mx-auto flex justify-center items-center">
                        <Image
                          src={
                            item?.attachment ??
                            "https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
                          }
                          alt={item.name}
                          width={260}
                          height={260}
                          className="group-hover:scale-110 duration-500 object-cover rounded-xl shadow-xl"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="flex items-center justify-between gap-5 mt-10">
              <button
                className="z-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-transparent text-primary border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[40%] left-0"
                onClick={() => swiperRef.current.slidePrev()}
              >
                <FaAngleLeft className="text-xl" />
              </button>
              <button
                className="z-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-transparent text-primary border border-primary hover:bg-primary hover:text-white duration-300 absolute top-[40%] right-0"
                onClick={() => swiperRef.current.slideNext()}
              >
                <FaAngleRight className="text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;

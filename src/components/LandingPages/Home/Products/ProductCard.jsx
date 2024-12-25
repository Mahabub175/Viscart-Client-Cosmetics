import { Rate, Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import QuickViewHover from "../../Products/QuickViewHover";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import { usePathname } from "next/navigation";
import LinkButton from "@/components/Shared/LinkButton";

const ProductCard = ({ item }) => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border hover:border-primary duration-300 rounded-xl shadow-xl relative group w-[170px] h-[310px] lg:w-[230px] lg:h-[400px] mx-auto bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item?.stock > 0 ? (
        <div className="absolute top-2 left-2 p-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded font-bold text-[10px] z-10">
          In Stock
        </div>
      ) : (
        <div className="absolute top-2 left-2 p-1 bg-gradient-to-r from-red-500 to-red-700 text-white rounded font-bold text-[10px] z-10">
          Out Of Stock
        </div>
      )}

      <div className="relative overflow-hidden rounded-t-xl">
        {item?.video && isHovered ? (
          <video
            src={formatImagePath(item?.video)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            autoPlay
            muted
            controls={false}
            className="w-full h-[160px] lg:h-[220px] rounded-t-xl object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={
              pathname === "/products"
                ? item?.mainImage
                : formatImagePath(item?.mainImage)
            }
            alt={item?.name}
            width={230}
            height={220}
            className="rounded-t-xl w-[185px] md:w-full h-[160px] lg:h-[220px] group-hover:scale-110 duration-500"
          />
        )}

        <div className="hidden lg:block absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 duration-500 z-10">
          <QuickViewHover item={item} />
        </div>
        <div className="lg:hidden">
          <QuickViewHover item={item} />
        </div>
      </div>

      <div className="bg-white px-3 lg:p-5 rounded-b-xl">
        <div className="lg:flex justify-center items-center mb-2 gap-4 font-bold hidden">
          <Rate disabled value={item?.ratings?.average} allowHalf />
        </div>
        <LinkButton href={`/products/${item?.slug}`}>
          <Tooltip placement="top" title={item?.name}>
            <h2 className="text-base text-center lg:font-semibold lg:mt-2 mb-6">
              {item?.name.length > 40
                ? item.name.slice(0, 40).concat("...")
                : item.name}
            </h2>
          </Tooltip>

          <div className="flex items-center gap-2 lg:gap-4 justify-center text-center">
            {item?.offerPrice && (
              <p className="text-sm lg:text-base font-bold line-through text-red-500">
                {globalData?.results?.currency + " " + item?.sellingPrice}
              </p>
            )}
            {item?.offerPrice ? (
              <p className="text-primary text-sm lg:text-xl font-bold">
                {globalData?.results?.currency + " " + item?.offerPrice}
              </p>
            ) : (
              <p className="text-primary text-sm lg:text-xl font-bold">
                {globalData?.results?.currency + " " + item?.sellingPrice}
              </p>
            )}
          </div>
        </LinkButton>
      </div>
    </div>
  );
};

export default ProductCard;

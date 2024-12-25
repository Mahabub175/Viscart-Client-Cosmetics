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
      className="border hover:border-primary duration-300 rounded-xl shadow-xl relative group w-[170px] h-[325px] lg:w-[230px] lg:h-[400px] mx-auto bg-white flex flex-col justify-between"
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

      <div className="relative overflow-hidden rounded-t-xl flex-shrink-0 h-[160px] lg:h-[200px]">
        {item?.video && isHovered ? (
          <video
            src={formatImagePath(item?.video)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            autoPlay
            muted
            controls={false}
            className="w-full h-full rounded-t-xl object-cover"
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
            className="rounded-t-xl h-[200px] object-cover group-hover:scale-110 duration-500"
          />
        )}

        <div className="hidden lg:block absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 duration-500 z-10">
          <QuickViewHover item={item} />
        </div>
      </div>
      <div className="lg:hidden">
        <QuickViewHover item={item} />
      </div>

      <div className="bg-white flex-grow">
        <div className="px-3 lg:p-5">
          <div className="lg:flex justify-center items-center mb-2 gap-4 font-bold hidden">
            <Rate disabled value={item?.ratings?.average} allowHalf />
          </div>
          <Tooltip placement="top" title={item?.name}>
            <h2 className="text-[14px] md:text-base text-center lg:font-semibold lg:mt-2 mb-6">
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
            <p className="text-primary text-sm lg:text-xl font-bold">
              {globalData?.results?.currency +
                " " +
                (item?.offerPrice || item?.sellingPrice)}
            </p>
          </div>
        </div>
      </div>
      <LinkButton href={`/products/${item?.slug}`}>
        <button className="bg-primary py-1 text-white w-full rounded-b-xl -mt-4">
          Details
        </button>
      </LinkButton>
    </div>
  );
};

export default ProductCard;

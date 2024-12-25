"use client";

import { useGetAllProductsQuery } from "@/redux/services/product/productApi";
import ProductCard from "./ProductCard";

const OfferProducts = () => {
  const { data: productData } = useGetAllProductsQuery();

  const activeProducts = productData?.results
    ?.filter((item) => item?.status !== "Inactive" && item?.offerPrice)
    ?.slice(0, 8);

  return (
    <div className="container mx-auto px-1 lg:px-5 bg-white shadow-xl py-10 rounded-xl mt-10">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
        Best Offers
      </h2>
      {activeProducts?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-3 lg:gap-5">
          {activeProducts?.map((product) => (
            <ProductCard key={product?._id} item={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center my-10 bg-white p-10 rounded-xl shadow-xl">
          <h2 className="lg:text-2xl font-bold text-black/80 text-center text-xl">
            No offer products available
          </h2>
        </div>
      )}
    </div>
  );
};

export default OfferProducts;

"use client";

import { useGetAllProductsQuery } from "@/redux/services/product/productApi";
import ProductCard from "../Home/Products/ProductCard";

const AllOffers = () => {
  const { data: productData } = useGetAllProductsQuery();

  const filteredProducts = productData?.results?.filter(
    (item) => item?.status !== "Inactive" && item?.offerPrice > 0
  );

  return (
    <section>
      <div className="lg:my-10 py-5 lg:py-10 relative container px-2 lg:px-5 mx-auto bg-white shadow-xl rounded-xl">
        {filteredProducts?.length ? (
          <>
            <h2 className="text-xl md:text-3xl font-medium text-center mb-10">
              Offer Products
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-8 lg:gap-y-14 pb-10 mt-10">
              {filteredProducts?.map((product) => (
                <ProductCard key={product?._id} item={product} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center">No offer products available right now.</p>
        )}
      </div>
    </section>
  );
};

export default AllOffers;

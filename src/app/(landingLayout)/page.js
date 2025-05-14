import Banner from "@/components/LandingPages/Home/Banner";
import Brands from "@/components/LandingPages/Home/Brands";
import RecentlyViewedProducts from "@/components/LandingPages/Home/Products/RecentlyViewedProducts";
import Categories from "@/components/LandingPages/Home/Categories";
import PopularProducts from "@/components/LandingPages/Home/Products/PopularProducts";
import TopProducts from "@/components/LandingPages/Home/Products/TopProducts";
import SmallFeature from "@/components/LandingPages/Home/SmallFeature";

export const metadata = {
  title: "Home | Viscart",
  description: "This is the homepage of Viscart",
};

const page = async () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <Categories />
      <Brands />
      <PopularProducts />
      <TopProducts />
      <RecentlyViewedProducts />
      <SmallFeature />
    </div>
  );
};

export default page;

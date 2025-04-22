import BackToTop from "@/components/Shared/BackToTop";
import FloatingContact from "@/components/Shared/FloatingContact";
import LandingFooter from "@/components/Shared/Footer/LandingFooter";
import LandingHeader from "@/components/Shared/Navbar/LandingHeader";
import GlobalCart from "@/components/Shared/Product/GlobalCart";

const LandingLayout = ({ children }) => {
  return (
    <>
      <LandingHeader />
      <GlobalCart />
      {children}
      <BackToTop />
      <FloatingContact />
      <LandingFooter />
    </>
  );
};

export default LandingLayout;

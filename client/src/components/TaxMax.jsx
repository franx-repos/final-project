import Footer from "./Footer";
import HeroSection from "./landing-page/HeroSection";
import HowItWorks from "./landing-page/HowItWorks";
import NavigationTop from "./NavigationTop";
import OurPartners from "./landing-page/OurPartners";
import ThemeToggle from "./ThemeToggle";

function TaxMax() {
  return (
    <>
      <ThemeToggle />
      <NavigationTop />
      <HeroSection />
      <HowItWorks />
      <OurPartners />
      <Footer />
    </>
  );
}

export default TaxMax;

import Footer from "./Footer";
import HeroSection from "./landing-page/HeroSection";
import HowItWorks from "./landing-page/HowItWorks";
import NavigationTop from "./NavigationTop";
import OurPartners from "./landing-page/OurPartners";
import ParticlesBackground from "./ParticlesBackground";
import OpenTasksSlider from "./user-area/OpenTasksSlider";

function TaxMax() {
  return (
    <>
      <ParticlesBackground />
      <div className="wrapper">
        <NavigationTop />
        <HeroSection />
        <HowItWorks />
        <OurPartners />
        <OpenTasksSlider />
        <Footer />
      </div>
    </>
  );
}

export default TaxMax;

import Footer from "./Footer";
import HeroSection from "./landing-page/HeroSection";
import HowItWorks from "./landing-page/HowItWorks";
import NavigationTop from "./NavigationTop";
import OurPartners from "./landing-page/OurPartners";
import ParticlesBackground from "./ParticlesBackground";

function TaxMax() {
  return (
    <>
      <ParticlesBackground />
      <div className="wrapper">
        <NavigationTop />
        <HeroSection />
        <HowItWorks />
        <OurPartners />
        <Footer />
      </div>
    </>
  );
}

export default TaxMax;

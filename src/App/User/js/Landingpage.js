import AboutHalalMatch from "./Abouthalal";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./Howitworks";
import Navbar from "./Navbar";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./whychooseus";
import CookieConsentBanner from "./Cookieconsent"; // 👈 import this

function Landing() {
  return (
    <div className="w-[99vw] max-w-full min-h-screen overflow-x-hidden">
      <div className="font-sans bg-slate-50 min-h-screen w-full">
        <Navbar />
        <Hero />
        <AboutHalalMatch />
        <HowItWorks />
        <Testimonials />
        <WhyChooseUs />
        <FinalCTA />
        <Footer />
      </div>

      {/* <CookieConsentBanner /> */}
    </div>
  );
}

export default Landing;

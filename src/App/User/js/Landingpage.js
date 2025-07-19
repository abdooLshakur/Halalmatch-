import AboutHalalMatch from "./Abouthalal";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./Howitworks";
import Navbar from "./Navbar";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./whychooseus";
import SpecialServices from "./Specialservices";
import { useEffect } from "react";
import { scroller } from "react-scroll";
function Landing() {
   useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#special-services") {
      setTimeout(() => {
        scroller.scrollTo("special-services", {
          duration: 600,
          smooth: true,
          offset: -70,
        });
      }, 100); // small delay to ensure DOM is ready
    }
  }, []);

  return (
    <div className="w-[99vw] max-w-full min-h-screen overflow-x-hidden">
      <div className="font-sans bg-slate-50 min-h-screen w-full">
        <Navbar />
        <Hero />
        <AboutHalalMatch />
        <HowItWorks />
        <SpecialServices/>
        <Testimonials />
        <WhyChooseUs />
        <FinalCTA />
        <Footer />
      </div>

    </div>
  );
}

export default Landing
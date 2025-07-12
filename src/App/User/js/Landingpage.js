import AboutHalalMatch from "./Abouthalal";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./Howitworks";
import Navbar from "./Navbar";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./whychooseus";
import SpecialServices from "./Specialservices";

function Landing() {
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

export default Landing;

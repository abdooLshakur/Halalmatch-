import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    "Faith-based, halal-focused matchmaking.",
    "Verified member profiles for safety.",
    "Private, secure messaging.",
    "Global Muslim community.",
  ];

  return (
    <section className="py-20 bg-white">
      <h2
        className="text-3xl sm:text-4xl font-bold text-center text-slate-800 mb-12"
        data-aos="fade-up"
      >
        Why Choose Halal Matchmaking?
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start bg-pink-50 p-6 rounded-xl shadow-md"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <CheckCircleIcon className="h-6 w-6 text-pink-600 mt-1 mr-4 flex-shrink-0" />
            <p className="text-slate-700 text-lg">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

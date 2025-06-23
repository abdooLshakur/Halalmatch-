import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aisha & Ahmed",
      quote: "We found each other through Halal Matchmaking — it was easy, safe, and truly values-centered.",
    },
    {
      name: "Fatima & Musa",
      quote: "A beautiful platform that respects our faith and made finding love simple.",
    },
    {
      name: "Zainab & Umar",
      quote: "Highly recommend for Muslims seeking a halal path to marriage.",
    },
    {
      name: "Hauwa & Sulaiman",
      quote: "Alhamdulillah! The process was smooth and respectful — a perfect halal experience.",
    },
    {
      name: "Khadijah & Bilal",
      quote: "The platform gave us clarity and confidence. We're forever grateful.",
    },
    {
      name: "Maryam & Idris",
      quote: "We connected meaningfully and quickly. It truly felt guided and intentional.",
    },
  ];

  return (
    <section className="py-20 bg-pink-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 mb-12">
        Success Stories
      </h2>

      <div className="relative max-w-2xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          className="relative"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg rounded-2xl px-8 py-10 text-center">
                <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
                  “{item.quote}”
                </p>
                <h3 className="text-pink-600 font-semibold text-base">
                  {item.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows */}
        <button className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 text-pink-600 hover:text-pink-800 p-2 z-10">
          ‹
        </button>
        <button className="next-btn absolute right-0 top-1/2 -translate-y-1/2 text-pink-600 hover:text-pink-800 p-2 z-10">
          ›
        </button>
      </div>
    </section>
  );
}

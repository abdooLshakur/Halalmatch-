import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

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
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Success Stories</h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="max-w-2xl"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-indigo-50 p-8 rounded-2xl shadow text-center">
              <p className="text-slate-700 italic mb-4">“{item.quote}”</p>
              <h3 className="text-indigo-600 font-semibold">{item.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

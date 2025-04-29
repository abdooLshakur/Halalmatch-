export default function WhyChooseUs() {
    const features = [
      "Faith-based, halal-focused matchmaking.",
      "Verified member profiles for safety.",
      "Private, secure messaging.",
      "Global Muslim community.",
    ];
  
    return (
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Why Choose Halal Matchmaking?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-indigo-50 p-6 rounded-xl shadow text-lg text-slate-700">
              ✅ {feature}
            </div>
          ))}
        </div>
      </section>
    );
  }
  
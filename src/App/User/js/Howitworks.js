export default function HowItWorks() {
  const steps = [
    { title: "Sign Up", desc: "Create a free, secure account in minutes." },
    { title: "Complete Your Profile", desc: "Tell us about yourself and what you're looking for." },
    { title: "Make One-Time Payment", desc: "Unlock your journey with a quick one-time payment to activate your profile." },
    { title: "Get Matched", desc: "We’ll recommend like-minded, faith-driven matches for you." },
    { title: "Start Connecting", desc: "Message safely and move forward when you're ready." },
  ];

  return (
    <section className="py-16 bg-slate-100">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">How It Works</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`
              bg-white p-6 rounded-2xl shadow text-center transform transition-all duration-500
              animate-slide-up
              delay-[${index * 100}ms]
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl font-bold text-pink-600 mb-4">{index + 1}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

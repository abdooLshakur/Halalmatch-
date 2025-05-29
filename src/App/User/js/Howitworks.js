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
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-9">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-4">{index + 1}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-slate-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

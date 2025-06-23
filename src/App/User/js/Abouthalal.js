export default function AboutHalalMatch() {
  return (
    <section id="about" className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-slate-800 space-y-16">
        
        {/* Section Title */}
        <div className="text-center animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-slate-800">
            About Us
          </h1>
          <p className="text-pink-600 text-lg font-medium">
            Rooted in faith, driven by purpose.
          </p>
        </div>

        {/* Who We Are */}
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-pink-600">Who We Are</h2>
          <p className="text-lg text-slate-700">
            Halal Match came into existence in 2022. It is a Halal matchmaking service that facilitates contact between members who are looking for genuine relationships that will lead to marriage. It is a marriage brokering service that helps to make it easier for members to find a spouse.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 animate-slide-up">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-pink-600">Our Mission</h3>
            <p className="text-slate-700">
              Matching two hearts in the course that they find tranquility, love, and mercy in matrimony, to earn the pleasure of Allah.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-pink-600">Our Vision</h3>
            <p className="text-slate-700">
              To be the foremost halal matchmaking platform uniting Muslims, bringing purpose and direction to every relationship with the goal to earn Allah’s pleasure.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="animate-fade-in">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600">Our Core Values</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Honesty", "Assurance", "Loyalty", "Allah consciousness", "Leadership",
              "Quality", "Modesty", "Empathy", "Trust", "Religiosity",
              "Integrity", "Confidentiality"
            ].map((value, i) => (
              <span
                key={i}
                className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="animate-slide-up">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600">Our Objectives</h3>
          <ul className="list-disc list-inside space-y-3 text-slate-700">
            <li>To encourage courting in a halal way as taught by the practices of Islam.</li>
            <li>To bring about easy ways in which Muslims can meet potential partners to complete half of their deen.</li>
            <li>To ease up the complications of differences between spouses-to-be before marriage (e.g., age, genotype, location, etc.).</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

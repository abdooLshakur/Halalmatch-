export default function AboutHalalMatch() {
    return (
      <section id="about" className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-slate-800 space-y-12">

            {/* About us */}
            <div className="text-center text-5xl font-bold"><h1>About us</h1></div>
          {/* Intro */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-lg">
              Halal Match came into existence in 2022. It is a Halal matchmaking service that facilitates contact between members who are looking for genuine relationships that will lead to marriage. It is a marriage brokering service that helps to make it easier for members to find a spouse.
            </p>
          </div>
  
          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
              <p>
                Matching two hearts in the course that they find tranquility, love, and mercy in matrimony, to earn the pleasure of Allah.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <p>
                To be the foremost halal matchmaking platform uniting Muslims, bringing purpose and directions to every relationship with the goal to earn Allah’s pleasure.
              </p>
            </div>
          </div>
  
          {/* Core Values */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Core Values</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Honesty", "Assurance", "Loyalty", "Allah consciousness", "Leadership",
                "Quality", "Modesty", "Empathy", "Trust", "Religiosity",
                "Integrity", "Confidentiality"
              ].map((value, i) => (
                <span
                  key={i}
                  className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
  
          {/* Objectives */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Objectives</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>To encourage courting in a halal way as taught by the practices of Islam.</li>
              <li>To bring about easy ways in which Muslims can meet potential partners to complete half of their deen.</li>
              <li>To ease up the complications of differences between spouses-to-be before marriage (e.g., age, genotype, location, etc.).</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  
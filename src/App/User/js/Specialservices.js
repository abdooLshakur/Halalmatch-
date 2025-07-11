import React from 'react';

const SpecialServices = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16" id="special-services">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🌟 Special Services
        </h2>
        <p className="text-gray-600 text-lg">
          Personalized support to help you prepare for a purpose-driven, Allah-conscious marriage.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Premium Package */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">💼 Premium Package</h3>
          <p className="text-sm text-gray-500 mb-1">
            Cost: <strong className="text-green-600">₦30,000</strong>
          </p>
          <p className="text-gray-700 text-base mt-2">
            Our Premium Service offers confidential, anonymous matchmaking without the need to sign up or share personal details publicly.
            We work closely with you to understand your preferences, then connect you with suitable matches through a private and secure process—
            guided by trust, professionalism, and Islamic values.
          </p>
          <p className="text-sm text-gray-600 italic mt-3">
            Ideal for those who value privacy and intentionality.
          </p>
        </div>

        {/* E-book */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">📘 E-book: 100+ Questions Before Nikaah</h3>
          <p className="text-sm text-gray-500 mb-1">
            Cost: <strong className="text-green-600">₦5,000</strong>
          </p>
          <p className="text-gray-700 text-base mt-2">
            Written by Coach Khadija Ibrahim, this practical guide equips Muslim singles with 100+ thoughtful questions covering spirituality, roles, finances, goals, and more—helping couples make informed, Allah-conscious marriage decisions.
          </p>
          <p className="text-sm text-gray-600 italic mt-3">
            A must-have roadmap for intentional marriage seekers.
          </p>
        </div>

        {/* Counselling Services */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">🧕 Pre-Marital & Marital Counselling</h3>
          <p className="text-sm text-gray-500 mb-1">
            Cost: <strong className="text-yellow-600">Contact admin</strong>
          </p>
          <p className="text-gray-700 text-base mt-2">
            Receive faith-based guidance as a couple preparing for or navigating marriage. Whether you're engaged or already married,
            we offer a safe, spiritually grounded space for growth and understanding.
          </p>
          <p className="text-sm text-gray-600 italic mt-3">
            Strengthen your union with intentional, Islam-centered counsel.
          </p>
        </div>

        {/* Spiritual Diagnosis */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">🌿 Spiritual Diagnosis: Delay in Marriage</h3>
          <p className="text-sm text-gray-500 mb-1">
            Cost: <strong className="text-yellow-600">Contact admin</strong>
          </p>
          <p className="text-gray-700 text-base mt-2">
            For sincere seekers facing unexplained delays in marriage. This 1-on-1 consultation explores spiritual or emotional blocks
            with Islamic-based insight and practical steps rooted in Qur’an, Sunnah, and du’a.
          </p>
          <p className="text-sm text-gray-600 italic mt-3">
            Understand unseen barriers & take spiritually grounded steps.
          </p>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="mt-16 text-center">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          🤝 Join Our WhatsApp Community
        </h4>
        <p className="text-gray-600 mb-4">
          Get educational tips, fun facts on halal courtship & more (only admins can see your number).
        </p>
        <a
          href="https://chat.whatsapp.com/KPyhs5NnfMZIPkp7oDsR3Z?mode=r_c"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition"
        >
          Join Now
        </a>
      </div>
    </section>
  );
};

export default SpecialServices;


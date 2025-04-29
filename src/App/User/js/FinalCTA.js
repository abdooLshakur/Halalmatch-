import { Link } from "react-router-dom";

export default function FinalCTA() {
    return (
      <section className="py-16 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Meet Your Match?</h2>
        <p className="mb-6 text-lg">Join thousands of Muslims on a halal path to marriage.</p>
        <Link to={"/signup"}><button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100">
          Get Started Now
        </button></Link>
      </section>
    );
  }
  
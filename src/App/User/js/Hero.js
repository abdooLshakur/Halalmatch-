import { Button } from "./Button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-indigo-50 py-20 flex items-center justify-center  h-[70vh]">
      <div className="text-center">
      <h1 className="text-5xl font-bold text-slate-800 mb-4">Find Your Perfect Match the Halal Way</h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
        A safe, respectful, and value-driven matchmaking platform tailored for Muslims worldwide.
      </p>
      <div className="space-x-4">
        <Link to={"/signup"}><Button className="bg-indigo-600 text-white">Get Started</Button></Link>
        <Button variant="outline">Learn More</Button>
      </div>
      </div>
    </section>
  );
}

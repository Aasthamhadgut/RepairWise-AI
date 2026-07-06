import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";

export default function Home() {
  const features = [
    ["AI diagnosis", "Fault predictions, cost ranges, and repair difficulty."],
    ["Sustainability score", "Understand money, materials, and carbon saved."],
    ["Professional reports", "Download a clear recommendation for every product."]
  ];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,#dff7ea,transparent_35%),linear-gradient(120deg,#ffffff,#edfdf5)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-bold text-forest">
              <Sparkles size={16} /> SDG 12 decision platform
            </p>
            <h1 className="text-5xl font-black leading-tight text-ink md:text-7xl">RepairWise AI</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-650">
              Decide whether broken products should be repaired, reused, recycled, or replaced with agentic AI and environmental impact scoring.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/analyzer" className="btn-primary inline-flex items-center gap-2">Start Analysis <ArrowRight size={18} /></Link>
              <Link to="/recycling-guide" className="btn-secondary">Recycling Guide</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-6 shadow-soft">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-forest p-6 text-white">
                <Leaf size={42} />
                <p className="mt-8 text-sm uppercase tracking-wide text-emerald-100">Recommendation</p>
                <p className="text-4xl font-black">Repair</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Repair Score" value="84%" tone="bg-white" />
                <StatCard label="CO2 Saved" value="18kg" tone="bg-white" />
              </div>
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-3 font-bold text-forest"><ShieldCheck /> Agent analysis complete</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
              <BadgeCheck className="text-leaf" />
              <h3 className="mt-4 text-xl font-black text-forest">{title}</h3>
              <p className="mt-2 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

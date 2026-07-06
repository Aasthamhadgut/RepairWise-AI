import { Link } from "react-router-dom";
import { Activity, FileText, Leaf, Zap } from "lucide-react";
import StatCard from "../components/StatCard.jsx";

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="rounded-3xl bg-forest p-8 text-white shadow-soft">
        <p className="font-bold text-emerald-100">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black">Welcome to RepairWise AI</h1>
        <p className="mt-3 max-w-2xl text-emerald-50">Analyze a product, check saved reports, and grow your responsible consumption score.</p>
        <Link to="/analyzer" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-black text-forest">Quick Analyze</Link>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Eco Score" value="91" />
        <StatCard label="Reports" value="12" />
        <StatCard label="Repair Rate" value="68%" />
        <StatCard label="Carbon Saved" value="126kg" />
      </section>
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          [Activity, "Recent Reports", "Laptop hinge repair scored 78% repair-worthiness."],
          [Leaf, "Eco Insight", "Repairing small electronics can avoid high e-waste impact."],
          [FileText, "Next Step", "Download reports from your history page."]
        ].map(([Icon, title, body]) => (
          <div key={title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
            <Icon className="text-leaf" />
            <h3 className="mt-4 text-xl font-black text-forest">{title}</h3>
            <p className="mt-2 text-slate-600">{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

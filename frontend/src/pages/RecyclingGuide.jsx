import { useState } from "react";
import { getRecyclingGuide } from "../services/api";

export default function RecyclingGuide() {
  const [query, setQuery] = useState("Battery");
  const [guide, setGuide] = useState(null);

  async function search(event) {
    event.preventDefault();
    setGuide(await getRecyclingGuide(query));
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black text-ink">Recycling Guide</h1>
      <form onSubmit={search} className="mt-6 flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft md:flex-row">
        <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Battery, phone, laptop..." />
        <button className="btn-primary">Search</button>
      </form>
      {guide && (
        <section className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-forest">{guide.product}</h2>
          <p className="mt-4 text-slate-700">{guide.safeDisposalMethod}</p>
          <p className="mt-4 font-bold text-slate-700">Government guidelines</p>
          <p className="text-slate-600">{guide.governmentGuidelines}</p>
          <p className="mt-4 font-bold text-slate-700">Tips</p>
          <ul className="mt-2 list-disc pl-5 text-slate-600">{guide.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          <div className="mt-6 grid gap-3 rounded-2xl bg-emerald-50 p-4 md:grid-cols-3">
            <div><p className="font-black text-forest">Before recycle</p><p className="text-sm text-slate-600">Try repair, reuse, resale, or donation.</p></div>
            <div><p className="font-black text-forest">Safety</p><p className="text-sm text-slate-600">Separate batteries and avoid damage.</p></div>
            <div><p className="font-black text-forest">Proof</p><p className="text-sm text-slate-600">Ask for a collection receipt.</p></div>
          </div>
        </section>
      )}
    </main>
  );
}

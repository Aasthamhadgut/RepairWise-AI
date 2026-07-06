import { useEffect, useState } from "react";
import { deleteReport, getReports } from "../services/api";

export default function History() {
  const [reports, setReports] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getReports().then((data) => setReports(data.reports || [])).catch(() => setReports([]));
  }, []);

  const filtered = reports.filter((report) => JSON.stringify(report).toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-ink">Repair History</h1>
      <input className="input mt-6 max-w-md" placeholder="Search reports" value={query} onChange={(e) => setQuery(e.target.value)} />
      <section className="mt-6 grid gap-4">
        {filtered.map((report) => (
          <article key={report.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-soft">
            <div>
              <h3 className="text-xl font-black text-forest">{report.product || report.category || "Product report"}</h3>
              <p className="text-slate-600">{report.recommendation || "Saved analysis"}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => window.print()}>Download</button>
              <button className="btn-secondary" onClick={() => deleteReport(report.id).then(() => setReports((rows) => rows.filter((row) => row.id !== report.id)))}>Delete</button>
            </div>
          </article>
        ))}
        {!filtered.length && <p className="rounded-2xl bg-white p-6 text-slate-600 shadow-soft">No reports yet.</p>}
      </section>
    </main>
  );
}

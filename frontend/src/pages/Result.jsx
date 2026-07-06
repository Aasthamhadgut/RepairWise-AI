import { useLocation, Link } from "react-router-dom";
import ScoreBar from "../components/ScoreBar.jsx";

export default function Result() {
  const { state } = useLocation();
  const result = state?.result?.report || state?.result;

  if (!result) {
    return <main className="mx-auto max-w-4xl px-4 py-16"><Link className="btn-primary" to="/analyzer">Run an analysis</Link></main>;
  }

  function downloadReport() {
    const rows = [
      ["Product", result.product],
      ["Recommendation", result.recommendation],
      ["Repair Score", `${result.repairScore}%`],
      ["Sustainability Score", `${result.sustainabilityScore}%`],
      ["Estimated Repair Cost", result.estimatedRepairCost],
      ["Estimated Replacement Cost", result.estimatedReplacementCost],
      ["Repair Time", result.repairTime],
      ["Repair Difficulty", result.repairDifficulty],
      ["Carbon Saved", result.carbonFootprintSaved],
      ["Money Saved", result.moneySaved],
      ["Reasoning", result.reasoning],
      ["Possible Faults", (result.possibleFaults || []).join(", ")],
      ["Maintenance Tips", (result.maintenanceTips || []).join(", ")]
    ];
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>RepairWise Report</title><style>body{font-family:Arial;padding:32px;color:#10231c}h1{color:#124734}.row{border-bottom:1px solid #d7eadf;padding:12px 0}.label{font-weight:700;color:#124734}</style></head><body><h1>RepairWise AI Analysis Report</h1>${rows.map(([label, value]) => `<div class="row"><div class="label">${label}</div><div>${value || "N/A"}</div></div>`).join("")}<script>window.print()</script></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `repairwise-${Date.now()}-report.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl bg-forest p-8 text-white shadow-soft">
        <p className="font-bold text-emerald-100">Overall Recommendation</p>
        <h1 className="mt-2 text-5xl font-black">{result.recommendation}</h1>
        <p className="mt-3 max-w-3xl text-emerald-50">{result.reasoning}</p>
      </div>
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
          <ScoreBar label="Repair Score" value={result.repairScore || 74} />
          <div className="mt-5" />
          <ScoreBar label="Sustainability Score" value={result.sustainabilityScore || 82} />
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
          <p className="text-sm font-bold text-slate-500">Estimated Repair Cost</p>
          <p className="text-3xl font-black text-forest">{result.estimatedRepairCost}</p>
          <p className="mt-4 text-sm font-bold text-slate-500">Estimated Replacement Cost</p>
          <p className="text-3xl font-black text-forest">{result.estimatedReplacementCost}</p>
        </div>
      </section>
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <Info title="Possible Faults" items={result.possibleFaults} />
        <Info title="Accuracy Signals" items={result.accuracySignals || ["Category, age, warranty, symptoms, cost ratio, and sustainability impact were considered."]} />
        <Info title="Environmental Impact" items={[result.environmentalImpact, `Carbon saved: ${result.carbonFootprintSaved}`]} />
        <Info title="Maintenance Tips" items={result.maintenanceTips} />
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <button className="btn-primary" onClick={downloadReport}>Download Report</button>
        <button className="btn-secondary">Save Report</button>
        <Link className="btn-secondary" to="/analyzer">Analyze Again</Link>
      </div>
    </main>
  );
}

function Info({ title, items = [] }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
      <h3 className="text-xl font-black text-forest">{title}</h3>
      <ul className="mt-4 space-y-3 text-slate-600">
        {(Array.isArray(items) ? items : [items]).map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

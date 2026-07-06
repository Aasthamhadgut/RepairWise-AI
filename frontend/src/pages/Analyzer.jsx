import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeProduct } from "../services/api";

const initialForm = {
  category: "Laptop",
  brand: "",
  model: "",
  age: "",
  warrantyStatus: "Unknown",
  condition: "Average",
  usageLevel: "Daily",
  city: "",
  problemDescription: ""
};

export default function Analyzer() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await analyzeProduct(form);
      navigate("/result", { state: { result } });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black text-ink">Repair Analyzer</h1>
      <form onSubmit={submit} className="mt-8 grid gap-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft md:grid-cols-2">
        {[
          ["category", "Product Category"],
          ["brand", "Brand"],
          ["model", "Model"],
          ["age", "Age"]
        ].map(([field, label]) => (
          <label key={field} className="text-sm font-bold text-slate-700">
            {label}
            <input className="input mt-2" value={form[field]} onChange={(e) => update(field, e.target.value)} required={field !== "model"} />
          </label>
        ))}
        <label className="text-sm font-bold text-slate-700">
          Warranty Status
          <select className="input mt-2" value={form.warrantyStatus} onChange={(e) => update("warrantyStatus", e.target.value)}>
            <option>Unknown</option>
            <option>Under warranty</option>
            <option>Expired</option>
          </select>
        </label>
        <label className="text-sm font-bold text-slate-700">
          Product Condition
          <select className="input mt-2" value={form.condition} onChange={(e) => update("condition", e.target.value)}>
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>
          </select>
        </label>
        <label className="text-sm font-bold text-slate-700">
          Usage Level
          <select className="input mt-2" value={form.usageLevel} onChange={(e) => update("usageLevel", e.target.value)}>
            <option>Rarely</option>
            <option>Weekly</option>
            <option>Daily</option>
            <option>Heavy use</option>
          </select>
        </label>
        <label className="text-sm font-bold text-slate-700">
          City
          <input className="input mt-2" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="For recycling suggestions" />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Product Image
          <input className="input mt-2" type="file" accept="image/*" />
        </label>
        <label className="md:col-span-2 text-sm font-bold text-slate-700">
          Problem Description
          <textarea className="input mt-2 min-h-36" value={form.problemDescription} onChange={(e) => update("problemDescription", e.target.value)} required />
        </label>
        {error && <p className="md:col-span-2 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <button className="btn-primary md:col-span-2" disabled={loading}>{loading ? "Analyzing..." : "Analyze Product"}</button>
      </form>
    </main>
  );
}

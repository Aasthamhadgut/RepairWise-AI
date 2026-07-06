export default function StatCard({ label, value, tone = "bg-white" }) {
  return (
    <div className={`rounded-2xl border border-emerald-100 p-5 shadow-soft ${tone}`}>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-forest">{value}</p>
    </div>
  );
}

export default function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-bold text-slate-700">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-emerald-100">
        <div className="h-3 rounded-full bg-leaf" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

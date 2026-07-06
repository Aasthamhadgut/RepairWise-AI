import StatCard from "../components/StatCard.jsx";

export default function Admin() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black text-ink">Admin Panel</h1>
      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Total Users" value="1,248" />
        <StatCard label="Total Reports" value="3,904" />
        <StatCard label="Repair Rate" value="61%" />
        <StatCard label="Carbon Saved" value="18t" />
      </section>
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-forest">Most Common Products</h2>
          <p className="mt-3 text-slate-600">Phones, laptops, headphones, washing machines.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-forest">Manage Eco Content</h2>
          <p className="mt-3 text-slate-600">Add eco tips and recycling guides through Firestore collections.</p>
        </div>
      </section>
    </main>
  );
}

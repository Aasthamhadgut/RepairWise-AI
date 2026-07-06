export default function LearningCenter() {
  const cards = [
    ["Repair before replacing", "Learn how small repairs reduce demand for new raw materials."],
    ["Battery safety", "Store, tape, and recycle batteries responsibly."],
    ["Maintenance habits", "Simple cleaning and updates can extend product life."]
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-ink">Eco Learning Center</h1>
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-soft">
            <p className="text-sm font-bold text-leaf">Guide</p>
            <h2 className="mt-3 text-2xl font-black text-forest">{title}</h2>
            <p className="mt-3 text-slate-600">{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

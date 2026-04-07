export default function Hero() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
          BlueBox Consulting
        </p>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900">
          Accelerate your business with Data, Cloud, AI and SAP expertise
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          We help companies design, modernize and scale their digital capabilities
          with business-driven and high-impact solutions.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#contact"
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white"
          >
            Contact us
          </a>
          <a
            href="#services"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900"
          >
            Explore services
          </a>
        </div>
      </div>
    </section>
  );
}
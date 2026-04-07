const services = [
  {
    title: "Data",
    description: "Data strategy, analytics, BI and data platform modernization.",
  },
  {
    title: "Cloud",
    description: "Cloud architecture, migration, optimization and governance.",
  },
  {
    title: "AI",
    description: "AI use cases, automation and intelligent business solutions.",
  },
  {
    title: "SAP",
    description: "SAP transformation, integration and business process support.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-slate-900">Our Services</h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          BlueBox supports organizations across their transformation journey with
          targeted expertise and execution capabilities.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
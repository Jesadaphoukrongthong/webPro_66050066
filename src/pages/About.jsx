function About() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">About MiniShop</p>
      <h1 className="mt-2 text-4xl font-bold">A small shop built for learning React.</h1>
      <div className="mt-6 max-w-3xl space-y-4 leading-8 text-slate-600">
        <p>
          MiniShop is a classroom project used to practice building reusable React components and organizing an application into multiple pages.
        </p>
        <p>
          In Week 9, the project focuses on routing, component architecture, URL parameters, navigation, and separating product data from the UI.
        </p>
      </div>
    </section>
  )
}

export default About

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
      <p className="text-7xl font-black text-blue-600">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-600">The URL does not match any page in MiniShop.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </section>
  )
}

export default NotFound

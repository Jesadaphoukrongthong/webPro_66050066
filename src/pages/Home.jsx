import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList.jsx'
import { getAllProducts } from '../models/productModel.js'

function Home() {
  const featuredProducts = getAllProducts().slice(0, 2)

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">MiniShop</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Simple shopping, now with React Router.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Browse featured products here, or open the Products page to see the complete catalog.
        </p>
        <Link
          to="/products"
          className="mt-7 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Browse All Products
        </Link>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Featured</p>
            <h2 className="mt-1 text-3xl font-bold">Featured Products</h2>
          </div>
          <Link to="/products" className="font-semibold text-blue-600 hover:text-blue-700">
            View all →
          </Link>
        </div>
        <ProductList products={featuredProducts} />
      </section>
    </div>
  )
}

export default Home

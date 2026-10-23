import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../models/productModel.js'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  if (!product) {
    return (
      <section className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
        <div className="text-6xl">🔎</div>
        <h1 className="mt-5 text-3xl font-bold">Product not found</h1>
        <p className="mt-3 text-slate-600">There is no product with ID {id}.</p>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Back to Products
        </button>
      </section>
    )
  }

  return (
    <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:grid-cols-2 sm:p-10">
      <div className="flex min-h-80 items-center justify-center rounded-2xl bg-slate-50 text-9xl">
        <span role="img" aria-label={product.name}>{product.icon}</span>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{product.category}</p>
        <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
        <p className="mt-4 text-sm font-semibold text-amber-600">★ {product.rating} / 5</p>
        <p className="mt-5 text-3xl font-black text-blue-600">฿{product.price.toLocaleString('th-TH')}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </button>
          <Link
            to="/"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail

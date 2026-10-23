import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-44 items-center justify-center rounded-xl bg-slate-50 text-7xl">
        <span role="img" aria-label={product.name}>
          {product.icon}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {product.category}
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">{product.name}</h2>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        <p className="mt-4 text-xl font-bold text-blue-600">
          ฿{product.price.toLocaleString('th-TH')}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          View Detail
        </Link>
      </div>
    </article>
  )
}

export default ProductCard

function ProductCard({ name, price, image, category, onAdd }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-48 items-center justify-center rounded-xl bg-slate-50 p-5">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-6xl" aria-hidden="true">📦</span>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {category}
        </p>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900">
          {name}
        </h3>
        <p className="mt-4 text-xl font-bold text-blue-600">
          ฿{Number(price).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>

        <button
          type="button"
          onClick={onAdd}
          className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard

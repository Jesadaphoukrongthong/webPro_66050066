import ProductList from '../components/ProductList.jsx'
import { getAllProducts } from '../models/productModel.js'

function Products() {
  const products = getAllProducts()

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Catalog</p>
        <h1 className="mt-1 text-4xl font-bold">Products</h1>
        <p className="mt-3 text-slate-600">
          All {products.length} products are loaded from the product model.
        </p>
      </div>

      <ProductList products={products} />
    </section>
  )
}

export default Products

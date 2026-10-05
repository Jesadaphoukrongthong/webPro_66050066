import ProductCard from './ProductCard.jsx'

function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.title}
          price={product.price}
          image={product.image}
          category={product.category}
          onAdd={() => onAddToCart(product)}
        />
      ))}
    </div>
  )
}

export default ProductList

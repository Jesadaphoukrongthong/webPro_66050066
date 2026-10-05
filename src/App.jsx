import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Profile from './components/Profile'

const fallbackProducts = [
  {
    id: 1,
    title: 'Laptop',
    price: 12900,
    category: 'electronics',
    image: 'https://placehold.co/300x300?text=Laptop',
  },
  {
    id: 2,
    title: 'Headphones',
    price: 1290,
    category: 'electronics',
    image: 'https://placehold.co/300x300?text=Headphones',
  },
  {
    id: 3,
    title: 'Backpack',
    price: 890,
    category: "men's clothing",
    image: 'https://placehold.co/300x300?text=Backpack',
  },
  {
    id: 4,
    title: 'Smart Watch',
    price: 2990,
    category: 'electronics',
    image: 'https://placehold.co/300x300?text=Smart+Watch',
  },
]

function App() {
  const [products, setProducts] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'https://fakestoreapi.com/products'
        )

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`)
        }

        const data = await response.json()

        setProducts(data)
      } catch (err) {
        console.error('Fetch error:', err)

        setError(
          'ไม่สามารถโหลดข้อมูลได้ - กำลังใช้ข้อมูลสำรอง'
        )

        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading products...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Header cartCount={cartCount} />

      <main className="max-w-7xl mx-auto p-8">

        <Profile />

        {error && (
          <div className="mb-6 rounded-lg bg-yellow-100 p-4 text-yellow-800">
            ⚠️ {error}
          </div>
        )}

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="mb-8 w-full rounded-lg border bg-white p-3"
        />

        {filteredProducts.length === 0 ? (
          <div className="p-10 text-center">
            ไม่พบสินค้าที่ค้นหา
          </div>
        ) : (
          <ProductList
            products={filteredProducts}
            onAddToCart={() =>
              setCartCount((count) => count + 1)
            }
          />
        )}

      </main>
    </div>
  )
}

export default App
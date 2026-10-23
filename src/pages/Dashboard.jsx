import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productApi.js'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError('')
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error(err)
        setError('ไม่สามารถโหลดข้อมูลสินค้าได้')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const totalValue = products.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0,
  )

  const categories = new Set(
    products.map((product) => product.category).filter(Boolean),
  ).size

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
        <button className="btn btn-sm" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: '📦',
      description: 'จำนวนสินค้าทั้งหมด',
    },
    {
      title: 'Product Value',
      value: `฿${totalValue.toLocaleString('en-US')}`,
      icon: '💰',
      description: 'ผลรวมราคาสินค้า',
    },
    {
      title: 'Categories',
      value: categories,
      icon: '🏷️',
      description: 'จำนวนหมวดหมู่',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Dashboard</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 opacity-70">Overview of your MiniShop products</p>
        </div>

        <Link to="/admin/products" className="btn btn-primary">
          Manage Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.title} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between gap-3">
                <h2 className="card-title text-base">{stat.title}</h2>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-60">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between gap-3">
            <h2 className="card-title">Recent Products</h2>
            <Link to="/admin/products" className="link link-primary">
              View All
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="alert mt-4">
              <span>ยังไม่มีสินค้าในระบบ</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td>
                        {product.icon || '📦'} {product.name}
                      </td>
                      <td>
                        <span className="badge badge-outline">
                          {product.category || 'General'}
                        </span>
                      </td>
                      <td>฿{Number(product.price).toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/productApi.js'

const emptyForm = {
  name: '',
  price: '',
  category: '',
  icon: '📦',
}

function ProductManagement() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')

  async function loadProducts() {
    try {
      setLoading(true)
      setError('')
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
      setError('Unable to load products. Make sure JSON Server is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function validateForm() {
    if (!form.name.trim()) {
      return 'Product name is required.'
    }

    const price = Number(form.price)
    if (!Number.isFinite(price) || price <= 0) {
      return 'Price must be greater than 0.'
    }

    return ''
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setValidationError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const message = validateForm()
    if (message) {
      setValidationError(message)
      return
    }

    const productData = {
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim() || 'General',
      icon: form.icon.trim() || '📦',
    }

    try {
      setSaving(true)
      setError('')
      setValidationError('')

      if (editingId !== null) {
        await updateProduct(editingId, productData)
      } else {
        await createProduct(productData)
      }

      resetForm()
      await loadProducts()
    } catch (err) {
      console.error(err)
      setError('Unable to save product. Please check the API server and try again.')
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name ?? '',
      price: product.price ?? '',
      category: product.category ?? '',
      icon: product.icon ?? '📦',
    })
    setValidationError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`Delete ${product.name}?`)
    if (!confirmed) return

    try {
      setError('')
      await deleteProduct(product.id)

      if (editingId === product.id) {
        resetForm()
      }

      await loadProducts()
    } catch (err) {
      console.error(err)
      setError('Unable to delete product. Please check the API server and try again.')
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Week 10</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Product Management</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Manage MiniShop products through a mock REST API using GET, POST, PUT, and DELETE.
        </p>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">{editingId !== null ? 'Edit Product' : 'Add Product'}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {editingId !== null ? `Editing product ID ${editingId}` : 'Create a new product in db.json through the API.'}
            </p>
          </div>
          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Product Name *</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Mouse"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Price (THB) *</span>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="450"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Accessory"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Icon</span>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="🖱️"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <div className="md:col-span-2 lg:col-span-4">
            {validationError && (
              <p className="mb-3 rounded-lg bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
                {validationError}
              </p>
            )}
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : editingId !== null ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </section>

      {error && (
        <div className="rounded-xl bg-red-50 px-5 py-4 text-red-700 ring-1 ring-red-200">
          <strong>Error:</strong> {error}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold">Products from REST API</h2>
            <p className="mt-1 text-sm text-slate-500">Endpoint: http://localhost:3001/products</p>
          </div>
          <button
            type="button"
            onClick={loadProducts}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="mt-1 text-sm text-slate-500">Add a product using the form above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{product.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" aria-hidden="true">{product.icon || '📦'}</span>
                        <span className="font-semibold text-slate-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{product.category || 'General'}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-semibold text-blue-700">
                      ฿{Number(product.price).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="rounded-lg bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-200"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default ProductManagement

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
  category: 'Computer',
  icon: '📦',
  description: '',
}

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    if (!form.name.trim()) return 'Product name is required.'

    const price = Number(form.price)
    if (!Number.isFinite(price) || price <= 0) {
      return 'Price must be greater than 0.'
    }

    return ''
  }

  function openAddModal() {
    setEditingId(null)
    setForm(emptyForm)
    setValidationError('')
    setIsModalOpen(true)
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name || '',
      price: String(product.price ?? ''),
      category: product.category || 'Computer',
      icon: product.icon || '📦',
      description: product.description || '',
    })
    setValidationError('')
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingId(null)
    setForm(emptyForm)
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
      category: form.category || 'Computer',
      icon: form.icon.trim() || '📦',
      description: form.description.trim(),
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

      closeModal()
      await loadProducts()
    } catch (err) {
      console.error(err)
      setError('Unable to save product. Please check the API server and try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`Delete ${product.name}?`)
    if (!confirmed) return

    try {
      setError('')
      await deleteProduct(product.id)
      await loadProducts()
    } catch (err) {
      console.error(err)
      setError('Unable to delete product. Please check the API server and try again.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Products</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="mt-2 opacity-70">Manage MiniShop products through the Week 10 REST API.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAddModal}>
          + Add Product
        </button>
      </div>

      {error && (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-sm" onClick={loadProducts}>
            Retry
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-box bg-base-100 shadow">
        {loading ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="mt-1 opacity-60">Add your first product with the button above.</p>
          </div>
        ) : (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.icon || '📦'}</span>
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-xs opacity-50">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {product.category || 'General'}
                    </span>
                  </td>
                  <td>฿{Number(product.price).toLocaleString('en-US')}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        className="btn btn-info btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal modal-open" role="dialog" aria-modal="true">
          <div className="modal-box max-h-[90vh] max-w-2xl overflow-y-auto">
            <h2 className="text-2xl font-bold">
              {editingId !== null ? 'Edit Product' : 'Add Product'}
            </h2>
            <p className="mt-1 text-sm opacity-60">
              {editingId !== null
                ? `Editing product ID ${editingId}`
                : 'Create a new product through the mock REST API.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="form-control w-full">
                <span className="label-text mb-2 font-semibold">Product name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-2 font-semibold">Price</span>
                <input
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <span className="label-text mb-2 font-semibold">Category</span>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option>Computer</option>
                    <option>Audio</option>
                    <option>Fashion</option>
                    <option>Gadget</option>
                  </select>
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-2 font-semibold">Icon</span>
                  <input
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    placeholder="📦"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <label className="form-control w-full">
                <span className="label-text mb-2 font-semibold">Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product description"
                  className="textarea textarea-bordered min-h-24 w-full"
                />
              </label>

              {validationError && (
                <div role="alert" className="alert alert-warning">
                  <span>{validationError}</span>
                </div>
              )}

              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving
                    ? 'Saving...'
                    : editingId !== null
                      ? 'Save Changes'
                      : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
          <button
            type="button"
            className="modal-backdrop"
            aria-label="Close modal"
            onClick={closeModal}
          />
        </div>
      )}
    </section>
  )
}

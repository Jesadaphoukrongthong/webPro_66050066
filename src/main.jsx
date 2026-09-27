import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'


const makeIcon = (symbol) => function Icon({ size = 20, className = '' }) {
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.max(14, size * 0.82),
        lineHeight: 1
      }}
      aria-hidden="true"
    >
      {symbol}
    </span>
  )
}

const Search = makeIcon('⌕')
const ShoppingCart = makeIcon('🛒')
const UserRound = makeIcon('👤')
const LayoutDashboard = makeIcon('⌂')
const Box = makeIcon('◇')
const Mail = makeIcon('✉')
const BadgeCheck = makeIcon('▣')
const Pencil = makeIcon('✎')
const Star = makeIcon('★')
const Minus = makeIcon('−')
const Plus = makeIcon('+')
const Package = makeIcon('▣')
const WalletCards = makeIcon('฿')
const Heart = makeIcon('♡')
const Award = makeIcon('★')


const products = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 12900,
    rating: 4.3,
    reviews: 24,
    image: '/products/laptop.svg'
  },
  {
    id: 2,
    name: 'Headphones',
    category: 'Electronics',
    price: 1290,
    rating: 4.3,
    reviews: 18,
    image: '/products/headphones.svg'
  },
  {
    id: 3,
    name: 'Backpack',
    category: 'Accessories',
    price: 890,
    rating: 4.7,
    reviews: 32,
    image: '/products/backpack.svg'
  },
  {
    id: 4,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 2990,
    rating: 4.4,
    reviews: 20,
    image: '/products/watch.svg'
  },
  {
    id: 5,
    name: 'Sport Shoes',
    category: 'Fashion',
    price: 1590,
    rating: 4.6,
    reviews: 15,
    image: '/products/shoes.svg'
  }
]

const orders = [
  { id: 1, date: '2025-09-15', customer: 'Somchai J.', items: 3, total: 1260, status: 'Completed' },
  { id: 2, date: '2025-09-14', customer: 'Nattaya K.', items: 1, total: 520, status: 'Processing' },
  { id: 3, date: '2025-09-13', customer: 'Kritsada P.', items: 2, total: 980, status: 'Shipped' },
  { id: 4, date: '2025-09-12', customer: 'Piyaporn S.', items: 1, total: 450, status: 'Completed' },
  { id: 5, date: '2025-09-11', customer: 'Thanawat C.', items: 4, total: 1800, status: 'Pending' }
]

const statusClass = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-violet-100 text-violet-700',
  Pending: 'bg-amber-100 text-amber-700'
}

const money = (n) => `฿${n.toLocaleString('en-US')}`

function App() {
  const [page, setPage] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [cartCount, setCartCount] = useState(2)
  const [selectedProduct, setSelectedProduct] = useState(products[4])
  const [qty, setQty] = useState(1)

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All Categories' || p.category === category
      return matchSearch && matchCategory
    })
  }, [search, category])

  const addToCart = (amount = 1) => setCartCount(v => v + amount)

  const openProduct = (product) => {
    setSelectedProduct(product)
    setQty(1)
    setPage('detail')
  }

  return (
    <div className="min-h-screen text-slate-900">
      <Header cartCount={cartCount} onProducts={() => setPage('products')} />
      <MobileNav page={page} setPage={setPage} />

      <div className="mx-auto flex max-w-[1380px]">
        <Sidebar page={page} setPage={setPage} />

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {page === 'dashboard' && <Dashboard />}
          {page === 'products' && (
            <Products
              products={filteredProducts}
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              addToCart={() => addToCart(1)}
              openProduct={openProduct}
            />
          )}
          {page === 'profile' && <Profile />}
          {page === 'detail' && (
            <ProductDetail
              product={selectedProduct}
              qty={qty}
              setQty={setQty}
              addToCart={() => addToCart(qty)}
              cartCount={cartCount}
            />
          )}
        </main>
      </div>
    </div>
  )
}

function Header({ cartCount, onProducts }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-[1380px] items-center justify-between px-5">
        <button onClick={onProducts} className="text-2xl font-extrabold tracking-tight text-blue-600">
          MiniShop
        </button>

        <div className="flex items-center gap-5 text-slate-700">
          <button aria-label="Search" className="rounded-lg p-2 hover:bg-slate-100">
            <Search size={23} />
          </button>

          <button onClick={onProducts} aria-label="Cart" className="relative rounded-lg p-2 hover:bg-slate-100">
            <ShoppingCart size={24} />
            <span className="absolute right-0 top-0 min-w-5 rounded-full bg-blue-600 px-1 text-center text-[11px] font-bold leading-5 text-white">
              {cartCount}
            </span>
          </button>

          <button aria-label="Profile" className="rounded-full bg-slate-100 p-2 text-slate-500">
            <UserRound size={21} />
          </button>
        </div>
      </div>
    </header>
  )
}


function MobileNav({ page, setPage }) {
  const links = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'products', label: 'Products', icon: Box },
    { key: 'profile', label: 'Profile', icon: UserRound }
  ]

  return (
    <nav className="border-b border-slate-200 bg-white px-3 py-2 md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-2">
        {links.map(({ key, label, icon: Icon }) => {
          const active = page === key || (page === 'detail' && key === 'products')
          return (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold ${
                active ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function Sidebar({ page, setPage }) {
  const links = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'products', label: 'Products', icon: Box },
    { key: 'profile', label: 'Profile', icon: UserRound }
  ]

  return (
    <aside className="hidden min-h-[calc(100vh-74px)] w-52 shrink-0 border-r border-slate-200 bg-white p-3 md:block">
      <nav className="space-y-1">
        {links.map(({ key, label, icon: Icon }) => {
          const active = page === key || (page === 'detail' && key === 'products')
          return (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon size={19} />
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

function Dashboard() {
  const cards = [
    { label: 'Total Products', value: '24', icon: Package, tone: 'bg-blue-50 text-blue-600' },
    { label: 'Orders', value: '128', icon: ShoppingCart, tone: 'bg-emerald-50 text-emerald-600' },
    { label: 'Revenue', value: '฿48,500', icon: WalletCards, tone: 'bg-violet-50 text-violet-600' }
  ]

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`grid h-12 w-12 place-items-center rounded-full ${tone}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500">
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Customer</th>
                <th className="px-3 py-3">Items</th>
                <th className="px-3 py-3">Total</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-3">{o.id}</td>
                  <td className="px-3 py-3">{o.date}</td>
                  <td className="px-3 py-3">{o.customer}</td>
                  <td className="px-3 py-3">{o.items}</td>
                  <td className="px-3 py-3">{money(o.total)}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Products({ products, search, setSearch, category, setCategory, addToCart, openProduct }) {
  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight">Products</h1>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_220px]">
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
          <Search className="text-slate-400" size={19} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-12 w-full bg-transparent outline-none placeholder:text-slate-400"
          />
        </label>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-white px-4 shadow-sm outline-none"
        >
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Accessories</option>
          <option>Fashion</option>
        </select>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map(product => (
          <article key={product.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <button onClick={() => openProduct(product)} className="w-full text-left">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-3" />
              </div>

              <h2 className="mt-3 font-semibold">{product.name}</h2>
              <p className="mt-1 text-lg font-extrabold">{money(product.price)}</p>

              <div className="mt-2 flex items-center gap-1 text-sm">
                <Star size={17} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviews})</span>
              </div>
            </button>

            <button
              onClick={addToCart}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>

      {products.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No products match your search.
        </div>
      )}
    </section>
  )
}

function Profile() {
  const summaries = [
    { label: 'Total Orders', value: '128', icon: ShoppingCart, tone: 'bg-blue-50 text-blue-600' },
    { label: 'Total Spent', value: '฿48,500', icon: WalletCards, tone: 'bg-violet-50 text-violet-600' },
    { label: 'Wishlist Items', value: '6', icon: Heart, tone: 'bg-emerald-50 text-emerald-600' },
    { label: 'Loyalty Points', value: '320', icon: Award, tone: 'bg-amber-50 text-amber-600' }
  ]

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_1.08fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-blue-100 text-blue-600">
              <UserRound size={58} />
            </div>
            <h2 className="mt-4 text-xl font-bold">Alex Student</h2>
          </div>

          <div className="mx-auto mt-6 max-w-sm space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              alex@email.com
            </div>
            <div className="flex items-center gap-3">
              <BadgeCheck size={18} />
              Student ID: 6501234567
            </div>
          </div>

          <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            <Pencil size={17} />
            Edit Profile
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold">Account Summary</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {summaries.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className={`rounded-xl p-4 ${tone}`}>
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-white/70">
                  <Icon size={20} />
                </div>
                <p className="text-sm">{label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductDetail({ product, qty, setQty, addToCart, cartCount }) {
  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">React Workshop</h1>
          <p className="mt-1 text-sm text-slate-500">
            ลองใช้งาน React กับ Tailwind CSS
          </p>
          <p className="text-sm text-slate-400">
            เพิ่มจำนวนสินค้าในตะกร้า และดูจำนวนสินค้าที่เลือกได้ที่ไอคอนตะกร้า
          </p>
        </div>

        <div className="relative rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <ShoppingCart className="text-blue-600" size={26} />
          <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
            {cartCount}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[260px_1fr]">
        <div className="overflow-hidden rounded-xl bg-slate-100">
          <img src={product.image} alt={product.name} className="h-full min-h-[250px] w-full object-contain p-5" />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="mt-1 text-2xl font-extrabold">{money(product.price)}</p>

          <div className="mt-2 flex items-center gap-1">
            <Star size={20} className="fill-amber-400 text-amber-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-slate-400">({product.reviews})</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Minus size={18} />
            </button>

            <div className="grid h-10 min-w-14 place-items-center rounded-lg border border-slate-200 bg-white font-semibold">
              {qty}
            </div>

            <button
              onClick={() => setQty(qty + 1)}
              className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            onClick={addToCart}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <ShoppingCart size={19} />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

import { NavLink, Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

export default function AdminLayout() {
  const navClass = ({ isActive }) =>
    `btn btn-ghost justify-start ${isActive ? 'btn-active' : ''}`

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="navbar border-b border-base-300 bg-base-100 px-4">
        <div className="flex-1">
          <NavLink to="/admin/dashboard" className="text-xl font-bold">
            MiniShop Admin
          </NavLink>
        </div>

        <div className="flex flex-none items-center gap-2">
          <ThemeToggle />
          <NavLink to="/" className="btn btn-outline btn-sm">
            View Store
          </NavLink>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 md:grid-cols-[220px_1fr] md:p-6">
        <aside className="rounded-box bg-base-100 p-3 shadow">
          <p className="mb-3 px-3 text-sm font-semibold opacity-60">ADMIN MENU</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/products" className={navClass}>
              Products
            </NavLink>
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

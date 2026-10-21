import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/profile', label: 'Profile' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <span aria-hidden="true">🛒</span>
          MiniShop
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-50 hover:text-blue-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar

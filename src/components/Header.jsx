function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a href="#products" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <span aria-hidden="true">🛒</span>
          MiniShop
        </a>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-8">
          <a className="transition hover:text-blue-600" href="#products">
            Products
          </a>
          <a className="transition hover:text-blue-600" href="#profile">
            Profile
          </a>
          <span className="rounded-full bg-blue-50 px-3 py-1.5 font-semibold text-blue-700">
            🛒 {cartCount}
          </span>
        </nav>
      </div>
    </header>
  )
}

export default Header

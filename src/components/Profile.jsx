function Profile() {
  return (
    <section id="profile" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl" aria-hidden="true">
          👤
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Profile</p>
          <h2 className="text-2xl font-bold text-slate-900">MiniShop Customer</h2>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-slate-600">
        Welcome to MiniShop. Browse products, search by product name, and add items to your cart.
      </p>
    </section>
  )
}

export default Profile

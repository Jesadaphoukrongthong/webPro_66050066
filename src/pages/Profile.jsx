function Profile() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl" aria-hidden="true">
          👤
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Profile</p>
          <h1 className="mt-1 text-4xl font-bold">MiniShop Customer</h1>
          <p className="mt-3 text-slate-600">Welcome to your MiniShop profile page.</p>
        </div>
      </div>
    </section>
  )
}

export default Profile

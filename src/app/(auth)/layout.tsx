export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-stone-900 relative overflow-hidden">
      <div
        className="absolute inset-0 flex px-6 max-w-7xl mx-auto pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex-1 border-r border-stone-200/40" />
        <div className="flex-1 border-r border-stone-200/40" />
        <div className="flex-1 border-r border-stone-200/40 hidden md:block" />
        <div className="flex-1 hidden md:block" />
      </div>

      <div className="grid min-h-screen lg:grid-cols-2 relative z-10">
        <section className="hidden lg:flex flex-col justify-between p-12 bg-stone-100 text-stone-500 relative">
          <div className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
            Archive & Collection
          </div>

          <div className="max-w-md my-auto">
            <h1 className="text-5xl font-light tracking-tight leading-tight">
              Curated designs for{" "}
              <span className="font-serif italic text-emerald-600">modern space.</span>
            </h1>

            <p className="mt-6 text-sm text-stone-400 font-light leading-relaxed">
              Sign in or create an account to access your personalized dashboard, review active orders, and explore our newest collection.
            </p>
          </div>

          <div className="text-xs font-mono text-stone-500">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
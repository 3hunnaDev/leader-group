function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          leader-group
        </h1>
        <p className="mt-3 text-slate-600">
          React + Vite + TypeScript + Tailwind готов к работе.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-white">
            React 19
          </span>
          <span className="rounded-full bg-sky-600 px-3 py-1 text-sm text-white">
            Vite 7
          </span>
          <span className="rounded-full bg-cyan-600 px-3 py-1 text-sm text-white">
            Tailwind
          </span>
        </div>
      </section>
    </main>
  )
}

export default App

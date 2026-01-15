const Home = () => {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-slate-400">
        {/* Aqui ira el contenido del panel. Por ahora solo el layout
        responsive. */}
      </p>
      <div className="h-48 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40" />
    </section>
  );
};

export default Home;

import React, { useMemo, useState } from "react";
import AddAndSubt from "./addAndSubt.jsx";
import AreaAndPerimeter from "./areaAndPerimeter.jsx";
import AljabarDasar from "./aljabarDasar.jsx";
import BilanganBulat from "./bilanganBulat.jsx";
import BilanganCacah10000 from "./bilanganCacah10000.jsx";
import PecahanDesimalPersen from "./pecahanDesimalPersen.jsx";
import PerkalianPembagian from "./perkalianPembagian.jsx";
import Probability from "./probability.jsx";

const PAGES = [
  { id: "add-subt", label: "Add & Subt", Component: AddAndSubt },
  { id: "aljabar-dasar", label: "Aljabar Dasar", Component: AljabarDasar },
  { id: "area-perimeter", label: "Area & Perimeter", Component: AreaAndPerimeter },
  { id: "bilangan-bulat", label: "Bilangan Bulat", Component: BilanganBulat },
  { id: "bilangan-cacah-10000", label: "Bilangan Cacah 10.000", Component: BilanganCacah10000 },
  { id: "pecahan-desimal-persen", label: "Pecahan • Desimal • Persen", Component: PecahanDesimalPersen },
  { id: "perkalian-pembagian", label: "Perkalian & Pembagian", Component: PerkalianPembagian },
  { id: "probability", label: "Probability", Component: Probability },
];

export default function App() {
  const [active, setActive] = useState(PAGES[0].id);

  const ActiveComponent = useMemo(() => {
    return PAGES.find((p) => p.id === active)?.Component || PAGES[0].Component;
  }, [active]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex flex-wrap items-center gap-2">
          <div className="text-xs uppercase tracking-widest text-slate-400 mr-2">
            Menu
          </div>
          {PAGES.map((page) => {
            const isActive = page.id === active;
            return (
              <button
                key={page.id}
                onClick={() => setActive(page.id)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/50"
                    : "bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500",
                ].join(" ")}
              >
                {page.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="pt-2">
        <ActiveComponent key={active} />
      </main>
    </div>
  );
}

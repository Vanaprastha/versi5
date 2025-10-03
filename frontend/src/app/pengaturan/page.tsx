"use client";
import { useEffect, useRef, useState } from "react";

function readStored<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    return JSON.parse(v);
  } catch {
    const v = localStorage.getItem(key);
    return (v as unknown as T) ?? fallback;
  }
}

export default function PengaturanPage() {
  const [pendingTheme, setPendingTheme] = useState<"light"|"dark">("dark");
  const [pendingBg, setPendingBg] = useState<string>("");
  const [appliedTheme, setAppliedTheme] = useState<"light"|"dark">("dark");
  const [appliedBg, setAppliedBg] = useState<string>("");

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = readStored<"light"|"dark">("sdgs_theme", "dark");
    const b = readStored<string>("sdgs_bg", "");
    setPendingTheme(t); setPendingBg(b || ""); setAppliedTheme(t); setAppliedBg(b || "");
  }, []);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPendingBg(reader.result as string);
    reader.readAsDataURL(file);
  }

  function applySettings() {
    const html = document.documentElement;
    html.classList.remove("theme-light", "theme-dark");
    html.classList.add(pendingTheme === "light" ? "theme-light" : "theme-dark");

    if (pendingBg) {
      html.style.setProperty("--bg-url", `url(${pendingBg})`);
      localStorage.setItem("sdgs_bg", JSON.stringify(pendingBg));
    } else {
      html.style.setProperty("--bg-url", `url(/assets/background.webp)`);
      localStorage.removeItem("sdgs_bg");
    }
    localStorage.setItem("sdgs_theme", JSON.stringify(pendingTheme));

    setAppliedTheme(pendingTheme);
    setAppliedBg(pendingBg);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Pengaturan</h1>
      <p className="text-sm opacity-80">Atur tema dan background sesuai preferensimu.</p>

      <div className="glass-1 p-3 rounded-lg text-xs opacity-80">
        Aktif sekarang: <b>{appliedTheme}</b> • Background: <b>{appliedBg ? "Kustom" : "Default"}</b>
      </div>

      <section className="glass-1 p-4 rounded-xl space-y-3">
        <h2 className="font-medium">Tema</h2>
        <label><input type="radio" checked={pendingTheme==="dark"} onChange={()=>setPendingTheme("dark")} /> Dark</label>
        <label><input type="radio" checked={pendingTheme==="light"} onChange={()=>setPendingTheme("light")} /> Light</label>
      </section>

      <section className="glass-1 p-4 rounded-xl space-y-3">
        <h2 className="font-medium">Background</h2>
        <button onClick={()=>setPendingBg("")}>Default</button>
        <button onClick={()=>setPendingBg("https://images.unsplash.com/photo-1503264116251-35a269479413?w=1600")}>Pemandangan</button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} />
      </section>

      <button onClick={applySettings} className="px-4 py-2 rounded-lg bg-emerald-500 text-black">Terapkan</button>
    </div>
  );
}


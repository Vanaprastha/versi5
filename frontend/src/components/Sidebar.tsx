"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiScatterChart } from "react-icons/bi";
import { RiRobot2Line } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { FiUploadCloud, FiSettings } from "react-icons/fi";
import Image from "next/image";

type Item = { href: string; label: string; icon: JSX.Element };

const umumMenu: Item[] = [
  { href: "/dashboard",  label: "Dashboard",   icon: <AiOutlineDashboard /> },
  { href: "/clustering", label: "Clustering",  icon: <BiScatterChart /> },
  { href: "/chatbot",    label: "Chatbot LLM", icon: <RiRobot2Line /> },
  { href: "/tentang",    label: "Tentang",     icon: <BsInfoCircle /> },
];

const pengelolaMenu: Item[] = [
  { href: "/upload",       label: "Upload CSV",   icon: <FiUploadCloud /> },
  { href: "/penggaturan",  label: "Penggaturan",  icon: <FiSettings /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") setRole(localStorage.getItem("role"));
  }, []);

  // Sembunyikan sidebar pada landing & login
  if (pathname === "/" || pathname?.startsWith("/login")) return null;

  const menu = role === "pengelola" ? pengelolaMenu : umumMenu;

  return (
    <aside className="glass-2 h-screen w-64 p-4 sticky top-0 hidden md:flex flex-col rounded-2xl">
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <Image src="/logo-pemda.png" alt="Logo Pemda" width={36} height={36} />
        <div>
          <div className="text-sm font-semibold">Smart Dashboard SDGs</div>
          <div className="text-[11px] text-neutral-400">Kec. Wates</div>
        </div>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-2">
        {menu.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              <span className="text-lg opacity-80">{it.icon}</span>
              <span className="text-sm">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <p className="text-[11px] text-neutral-400">
        © {new Date().getFullYear()} Pemerintah Daerah Kecamatan Wates
      </p>
    </aside>
  );
}

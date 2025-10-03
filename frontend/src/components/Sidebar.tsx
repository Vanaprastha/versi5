"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  MessageSquare,
  Settings,
  Info
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Clustering Wilayah",
    icon: Map,
    href: "/clustering",
    color: "text-emerald-500",
  },
  {
    label: "TanyaIn",
    icon: MessageSquare,
    href: "/tanyain",
    color: "text-pink-500",
  },
  {
    label: "Pengaturan",
    icon: Settings,
    href: "/pengaturan",
    color: "text-orange-500",
  },
  {
    label: "Tentang",
    icon: Info,
    href: "/tentang",
    color: "text-indigo-500",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "bg-white/10 text-white"
                  : "text-zinc-400"
              )}
            >
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


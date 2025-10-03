"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  MessageSquare,
  Settings,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Clustering Wilayah",
    icon: Map,
    href: "/clustering",
  },
  {
    label: "TanyaIn",
    icon: MessageSquare,
    href: "/tanyain",
  },
  {
    label: "Pengaturan",
    icon: Settings,
    href: "/pengaturan",
  },
  {
    label: "Tentang",
    icon: Info,
    href: "/tentang",
  },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full bg-[#111827] border-t border-gray-700 flex justify-between items-center px-4 py-2">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex flex-col items-center justify-center text-xs",
            pathname === route.href ? "text-white" : "text-zinc-400"
          )}
        >
          <route.icon className="h-5 w-5 mb-1" />
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;


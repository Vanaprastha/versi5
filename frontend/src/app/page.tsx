"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-2 p-8 rounded-2xl w-[90%] max-w-md text-center shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Selamat Datang di Web SDGs</h1>
        <p className="text-sm text-neutral-400 mb-6">
          Pilih peran untuk melanjutkan ke aplikasi.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              if (typeof window !== "undefined") localStorage.setItem("role", "umum");
              router.push("/dashboard");
            }}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Masyarakat Umum
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold"
          >
            Pengelola
          </button>
        </div>
      </div>
    </div>
  );
}

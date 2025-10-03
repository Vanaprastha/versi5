"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-indigo-900 text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-[90%] max-w-md text-center shadow-xl border border-white/10">
        <h1 className="text-2xl font-bold mb-6">Selamat Datang di Web SDGs</h1>
        <p className="text-sm text-white/80 mb-6">
          Pilih peran untuk melanjutkan ke aplikasi.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              if (typeof window !== "undefined") localStorage.setItem("role", "umum");
              router.push("/dashboard");
            }}
            className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 font-semibold"
          >
            Masyarakat Umum
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 font-semibold"
          >
            Pengelola
          </button>
        </div>
      </div>
    </div>
  );
}

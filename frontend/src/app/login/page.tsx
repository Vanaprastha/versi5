"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      if (typeof window !== "undefined") localStorage.setItem("role", "pengelola");
      router.push("/upload");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-2 p-8 rounded-2xl w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-center">Login Pengelola</h2>
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded bg-white/10 border border-white/10 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-white/10 border border-white/10 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-white font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

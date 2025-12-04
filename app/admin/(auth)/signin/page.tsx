/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost/air-express-backend/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        router.push("/admin/dashboard");
      } else {
        setError(result.message || "Identifiants invalides");
      }
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-slate-900/50 blur-3xl pointer-events-none" />

      {/* Admin Login Card */}
      <div className="relative z-10 bg-slate-900/70 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-md p-8 mx-4">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Espace <span className="text-orange-500">Administrateur</span>
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Connectez-vous pour accéder au panneau d’administration AÏR EXPRESS
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">
              Nom d’utilisateur *
            </label>
            <input
              type="text"
              placeholder="Admin"
              className="w-full bg-transparent border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">
              Mot de passe *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 gap-2 cursor-pointer">
              <input type="checkbox" className="accent-orange-500" />
              Se souvenir de moi
            </label>
            <Link
              href="#"
              className="text-orange-500 hover:underline transition-colors duration-200"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition duration-300"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Connexion Admin"}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>

        <p className="text-gray-500 text-center mt-8 text-xs">
          Accès réservé uniquement au personnel autorisé d’AÏR EXPRESS.
        </p>
      </div>
    </section>
  );
};

export default AdminLogin;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logosvg from "../../GeneralComponents/Header/Icons/Logo.png";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Giriş başarısız");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess("Giriş başarılı!");
      router.push("/panel/dashboard");
    } catch (err) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] grid place-items-center bg-white text-white px-6 rounded-lg">
      {/* arka plan vinyet */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl bg-white/10" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl bg-white/10" />
      </div>

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-lagoBlack2 backdrop-blur-xl p-6 md:p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Image
            src={logosvg}
            alt="Logo"
            width={42}
            height={32}
            className="w-[42px] h-auto"
            priority
          />
          <h1 className="text-xl font-semibold tracking-tight">Yönetim Paneli</h1>
        </div>

        {/* Alerts */}
        {error && (
          <div
            className="mb-4 rounded-lg border border-red-500/30 bg-red-500/15 px-3 py-2 text-red-200"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-emerald-200"
            role="status"
            aria-live="polite"
          >
            {success}
          </div>
        )}

        {/* Email */}
        <label className="block text-sm mb-1 text-white/80">Email</label>
        <input
          type="email"
          placeholder="ornek@site.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 px-3 py-2 transition"
          autoComplete="email"
          required
        />

        {/* Password */}
        <label className="block text-sm mb-1 text-white/80">Şifre</label>
        <div className="relative mb-6">
          <input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 px-3 py-2 pr-12 transition"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            className="absolute inset-y-0 right-0 px-3 text-white/70 hover:text-white transition"
            aria-label={showPass ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={[
            "w-full rounded-lg px-4 py-2 font-medium",
            "bg-white text-lagoBlack2 hover:bg-lagoGray hover:text-white active:scale-[0.99]",
            "transition-all duration-200 transform-gpu disabled:opacity-60 disabled:cursor-not-allowed",
            "shadow-[0_8px_20px_rgba(255,255,255,0.1)]",
          ].join(" ")}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Giriş yapılıyor…
            </span>
          ) : (
            "Giriş Yap"
          )}
        </button>

        {/* Alt linkler (opsiyonel) */}
        <div className="mt-4 flex items-center justify-between text-sm text-white/70">
          {/* <a href="/panel/sifremi-unuttum" className="hover:text-white underline underline-offset-4">
            Şifremi unuttum
          </a> */}
          <a href="/" className="hover:text-white">Ana sayfa</a>
        </div>
      </form>
    </div>
  );
}

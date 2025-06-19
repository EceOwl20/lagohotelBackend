"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PanelPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      router.push("/login"); // Giriş yapılmamışsa login'e gönder
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // (İsteğe bağlı) rol kontrolü
    if (parsedUser.role === "personel") {
      router.push("/kullanici"); // personel ayrı paneldeyse oraya yönlendir
    }
  }, [router]);

  if (!user) {
    return <p className="text-center mt-40">Yükleniyor...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p>Hoş geldin <strong>{user.name}</strong> ({user.role})</p>

      {/* Buraya admin bileşenleri eklenecek */}
    </div>
  );
}
"use client";

import Link from "next/link";

export default function PagesPanel() {
  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">📄 Sayfalar Yönetimi</h1>
      <p>Buradan sitenizin sayfa içeriklerini düzenleyebilirsiniz.</p>

      <ul className="flex flex-col list-disc pl-6 space-y-4">
        <li>
          <Link href="/panel/sayfalar/anasayfa" className="text-blue-600 hover:underline">
            🏠 Anasayfa
          </Link>
        </li>
          <li>
              <Link href="/panel/sayfalar/header" className="text-blue-600 hover:underline">
            ⛩️ Header 
          </Link>
          </li>
        {/* İleride buraya diğer sayfa linkleri eklersin (örneğin: hakkında, odalar, restoranlar vs.) */}
      </ul>
    </div>
  );
}
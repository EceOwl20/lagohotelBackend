import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
      <h1 className="text-6xl font-extrabold text-lagoBlack2 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Sayfa Bulunamadı</h2>
      <p className="text-gray-600 mb-6">
        Üzgünüz, aradığınız sayfa mevcut değil.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-300 text-white font-medium rounded hover:opacity-90 transition"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}

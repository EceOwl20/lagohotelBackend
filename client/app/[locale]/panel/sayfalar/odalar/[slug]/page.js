'use client';
import React, { useEffect, useState } from 'react';
import RoomsBannerEdit from '@/components/edit/RoomsBannerEdit';
import RoomsInfoEdit   from '@/components/edit/RoomsInfoSectionEdit';
import SectionsEdit    from '@/components/edit/RoomSectionEdit';
import ParallaxEdit    from '@/components/edit/RoomsParallaxSectionEdit';
import ToursEdit       from '@/components/edit/RoomTourEdit';

export default function RoomEdit({ params }) {
  const { slug } = params;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/pages/rooms/subrooms/${slug}`)
      .then(r => r.json())
      .then(setData);
  }, [slug]);

  const onSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/pages/rooms/subrooms/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  if (!data) return <p>Yükleniyor…</p>;

  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{slug} Düzenle</h1>
      <RoomsBannerEdit data={data} setData={setData} />
      <RoomsInfoEdit   data={data} setData={setData} />
      <SectionsEdit    data={data} setData={setData} />
      <ParallaxEdit    data={data} setData={setData} />
      <ToursEdit       data={data} setData={setData} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Kaydet</button>
    </form>
  );
}
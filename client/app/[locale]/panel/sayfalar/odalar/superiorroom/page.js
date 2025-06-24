// app/[locale]/panel/sayfalar/superiorroom/page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import SubRoomBannerEdit from './components/SubRoomBannerEdit';
import SubroomCarouselEdit from './components/SubroomCarouselEdit';
import RoomFeaturesEdit from './components/RoomFeaturesEdit';
import RoomsParallaxSectionEdit from '../components/RoomsParallaxSectionEdit';
import RoomTourEdit from './components/RoomTourEdit';

export default function SuperiorRoomEdit() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ success: '', error: '' });

  useEffect(() => {
    fetch('http://localhost:5001/api/pages/rooms/superiorroom')
      .then(r => r.json())
      .then(setData)
      .catch(() => setStatus(s => ({ ...s, error: 'Veri alınamadı' })));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/pages/rooms/superiorroom', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
      setStatus({ success: 'Kaydedildi!', error: '' });
    } catch {
      setStatus({ success: '', error: 'Kaydetme hatası' });
    }
  };

  if (!data) return <p>Yükleniyor...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Superior Room Düzenle</h1>
      <SubRoomBannerEdit data={data} setData={setData} />
      <SubroomCarouselEdit data={data} setData={setData} />
      <RoomFeaturesEdit data={data} setData={setData} />
      <RoomsParallaxSectionEdit data={data} setData={setData} />
      <RoomTourEdit data={data} setData={setData} />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Kaydet</button>
      {status.success && <p className="text-green-600">{status.success}</p>}
      {status.error && <p className="text-red-600">{status.error}</p>}
    </form>
  );
}
import ImageUploadInput from "@/app/[locale]/panel/components/ImageUploadInput";

export default function SubroomCarouselEdit({ data, setData }) {
  const items = data.carousel || [];

  const handleChange = (idx, url) => {
    setData(prev => {
      const newArr = [...(prev.carousel || [])];
      newArr[idx] = url;
      return { ...prev, carousel: newArr };
    });
  };

  const handleAdd = () => {
    setData(prev => ({
      ...prev,
      carousel: [...(prev.carousel || []), ""]
    }));
  };

  const handleDelete = idx => {
    setData(prev => ({
      ...prev,
      carousel: (prev.carousel || []).filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Carousel Resimleri</h3>
      {items.map((url, idx) => (
        <div key={idx} className="flex gap-3 items-center mb-3">
          <ImageUploadInput value={url} onChange={val => handleChange(idx, val)} />
          <button onClick={() => handleDelete(idx)} className="text-red-600">Sil</button>
        </div>
      ))}
      <button onClick={handleAdd} className="mt-2 px-4 py-1 border rounded">+ Yeni Resim</button>
    </div>
  );
}

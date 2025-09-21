import React, { useRef } from 'react';
import { useAppStore } from '../../store';
import Skeleton from '../../components/Skeleton';

const MediaLibrary = () => {
  const { media, addMedia, deleteMedia } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          addMedia({
            type: file.type.startsWith('image/') ? 'image' : 'video',
            url,
            name: file.name,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa media này?')) {
      deleteMedia(id);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Thư viện hình ảnh/video</h3>
        <label className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
          Tải lên
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      {useAppStore((s) => s.isAppLoading) ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-gray-50 rounded shadow p-2 flex flex-col items-center">
              <Skeleton className="w-full h-32 mb-2" />
              <Skeleton className="w-3/4 h-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((m) => (
            <div key={m.id} className="bg-gray-50 rounded shadow p-2 flex flex-col items-center">
              {m.type === 'image' ? (
                <img src={m.url} alt={m.name} className="w-full h-32 object-cover rounded mb-2" />
              ) : (
                <video controls className="w-full h-32 rounded mb-2">
                  <source src={m.url} type="video/mp4" />
                  Trình duyệt không hỗ trợ video.
                </video>
              )}
              <button onClick={() => handleDelete(m.id)} className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Xoá</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;

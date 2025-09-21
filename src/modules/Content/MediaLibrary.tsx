import React from 'react';

const MediaLibrary = () => {
  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Thư viện hình ảnh/video</h3>
        <label className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
          Tải lên
          <input type="file" multiple className="hidden" />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Demo media */}
        {[
          {type: 'image', url: 'https://picsum.photos/seed/1/200'},
          {type: 'image', url: 'https://picsum.photos/seed/2/200'},
          {type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4'},
          {type: 'image', url: 'https://picsum.photos/seed/3/200'},
        ].map((media, idx) => (
          <div key={idx} className="bg-gray-50 rounded shadow p-2 flex flex-col items-center">
            {media.type === 'image' ? (
              <img src={media.url} alt="media" className="w-full h-32 object-cover rounded mb-2" />
            ) : (
              <video controls className="w-full h-32 rounded mb-2">
                <source src={media.url} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>
            )}
            <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Xoá</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;

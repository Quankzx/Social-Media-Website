import React from 'react';

const ContentCalendar = () => {
  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Lịch đăng bài</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tạo bài mới</button>
      </div>
      <div className="flex gap-4 mb-4">
        <select className="border rounded px-2 py-1">
          <option>Tất cả mạng xã hội</option>
          <option>Facebook</option>
          <option>TikTok</option>
          <option>YouTube</option>
          <option>Instagram</option>
        </select>
        <select className="border rounded px-2 py-1">
          <option>Tất cả trạng thái</option>
          <option>Đã đăng</option>
          <option>Lên lịch</option>
          <option>Nháp</option>
        </select>
        <input type="date" className="border rounded px-2 py-1" />
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Ngày đăng</th>
            <th className="py-2">Tiêu đề</th>
            <th className="py-2">Mạng xã hội</th>
            <th className="py-2">Trạng thái</th>
            <th className="py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {/* Demo dữ liệu lịch đăng */}
          {[
            {date: '2025-09-22', title: 'Bài Facebook 1', network: 'Facebook', status: 'Đã đăng'},
            {date: '2025-09-23', title: 'Video TikTok', network: 'TikTok', status: 'Lên lịch'},
            {date: '2025-09-24', title: 'Shorts YouTube', network: 'YouTube', status: 'Nháp'},
            {date: '2025-09-25', title: 'Ảnh Instagram', network: 'Instagram', status: 'Đã đăng'},
          ].map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-2">{item.date}</td>
              <td className="py-2 font-medium">{item.title}</td>
              <td className="py-2">{item.network}</td>
              <td className="py-2">
                <span className={item.status === 'Đã đăng' ? 'text-green-600' : item.status === 'Lên lịch' ? 'text-blue-600' : 'text-yellow-600'}>{item.status}</span>
              </td>
              <td className="py-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 mr-2">Sửa</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentCalendar;

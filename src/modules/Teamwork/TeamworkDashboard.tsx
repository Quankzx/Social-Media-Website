import React from 'react';
import Skeleton from '../../components/Skeleton';
import { useAppStore } from '../../store';

const TeamworkDashboard = () => {
  const isLoading = useAppStore((s) => s.isAppLoading);

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton variant="text" className="h-8 w-64 mb-4" />
        <div className="bg-white rounded shadow p-4 mb-4">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
        <div className="bg-white rounded shadow p-4 mb-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 py-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded shadow p-4">
          <Skeleton className="h-4 w-1/3 mb-3" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý phân quyền & teamwork</h2>
      <div className="bg-white rounded shadow p-4 mb-4 flex justify-between items-center">
        <p>Chức năng: Thêm thành viên, phân quyền, giao việc, bình luận nội bộ.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Thêm thành viên</button>
      </div>
      <table className="w-full text-left mb-4">
        <thead>
          <tr className="border-b">
            <th className="py-2">Avatar</th>
            <th className="py-2">Tên thành viên</th>
            <th className="py-2">Vai trò</th>
            <th className="py-2">Trạng thái</th>
            <th className="py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {/* Demo dữ liệu thành viên */}
          {[
            {name: 'Nguyen Van E', role: 'Admin', status: 'Hoạt động', avatar: 'https://i.pravatar.cc/40?img=5'},
            {name: 'Nguyen Van F', role: 'Editor', status: 'Tạm khoá', avatar: 'https://i.pravatar.cc/40?img=6'},
            {name: 'Nguyen Van G', role: 'Reviewer', status: 'Hoạt động', avatar: 'https://i.pravatar.cc/40?img=7'},
          ].map((mem, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-2"><img src={mem.avatar} alt="avatar" className="rounded-full w-10 h-10" /></td>
              <td className="py-2 font-medium">{mem.name}</td>
              <td className="py-2">{mem.role}</td>
              <td className="py-2">
                <span className={mem.status === 'Hoạt động' ? 'text-green-600' : 'text-gray-600'}>{mem.status}</span>
              </td>
              <td className="py-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 mr-2">Phân quyền</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Bình luận nội bộ</h3>
        <div className="space-y-2 mb-2">
          {/* Demo bình luận */}
          <div className="flex gap-2 items-center">
            <img src="https://i.pravatar.cc/40?img=5" alt="avatar" className="rounded-full w-8 h-8" />
            <div className="bg-gray-100 rounded px-3 py-2">Bài đăng Facebook cần duyệt.</div>
          </div>
          <div className="flex gap-2 items-center">
            <img src="https://i.pravatar.cc/40?img=6" alt="avatar" className="rounded-full w-8 h-8" />
            <div className="bg-gray-100 rounded px-3 py-2">Đã chỉnh sửa nội dung TikTok.</div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input type="text" className="border rounded px-2 py-1 flex-1" placeholder="Nhập bình luận..." />
          <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default TeamworkDashboard;

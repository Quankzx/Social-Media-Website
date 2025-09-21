import React from 'react';

const AccountDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý tài khoản mạng xã hội</h2>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Avatar</th>
              <th className="py-2">Tên tài khoản</th>
              <th className="py-2">Mạng xã hội</th>
              <th className="py-2">Trạng thái</th>
              <th className="py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* Demo dữ liệu tài khoản */}
            {[
              {name: 'Nguyen Van A', network: 'Facebook', status: 'Đã liên kết', avatar: 'https://i.pravatar.cc/40?img=1'},
              {name: 'Nguyen Van B', network: 'TikTok', status: 'Chưa liên kết', avatar: 'https://i.pravatar.cc/40?img=2'},
              {name: 'Nguyen Van C', network: 'YouTube', status: 'Đã liên kết', avatar: 'https://i.pravatar.cc/40?img=3'},
              {name: 'Nguyen Van D', network: 'Instagram', status: 'Chưa liên kết', avatar: 'https://i.pravatar.cc/40?img=4'},
            ].map((acc, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2"><img src={acc.avatar} alt="avatar" className="rounded-full w-10 h-10" /></td>
                <td className="py-2 font-medium">{acc.name}</td>
                <td className="py-2">{acc.network}</td>
                <td className="py-2">
                  <span className={acc.status === 'Đã liên kết' ? 'text-green-600' : 'text-red-600'}>{acc.status}</span>
                </td>
                <td className="py-2">
                  {acc.status === 'Đã liên kết' ? (
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Huỷ liên kết</button>
                  ) : (
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Liên kết</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountDashboard;

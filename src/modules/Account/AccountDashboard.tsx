import React from 'react';

const AccountDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-heading-2">Quản lý tài khoản mạng xã hội</h2>
      <div className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-heading-3">Avatar</th>
              <th className="py-3 px-4 text-heading-3">Tên tài khoản</th>
              <th className="py-3 px-4 text-heading-3">Mạng xã hội</th>
              <th className="py-3 px-4 text-heading-3">Trạng thái</th>
              <th className="py-3 px-4 text-heading-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {[
              {name: 'Nguyen Van A', network: 'Facebook', status: 'Đã liên kết', avatar: 'https://i.pravatar.cc/40?img=1'},
              {name: 'Nguyen Van B', network: 'TikTok', status: 'Chưa liên kết', avatar: 'https://i.pravatar.cc/40?img=2'},
              {name: 'Nguyen Van C', network: 'YouTube', status: 'Đã liên kết', avatar: 'https://i.pravatar.cc/40?img=3'},
              {name: 'Nguyen Van D', network: 'Instagram', status: 'Chưa liên kết', avatar: 'https://i.pravatar.cc/40?img=4'},
            ].map((acc, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <img src={acc.avatar} alt="avatar" className="rounded-full w-10 h-10 border-2 border-gray-200" />
                </td>
                <td className="py-4 px-4 text-body font-medium">{acc.name}</td>
                <td className="py-4 px-4 text-body">{acc.network}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    acc.status === 'Đã liên kết' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {acc.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {acc.status === 'Đã liên kết' ? (
                    <button className="btn-secondary text-sm">Huỷ liên kết</button>
                  ) : (
                    <button className="btn-primary text-sm">Liên kết</button>
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

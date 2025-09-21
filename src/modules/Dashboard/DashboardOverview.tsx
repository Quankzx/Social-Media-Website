import React from 'react';

const stats = [
  { label: 'Followers', value: '12,500', icon: 'group', color: 'bg-blue-100 text-blue-700' },
  { label: 'Engagement', value: '8.2%', icon: 'trending_up', color: 'bg-green-100 text-green-700' },
  { label: 'Posts Today', value: '15', icon: 'post_add', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Pending Tasks', value: '3', icon: 'assignment_late', color: 'bg-red-100 text-red-700' },
];

const activities = [
  { time: '09:00', desc: 'Đăng bài Facebook: "Sản phẩm mới"' },
  { time: '10:30', desc: 'Lên lịch TikTok: "Video hướng dẫn"' },
  { time: '12:00', desc: 'Bình luận Instagram: "Khách hàng hỏi giá"' },
  { time: '14:00', desc: 'Phân quyền thành viên mới' },
];

const DashboardOverview = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Tổng quan Dashboard</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`rounded shadow flex flex-col items-center p-4 ${stat.color}`}>
          <span className="material-icons text-3xl mb-2">{stat.icon}</span>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-2">Hoạt động gần đây</h3>
      <ul className="space-y-2">
        {activities.map((act, idx) => (
          <li key={idx} className="flex gap-2 items-center">
            <span className="text-xs text-gray-500 w-16">{act.time}</span>
            <span className="text-gray-700">{act.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default DashboardOverview;

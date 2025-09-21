import React, { useState, useEffect } from 'react';
import Skeleton from '../../components/Skeleton';

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

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="card text-center">
              <Skeleton variant="circular" className="w-16 h-16 mx-auto mb-4" />
              <Skeleton variant="text" className="h-8 w-16 mx-auto mb-2" />
              <Skeleton variant="text" className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>
        <div className="card">
          <Skeleton variant="text" className="h-6 w-48 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3">
                <Skeleton variant="text" className="w-16 h-4" />
                <Skeleton variant="text" className="flex-1 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-heading-2 mb-6">Tổng quan Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="card text-center">
            <span className="material-icons text-4xl mb-4 text-red-600">{stat.icon}</span>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-caption">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="text-heading-3 mb-4">Hoạt động gần đây</h3>
        <ul className="space-y-3">
          {activities.map((act, idx) => (
            <li key={idx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-caption text-gray-500 w-16 flex-shrink-0">{act.time}</span>
              <span className="text-body">{act.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;

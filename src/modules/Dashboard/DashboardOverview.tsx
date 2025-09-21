import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, MessageCircle, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Skeleton from '../../components/Skeleton';

const stats = [
  { 
    label: 'Tổng Followers', 
    value: '12,500', 
    change: '+12.5%',
    trend: 'up',
    icon: <Users className="w-6 h-6" />, 
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    bgColor: 'bg-blue-500'
  },
  { 
    label: 'Tỷ lệ tương tác', 
    value: '8.2%', 
    change: '+2.1%',
    trend: 'up',
    icon: <TrendingUp className="w-6 h-6" />, 
    color: 'bg-green-50 text-green-600 border-green-200',
    bgColor: 'bg-green-500'
  },
  { 
    label: 'Bài đăng hôm nay', 
    value: '15', 
    change: '+5',
    trend: 'up',
    icon: <Calendar className="w-6 h-6" />, 
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    bgColor: 'bg-purple-500'
  },
  { 
    label: 'Bình luận chờ duyệt', 
    value: '3', 
    change: '-2',
    trend: 'down',
    icon: <MessageCircle className="w-6 h-6" />, 
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    bgColor: 'bg-orange-500'
  },
];

const activities = [
  { 
    time: '09:00', 
    desc: 'Đăng bài Facebook: "Sản phẩm mới"',
    type: 'post',
    platform: 'Facebook',
    status: 'success'
  },
  { 
    time: '10:30', 
    desc: 'Lên lịch TikTok: "Video hướng dẫn"',
    type: 'schedule',
    platform: 'TikTok',
    status: 'pending'
  },
  { 
    time: '12:00', 
    desc: 'Bình luận Instagram: "Khách hàng hỏi giá"',
    type: 'comment',
    platform: 'Instagram',
    status: 'success'
  },
  { 
    time: '14:00', 
    desc: 'Phân quyền thành viên mới: Nguyễn Văn B',
    type: 'user',
    platform: 'System',
    status: 'success'
  },
  { 
    time: '15:30', 
    desc: 'Phản hồi tin nhắn YouTube: "Hỏi về dịch vụ"',
    type: 'message',
    platform: 'YouTube',
    status: 'success'
  },
];

const recentPosts = [
  {
    id: 1,
    title: 'Khuyến mãi cuối năm - Giảm giá 50%',
    platform: 'Facebook',
    engagement: '1.2k',
    time: '2 giờ trước',
    status: 'published'
  },
  {
    id: 2,
    title: 'Video hướng dẫn sử dụng sản phẩm',
    platform: 'TikTok',
    engagement: '856',
    time: '4 giờ trước',
    status: 'published'
  },
  {
    id: 3,
    title: 'Behind the scenes - Quy trình sản xuất',
    platform: 'Instagram',
    engagement: '642',
    time: '6 giờ trước',
    status: 'scheduled'
  }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tổng quan Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Theo dõi hiệu suất mạng xã hội của bạn</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary">
            Tạo bài đăng mới
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`card hover-lift border ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${stat.bgColor} text-white`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hoạt động gần đây</h3>
            <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((act, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
                    act.status === 'success' ? 'bg-green-100 text-green-600' : 
                    act.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {act.platform.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{act.desc}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{act.time}</span>
                    <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{act.platform}</span>
                  </div>
                </div>
                <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                  act.status === 'success' ? 'bg-green-400' : 
                  act.status === 'pending' ? 'bg-yellow-400' : 
                  'bg-gray-400'
                }`} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Posts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Bài đăng gần đây</h3>
            <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{post.platform}</span>
                  <span>{post.engagement} tương tác</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{post.time}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {post.status === 'published' ? 'Đã đăng' : 'Đã lên lịch'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

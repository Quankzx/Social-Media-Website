import React from 'react';
import ContentCalendar from './ContentCalendar';
import MediaLibrary from './MediaLibrary';

const ContentDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý nội dung</h2>
      <div className="bg-white rounded shadow p-4">
        <p>Chức năng: Tạo, chỉnh sửa, lên lịch đăng bài, quản lý thư viện hình ảnh/video.</p>
      </div>
      {/* Lịch đăng bài */}
      <ContentCalendar />
      {/* Thư viện media */}
      <MediaLibrary />
    </div>
  );
};

export default ContentDashboard;

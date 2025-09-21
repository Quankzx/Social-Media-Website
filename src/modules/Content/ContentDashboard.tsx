import React, { useState } from 'react';
import ContentCalendar from './ContentCalendar';
import MediaLibrary from './MediaLibrary';
import ContentTemplates from './ContentTemplates';
import PostEditor from './PostEditor';
import PostsList from '../../components/PostsList';
import Skeleton from '../../components/Skeleton';
import { useAppStore } from '../../store';

const ContentDashboard = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const isLoading = useAppStore((s) => s.isAppLoading);

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setIsEditorOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <div className="bg-white rounded shadow p-4">
          <Skeleton variant="text" className="h-4 w-3/4 mb-2" />
          <Skeleton variant="text" className="h-3 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Skeleton variant="rectangular" className="w-full h-40" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </div>
          <div>
            <Skeleton variant="rectangular" className="w-full h-64" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý nội dung</h2>
      <div className="bg-white rounded shadow p-4">
        <p>Chức năng: Tạo, chỉnh sửa, lên lịch đăng bài, quản lý thư viện hình ảnh/video.</p>
      </div>
      {/* Templates */}
      <ContentTemplates onSelectTemplate={handleSelectTemplate} />
      {/* Lịch đăng bài */}
      <ContentCalendar />
      {/* Thư viện media */}
      <MediaLibrary />
      {/* Posts list (demo) */}
      <div className="mt-6 bg-white rounded shadow">
        <PostsList />
      </div>
      <PostEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        post={selectedTemplate ? {
          id: '',
          title: selectedTemplate.title,
          content: selectedTemplate.content,
          date: '',
          network: selectedTemplate.network,
          status: 'Nháp',
          tags: selectedTemplate.tags,
          music: selectedTemplate.music,
          description: selectedTemplate.description,
          hashtags: selectedTemplate.hashtags,
        } : null}
      />
    </div>
  );
};

export default ContentDashboard;

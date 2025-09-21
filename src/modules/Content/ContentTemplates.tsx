import React from 'react';

interface Template {
  id: string;
  name: string;
  network: 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram';
  title: string;
  content: string;
  tags?: string[];
  music?: string;
  description?: string;
  hashtags?: string[];
}

interface ContentTemplatesProps {
  onSelectTemplate: (template: Omit<Template, 'id'>) => void;
}

const ContentTemplates: React.FC<ContentTemplatesProps> = ({ onSelectTemplate }) => {
  const templates: Template[] = [
    {
      id: '1',
      name: 'Facebook - Bài đăng sản phẩm',
      network: 'Facebook',
      title: 'Sản phẩm mới',
      content: 'Khám phá sản phẩm tuyệt vời của chúng tôi! #sảnphẩm #mới',
      tags: ['sản phẩm', 'mới'],
    },
    {
      id: '2',
      name: 'Instagram - Ảnh đẹp',
      network: 'Instagram',
      title: 'Ảnh đẹp',
      content: 'Một ngày tuyệt vời với bức ảnh này 🌟',
      hashtags: ['instagram', 'photo', 'beautiful'],
    },
    {
      id: '3',
      name: 'TikTok - Video vui',
      network: 'TikTok',
      title: 'Video vui',
      content: 'Hãy cùng cười với video này! 😂',
      music: 'Nhạc vui',
      hashtags: ['tiktok', 'fun', 'viral'],
    },
    {
      id: '4',
      name: 'YouTube - Tutorial',
      network: 'YouTube',
      title: 'Hướng dẫn làm gì đó',
      content: 'Trong video này, tôi sẽ hướng dẫn bạn...',
      description: 'Chi tiết hướng dẫn từng bước để bạn có thể làm theo.',
      tags: ['tutorial', 'hướng dẫn', 'howto'],
    },
  ];

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Templates sẵn có</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="border rounded p-3 hover:bg-gray-50">
            <h4 className="font-medium mb-1">{template.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{template.content}</p>
            <button
              onClick={() => onSelectTemplate({
                name: template.name,
                network: template.network,
                title: template.title,
                content: template.content,
                tags: template.tags,
                music: template.music,
                description: template.description,
                hashtags: template.hashtags,
              })}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Sử dụng template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTemplates;
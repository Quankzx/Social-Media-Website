import React from 'react';

interface ContentPreviewProps {
  title: string;
  content: string;
  network: 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram';
  mediaUrls?: string[];
  tags?: string[];
  music?: string;
  description?: string;
  hashtags?: string[];
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
  title,
  content,
  network,
  mediaUrls = [],
  tags = [],
  music,
  description,
  hashtags = [],
}) => {
  const renderFacebookPreview = () => (
    <div className="bg-white border rounded-lg p-4 w-full overflow-hidden">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <div className="font-semibold">Your Page</div>
          <div className="text-sm text-gray-500">Just now</div>
        </div>
      </div>
      <div className="mb-2">{content}</div>
      {mediaUrls.length > 0 && (
        <div className="mb-2">
          {mediaUrls[0].includes('image') ? (
            <img src={mediaUrls[0]} alt="preview" className="w-full rounded max-h-[360px] object-contain" />
          ) : (
            <video controls className="w-full rounded max-h-[360px] object-contain">
              <source src={mediaUrls[0]} type="video/mp4" />
            </video>
          )}
        </div>
      )}
      {tags.length > 0 && (
        <div className="text-sm text-blue-600">Tags: {tags.join(', ')}</div>
      )}
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="bg-white border rounded-lg p-4 w-full overflow-hidden">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
        <div className="font-semibold">your_username</div>
      </div>
      {mediaUrls.length > 0 && (
        <div className="mb-2">
          {mediaUrls[0].includes('image') ? (
            <img src={mediaUrls[0]} alt="preview" className="w-full rounded max-h-[480px] object-contain" />
          ) : (
            <video controls className="w-full rounded max-h-[480px] object-contain">
              <source src={mediaUrls[0]} type="video/mp4" />
            </video>
          )}
        </div>
      )}
      <div className="mb-2">{content}</div>
      {hashtags.length > 0 && (
        <div className="text-blue-600">{hashtags.map(h => `#${h}`).join(' ')}</div>
      )}
    </div>
  );

  const renderTikTokPreview = () => (
    <div className="bg-black text-white rounded-lg p-4 w-full overflow-hidden">
      <div className="mb-2">{content}</div>
      {mediaUrls.length > 0 && mediaUrls[0].includes('video') && (
        <div className="mb-2">
          <video controls className="w-full rounded max-h-[560px] object-contain">
            <source src={mediaUrls[0]} type="video/mp4" />
          </video>
        </div>
      )}
      {music && (
        <div className="text-sm mb-2">🎵 {music}</div>
      )}
      {hashtags.length > 0 && (
        <div className="text-blue-400">{hashtags.map(h => `#${h}`).join(' ')}</div>
      )}
    </div>
  );

  const renderYouTubePreview = () => (
    <div className="bg-white border rounded-lg p-4 w-full overflow-hidden">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-red-600 rounded-full mr-3 flex items-center justify-center text-white font-bold">YT</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-500">Your Channel • Just now</div>
        </div>
      </div>
      {mediaUrls.length > 0 && mediaUrls[0].includes('video') && (
        <div className="mb-2">
          <video controls className="w-full rounded max-h-[480px] object-contain">
            <source src={mediaUrls[0]} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="mb-2">{description}</div>
      {tags.length > 0 && (
        <div className="text-sm text-blue-600">Tags: {tags.join(', ')}</div>
      )}
    </div>
  );

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Preview trên {network}</h4>
      {network === 'Facebook' && renderFacebookPreview()}
      {network === 'Instagram' && renderInstagramPreview()}
      {network === 'TikTok' && renderTikTokPreview()}
      {network === 'YouTube' && renderYouTubePreview()}
    </div>
  );
};

export default ContentPreview;
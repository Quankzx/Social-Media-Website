import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import ContentPreview from './ContentPreview';
import { useAppStore } from '../../store';
import socialApi from '../../services/socialApi';
import Skeleton from '../../components/Skeleton';

interface PostEditorProps {
  isOpen: boolean;
  onClose: () => void;
  post?: any; // for editing
}

const PostEditor: React.FC<PostEditorProps> = ({ isOpen, onClose, post }) => {
  const { addPost, updatePost, media } = useAppStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [network, setNetwork] = useState<'Facebook' | 'TikTok' | 'YouTube' | 'Instagram'>('Facebook');
  const [status, setStatus] = useState<'Đã đăng' | 'Lên lịch' | 'Nháp'>('Nháp');
  const [tags, setTags] = useState<string[]>([]);
  const [music, setMusic] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setDate(post.date);
      setNetwork(post.network);
      setStatus(post.status);
      setSelectedMedia(post.mediaUrls || []);
      setTags(post.tags || []);
      setMusic(post.music || '');
      setDescription(post.description || '');
      setHashtags(post.hashtags || []);
    } else {
      setTitle('');
      setContent('');
      setDate('');
      setNetwork('Facebook');
      setStatus('Nháp');
      setSelectedMedia([]);
      setTags([]);
      setMusic('');
      setDescription('');
      setHashtags([]);
    }
  }, [post, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Tiêu đề là bắt buộc';
    if (!content.trim()) newErrors.content = 'Nội dung là bắt buộc';
    if (!date) newErrors.date = 'Ngày đăng là bắt buộc';

    // Platform-specific validation
    if (network === 'Facebook' && content.length > 63206) {
      newErrors.content = 'Nội dung Facebook không được vượt quá 63,206 ký tự';
    }
    if (network === 'Instagram' && content.length > 2200) {
      newErrors.content = 'Nội dung Instagram không được vượt quá 2,200 ký tự';
    }
    if (network === 'TikTok' && content.length > 2200) {
      newErrors.content = 'Nội dung TikTok không được vượt quá 2,200 ký tự';
    }
    if (network === 'YouTube' && title.length > 100) {
      newErrors.title = 'Tiêu đề YouTube không được vượt quá 100 ký tự';
    }
    if (network === 'YouTube' && description && description.length > 5000) {
      newErrors.description = 'Mô tả YouTube không được vượt quá 5,000 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const postData = {
        title,
        content,
        date,
        network: network as 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram',
        status,
        mediaUrls: selectedMedia,
        tags,
        music,
        description,
        hashtags,
      };

      if (post) {
        updatePost(post.id, postData);
      } else {
        addPost(postData);
      }
      onClose();
    } catch (error) {
      setErrors({ general: 'Có lỗi xảy ra khi lưu bài đăng' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // prepare payload
      const payload = {
        title,
        content,
        date,
        mediaUrls: selectedMedia,
        tags,
        music,
        description,
        hashtags,
      };

      // optimistic UI: set status to 'Đang xử lý'
      if (post) {
        updatePost(post.id, { status: 'Đang xử lý' });
      }

      const res = await socialApi.publishPost(network, payload);
      if (res.success) {
        // update post status and platform id
        if (post) updatePost(post.id, { status: 'Đã đăng', platformId: res.platformId });
        // push notification
        useAppStore.getState().pushNotification({ title: 'Đăng bài thành công', message: `Bài đã được đăng lên ${network}` });
        onClose();
      } else {
        if (post) updatePost(post.id, { status: 'Lỗi' });
        useAppStore.getState().pushNotification({ title: 'Lỗi khi đăng bài', message: res.error || 'Không xác định' });
      }
    } catch (err: any) {
      if (post) updatePost(post.id, { status: 'Lỗi' });
      useAppStore.getState().pushNotification({ title: 'Lỗi khi đăng bài', message: err?.message || String(err) });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMedia = (url: string) => {
    setSelectedMedia(prev =>
      prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={post ? 'Chỉnh sửa bài đăng' : 'Tạo bài đăng mới'}
      dialogClassName="max-w-5xl mx-auto p-0 max-h-[90vh]"
    >
      <div className="p-2 pt-0 max-h-[85vh]">
        {useAppStore((s) => s.isAppLoading) ? (
          <div className="space-y-3">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="rectangular" className="w-full h-48" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-full" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Single-column form */}
            <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: 'calc(85vh - 160px)' }}>
            {/* Tiêu đề */}
            <div>
              <label className="block text-sm font-medium mb-1">Tiêu đề</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full border rounded px-3 py-2 ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Nhập tiêu đề"
              />
              {network === 'YouTube' && (
                <div className="text-xs text-gray-500 mt-1">{title.length}/100 ký tự</div>
              )}
              {errors.title && <div className="text-xs text-red-500 mt-1">{errors.title}</div>}
            </div>
            {/* Nội dung */}
            <div>
              <label className="block text-sm font-medium mb-1">Nội dung</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full border rounded px-3 py-2 h-24 ${errors.content ? 'border-red-500' : ''}`}
                placeholder="Nhập nội dung bài đăng"
              />
              <div className="text-xs text-gray-500 mt-1">{content.length}/{network === 'Facebook' ? 63206 : 2200} ký tự</div>
              {errors.content && <div className="text-xs text-red-500 mt-1">{errors.content}</div>}
            </div>
            {/* Ngày đăng, Mạng xã hội, Trạng thái - single row on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Ngày đăng</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full border rounded px-3 py-2 ${errors.date ? 'border-red-500' : ''}`}
                />
                {errors.date && <div className="text-xs text-red-500 mt-1">{errors.date}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mạng xã hội</label>
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value as 'Facebook' | 'TikTok' | 'YouTube' | 'Instagram')}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>Facebook</option>
                  <option>TikTok</option>
                  <option>YouTube</option>
                  <option>Instagram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Nháp">Nháp</option>
                  <option value="Lên lịch">Lên lịch</option>
                  <option value="Đã đăng">Đã đăng</option>
                </select>
              </div>
            </div>
            {/* Các trường platform-specific */}
            {network === 'YouTube' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Mô tả</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full border rounded px-3 py-2 h-20 ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="Mô tả chi tiết cho video"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {description.length}/5000 ký tự
                  </div>
                  {errors.description && <div className="text-xs text-red-500 mt-1">{errors.description}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (phân cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    value={tags.join(', ')}
                    onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()))}
                    className="w-full border rounded px-3 py-2"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </>
            )}
            {network === 'TikTok' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Nhạc nền</label>
                  <input
                    type="text"
                    value={music}
                    onChange={(e) => setMusic(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Tên bài hát hoặc link nhạc"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hashtags (phân cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    value={hashtags.join(', ')}
                    onChange={(e) => setHashtags(e.target.value.split(',').map(h => h.trim()))}
                    className="w-full border rounded px-3 py-2"
                    placeholder="#tiktok, #viral, #fun"
                  />
                </div>
              </>
            )}
            {network === 'Instagram' && (
              <div>
                <label className="block text-sm font-medium mb-1">Hashtags (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={hashtags.join(', ')}
                  onChange={(e) => setHashtags(e.target.value.split(',').map(h => h.trim()))}
                  className="w-full border rounded px-3 py-2"
                  placeholder="#instagram, #photo, #love"
                />
                {/* render chips */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {hashtags.map((h, idx) => (
                    <span key={idx} className="inline-flex items-center bg-gray-100 text-sm rounded-full px-2 py-1">
                      <span className="mr-2">{h}</span>
                      <button onClick={() => setHashtags(prev => prev.filter((_, i) => i !== idx))} className="text-gray-500 hover:text-gray-700">×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {network === 'Facebook' && (
              <div>
                <label className="block text-sm font-medium mb-1">Tags (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={tags.join(', ')}
                  onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()))}
                  className="w-full border rounded px-3 py-2"
                  placeholder="tag1, tag2, tag3"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((t, idx) => (
                    <span key={idx} className="inline-flex items-center bg-gray-100 text-sm rounded-full px-2 py-1">
                      <span className="mr-2">{t}</span>
                      <button onClick={() => setTags(prev => prev.filter((_, i) => i !== idx))} className="text-gray-500 hover:text-gray-700">×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Media selection and action buttons */}
            <div>
              <label className="block text-sm font-medium mb-2">Chọn media (tùy chọn)</label>
              <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                {media.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMedia(m.url)}
                    className={`cursor-pointer border rounded p-1 ${selectedMedia.includes(m.url) ? 'border-blue-500' : 'border-gray-300'}`}
                  >
                    {m.type === 'image' ? (
                      <img src={m.url} alt={m.name} className="w-full h-16 object-cover rounded" />
                    ) : (
                      <video className="w-full h-16 object-cover rounded">
                        <source src={m.url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" disabled={isLoading}>Hủy</button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
            <div className="w-full mt-2">
            <h4 className="text-lg font-semibold mb-4">Preview</h4>
            <div className="w-full bg-gray-50 rounded-lg p-4">
              <ContentPreview
                title={title}
                content={content}
                network={network}
                mediaUrls={selectedMedia}
                tags={tags}
                music={music}
                description={description}
                hashtags={hashtags}
              />
            </div>
            </div>
            {/* Preview below the form (single-column) */}
          </div>
        </div>
        )}
      </div>
    </Modal>
  );
};

export default PostEditor;
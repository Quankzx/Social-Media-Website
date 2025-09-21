import React, { useMemo } from 'react';
import { useAppStore } from '../store';

const Toast = () => {
  const notifications = useAppStore((s) => s.notifications);
  const markRead = useAppStore((s) => s.markNotificationRead);
  const visible = notifications.slice(0, 5);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  if (!notifications.length) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <div className="bg-white border rounded shadow p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Thông báo</div>
          <div className="text-sm text-gray-500">Chưa đọc: {unreadCount}</div>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {visible.map((n) => (
            <div key={n.id} className={`p-2 rounded ${n.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{n.title}</div>
                  {n.message && <div className="text-sm text-gray-600">{n.message}</div>}
                  <div className="text-xs text-gray-400 mt-1">{new Date(n.timestamp).toLocaleString()}</div>
                </div>
                <div className="pl-2">
                  {!n.read && (
                    <button className="text-sm text-blue-600" onClick={() => markRead(n.id)}>Đánh dấu</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toast;

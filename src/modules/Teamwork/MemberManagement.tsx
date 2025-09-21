import React from 'react';
import { useAppStore } from '../../store';

const roles = ['Admin', 'Editor', 'Creator', 'Viewer'] as const;

const MemberManagement = () => {
  const members = useAppStore((s) => s.members);
  const updateRole = useAppStore((s) => s.updateMemberRole);
  const removeMember = useAppStore((s) => s.removeMember);

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h3 className="text-lg font-semibold mb-2">Quản lý thành viên & phân quyền</h3>
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between border rounded p-2">
            <div>
              <div className="font-medium">{m.name} <span className="text-xs text-gray-500">({m.email})</span></div>
              <div className="text-sm text-gray-600">Vai trò: {m.role}</div>
            </div>
            <div className="flex items-center space-x-2">
              <select value={m.role} onChange={(e) => updateRole(m.id, e.target.value as any)} className="border rounded px-2 py-1">
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <button onClick={() => removeMember(m.id)} className="text-sm text-red-600">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberManagement;

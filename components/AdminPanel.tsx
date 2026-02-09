import React from 'react';
import { User, Log } from '../types';
import { Button } from './Button';
import { Shield, ShieldAlert, Trash2, Clock, Activity } from 'lucide-react';
import { formatDate } from '../constants';

interface AdminPanelProps {
  users: User[];
  logs: Log[];
  onDeleteUser: (userId: string) => void;
  currentUser: User;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ users, logs, onDeleteUser, currentUser }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Shield size={20} className="text-blue-600" /> Quản Lý Thành Viên
          </h3>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">
            {users.length} Users
          </span>
        </div>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Họ Tên</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Vai Trò</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role === 'admin' ? 'Quản trị' : 'Nhân viên'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {user.id !== currentUser.id && user.username !== 'admin' && (
                      <button 
                        onClick={() => onDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Xóa thành viên"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Activity size={20} className="text-orange-600" /> Nhật Ký Hoạt Động
          </h3>
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">
            {logs.length} Logs
          </span>
        </div>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {logs.slice().reverse().map((log) => (
              <li key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                     <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock size={16} className="text-gray-500"/>
                     </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{log.username}</h3>
                      <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString('vi-VN')}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-700">{log.action}: </span>
                      {log.details}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            {logs.length === 0 && (
              <li className="p-8 text-center text-gray-500 text-sm">Chưa có hoạt động nào được ghi lại.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

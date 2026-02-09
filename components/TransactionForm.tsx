import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';
import { Button } from './Button';
import { Save, X } from 'lucide-react';

interface TransactionFormProps {
  initialData?: Transaction | null;
  type: TransactionType;
  onSubmit: (data: Omit<Transaction, 'id' | 'date'>) => void;
  onCancel: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ 
  initialData, 
  type, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    amount: '',
    note: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        content: initialData.content,
        amount: initialData.amount.toString(),
        note: initialData.note
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      content: formData.content,
      amount: Number(formData.amount),
      note: formData.note,
      type: type
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên (Người/Đơn vị)</label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ví dụ: Nguyễn Văn A"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Ví dụ: Tiền ứng trước tháng 10"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền (VNĐ)</label>
        <input
          type="number"
          required
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
        <textarea
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Ghi chú thêm..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="ghost" onClick={onCancel} icon={<X size={18} />}>
          Hủy bỏ
        </Button>
        <Button type="submit" variant={type === 'income' ? 'primary' : 'secondary'} icon={<Save size={18} />}>
          Lưu thông tin
        </Button>
      </div>
    </form>
  );
};
export type TransactionType = 'income' | 'expense';

export type UserRole = 'admin' | 'staff';

export interface User {
  id: string;
  username: string;
  password: string; // Trong thực tế nên hash password, ở đây demo lưu plain text
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export interface Log {
  id: string;
  action: string; // 'create_transaction', 'delete_transaction', 'login', etc.
  details: string;
  userId: string;
  username: string;
  timestamp: string;
}

export interface Transaction {
  id: string;
  name: string; // Tên
  content: string; // Nội dung
  amount: number; // Tiền
  note: string; // Ghi chú
  date: string; // Ngày tạo (ISO string)
  type: TransactionType;
  createdBy: string; // Username của người tạo
  createdById: string; // ID của người tạo
}

export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

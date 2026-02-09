export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string; // Tên
  content: string; // Nội dung
  amount: number; // Tiền
  note: string; // Ghi chú
  date: string; // Ngày tạo (ISO string)
  type: TransactionType;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

import React, { useState, useMemo } from 'react';
import { formatCurrency, APP_NAME } from './constants';
import { Transaction, TransactionType, DashboardStats } from './types';
import { StatsCard } from './components/StatsCard';
import { TransactionTable } from './components/TransactionTable';
import { TransactionForm } from './components/TransactionForm';
import { Button } from './components/Button';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PlusCircle, 
  PieChart as PieChartIcon,
  LogOut,
  Landmark
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Mock initial data to show empty state nicely or some sample
const INITIAL_DATA: Transaction[] = [
  { id: '1', name: 'Công ty ABC', content: 'Thu phí dịch vụ tháng 9', amount: 15000000, note: 'Đã thanh toán', date: new Date().toISOString(), type: 'income' },
  { id: '2', name: 'Nguyễn Văn B', content: 'Mua văn phòng phẩm', amount: 2500000, note: 'Giấy A4, Bút bi', date: new Date().toISOString(), type: 'expense' },
  { id: '3', name: 'Dự án XYZ', content: 'Thanh toán đợt 1', amount: 50000000, note: '', date: new Date().toISOString(), type: 'income' },
  { id: '4', name: 'Chi phí điện', content: 'Tiền điện tháng 9', amount: 3200000, note: '', date: new Date().toISOString(), type: 'expense' },
];

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'income' | 'expense'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Computed Stats
  const stats: DashboardStats = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: transactions.length
    };
  }, [transactions]);

  // Chart Data
  const pieData = [
    { name: 'Tổng Thu', value: stats.totalIncome },
    { name: 'Tổng Chi', value: stats.totalExpense },
  ];
  const COLORS = ['#2563eb', '#f97316']; // Blue-600, Orange-500

  // Handlers
  const handleAddTransaction = (data: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setIsModalOpen(false);
  };

  const handleUpdateTransaction = (data: Omit<Transaction, 'id' | 'date'>) => {
    if (!editingTransaction) return;
    setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? { ...t, ...data } : t));
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  // Render Helpers
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                title="Tổng Thu Nhập" 
                value={formatCurrency(stats.totalIncome)} 
                icon={<TrendingUp className="text-white" size={24} />}
                colorClass="text-blue-600"
                bgClass="bg-blue-100"
                trend="Thu nhập toàn bộ dự án"
              />
              <StatsCard 
                title="Tổng Chi Phí" 
                value={formatCurrency(stats.totalExpense)} 
                icon={<TrendingDown className="text-white" size={24} />}
                colorClass="text-orange-600"
                bgClass="bg-orange-100"
                trend="Chi phí vận hành & mua sắm"
              />
              <StatsCard 
                title="Quỹ Còn Lại" 
                value={formatCurrency(stats.balance)} 
                icon={<Wallet className="text-white" size={24} />}
                colorClass={stats.balance >= 0 ? "text-green-600" : "text-red-600"}
                bgClass={stats.balance >= 0 ? "bg-green-100" : "bg-red-100"}
                trend="Số dư khả dụng hiện tại"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <PieChartIcon size={20} className="text-gray-500"/> Tỷ trọng Thu/Chi
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity Bar Chart (Simplified representation) */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-gray-500"/> Biểu đồ tổng quan
                </h3>
                <div className="h-72 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Thu', amount: stats.totalIncome },
                        { name: 'Chi', amount: stats.totalExpense },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <RechartsTooltip 
                        cursor={{fill: 'transparent'}}
                        formatter={(value) => [formatCurrency(Number(value)), 'Số tiền']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                         {
                            [stats.totalIncome, stats.totalExpense].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                          }
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Recent Transactions Snippet could go here, but omitted for brevity to keep code clean */}
          </div>
        );
      case 'income':
        return (
          <div className="animate-fade-in space-y-4">
             <div className="flex justify-end">
                <Button 
                  onClick={openAddModal} 
                  variant="primary" 
                  icon={<PlusCircle size={20} />}
                  className="shadow-lg shadow-blue-200"
                >
                  Thêm Khoản Thu
                </Button>
             </div>
             <TransactionTable 
               title="Danh Sách Thu" 
               transactions={transactions.filter(t => t.type === 'income')} 
               onEdit={openEditModal}
               onDelete={handleDeleteTransaction}
               colorTheme="blue"
             />
          </div>
        );
      case 'expense':
        return (
           <div className="animate-fade-in space-y-4">
              <div className="flex justify-end">
                <Button 
                  onClick={openAddModal} 
                  variant="secondary" 
                  icon={<PlusCircle size={20} />}
                  className="shadow-lg shadow-orange-200"
                >
                  Thêm Khoản Chi
                </Button>
             </div>
             <TransactionTable 
               title="Danh Sách Chi" 
               transactions={transactions.filter(t => t.type === 'expense')} 
               onEdit={openEditModal}
               onDelete={handleDeleteTransaction}
               colorTheme="orange"
             />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans selection:bg-blue-100">
      
      {/* Horizontal Navigation Menu */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <Landmark size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">FinControl</h1>
                  <p className="text-xs text-gray-500 font-medium">{APP_NAME}</p>
                </div>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                {['dashboard', 'income', 'expense'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`
                      inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200
                      ${activeTab === tab 
                        ? 'border-blue-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                    `}
                  >
                    {tab === 'dashboard' && 'Dashboard'}
                    {tab === 'income' && 'Quản Lý Thu'}
                    {tab === 'expense' && 'Quản Lý Chi'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 border border-gray-200 hidden md:block">
                Còn lại: <span className={stats.balance >= 0 ? "text-blue-600" : "text-red-600"}>{formatCurrency(stats.balance)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu (simplified) */}
        <div className="sm:hidden flex border-t border-gray-100">
           <button onClick={() => setActiveTab('dashboard')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}>Dashboard</button>
           <button onClick={() => setActiveTab('income')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'income' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}>Thu</button>
           <button onClick={() => setActiveTab('expense')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'expense' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}>Chi</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background backdrop */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)} aria-hidden="true"></div>

            {/* Modal Panel */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${activeTab === 'income' ? 'bg-blue-100' : 'bg-orange-100'}`}>
                    {editingTransaction ? <Edit2 size={20} className={activeTab === 'income' ? 'text-blue-600' : 'text-orange-600'} /> : <PlusCircle size={20} className={activeTab === 'income' ? 'text-blue-600' : 'text-orange-600'} />}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {editingTransaction ? 'Chỉnh sửa' : 'Thêm mới'} {activeTab === 'income' ? 'Khoản Thu' : 'Khoản Chi'}
                    </h3>
                    <div className="mt-4">
                      <TransactionForm 
                        type={activeTab === 'dashboard' ? 'income' : activeTab} // Default to income if on dashboard
                        initialData={editingTransaction}
                        onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                        onCancel={() => setIsModalOpen(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Temporary icon import for modal to avoid error
import { Edit2 } from 'lucide-react';

export default App;
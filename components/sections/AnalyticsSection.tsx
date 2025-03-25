'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CreditCard, TrendingUp, TrendingDown, Activity } from 'lucide-react';

// Sample data
const transactionData = [
  { month: 'Jan', amount: 5000 },
  { month: 'Feb', amount: 6500 },
  { month: 'Mar', amount: 7200 },
  { month: 'Apr', amount: 6800 },
  { month: 'May', amount: 7600 },
  { month: 'Jun', amount: 5900 },
];

const categoryData = [
  { name: 'Food', value: 30, color: '#FF6384' },
  { name: 'Shopping', value: 25, color: '#36A2EB' },
  { name: 'Utilities', value: 20, color: '#FFCE56' },
  { name: 'Rent', value: 15, color: '#4BC0C0' },
  { name: 'Others', value: 10, color: '#9966FF' },
];

const AnalyticsSection: React.FC = () => {
  return (
    <div className="container px-4 py-2">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Balance', value: '$12,400', icon: <CreditCard className="h-5 w-5" />, color: 'bg-blue-100 text-blue-600' },
          { title: 'Income', value: '$5,200', icon: <TrendingUp className="h-5 w-5" />, color: 'bg-green-100 text-green-600' },
          { title: 'Expenses', value: '$3,700', icon: <TrendingDown className="h-5 w-5" />, color: 'bg-red-100 text-red-600' },
          { title: 'Transactions', value: '127', icon: <Activity className="h-5 w-5" />, color: 'bg-amber-100 text-amber-600' },
        ].map((card, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-card border-border border rounded-xl shadow-sm dark:bg-card">
            <div className={`rounded-full p-3 ${card.color}`}>
              {card.icon}
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {/* Monthly Transactions Bar Chart */}
        <div className="p-4 border-border rounded-xl bg-card border ">
          <h2 className="text-lg font-semibold mb-4">Monthly Transactions</h2>
          <ResponsiveContainer width="100%" height="auto" aspect={3/2}>
            <BarChart data={transactionData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366F1" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="p-4 border-border rounded-xl border bg-card ">
          <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height="auto" aspect={3/2}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="rounded-xl bg-white shadow-sm dark:bg-card border border-border overflow-hidden">
        <h2 className="text-lg font-semibold p-4 mb-0">Recent Transactions</h2>
        <div className="relative">
          <div className="">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className=" dark:bg-card">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { date: 'Jul 1', description: 'Grocery Store', category: 'Food', amount: '-$150.00' },
                  { date: 'Jul 3', description: 'Online Shopping', category: 'Shopping', amount: '-$200.00' },
                  { date: 'Jul 5', description: 'Salary', category: 'Income', amount: '+$5,000.00' },
                  { date: 'Jul 7', description: 'Electric Bill', category: 'Utilities', amount: '-$120.00' },
                ].map((txn, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3 text-sm">{txn.date}</td>
                    <td className="px-4 py-3">{txn.description}</td>
                    <td className="px-4 py-3 text-sm">{txn.category}</td>
                    <td className={`px-4 py-3 text-right font-medium ${txn.amount.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>
                      {txn.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
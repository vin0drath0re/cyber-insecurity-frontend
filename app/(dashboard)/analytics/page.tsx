'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CreditCard, TrendingUp, TrendingDown, Activity } from 'lucide-react';

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

const AnalyticsPage: React.FC = () => {
  return (
    
      <div className="container-padding py-8 pt-20">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Balance', value: '$12,400', icon: <CreditCard className="h-5 w-5" />, color: 'bg-blue-100 text-blue-600' },
            { title: 'Income', value: '$5,200', icon: <TrendingUp className="h-5 w-5" />, color: 'bg-green-100 text-green-600' },
            { title: 'Expenses', value: '$3,700', icon: <TrendingDown className="h-5 w-5" />, color: 'bg-red-100 text-red-600' },
            { title: 'Transactions', value: '127', icon: <Activity className="h-5 w-5" />, color: 'bg-amber-100 text-amber-600' },
          ].map((card, index) => (
            <div key={index} className="p-6 flex items-center gap-4">
              <div className={`rounded-full p-3 ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-semibold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-8">
          {/* Monthly Transactions Bar Chart */}
          <div className="p-6 border-border rounded-xl bg-card border dark:border-purple-950">
            <h2 className="text-lg font-semibold mb-4">Monthly Transactions</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={transactionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#6366F1" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown Pie Chart */}
          <div className="p-6 border-border border dark:border-purple-950 rounded-xl bg-card">
            <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80} label>
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
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: 'Jul 1', description: 'Grocery Store', category: 'Food', amount: '-$150.00' },
                  { date: 'Jul 3', description: 'Online Shopping', category: 'Shopping', amount: '-$200.00' },
                  { date: 'Jul 5', description: 'Salary', category: 'Income', amount: '+$5,000.00' },
                  { date: 'Jul 7', description: 'Electric Bill', category: 'Utilities', amount: '-$120.00' },
                ].map((txn, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm">{txn.date}</td>
                    <td className="py-4 px-4">{txn.description}</td>
                    <td className="py-4 px-4 text-sm">{txn.category}</td>
                    <td className={`py-4 px-4 text-right font-medium ${txn.amount.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>
                      {txn.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
  );
};

export default AnalyticsPage;

import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';

export const Payouts: React.FC = () => {
  const [filter, setFilter] = useState<string>('');

  return (
    <Layout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1a365d', fontFamily: 'Georgia, serif' }}>Earnings Overview</h1>
            <p className="text-sm text-gray-500">Track your commissions and request payouts.</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-5 rounded-full transition-colors flex items-center gap-2 text-sm shadow-sm">
            <span className="text-lg leading-none">+</span>
            Withdraw
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat-card">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-500 text-xs font-medium">Available for Payout</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1a365d' }}>4939.48 <span className="text-base font-normal text-gray-600">lei</span></p>
              <p className="text-xs text-green-600 font-medium">↗ 18% this month</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">1k</span>
                <span className="text-gray-500">1k</span>
                <span className="text-gray-500">2k</span>
                <span className="text-gray-500">3k</span>
                <span className="text-gray-500">4k</span>
              </div>
              <div className="mt-2 h-20 flex items-end gap-2">
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '30%' }}></div>
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '45%' }}></div>
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '35%' }}></div>
                <div className="flex-1 bg-primary rounded-t" style={{ height: '75%' }}></div>
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '50%' }}></div>
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '60%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs mt-1 text-gray-500">
                <span>Jul</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>Mai</span>
                <span>Aug</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 text-xs font-medium">Pending</h3>
            </div>
            <p className="text-3xl font-bold mb-4" style={{ color: '#1a365d' }}>939.48 <span className="text-base font-normal text-gray-600">lei</span></p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500 text-xs font-medium">Total earned</h3>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#1a365d' }}>25939.48 <span className="text-base font-normal text-gray-600">lei</span></p>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold" style={{ color: '#1a365d' }}>Transaction History (3)</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by transaction ID"
                  className="pl-9 pr-4 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 w-64 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-sm"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Transaction ID</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Account Nr.</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">21032103210</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">2025-10-08</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">300.99 lei</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">visa_EFT****0218</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                      Pending
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-primary hover:text-primary-dark text-xs font-medium">
                      Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">21032103210</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">2025-10-08</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">300.99 lei</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">visa_EFT****0218</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-primary hover:text-primary-dark text-xs font-medium">
                      Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">21032103210</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">2025-10-08</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">300.99 lei</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">visa_EFT****0218</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-primary hover:text-primary-dark text-xs font-medium">
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

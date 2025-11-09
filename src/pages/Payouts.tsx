import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card, Button, Badge, Table } from '../components/ui';

export const Payouts: React.FC = () => {
  const [filter, setFilter] = useState<string>('');

  return (
    <Layout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-display-sm font-headline text-navy mb-1">Earnings Overview</h1>
            <p className="text-sm text-navy-light">Track your commissions and request payouts.</p>
          </div>
          <Button icon={<span className="text-lg leading-none">+</span>}>
            Withdraw
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Available for Payout Card with Chart */}
          <Card>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-navy-light text-xs font-medium">Available for Payout</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <p className="text-3xl font-bold mb-1 text-navy">
                4939.48 <span className="text-base font-normal text-navy-light">lei</span>
              </p>
              <p className="text-xs text-success font-medium">↗ 18% this month</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs text-navy-light mb-2">
                <span>1k</span>
                <span>1k</span>
                <span>2k</span>
                <span>3k</span>
                <span>4k</span>
              </div>
              <div className="h-20 flex items-end gap-2">
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '30%' }} />
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '45%' }} />
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '35%' }} />
                <div className="flex-1 bg-primary rounded-t" style={{ height: '75%' }} />
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '50%' }} />
                <div className="flex-1 bg-gray-200 rounded-t" style={{ height: '60%' }} />
              </div>
              <div className="flex items-center justify-between text-xs mt-1 text-navy-light">
                <span>Jul</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>Mai</span>
                <span>Aug</span>
              </div>
            </div>
          </Card>

          {/* Pending Card */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-navy-light text-xs font-medium">Pending</h3>
            </div>
            <p className="text-3xl font-bold mb-4 text-navy">
              939.48 <span className="text-base font-normal text-navy-light">lei</span>
            </p>
          </Card>

          {/* Total Earned Card */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-navy-light text-xs font-medium">Total earned</h3>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-orange" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-navy">
              25939.48 <span className="text-base font-normal text-navy-light">lei</span>
            </p>
          </Card>
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-navy">Transaction History (3)</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by transaction ID"
                  className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 shadow-sm"
                />
              </div>
              {/* Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-navy-light">Status:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <Card padding="none" className="overflow-hidden">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Transaction ID</Table.Head>
                  <Table.Head>Date</Table.Head>
                  <Table.Head>Amount</Table.Head>
                  <Table.Head>Account Nr.</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Action</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {[
                  { id: '21032103210', date: '2025-10-08', amount: '300.99 lei', account: 'visa_EFT****0218', status: 'pending' },
                  { id: '21032103210', date: '2025-10-08', amount: '300.99 lei', account: 'visa_EFT****0218', status: 'completed' },
                  { id: '21032103210', date: '2025-10-08', amount: '300.99 lei', account: 'visa_EFT****0218', status: 'completed' },
                ].map((transaction, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell className="font-medium text-navy">{transaction.id}</Table.Cell>
                    <Table.Cell className="text-navy-light">{transaction.date}</Table.Cell>
                    <Table.Cell className="font-medium text-navy">{transaction.amount}</Table.Cell>
                    <Table.Cell className="text-navy-light">{transaction.account}</Table.Cell>
                    <Table.Cell>
                      <Badge variant={transaction.status as 'pending' | 'completed'}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <button className="text-primary hover:text-primary-hover text-xs font-medium">
                        Details
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card, Button, Badge, Table } from '../components/ui';

export const Payouts: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  // Mock transaction data - replace with API call when backend is ready
  const allTransactions = [
    { id: '21032103210', date: '2025-10-08', amount: '300.99 lei', account: 'visa_EFT****0218', status: 'pending' },
    { id: '21032103211', date: '2025-10-08', amount: '300.99 lei', account: 'visa_EFT****0218', status: 'completed' },
    { id: '21032103212', date: '2025-10-08', amount: '300.99 lei', account: 'visa_EFT****0218', status: 'completed' },
  ];

  // Filter transactions based on search and status
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch = search === '' || transaction.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === '' || transaction.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[32px] font-serif text-navy mb-1" style={{ fontWeight: 500 }}>
              Earnings Overview
            </h1>
            <p className="text-lg font-normal leading-[150%] tracking-[-0.01em] text-[#4A6A85]">
              Track your commissions and request payouts.
            </p>
          </div>
          <Button icon={<span className="text-lg leading-none">+</span>}>
            <span style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '27px',
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '-0.18px',
              color: '#FFFFFF'
            }}>
              Withdraw
            </span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Available for Payout Card with Chart - spans 2 columns */}
          <div
            className="md:col-span-2 rounded-2xl p-6 relative overflow-hidden"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.004)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRight: 'inset',
              borderBottom: 'inset',
              boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)'
            }}
          >
            {/* Top edge highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
              }}
            />
            {/* Left edge highlight */}
            <div
              className="absolute top-0 left-0 w-[1px] h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
              }}
            />

            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[40px] font-bold text-navy" style={{ fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
                    4939.48 lei
                  </span>
                  <svg width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.2238 1C19.2238 0.447715 19.6715 0 20.2238 0H27.6667C28.2189 0 28.6667 0.447715 28.6667 1V8.39444C28.6667 8.94673 28.2189 9.39444 27.6667 9.39444C27.1144 9.39444 26.6667 8.94673 26.6667 8.39444V3.40381L18.4855 11.5351C17.8603 12.1566 17.3213 12.6923 16.8319 13.0636C16.3072 13.4616 15.7243 13.7627 15.0067 13.7626C14.2891 13.7626 13.7062 13.4613 13.1817 13.0632C12.6923 12.6918 12.1535 12.156 11.5284 11.5343L11.1627 11.1707C10.4772 10.489 10.0327 10.05 9.6626 9.76915C9.31563 9.50583 9.15341 9.47645 9.04599 9.47649C8.93857 9.47653 8.77637 9.50603 8.42959 9.7696C8.05971 10.0507 7.61556 10.49 6.93051 11.1722L1.70562 16.3753C1.31428 16.765 0.681117 16.7636 0.291413 16.3723C-0.0982922 15.9809 -0.0969651 15.3478 0.294377 14.9581L5.56578 9.70873C6.19101 9.08604 6.72989 8.54935 7.21936 8.17733C7.74403 7.77855 8.32714 7.47675 9.04526 7.47649C9.76338 7.47623 10.3467 7.7776 10.8717 8.17599C11.3614 8.54766 11.9007 9.08394 12.5264 9.70617L12.892 10.0698C13.577 10.7509 14.021 11.1895 14.3908 11.4701C14.7374 11.7332 14.8995 11.7626 15.0069 11.7626C15.1143 11.7626 15.2764 11.7333 15.6231 11.4702C15.9929 11.1897 16.4371 10.7512 17.1222 10.0703L25.242 2H20.2238C19.6715 2 19.2238 1.55228 19.2238 1Z" fill="url(#paint0_linear_1577_5405)" />
                    <defs>
                      <linearGradient id="paint0_linear_1577_5405" x1="14.3333" y1="0" x2="14.3333" y2="16.6667" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FA9C19" />
                        <stop offset="1" stopColor="#FA9C19" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-base text-[#4A6A85]">Available for Payout</p>
              </div>
              <div className="flex items-center gap-1">
                <span style={{ color: '#4CA7F8', fontSize: '14px' }}>↗ 55%</span>
                <span style={{ fontSize: '14px', fontWeight: 500 }}> this month</span>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-6">
              <div className="flex h-40 relative">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between text-xs text-[#4A6A85] pr-4">
                  <span>12k</span>
                  <span>9k</span>
                  <span>6k</span>
                  <span>3k</span>
                  <span>0</span>
                </div>

                {/* Bars container */}
                <div className="flex-1 flex items-end gap-2">
                  {(() => {
                    const data = [
                      { month: 'Ian', value: 6000 },
                      { month: 'Feb', value: 6000 },
                      { month: 'Mar', value: 6000 },
                      { month: 'Apr', value: 9850, highlight: true, label: '9,850 lei' },
                      { month: 'Mai', value: 1500 },
                      { month: 'Jun', value: 1000 },
                      { month: 'Jul', value: 800 },
                      { month: 'Aug', value: 1000 },
                      { month: 'Sept', value: 800 },
                      { month: 'Oct', value: 1000 },
                      { month: 'Nov', value: 800 },
                      { month: 'Dec', value: 1000 },
                    ];
                    const maxValue = 12000;
                    const chartHeight = 160; // h-40 = 160px

                    return data.map((item, idx) => {
                      const barHeight = (item.value / maxValue) * chartHeight;

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full" style={{borderRight: '1px dashed #eaeaea', borderLeft: idx == 0 ? '1px dashed #eaeaea' : ''}}>
                          <div className="relative w-full flex justify-center">
                            {item.highlight && item.label && (
                              <div
                                className="absolute px-2 py-1 rounded-full text-xs text-white whitespace-nowrap"
                                style={{
                                  background: '#FA9C19',
                                  fontSize: '11px',
                                  bottom: `${barHeight + 8}px`
                                }}
                              >
                                {item.label}
                              </div>
                            )}
                            <div
                              className="w-full max-w-[40px]"
                              style={{
                                height: `${barHeight}px`,
                                borderTop: item.highlight
                                  ? '3px solid #FE9400'
                                  : '3px solid #4A6A85',
                                background: item.highlight
                                  ? 'linear-gradient(180deg, rgba(250, 156, 25, 0.5) 0%, rgba(255, 255, 255, 0) 100%)'
                                  : '',
                                minHeight: '4px'
                              }}
                            />

                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex text-xs text-[#4A6A85] mt-2">
                <div className="pr-4 invisible">
                  <span>12k</span>
                </div>
                <div className="flex-1 flex gap-2">
                  {['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <span key={month} className="flex-1 text-center">{month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column with 2 stacked cards */}
          <div className="flex flex-col gap-4">
            {/* Pending Card */}
            <div
              className="flex-1 flex flex-col items-start p-6 gap-[10px] relative overflow-hidden"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.004)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRight: 'inset',
                borderBottom: 'inset',
                boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)'
              }}
            >
              {/* Top edge highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
                }}
              />
              {/* Left edge highlight */}
              <div
                className="absolute top-0 left-0 w-[1px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
                }}
              />
              <div>
                <p className="text-[40px] font-bold text-[#B3BCC3]" style={{ fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
                  939.48 <span className="text-[24px] font-normal text-[#B3BCC3]">lei</span>
                </p>
                <p className="text-base text-[#4A6A85]">Pending</p>
              </div>
            </div>

            {/* Total Earned Card */}
            <div
              className="flex-1 flex flex-col items-start p-6 gap-[10px] relative overflow-hidden"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.004)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRight: 'inset',
                borderBottom: 'inset',
                boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)'
              }}
            >
              {/* Top edge highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
                }}
              />
              {/* Left edge highlight */}
              <div
                className="absolute top-0 left-0 w-[1px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))'
                }}
              />
              <div>
                <p className="text-[40px] font-bold text-navy" style={{ fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
                  25939.48 <span className="text-[24px] font-normal text-[#4A6A85]">lei</span>
                </p>
                <p className="text-base text-[#4A6A85]">Total earned</p>
              </div>
              {/* Icon */}
              <div className="absolute bottom-4 right-4 p-2 rounded-lg" style={{ background: 'rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(6px)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.0625 15.1591H6.67216C6.67216 15.1591 8.50961 15.8695 9.74527 15.9284C12.4698 16.0583 14.6341 14.7892 16.387 12.8589C16.7874 12.4181 16.7806 11.7526 16.4089 11.2873C15.9297 10.6875 15.029 10.639 14.4281 11.1165C13.7661 11.6426 12.8874 12.2343 12.0501 12.4667C10.8936 12.7877 9.74527 12.8514 9.74527 12.8514C15.8915 12.4667 13.5135 8.25 5.0625 10.5M10.5415 2.91707C10.2012 1.98104 9.30365 1.3125 8.25 1.3125C6.90381 1.3125 5.8125 2.40381 5.8125 3.75C5.8125 5.09619 6.90381 6.1875 8.25 6.1875C8.49642 6.1875 8.73431 6.15093 8.95852 6.08293M10.5415 2.91707C9.54084 3.22057 8.8125 4.15023 8.8125 5.25C8.8125 5.54254 8.86403 5.82304 8.95852 6.08293M10.5415 2.91707C10.7657 2.84907 11.0036 2.8125 11.25 2.8125C12.5962 2.8125 13.6875 3.90381 13.6875 5.25C13.6875 6.59619 12.5962 7.6875 11.25 7.6875C10.1963 7.6875 9.29884 7.01896 8.95852 6.08293M2.0625 9.5625H5.0625V15.9375H2.0625V9.5625Z" stroke="#FA9C19" stroke-width="1.125" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      {/* Transaction History */}
<div>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-[21px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C]">
      Transaction History <span style={{ color: '#4CA7F8' }}>({filteredTransactions.length})</span>
    </h2>
    
    {/* Filter */}
    <div className="flex items-center gap-2">
      <span style={{
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '150%',
        color: '#4A6A85'
      }}>
        Status:
      </span>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: '10px 16px',
          width: '166px',
          height: '50px',
          background: 'rgba(255, 255, 255, 0.3)',
          border: '1px solid #E6E6E6',
          borderRadius: '12px',
          fontFamily: 'Inter',
          fontSize: '14px'
        }}
        className="focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </div>

  {/* Search */}
  <div className="relative mb-5">
    <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="text"
      placeholder="Search by transaction ID"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      style={{
        height: '50px',
        background: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #EBEBEB',
        borderRadius: '12px',
        width: '280px'
      }}
    />
  </div>

          {/* Transaction Table */}
          <Table>
            <Table.Header>
              <Table.Row isHeader={true}>
                <Table.Head>Transaction ID</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head>Amount</Table.Head>
                <Table.Head>Account Nr.</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Action</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredTransactions.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center text-navy-light py-8">
                    No transactions found
                  </Table.Cell>
                </Table.Row>
              ) : (
                filteredTransactions.map((transaction, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>
                      <div style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '18px',
                        lineHeight: '27px',
                        letterSpacing: '-0.18px',
                        color: '#043B6C'
                      }}>
                        {transaction.id}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-navy-light">{transaction.date}</Table.Cell>
                    <Table.Cell className="font-medium text-navy">{transaction.amount}</Table.Cell>
                    <Table.Cell className="text-navy-light">{transaction.account}</Table.Cell>
                    <Table.Cell>
                      <Badge variant={transaction.status as 'pending' | 'completed'}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <button className="hover:opacity-80 font-medium transition-opacity" style={{ color: '#4CA7F8' }}>
                        Details
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </Layout>
  );
};
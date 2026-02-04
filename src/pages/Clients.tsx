import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { StatCard, Button, Badge, Table, CustomSelect } from '../components/ui';
import { AddClientModal } from '../components/AddClientModal';
import { clientService } from '../services/clientService';
import { Client } from '../types';

export const Clients: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const pageSize = 20;

  useEffect(() => {
    loadClients();
  }, [search, statusFilter, currentPage]);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await clientService.getClients(
        statusFilter || undefined,
        search || undefined,
        pageSize,
        currentPage
      );
      setClients(data.data);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Failed to load clients:', error);
      setClients([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleClientCreated = () => {
    // Reload the clients list to show the new client
    loadClients();
  };

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[32px] font-serif text-navy mb-1" style={{ fontWeight: 500 }}>
              My Clients
            </h1>
            <p className="text-lg font-normal leading-[150%] tracking-[-0.01em] text-[#4A6A85]">
              Manage your client database and create recommendations.
            </p>
          </div>
          <Button
            icon={<span className="text-lg leading-none">+</span>}
            onClick={() => setIsAddClientModalOpen(true)}
          >
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
              Add Client
            </span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            value={loading ? '-' : clients.length}
            label="Total Clients"
            icon={<img src="/images/people-like, inner circle.svg" alt="" className="w-6 h-6" />}
          />
          <StatCard
            value={loading ? '-' : clients.filter((c) => c.status === 'active').length}
            label="Active clients"
            icon={<img src="/images/money-hand, coins.svg" alt="" className="w-6 h-6" />}
            valueColor="#FA9C19"
            isWhite={true}
          />
          <StatCard
            value={loading ? '-' : `${clients.reduce((sum, c) => sum + c.totalCommission, 0).toFixed(2)} lei`}
            label="Total commission earned"
            labelColor="#4A6A85"
          />
          <StatCard
            value={loading ? '-' : clients.filter((c) => c.status === 'inactive').length}
            label="Pending clients"
            valueColor="#B3BCC3"
          />
        </div>

        {/* Section Header with Filters */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[21px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C]">
              All clients <span style={{ color: '#4CA7F8' }}>({loading ? '-' : clients.length})</span>
            </h2>
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: '#4A6A85'
                }}
              >
                Status:
              </span>
              <CustomSelect
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
                options={statusOptions}
                style={{
                  padding: '10px 16px',
                  width: '166px',
                  height: '50px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid #E6E6E6',
                  borderRadius: '12px'
                }}
              />
              <button
                className="flex flex-row justify-center items-center"
                style={{
                  padding: '14px 32px',
                  gap: '12px',
                  width: '138px',
                  height: '50px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid #EBEBEB',
                  borderRadius: '12px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '120%',
                    color: '#043B6C'
                  }}
                >
                  Filtre
                </span>
                <img src="/icons/settings-orange.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-lighter"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by client name, email or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{
                height: '50px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #EBEBEB',
                borderRadius: '12px',
                maxWidth: '400px'
              }}
            />
          </div>
        </div>

        {/* Clients Table */}
        {loading ? (
          <div className="p-8 text-center text-navy-light">Loading...</div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center text-navy-light">No clients found</div>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row isHeader={true}>
                <Table.Head>Name</Table.Head>
                <Table.Head>Email</Table.Head>
                <Table.Head>Phone</Table.Head>
                <Table.Head>Added</Table.Head>
                <Table.Head>No. Rec</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Commission</Table.Head>
                <Table.Head>Action</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {clients.map((client) => (
                <Table.Row key={client.shopifyCustomerId}>
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
                      {client.firstName} {client.lastName}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-navy-light">{client.email}</Table.Cell>
                  <Table.Cell className="text-navy-light">{client.phone || '-'}</Table.Cell>
                  <Table.Cell className="text-navy-light">
                    {new Date(client.addedDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="text-navy">{client.recommendationCount}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={client.status as 'active' | 'inactive'}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-navy">
                    {client.totalCommission.toFixed(2)} lei
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => navigate(`/clients/${client.shopifyCustomerId}`)}
                        className="hover:opacity-80 font-medium transition-opacity"
                        style={{ color: '#4CA7F8' }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate('/recommendations/create')}
                        className="transition-opacity hover:opacity-80"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '5.76px',
                          width: '36px',
                          height: '36px',
                          background: '#FA9C19',
                          borderRadius: '46.08px'
                        }}
                      >
                        <span className="text-white text-lg leading-none">+</span>
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}

        {/* Add Client Modal */}
        <AddClientModal
          isOpen={isAddClientModalOpen}
          onClose={() => setIsAddClientModalOpen(false)}
          onClientCreated={handleClientCreated}
        />

        {/* Pagination */}
        {!loading && totalCount > pageSize && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-navy-light">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} clients
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(totalCount / pageSize) }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current
                    return page === 1 ||
                      page === Math.ceil(totalCount / pageSize) ||
                      (page >= currentPage - 1 && page <= currentPage + 1);
                  })
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-navy-lighter">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                          ? 'bg-primary text-white'
                          : 'text-navy-light hover:bg-gray-100'
                          }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalCount / pageSize)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
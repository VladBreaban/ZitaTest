import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { StatCard, Button, Card, Badge, Table } from '../components/ui';
import { clientService } from '../services/clientService';
import { Client } from '../types';

export const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadClients();
  }, [search]);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await clientService.getClients(undefined, search);
      setClients(data.data);
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const UsersIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const CheckIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const DollarIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  const ClockIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  return (
    <Layout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-display-sm font-headline text-navy mb-1">My Clients</h1>
            <p className="text-sm text-navy-light">Manage your client database and create recommendations.</p>
          </div>
          <Button icon={<span className="text-lg leading-none">+</span>}>
            Add Client
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            value={clients.length || 503}
            label="Total Clients"
            icon={UsersIcon}
          />
          <StatCard
            value={clients.filter((c) => c.status === 'active').length || 456}
            label="Active clients"
            icon={CheckIcon}
          />
          <StatCard
            value={`${clients.reduce((sum, c) => sum + c.totalCommission, 0).toFixed(2) || '25939.48'} lei`}
            label="Total commission earned"
            icon={DollarIcon}
          />
          <StatCard
            value={clients.filter((c) => c.status === 'inactive').length || 47}
            label="Pending clients"
            icon={ClockIcon}
          />
        </div>

        {/* Section Header with Filters */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-navy">
              All clients ({clients.length || 3})
            </h2>
            <div className="flex items-center gap-3">
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
                  className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-72 shadow-sm"
                />
              </div>
              
              {/* Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-navy-light">Status:</span>
                <select className="px-3 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm">
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  }
                >
                  Filtre
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <Card padding="none" className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-navy-light">Loading...</div>
          ) : clients.length === 0 ? (
            <div className="p-8 text-center text-navy-light">No clients found</div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
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
                    <Table.Cell className="font-medium text-navy">
                      {client.firstName} {client.lastName}
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
                      <div className="flex items-center gap-2">
                        <button className="text-primary hover:text-primary-hover text-xs font-medium">
                          View
                        </button>
                        <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-hover transition-colors">
                          <span className="text-sm">→</span>
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Card>
      </div>
    </Layout>
  );
};

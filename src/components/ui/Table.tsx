import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
}

interface TableBodyProps {
  children: React.ReactNode;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> & {
  Header: React.FC<TableHeaderProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  Head: React.FC<TableHeadProps>;
  Cell: React.FC<TableCellProps>;
} = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-card overflow-hidden border border-border ${className}`}>
      <table className="w-full">
        {children}
      </table>
    </div>
  );
};

Table.Header = ({ children }) => (
  <thead className="bg-gray-50 border-b border-border">
    <tr>{children}</tr>
  </thead>
);

Table.Body = ({ children }) => (
  <tbody>{children}</tbody>
);

Table.Row = ({ children, className = '' }) => (
  <tr className={`border-t border-border hover:bg-gray-50 transition-colors ${className}`}>
    {children}
  </tr>
);

Table.Head = ({ children, className = '' }) => (
  <th className={`px-5 py-3 text-left text-xs font-medium text-navy-lighter uppercase tracking-wide ${className}`}>
    {children}
  </th>
);

Table.Cell = ({ children, className = '' }) => (
  <td className={`px-5 py-4 text-sm ${className}`}>
    {children}
  </td>
);

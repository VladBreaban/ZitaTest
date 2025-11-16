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
  isHeader?: boolean;
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
    <div className={`bg-transparent overflow-hidden ${className}`}>
      <table className="w-full border-separate border-spacing-y-2">
        {children}
      </table>
    </div>
  );
};

Table.Header = ({ children }) => (
  <thead className="bg-transparent">
    {children}
  </thead>
);

Table.Body = ({ children }) => (
  <tbody>{children}</tbody>
);

Table.Row = ({ children, className = '', isHeader = false }) => (
  <tr 
    className={`${isHeader ? '' : 'hover:bg-white'} transition-colors rounded-[12px] ${className}`}
    style={isHeader ? {} : {
      background: 'rgba(0, 0, 0, 0.001)',
      boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)',
    }}
  >
    {children}
  </tr>
);

Table.Head = ({ children, className = '' }) => (
  <th className={`px-8 py-2 text-left text-sm font-medium leading-[27px] tracking-[-0.18px] text-[#4A6A85] ${className}`}>
    {children}
  </th>
);

Table.Cell = ({ children, className = '' }) => (
  <td className={`px-8 py-6 text-sm first:rounded-l-[12px] last:rounded-r-[12px] ${className}`}>
    {children}
  </td>
);
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { useMemo } from 'react';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import { ICompanyPerformanceROI } from './app';

const StyledDataTable = styled(DataTable)`
  // Your style here

  th,
  td {
    text-align: center !important;
  }

  th:nth-child(-n + 2),
  td:nth-child(-n + 2) {
    background-color: #dddddd !important;
  }

  [role='columnheader'] {
    & {
      // :first-of-type {
      min-width: 250px;
    }
  }

  .p-column-filter {
    width: 100%;

    button {
      // display: none;
    }
  }
`;

export const BarChart = ({ value }: { value?: string }) => {
  const data = {
    labels: Array.from({ length: 5 }, (_, i) => `202${i}`),
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    labels: ['Installs', 'Revenue', 'Cost'],
    plugins: {
      legend: {
        labels: {
          fontColor: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          // secondaryTextColor
          color: '#6c757d',
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: '#6c757d',
        },
        grid: {
          color: '#e9ecef',
          drawBorder: false,
        },
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
};

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

export const Table = ({ data }: { data?: ICompanyPerformanceROI[] }) => {
  // TODO: Enabling sorting together with filtering
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Info',
        columns: [
          { Header: 'Company', accessor: 'company' },
          { Header: 'Country', accessor: 'country' },
          { Header: 'Installs', accessor: 'installs' },
          { Header: 'ROI', accessor: 'ROI' },
          { Header: 'Industry ROI', accessor: 'industryROI' },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: data ?? [],
        defaultColumn,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <span {...column.getSortByToggleProps()}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

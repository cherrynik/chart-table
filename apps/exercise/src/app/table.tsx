import { useEffect, useMemo } from 'react';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { ICompanyPerformanceROI, usePerformanceOfCompaniesStore } from './store';

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

  const { setFilteredData } = usePerformanceOfCompaniesStore((state) => ({
    setFilteredData: state.setFilteredData,
  }));

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    filteredRows,
  } = useTable(
    {
      columns,
      data: data ?? [],
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    const firstFive = rows.flatMap((row) => row.original).slice(0, 5);

    setFilteredData?.(firstFive);
  }, [rows, setFilteredData]);

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

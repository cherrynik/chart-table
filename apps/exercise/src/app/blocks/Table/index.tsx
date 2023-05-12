import { useEffect, useMemo } from 'react';
import {
  Column,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';
import styled from 'styled-components';
import {
  ICompanyPerformanceROI,
  usePerformanceOfCompaniesStore,
} from '../../store';

const StyledTable = styled.div`
  width: 100%;
  border-collapse: collapse;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 2rem;

  // first 2 columns are dark
  // the rest are light
  .header-group {
    .header {
      text-align: center;
      padding: 0.5rem;
      min-width: 100px;

      &:nth-child(-n + 2) {
        background-color: #a1a1a1;
      }
    }
  }
`;

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
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
};

export const Table = ({ data }: { data?: ICompanyPerformanceROI[] }) => {
  // TODO: Enabling sorting together with filtering
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { setFilteredData } = usePerformanceOfCompaniesStore((state) => ({
    setFilteredData: state.setFilteredData,
  }));

  const columns: Column<ICompanyPerformanceROI>[] = useMemo(
    () => [
      { Header: 'Company', accessor: 'company' },
      { Header: 'Country', accessor: 'country' },
      { Header: 'Installs', accessor: 'installs' },
      { Header: 'ROI', accessor: 'ROI' },
      { Header: 'Industry ROI', accessor: 'industryROI' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data: data ?? [],
        defaultColumn,
      },
      useFilters,
      useGlobalFilter,
      useBlockLayout,
      useSortBy
    );

  useEffect(() => {
    const firstFive = rows.flatMap((row) => row.original).slice(0, 5);

    setFilteredData?.(firstFive);
  }, [rows, setFilteredData]);

  return (
    <StyledTable {...getTableProps()}>
      <div className="table-header">
        {headerGroups.map((headerGroup) => (
          <div className="header-group" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <div className="header">
                <div {...column.getSortByToggleProps()}>
                  <span>
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </div>
                <div className="filter">{column.render('Filter')}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </div>
          );
        })}
      </div>
    </StyledTable>
  );
};

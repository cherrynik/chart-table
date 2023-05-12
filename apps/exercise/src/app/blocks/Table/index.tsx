import { useEffect, useMemo } from 'react';
import {
  Column,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable
} from 'react-table';
import styled from 'styled-components';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow_down.svg';
import {
  ICompanyPerformanceROI,
  usePerformanceOfCompaniesStore,
} from '../../store';

const keyColumnsSelector = '&:nth-child(-n + 2)';
const keyColumnsBackgroundColor = '#dbdbdb';

const StyledTable = styled.div`
  width: 100%;
  border-collapse: collapse;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 2rem;

  .header-row {
    .col-header {
    }
  }

  .header-row {
    display: flex;

    .col-header {
      display: flex;
      flex-direction: column;
      background-color: white;
      width: 100%;
      border-bottom: 3px solid #efefef;

      ${keyColumnsSelector} {
        background-color: ${keyColumnsBackgroundColor};

        &:not(:last-of-type) {
          border-right: 3px solid #efefef;
        }
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        min-height: 50px;
        font-weight: bold;
        color: #5f5f5f;
        border-bottom: 3px solid #efefef;
        cursor: pointer;
        padding: 0.5rem 0;
      }

      .filter {
        padding: 0.5rem;

        input {
          width: 100%;
          min-height: 2.25rem;
          height: 100%;
          padding: 0.5rem;
          border: 1px solid #c3c3c3;
          border-radius: 3px;
          box-sizing: border-box;

          &::placeholder {
            font-style: italic;
            color: #c3c3c3;
          }
        }
      }
    }
  }

  .body {
    .row {
      display: flex;
      border-bottom: 1px solid #efefef;

      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1.5rem 0;
        color: #6c6c6c;
        font-size: 14px;
        background-color: white;

        ${keyColumnsSelector} {
          background-color: ${keyColumnsBackgroundColor};

          &:not(:last-of-type) {
            border-right: 3px solid #efefef;
          }
        }
      }
    }
  }
`;

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
  margin-right: calc(-0.25rem - 1rem);
  stroke-width: 3px;
  color: #2f80ec;
`;

const DefaultColumnFilter = ({
  column: { filterValue, setFilter },
}: {
  column: {
    filterValue: string;
    setFilter: (value: string | undefined) => void;
  };
}) => {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Type to filter..."
    />
  );
};

export const Table = ({ data }: { data?: ICompanyPerformanceROI[] }) => {
  // The table has multiple sort if you click shift + column
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  ) as Partial<Column<ICompanyPerformanceROI>>;

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

  const { getTableProps, headerGroups, prepareRow, rows } = useTable(
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
          <div className="header-row">
            {headerGroup.headers.map(
              (column) => (
                <div className="col-header">
                  <div className="name" {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <StyledArrowDownIcon />
                      ) : (
                        <StyledArrowDownIcon
                          style={{ transform: 'rotate(180deg)' }}
                        />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="filter">{column.render('Filter')}</div>
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <div className="body">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <div className="row">
              {row.cells.map((cell) => {
                return <div className="cell">{cell.render('Cell')}</div>;
              })}
            </div>
          );
        })}
      </div>
    </StyledTable>
  );
};

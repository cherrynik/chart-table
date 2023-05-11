import { ICountryPerformance, getROIFormatted } from '@project/data';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Table({ value }: { value?: any }) {
  console.log(value);

  return (
    <DataTable value={value}>
      <Column field="company" header="Company" />
      <Column field="country" header="Country" />
      <Column field="installs" header="Installs" />
      <Column
        header="ROI"
        body={(data: ICountryPerformance) =>
          getROIFormatted({
            revenue: data.revenue,
            cost: data.cost,
          })
        }
      />
      <Column field="Industry ROI" header="Industry ROI" />
    </DataTable>
  );
}

export default Table;

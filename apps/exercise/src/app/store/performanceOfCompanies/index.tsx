import { ICompanyPerformance } from '@project/data';
import { create } from 'zustand';

export interface ICompanyPerformanceROI extends ICompanyPerformance {
  ROI: string;
  industryROI: string;
}

export interface IPerformanceOfCompaniesStore {
  data: ICompanyPerformanceROI[];
  filteredData: ICompanyPerformanceROI[];

  setData: (data: ICompanyPerformanceROI[]) => void;
  setFilteredData: (filteredData: ICompanyPerformanceROI[]) => void;
}

export const usePerformanceOfCompaniesStore =
  create<IPerformanceOfCompaniesStore>()((set) => ({
    data: [],
    filteredData: [],

    setData: (performanceOfCompanies: ICompanyPerformanceROI[]) => {
      set({ data: performanceOfCompanies });
      set({ filteredData: performanceOfCompanies.slice(0, 5) });
    },

    setFilteredData: (
      filteredPerformanceOfCompanies: ICompanyPerformanceROI[]
    ) => set({ filteredData: filteredPerformanceOfCompanies }),
  }));

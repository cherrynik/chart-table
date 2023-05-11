import {
    ICompanyPerformance,
    getROIFormatted,
    performanceOfCompanies,
} from '@project/data';
import { useMemo } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../styles/global';
import Table, { BarChart } from './table';

const StyledApp = styled.div``;

export interface ICompanyPerformanceROI extends ICompanyPerformance {
  ROI: string;
  industryROI: string;
}

export function App() {
  // In a real app, this would be fetched from an API
  const performanceOfCompaniesResult: ICompanyPerformanceROI[] = useMemo(
    () =>
      [...performanceOfCompanies].map((company) => {
        const { cost, revenue } = company;

        const ROI = getROIFormatted({ cost, revenue });
        const industryROI = ROI;

        return {
          ...company,
          ROI,
          industryROI,
        };
      }),
    []
  );

  return (
    <StyledApp>
      <GlobalStyle />

      <BarChart />
      <Table data={performanceOfCompaniesResult} />
    </StyledApp>
  );
}

export default App;

import { getROIFormatted, performanceOfCompanies } from '@project/data';
import { useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../styles/global';
import { BarChart, MetricViewModeTabs, Table } from './blocks';
import { Layout } from './blocks/Layout';
import { usePerformanceOfCompaniesStore } from './store';

const StyledApp = styled.div``;

// TODO: Fix type errors
export function App() {
  const { data, setData } = usePerformanceOfCompaniesStore((state) => ({
    data: state.data,
    setData: state.setData,
    setFilteredData: state.setFilteredData,
  }));

  useEffect(() => {
    const fetchPerformanceOfCompanies = async () => {
      // In a real app, this would be fetched from an API
      // const response = await fetch('/api/performance/companies');
      // const performanceOfCompanies = await response.json();

      const response = [...performanceOfCompanies].map((company) => {
        const { cost, revenue } = company;

        const ROI = getROIFormatted({ cost, revenue });
        const industryROI = ROI;

        return {
          ...company,
          ROI,
          industryROI,
        };
      });

      setData?.(response);
    };

    fetchPerformanceOfCompanies();

    return () => {
      setData([]);
    };
  }, [setData]);

  return (
    <StyledApp>
      <GlobalStyle />

      <Layout title="Data Reports">
        <MetricViewModeTabs />
        <BarChart />
        <Table data={data} />
      </Layout>
    </StyledApp>
  );
}

export default App;

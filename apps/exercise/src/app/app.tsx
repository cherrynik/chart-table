import { performanceOfCompanies, performanceOfCountries } from '@project/data';
import { useMemo } from 'react';
import styled from 'styled-components';
import Table from './table';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const companiesData = useMemo(() => performanceOfCompanies, []); // In a real app, this would be fetched from an API

  return (
    <StyledApp>
      <Table value={companiesData} />
    </StyledApp>
  );
}

export default App;

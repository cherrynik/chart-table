import { MetricViewMode } from '@project/data';
import styled from 'styled-components';
import { useMetricViewModeStore } from '../../store';

// Blue color from the design
const activeBorderColor = '#2F80ED';

const StyledTabs = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;

  li {
    margin-right: 1rem;
  }

  button {
    background: none;
    border: 0;
    border-bottom: 2px solid transparent;
    font-size: 1rem;
    padding: 0;
    padding-bottom: .2rem;
    transition: all .2s ease-in-out;
    font-family: inherit;

    &.active {
      border-bottom: 2px solid ${activeBorderColor};
      font-weight: 500;
    }

    &:not(.active) {
      opacity: .5;
    }

    &:hover {
      &:not(.active) {
        border-bottom: 2px solid ${activeBorderColor};
        cursor: pointer;
        opacity: 1;
      }
    }
`;

export const MetricViewModeTabs = () => {
  const { metricViewMode, setMetricViewMode } = useMetricViewModeStore(
    (state) => ({
      metricViewMode: state.metricViewMode,
      setMetricViewMode: state.setMetricViewMode,
    })
  );

  const metricViewModes = Object.values(MetricViewMode);

  return (
    <StyledTabs>
      {metricViewModes.map((metricViewModeItem) => (
        <li key={`${metricViewModeItem}-tab`}>
          <button
            key={metricViewModeItem}
            onClick={() => setMetricViewMode(metricViewModeItem)}
            className={metricViewModeItem === metricViewMode ? 'active' : ''}
          >
            {metricViewModeItem}
          </button>
        </li>
      ))}
    </StyledTabs>
  );
};

import { MetricViewMode } from '@project/data';
import { scaleBand, scaleLinear } from 'd3';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AxisBottom, AxisLeft, Bar } from '../../components';
import {
  useMetricViewModeStore,
  usePerformanceOfCompaniesStore,
} from '../../store';

const StyledBarChart = styled.svg`
  background-color: #ffffff;

  .domain {
    stroke: none;
  }

  .tick {
    text {
      color: #b6b6b6;
      font-weight: 700;
    }

    &:first-of-type {
      line {
        stroke: #b6b6b6;
      }
    }

    &:not(:first-of-type) {
      line {
        stroke: #e5e5e5;
      }
    }
  }
`;

// TODO: Vertical lines for ticks
// TODO: Too big of a gap between top of bar and top of chart
export const BarChart = () => {
  const { filteredData } = usePerformanceOfCompaniesStore((state) => ({
    filteredData: state.filteredData,
  }));

  const { metricViewMode } = useMetricViewModeStore((state) => ({
    metricViewMode: state.metricViewMode,
  }));

  const padding = { top: 20, right: 30, bottom: 20, left: 30 };
  const minWidth = 600;

  const [width, setWidth] = useState(Math.max(minWidth, window.innerWidth));
  const height = 300;

  useEffect(() => {
    const handleResize = () => {
      setWidth(Math.max(600, window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const svgWidth = '100%';
  const svgHeight = innerHeight + padding.top + padding.bottom;

  const paddingRatio = 0.6;

  const colors = ['#2F80ED', '#03D4C6', '#F2994A', '#EB5757', '#9B51E0'];

  const scaleX = scaleBand()
    .domain(
      filteredData.map(({ company, country }) => `${company} - ${country}`)
    )
    .range([0, innerWidth])
    .padding(paddingRatio);

  const scaleY = scaleLinear()
    .domain([
      0,
      Math.max(
        ...filteredData.map(({ installs, ROI }) =>
          Number(metricViewMode === MetricViewMode.Installs ? installs : ROI)
        )
      ),
    ])
    .nice(1)
    .range([innerHeight, 0]);

  return (
    <StyledBarChart
      style={{
        minWidth: `calc(${svgWidth} - ${padding.left}px - ${padding.right}px)`,
        minHeight: svgHeight,
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
      }}
    >
      <g transform={`translate(${padding.left}, ${padding.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${innerHeight})`} />
        <AxisLeft scale={scaleY} ticks={5} gridLineWidth={innerWidth} />
        {filteredData.map(({ installs, ROI, company, country }, index) => {
          const value = Number(
            metricViewMode === MetricViewMode.Installs ? installs : ROI
          );
          return (
            <Bar
              key={`bar-${company}-${country}`}
              x={scaleX(`${company} - ${country}`)}
              y={scaleY(value)}
              width={scaleX.bandwidth()}
              height={innerHeight - scaleY(value)}
              fill={colors[index % colors.length]}
            />
          );
        })}
      </g>
    </StyledBarChart>
  );
};

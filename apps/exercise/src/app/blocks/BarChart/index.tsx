import { MetricViewMode } from '@project/data';
import { scaleBand, scaleLinear } from 'd3';
import { AxisBottom, AxisLeft, Bar } from '../../components';
import {
  useMetricViewModeStore,
  usePerformanceOfCompaniesStore,
} from '../../store';

export const BarChart = () => {
  const { filteredData } = usePerformanceOfCompaniesStore((state) => ({
    filteredData: state.filteredData,
  }));

  const { metricViewMode } = useMetricViewModeStore((state) => ({
    metricViewMode: state.metricViewMode,
  }));

  const padding = { top: 10, right: 0, bottom: 20, left: 40 };
  const width = 800 - padding.left - padding.right;
  const height = 300 - padding.top - padding.bottom;

  const scaleX = scaleBand()
    .domain(
      filteredData.map(({ company, country }) => `${company} - ${country}`)
    )
    .range([0, width])
    .padding(0.5);

  const scaleY = scaleLinear()
    .domain([
      0,
      Math.max(
        ...filteredData.map(({ installs, ROI }) =>
          Number(metricViewMode === MetricViewMode.Installs ? installs : ROI)
        )
      ),
    ])
    .range([height, 0]);

  return (
    <svg
      width={width + padding.left + padding.right}
      height={height + padding.top + padding.bottom}
    >
      <g transform={`translate(${padding.left}, ${padding.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        {filteredData.map(({ installs, ROI, company, country }) => {
          const value = Number(
            metricViewMode === MetricViewMode.Installs ? installs : ROI
          );
          return (
            <Bar
              key={`bar-${company}-${country}`}
              x={scaleX(`${company} - ${country}`)}
              y={scaleY(value)}
              width={scaleX.bandwidth()}
              height={height - scaleY(value)}
              fill="teal "
            />
          );
        })}
      </g>
    </svg>
  );
};

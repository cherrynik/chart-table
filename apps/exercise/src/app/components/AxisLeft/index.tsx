import { ScaleLinear, axisLeft, select } from 'd3';
import { useEffect, useRef } from 'react';

export interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
  ticks: number;
  gridLineWidth: number;
}

export const AxisLeft = ({ scale, ticks, gridLineWidth }: AxisLeftProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(
        axisLeft(scale).tickSizeInner(-gridLineWidth).ticks(ticks)
      );
    }
  }, [gridLineWidth, scale, ticks]);

  return <g ref={ref} />;
};

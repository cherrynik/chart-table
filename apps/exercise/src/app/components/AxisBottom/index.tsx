import { ScaleBand, select, axisBottom } from "d3";
import { useRef, useEffect } from "react";

export interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

export const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

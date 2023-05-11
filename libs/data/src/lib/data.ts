export const data = () => 'data';

export const calculateROI = ({
  revenue,
  cost,
}: {
  revenue: number;
  cost: number;
}) => (revenue / cost) * 100;

export const getROIFormatted = ({
  revenue,
  cost,
  fractionDigits = 2,
}: {
  revenue: number;
  cost: number;
  fractionDigits?: number;
}) => calculateROI({ revenue, cost }).toFixed(fractionDigits);

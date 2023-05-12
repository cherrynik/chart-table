export declare const data: () => string;
export declare enum MetricViewMode {
    Installs = "Installs",
    ROI = "ROI"
}
export declare const calculateROI: ({ revenue, cost, }: {
    revenue: number;
    cost: number;
}) => number;
export declare const getROIFormatted: ({ revenue, cost, fractionDigits, }: {
    revenue: number;
    cost: number;
    fractionDigits?: number | undefined;
}) => string;

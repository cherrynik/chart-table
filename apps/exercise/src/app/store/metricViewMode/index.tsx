import { MetricViewMode } from '@project/data';
import { create } from 'zustand';

interface MetricViewModeStore {
  metricViewMode: MetricViewMode;

  setMetricViewMode: (metricViewMode: MetricViewMode) => void;
}

export const useMetricViewModeStore = create<MetricViewModeStore>()((set) => ({
  metricViewMode: MetricViewMode.Installs,

  setMetricViewMode: (metricViewMode: MetricViewMode) =>
    set({ metricViewMode }),
}));

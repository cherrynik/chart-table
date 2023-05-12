"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getROIFormatted = exports.calculateROI = exports.MetricViewMode = exports.data = void 0;
const data = () => 'data';
exports.data = data;
var MetricViewMode;
(function (MetricViewMode) {
    MetricViewMode["Installs"] = "Installs";
    MetricViewMode["ROI"] = "ROI";
})(MetricViewMode = exports.MetricViewMode || (exports.MetricViewMode = {}));
const calculateROI = ({ revenue, cost, }) => (revenue / cost) * 100;
exports.calculateROI = calculateROI;
const getROIFormatted = ({ revenue, cost, fractionDigits = 2, }) => (0, exports.calculateROI)({ revenue, cost }).toFixed(fractionDigits);
exports.getROIFormatted = getROIFormatted;
//# sourceMappingURL=data.js.map
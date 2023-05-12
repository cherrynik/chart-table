import { calculateROI } from './data';

describe('Calculate ROI', () => {
  it('should work', () => {
    const result = calculateROI({ revenue: 100, cost: 50 });
    expect(result).toEqual(1);
  });
});

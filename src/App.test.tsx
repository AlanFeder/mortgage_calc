import { render, screen } from '@testing-library/react';
import App from './App';
import { calculateFixedMortgage, calculateArmMortgage } from './utils/calculations';

test('renders the mortgage comparison', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /mortgage/i })).toBeInTheDocument();
});

test('both schedules amortize the loan over 360 months', () => {
  const params = { loanAmount: 300000, fixedRate: 6, armRate: 5, propertyTaxes: 6000,
    homeownersInsurance: 1200, marginalTaxRate: 24, treasuryRate: 3 };
  for (const calculate of [calculateFixedMortgage, calculateArmMortgage]) {
    const schedule = calculate(params);
    expect(schedule).toHaveLength(360);
    expect(schedule.every(payment => Number.isFinite(payment.totalPayment))).toBe(true);
    expect(schedule[359].remainingBalance).toBeCloseTo(0, 4);
    expect(schedule.reduce((sum, payment) => sum + payment.principal, 0)).toBeCloseTo(params.loanAmount, 4);
  }
});

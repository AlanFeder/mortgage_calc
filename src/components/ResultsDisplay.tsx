import React, { useState } from 'react';
import { MonthlyPayment } from '../utils/calculations';

interface ResultsDisplayProps {
  fixedMortgage: MonthlyPayment[];
  armMortgage: MonthlyPayment[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ fixedMortgage, armMortgage }) => {
  const [selectedMonth, setSelectedMonth] = useState(1);

  const fixedData = fixedMortgage[selectedMonth - 1];
  const armData = armMortgage[selectedMonth - 1];

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Monthly Payment Comparison</h5>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="monthSlider" className="form-label">
              Select Month: {selectedMonth} (Year {Math.ceil(selectedMonth / 12)})
            </label>
            <input
              type="range"
              className="form-range"
              id="monthSlider"
              min="1"
              max="360"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>
        </div>

        {fixedData && armData && (
          <div className="row mt-4">
            <div className="col-md-6">
              <h6>30-Year Fixed</h6>
              <table className="table table-sm table-bordered">
                <tbody>
                  <tr>
                    <td>Interest Rate</td>
                    <td>{fixedData.interestRate.toFixed(3)}%</td>
                  </tr>
                  <tr>
                    <td>Principal</td>
                    <td>{formatCurrency(fixedData.principal)}</td>
                  </tr>
                  <tr>
                    <td>Interest</td>
                    <td>{formatCurrency(fixedData.interest)}</td>
                  </tr>
                  <tr>
                    <td>Total Payment</td>
                    <td>{formatCurrency(fixedData.totalPayment)}</td>
                  </tr>
                  <tr>
                    <td>Net Payment (After Tax Credit)</td>
                    <td>{formatCurrency(fixedData.netPayment)}</td>
                  </tr>
                  <tr>
                    <td>Remaining Balance</td>
                    <td>{formatCurrency(fixedData.remainingBalance)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h6>5/1 ARM</h6>
              <table className="table table-sm table-bordered">
                <tbody>
                  <tr>
                    <td>Interest Rate</td>
                    <td>{armData.interestRate.toFixed(3)}%</td>
                  </tr>
                  <tr>
                    <td>Principal</td>
                    <td>{formatCurrency(armData.principal)}</td>
                  </tr>
                  <tr>
                    <td>Interest</td>
                    <td>{formatCurrency(armData.interest)}</td>
                  </tr>
                  <tr>
                    <td>Total Payment</td>
                    <td>{formatCurrency(armData.totalPayment)}</td>
                  </tr>
                  <tr>
                    <td>Net Payment (After Tax Credit)</td>
                    <td>{formatCurrency(armData.netPayment)}</td>
                  </tr>
                  <tr>
                    <td>Remaining Balance</td>
                    <td>{formatCurrency(armData.remainingBalance)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
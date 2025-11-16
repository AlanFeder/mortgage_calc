import React from 'react';
import { NumericFormat } from 'react-number-format';
import { MortgageParams } from '../utils/calculations';

interface InputControlsProps {
  params: MortgageParams;
  onParamsChange: (newParams: MortgageParams) => void;
}

const InputControls: React.FC<InputControlsProps> = ({ params, onParamsChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const floatValue = parseFloat(value);
    onParamsChange({ ...params, [name]: isNaN(floatValue) ? 0 : floatValue });
  };

  const handleNumericChange = (name: keyof MortgageParams) => (values: any) => {
    onParamsChange({ ...params, [name]: values.floatValue || 0 });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Loan & Tax Inputs</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <NumericFormat
                  id="loanAmount"
                  name="loanAmount"
                  className="form-control"
                  value={params.loanAmount}
                  onValueChange={handleNumericChange('loanAmount')}
                  thousandSeparator=","
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="fixedRate" className="form-label">30-Year Fixed Rate</label>
              <div className="input-group">
                <NumericFormat
                  id="fixedRate"
                  name="fixedRate"
                  className="form-control"
                  value={params.fixedRate}
                  onValueChange={handleNumericChange('fixedRate')}
                  decimalScale={3}
                  allowNegative={false}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="armRate" className="form-label">5/1 ARM Initial Rate</label>
              <div className="input-group">
                <NumericFormat
                  id="armRate"
                  name="armRate"
                  className="form-control"
                  value={params.armRate}
                  onValueChange={handleNumericChange('armRate')}
                  decimalScale={3}
                  allowNegative={false}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="propertyTaxes" className="form-label">Annual Property Taxes</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <NumericFormat
                  id="propertyTaxes"
                  name="propertyTaxes"
                  className="form-control"
                  value={params.propertyTaxes}
                  onValueChange={handleNumericChange('propertyTaxes')}
                  thousandSeparator=","
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="homeownersInsurance" className="form-label">Annual Homeowners Insurance</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <NumericFormat
                  id="homeownersInsurance"
                  name="homeownersInsurance"
                  className="form-control"
                  value={params.homeownersInsurance}
                  onValueChange={handleNumericChange('homeownersInsurance')}
                  thousandSeparator=","
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="marginalTaxRate" className="form-label">Marginal Tax Rate</label>
              <div className="input-group">
                <NumericFormat
                  id="marginalTaxRate"
                  name="marginalTaxRate"
                  className="form-control"
                  value={params.marginalTaxRate}
                  onValueChange={handleNumericChange('marginalTaxRate')}
                  decimalScale={2}
                  allowNegative={false}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="treasuryRate" className="form-label">
                Post-5-Year 1-Year Treasury Rate: {params.treasuryRate.toFixed(2)}%
                <span className="d-block text-muted small">
                  Simulates the underlying index for ARM adjustments after the initial 5-year period. The ARM rate will be this + 2.75% (the margin).
                </span>
              </label>
              <input
                type="range"
                className="form-range"
                id="treasuryRate"
                name="treasuryRate"
                min="0"
                max="10"
                step="0.125"
                value={params.treasuryRate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputControls;

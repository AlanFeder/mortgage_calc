import React, { useState, useEffect } from 'react';
import InputControls from './InputControls';
import ResultsDisplay from './ResultsDisplay';
import {
  MortgageParams,
  MonthlyPayment,
  calculateFixedMortgage,
  calculateArmMortgage,
} from '../utils/calculations';

const MortgageCalculator: React.FC = () => {
  const [params, setParams] = useState<MortgageParams>({
    loanAmount: 750000,
    fixedRate: 6.25,
    armRate: 4.875,
    propertyTaxes: 10000,
    homeownersInsurance: 5000,
    marginalTaxRate: 24,
    treasuryRate: 3.0, // Initial default for the slider
  });

  const [fixedMortgage, setFixedMortgage] = useState<MonthlyPayment[]>([]);
  const [armMortgage, setArmMortgage] = useState<MonthlyPayment[]>([]);

  useEffect(() => {
    const fixed = calculateFixedMortgage(params);
    const arm = calculateArmMortgage(params);
    setFixedMortgage(fixed);
    setArmMortgage(arm);
  }, [params]);

  return (
    <div>
      <InputControls params={params} onParamsChange={setParams} />
      <ResultsDisplay fixedMortgage={fixedMortgage} armMortgage={armMortgage} />
    </div>
  );
};

export default MortgageCalculator;

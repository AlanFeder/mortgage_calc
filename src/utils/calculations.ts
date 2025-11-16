export interface MortgageParams {
  loanAmount: number;
  fixedRate: number;
  armRate: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  marginalTaxRate: number;
  treasuryRate: number;
}

export interface MonthlyPayment {
  month: number;
  principal: number;
  interest: number;
  totalPayment: number;
  netPayment: number;
  remainingBalance: number;
  interestRate: number;
}

export const calculateFixedMortgage = (params: MortgageParams): MonthlyPayment[] => {
  const { loanAmount, fixedRate, propertyTaxes, homeownersInsurance, marginalTaxRate } = params;
  const monthlyInterestRate = fixedRate / 100 / 12;
  const numberOfPayments = 30 * 12;
  const monthlyPropertyTax = propertyTaxes / 12;
  const monthlyInsurance = homeownersInsurance / 12;

  const monthlyPAndI =
    loanAmount *
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const payments: MonthlyPayment[] = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= numberOfPayments; month++) {
    const interest = remainingBalance * monthlyInterestRate;
    const principal = monthlyPAndI - interest;
    remainingBalance -= principal;

    const taxDeduction = (interest * marginalTaxRate) / 100;
    const totalPayment = monthlyPAndI + monthlyPropertyTax + monthlyInsurance;
    const netPayment = totalPayment - taxDeduction;

    payments.push({
      month,
      principal,
      interest,
      totalPayment,
      netPayment,
      remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
      interestRate: fixedRate,
    });
  }

  return payments;
};

export const calculateArmMortgage = (params: MortgageParams): MonthlyPayment[] => {
  const { loanAmount, armRate, propertyTaxes, homeownersInsurance, marginalTaxRate, treasuryRate } = params;
  const initialRate = armRate;
  const numberOfPayments = 30 * 12;
  const monthlyPropertyTax = propertyTaxes / 12;
  const monthlyInsurance = homeownersInsurance / 12;

  const payments: MonthlyPayment[] = [];
  let remainingBalance = loanAmount;
  let currentRate = initialRate;
  let monthlyPAndI = 0;

  const lifetimeCap = initialRate + 5;
  const margin = 2.75;

  for (let year = 0; year < 30; year++) {
    if (year >= 5) {
      const potentialRate = treasuryRate + margin;
      let nextRate = potentialRate;

      if (year === 5) { // First adjustment
        const initialCap = initialRate + 2;
        nextRate = Math.min(potentialRate, initialCap);
      } else { // Subsequent adjustments
        const subsequentCap = currentRate + 2;
        const subsequentFloor = currentRate - 2;
        nextRate = Math.max(Math.min(potentialRate, subsequentCap), subsequentFloor);
      }

      currentRate = Math.min(nextRate, lifetimeCap);
    }
    
    const monthlyInterestRate = currentRate / 100 / 12;
    const remainingPayments = numberOfPayments - (year * 12);

    monthlyPAndI =
      remainingBalance *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, remainingPayments)) /
      (Math.pow(1 + monthlyInterestRate, remainingPayments) - 1);

    for (let monthInYear = 1; monthInYear <= 12; monthInYear++) {
      const month = year * 12 + monthInYear;
      if (month > numberOfPayments) break;

      const interest = remainingBalance * monthlyInterestRate;
      const principal = monthlyPAndI - interest;
      remainingBalance -= principal;

      const taxDeduction = (interest * marginalTaxRate) / 100;
      const totalPayment = monthlyPAndI + monthlyPropertyTax + monthlyInsurance;
      const netPayment = totalPayment - taxDeduction;

      payments.push({
        month,
        principal,
        interest,
        totalPayment,
        netPayment,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
        interestRate: currentRate,
      });
    }
  }

  return payments;
};

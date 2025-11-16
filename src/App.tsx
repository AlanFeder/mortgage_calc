import React from 'react';
import MortgageCalculator from './components/MortgageCalculator';

function App() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center mb-4">Mortgage Comparison Calculator</h1>
          <MortgageCalculator />
        </div>
      </div>
    </div>
  );
}

export default App;
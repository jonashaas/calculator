'use client';

import { useState } from 'react';
import Calculation from '@/utils/calculation';

export default function ExpressionInput({ setHistory }) {
  const [expression, setExpression] = useState('');
  const [error, setError] = useState('');

  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
    setError(''); // Clear error when input changes
  };

  const handleSubmit = () => {
    const calc = new Calculation(expression);
    const calculatedResult = calc.calculate();

    if (calculatedResult !== undefined) {
      const finalResult = `${expression} = ${calculatedResult}`;

      // Update Local Storage
      const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
      history.push(finalResult);
      localStorage.setItem('calculationHistory', JSON.stringify(history));

      // Update shared state
      setHistory(history);

      // Clear any previous error
      setError('');
    } else {
      setError('Error: Invalid expression');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="card-body w-full">
        <label className="input w-full input-bordered flex items-center gap-2">
          Expression:
          <input
            type="text"
            value={expression}
            onChange={handleExpressionChange}
            onKeyDown={handleKeyDown}
            placeholder=""
            className="grow"
          />
          <kbd className="kbd kbd-sm hidden lg:flex">↵</kbd>
        </label>
        <div className="card-actions">
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-2"
          >
            Submit
          </button>
        </div>

        {
          error && (
            <div className="mt-4 text-error">
              <p>{error}</p>
            </div>
          )
        }
      </div>
    </>
  );
}

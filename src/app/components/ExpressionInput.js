'use client';

import { useState } from 'react';
import Calculation from '@/utils/calculation';

export default function ExpressionInput({ setHistory }) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  };

  const handleSubmit = () => {
    const calc = new Calculation(expression);
    const calculatedResult = calc.calculate();

    if (calculatedResult !== undefined) {
      const finalResult = `Result: ${expression} = ${calculatedResult}`;
      setResult(finalResult);

      // Update Local Storage
      const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
      history.push(finalResult);
      localStorage.setItem('calculationHistory', JSON.stringify(history));

      // Update shared state
      setHistory(history);
    } else {
      setResult('Error: Invalid expression');
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
        </label >
        <div className="card-actions">
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-2"
          >
            Submit
          </button>
        </div>

        {
          result && (
            <div className="mt-4 text-center">
              <p>{result}</p>
            </div>
          )
        }
      </div>
    </>
  );
}

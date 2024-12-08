'use client';

import { useState } from 'react';
import Calculation from '@/utils/calculation';
import { MdHelp } from "react-icons/md";

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
      <div className="flex justify-end w-full">
        <div className="w-4 h-4 cursor-pointer" onClick={() => document.getElementById('calculator_help_modal').showModal()}>
          <MdHelp className='text-right text-sm text-gray-500' />
        </div>
        <dialog id="calculator_help_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="text-lg font-bold">Calculator Help</h3>
            <p className="py-4">
              Welcome to the Inline Calculator! Here’s how to use it:
            </p>
            <ul className="list-disc list-inside">
              <li>Only the following operators are allowed: <strong>+, -, *, /</strong></li>
              <li>Use parentheses for grouping, e.g., <code>(2 + 3) * 4</code></li>
              <li>Ensure your expression is syntactically correct to avoid errors.</li>
              <li>Press ESC or click the ✕ button to close this help dialog.</li>
            </ul>
          </div>
        </dialog>
      </div>
      <div className="card-body w-full">
        <label className="input w-full input-bordered flex items-center gap-2">
          <div className="label">
            <span className="label-text lg:hidden">Expr:</span>
            <span className="hidden lg:flex">Expression:</span>
          </div>
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

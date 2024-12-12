'use client';

import { useState } from 'react';
import Calculation from '@/utils/calculation';
import { MdHelp } from "react-icons/md";

export default function ExpressionInput({ setHistory }) {
  const [expression, setExpression] = useState(''); // State to store the user's input expression
  const [error, setError] = useState(''); // State to store error messages

  // Updates the expression and clears any previous error
  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
    setError(''); // Clear error when input changes
  };

  // Validates and calculates the expression, updates history, and handles errors
  const handleSubmit = () => {
    const calc = new Calculation(expression); // Create a new Calculation instance
    const calculatedResult = calc.calculate(); // Evaluate the expression

    if (calculatedResult !== undefined) {
      const finalResult = `${expression} = ${calculatedResult}`; // Format the result

      // Retrieve calculation history from localStorage or initialize an empty array
      const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
      console.log(history);
      history.push(finalResult); // Add the new result to the history
      localStorage.setItem('calculationHistory', JSON.stringify(history)); // Save updated history to localStorage

      setHistory(history); // Update the shared state with the new history
      setError(''); // Clear any previous error
    } else {
      setError('Error: Invalid expression'); // Display an error for invalid input
    }
  };

  // Submits the expression when the Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      {/* Help icon with modal for user guidance */}
      <div className="flex justify-end w-full">
        <div className="w-4 h-4 cursor-pointer" onClick={() => document.getElementById('calculator_help_modal').showModal()}>
          <MdHelp className='text-right text-sm text-gray-500' />
        </div>
        <dialog id="calculator_help_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* Close button for the help modal */}
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

      {/* Input field and submit button */}
      <div className="card-body w-full">
        <label className="input w-full input-bordered flex items-center gap-2">
          <div className="label">
            <span className="label-text lg:hidden">Expr:</span> {/* Abbreviated label for small screens */}
            <span className="hidden lg:flex">Expression:</span> {/* Full label for larger screens */}
          </div>
          <input
            type="text"
            value={expression}
            onChange={handleExpressionChange} // Updates the input value
            onKeyDown={handleKeyDown} // Handles Enter key for submission
            placeholder="" // Empty placeholder for now
            className="grow"
          />
          <kbd className="kbd kbd-sm hidden lg:flex">↵</kbd> {/* Visual hint for Enter key */}
        </label>
        <div className="card-actions">
          {/* Button to submit the input */}
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-2"
          >
            Submit
          </button>
        </div>

        {/* Displays an error message if one exists */}
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

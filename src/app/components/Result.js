'use client';

export default function Results({ history, setHistory }) {
  const clearHistory = () => {
    localStorage.removeItem('calculationHistory');
    setHistory([]); // Clear the shared state
  };

  return (
    <>
      <div className="card-body w-full">
        <h2 className="card-title text-center">Results</h2>

        {history.length > 0 ? (
          <ul className="list-disc list-inside">
            {history.map((result, index) => (
              <li key={index} className="text-sm">{result}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No results yet.</p>
        )}
        <div className="card-actions">
          <button onClick={clearHistory} className="btn btn-secondary w-full">Clear History</button>
        </div>
      </div>
    </>
  );
}

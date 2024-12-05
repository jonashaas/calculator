'use client';

export default function Results({ history, setHistory }) {
  const clearHistory = () => {
    localStorage.removeItem('calculationHistory');
    setHistory([]); // Clear the shared state
  };

  // Hilfsfunktion, um Leerzeichen um Operatoren und Klammern hinzuzufügen
  const formatExpression = (expression) => {
    return expression
      .replace(/([\+\-\*\/\(\)])/g, ' $1 ') // Leerzeichen um Operatoren und Klammern
      .replace(/\s+/g, ' ') // Extra Leerzeichen entfernen
      .trim(); // Entfernt führende/trailende Leerzeichen
  };

  return (
    <>
      <div className="card-body w-full">
        <h2 className="card-title text-center">Results</h2>

        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                {[...history].reverse().map((result, index) => {
                  // Split input and result
                  const [expression, value] = result.split('=');
                  const formattedExpression = formatExpression(expression);

                  return (
                    <tr
                      key={index}
                      className={index === 0 ? 'bg-base-300' : ''}
                    >
                      <th className="w-4">
                        {index === 0 ? (
                          <span className="text-xl">↳</span> // Mark the newest entry
                        ) : (
                          index // Ascending numbering for other entries
                        )}
                      </th>
                      <td className="text-sm pl-1">
                        {formattedExpression} = {value.trim()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        ) : (
          <p className="text-sm">No results yet.</p>
        )}

        <div className="card-actions">
          <button onClick={clearHistory} className="btn btn-secondary w-full">
            Clear History
          </button>
        </div>
      </div>
    </>
  );
}

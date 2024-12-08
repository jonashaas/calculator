'use client';

import { useState, useEffect } from "react";
import NavBar from '@/app/components/NavBar';
import ExpressionInput from '@/app/components/ExpressionInput';
import Results from '@/app/components/Result';
import Card from '@/app/components/Card';

export default function Home() {
  const [history, setHistory] = useState([]);

  // Load history from Local Storage on initial render
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <>
      <NavBar />
      <main className="flex flex-col gap-4 mt-4 mx-auto max-w-xl w-full p-4">
        <h1 className="text-2xl font-bold">Calculator</h1>
        <Card>
          <ExpressionInput setHistory={setHistory} />
        </Card>
        <Card>
          <Results history={history} setHistory={setHistory} />
        </Card>
      </main>
    </>
  );
}

import { useState } from 'react';
import { AddressInput } from './components/AddressInput';
import { TransactionList } from './components/TransactionList';
import { useSolanaTransactions } from './hooks/useSolanaTransactions';

function App() {
  const [address, setAddress] = useState('');

  const { data: transactions = [], isLoading } = useSolanaTransactions(address);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Solana Transaction Monitor
        </h1>
        
        <AddressInput onAddAddress={setAddress} />
        
        {address && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Monitoring address: {address}
            </h2>
            <TransactionList 
              transactions={transactions}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
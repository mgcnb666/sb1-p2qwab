import { format } from 'date-fns';
import { TransactionResponse } from '@solana/web3.js';

interface TransactionListProps {
  transactions: TransactionResponse[];
  isLoading: boolean;
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
  if (isLoading) {
    return <div className="text-center">Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return <div className="text-center">No transactions found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Signature</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.signature} className="border-t">
              <td className="px-4 py-2">
                {format(tx.blockTime! * 1000, 'yyyy-MM-dd HH:mm:ss')}
              </td>
              <td className="px-4 py-2">
                <a
                  href={`https://explorer.solana.com/tx/${tx.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                </a>
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded ${
                  tx.meta?.err ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {tx.meta?.err ? 'Failed' : 'Success'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
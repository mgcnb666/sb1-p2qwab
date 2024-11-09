import { useQuery } from '@tanstack/react-query';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export function useSolanaTransactions(address: string) {
  return useQuery({
    queryKey: ['transactions', address],
    queryFn: async () => {
      const pubKey = new PublicKey(address);
      const signatures = await connection.getSignaturesForAddress(pubKey, { limit: 10 });
      const transactions = await connection.getTransactions(
        signatures.map(sig => sig.signature)
      );
      return transactions.filter((tx): tx is NonNullable<typeof tx> => tx !== null);
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}
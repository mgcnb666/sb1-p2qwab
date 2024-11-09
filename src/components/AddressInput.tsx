import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

interface AddressInputProps {
  onAddAddress: (address: string) => void;
}

export function AddressInput({ onAddAddress }: AddressInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      new PublicKey(address); // Validate Solana address
      onAddAddress(address);
      setAddress('');
    } catch (err) {
      setError('Invalid Solana address');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Solana address"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Address
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
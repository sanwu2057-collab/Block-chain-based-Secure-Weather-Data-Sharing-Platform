
import React from 'react';
import { BlockchainRecord } from '../types';
import { VerifiedIcon } from './Icons';

interface BlockchainViewProps {
  records: BlockchainRecord[];
}

export const BlockchainView: React.FC<BlockchainViewProps> = ({ records }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Blockchain Ledger</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {records.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No critical data has been logged to the blockchain yet.</p>
        ) : (
          [...records].reverse().map(record => (
            <div key={record.id} className="bg-gray-700/50 p-4 rounded-md border border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400">Block #{record.id}</span>
                <span className="flex items-center text-xs text-green-400">
                  <VerifiedIcon className="h-4 w-4 mr-1" />
                  Verified
                </span>
              </div>
              <p className="font-semibold text-white mt-2">{record.useCase} @ {record.location}</p>
              <div className="text-xs text-gray-300 mt-1">
                <span>Temp: {record.temperature}°C</span>
                <span className="mx-2">|</span>
                <span>Humidity: {record.humidity}%</span>
              </div>
              <p className="text-xs text-cyan-400 font-mono mt-3 break-all" title="Data Hash">
                Hash: {record.dataHash}
              </p>
              <p className="text-right text-xs text-gray-500 mt-2">
                {new Date(record.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
       <div className="mt-4 text-xs text-gray-500 text-center p-2 bg-gray-900/50 rounded-md">
        <h4 className="font-semibold text-gray-400">How this works:</h4>
        <p>This is a simulated, immutable ledger. Each time data is fetched for a critical use case, a record is created with a unique hash of the full dataset. This ensures the data is tamper-proof and can be reliably verified for insurance claims, agricultural planning, or disaster analysis.</p>
       </div>
    </div>
  );
};

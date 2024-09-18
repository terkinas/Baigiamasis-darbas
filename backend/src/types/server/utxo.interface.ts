export interface UTXO {
    satoshis?: number;
    script?: string;
    address?: string;
    txid?: string;
    outputIndex?: number;
  }

  interface IaddressInfoResponse {
    address: string;
    chain_stats: {
        funded_txo_sum: number;
        funded_txo_count: number;
        spent_txo_sum: number;
        spent_txo_count: number;
        tx_count: number;
    };
    mempool_stats: {
        funded_txo_sum: number;
        funded_txo_count: number;
        spent_txo_sum: number;
        spent_txo_count: number;
        tx_count: number;
    };
    error: string;
}
const BINANCE_API = "https://api3.binance.com/api/v3/depth?symbol=ETHUSDT";
import { useEffect, useState } from "react";
import axios from "axios";

export interface OrderTableProps {
  data: [string, string][];
  title: string;
}

// OrderTable component used for both the Buy and Sell tables
function OrderTable({ data, title }: OrderTableProps) {
  return (
    <div className="w-full max-w-md border border-gray-200 shadow-lg rounded-lg p-4 md:mx-12">
      <div className="text-2xl font-bold mb-3 text-left">{title}</div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-lg font-bold border-b border-gray-300 p-2 text-left">
              Price (USDT)
            </th>
            <th className="text-lg font-bold border-b border-gray-300 p-2 text-left">
              Amount (BTC)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr key={index}>
              <td className="text-sm border-b border-gray-200 p-2 text-left">
                {order[0]}
              </td>
              <td className="text-sm border-b border-gray-200 p-2 text-left">
                {order[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BuySellTable() {
  const [buySellData, setBuySellData] = useState<{
    bids: [string, string][];
    asks: [string, string][];
  }>({ bids: [], asks: [] });

  useEffect(() => {
    async function getBinanceData() {
      try {
        const response = await axios.get(BINANCE_API);
        const bids = response.data.bids;
        const asks = response.data.asks;
        setBuySellData({ bids, asks });
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    getBinanceData();
  }, []);

  return (
    <div className="flex flex-row w-full items-center p-8 justify-center">
      {/* Buy Orders Table */}
      <OrderTable data={buySellData.bids} title="Buy Orders" />

      {/* Sell Orders Table */}
      <OrderTable data={buySellData.asks} title="Sell Orders" />
    </div>
  );
}


import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const API_URL = "https://api.coingecko.com/api/v3";

export default function Watchcoin() {
  const [timeframe, setTimeframe] = useState("24h");
  const [topCoins, setTopCoins] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    fetchTopCoins();
  }, [timeframe]);

  const fetchTopCoins = async () => {
    try {
      const res = await fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=${timeframe}`);
      const data = await res.json();

      setTopCoins(data.slice(0, 10));

      const sorted = [...data].sort((a, b) => {
        return b[`price_change_percentage_${timeframe}_in_currency`] - a[`price_change_percentage_${timeframe}_in_currency`];
      });

      setGainers(sorted.slice(0, 10));
      setLosers(sorted.reverse().slice(0, 10));
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const timeframes = ["1h", "24h", "7d"];

  const renderCoinList = (list) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {list.map((coin) => (
        <Card key={coin.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="font-bold">{coin.name}</div>
              <div className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</div>
            </div>
            <div className="mt-2">Price: ${coin.current_price.toLocaleString()}</div>
            <div className={\`mt-1 \${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}\`}>
              Change ({timeframe}): {coin[\`price_change_percentage_\${timeframe}_in_currency\`]?.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Watchcoin</h1>
      <div className="mb-4 flex space-x-2">
        {timeframes.map((t) => (
          <Button key={t} variant={t === timeframe ? "default" : "outline"} onClick={() => setTimeframe(t)}>
            {t.toUpperCase()}
          </Button>
        ))}
      </div>
      <Tabs defaultValue="top">
        <TabsList>
          <TabsTrigger value="top">Top 10 Coins</TabsTrigger>
          <TabsTrigger value="gainers">Top 10 Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top 10 Losers</TabsTrigger>
        </TabsList>
        <TabsContent value="top">{renderCoinList(topCoins)}</TabsContent>
        <TabsContent value="gainers">{renderCoinList(gainers)}</TabsContent>
        <TabsContent value="losers">{renderCoinList(losers)}</TabsContent>
      </Tabs>
    </main>
  );
}


import PriceChart from "./components/PriceChart";
import ChatBox from "./components/ChatBox";

// Simulasi data chart
const chartData = Array.from({ length: 30 }, (_, i) => ({
  time: `T-${30 - i}`,
  price: (100 + Math.random() * 20).toFixed(2),
}));

// Tambahkan di bawah Tabs
export function WatchcoinWithExtras() {
  return (
    <>
      <Watchcoin />
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Sample Price Chart</h2>
        <PriceChart data={chartData} />
        <ChatBox />
      </div>
    </>
  );
}

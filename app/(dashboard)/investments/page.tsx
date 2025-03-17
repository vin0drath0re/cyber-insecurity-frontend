"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { accounts } from "@/data/mockData";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Plus,
  PieChart,
  BarChart3,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import InvestmentModal from "@/components/modals/InvestmentModal";

const Investments = () => {
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const investmentAccounts = accounts.filter(
    (account) => account.type === "investment"
  );
  const totalInvestments = investmentAccounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  // Mock data for portfolio breakdown
  const portfolioBreakdown = [
    {
      type: "Stocks",
      percentage: 45.0,
      amount: 12780.0,
      change: 2.4,
    },
    {
      type: "Mutual Funds",
      percentage: 30.0,
      amount: 8520.0,
      change: 1.2,
    },
    {
      type: "ETFs",
      percentage: 15.0,
      amount: 4260.0,
      change: -0.8,
    },
    {
      type: "Bonds",
      percentage: 10.0,
      amount: 2840.0,
      change: 0.3,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(2) + "%";
  };

  const handleInvestmentSubmit = (data: any) => {
    toast.success(
      `${formatCurrency(data.amount)} invested in ${data.symbol} (${
        data.investmentType
      })`
    );
    setIsInvestmentModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-[#1C1727]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Investments
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your investment portfolio
          </p>
        </div>
        <Button
          onClick={() => setIsInvestmentModalOpen(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#231F2E] border-gray-200 dark:border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-200">
              Total Portfolio Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              $28,400.00
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +4.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#231F2E] border-gray-200 dark:border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-200">
              Today's Gain/Loss
            </CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+$1,250.75</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +1.2% today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#231F2E] border-gray-200 dark:border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-200">
              YTD Return
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+8.5%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +$2,414.00 this year
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-[#231F2E] border-gray-200 dark:border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Portfolio Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioBreakdown.map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.type}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatPercentage(item.percentage)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-right font-medium text-gray-900 dark:text-white">
                    $
                    {item.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span
                    className={`flex items-center text-xs ${
                      item.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.change >= 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {item.change >= 0 ? "+" : ""}
                    {Math.abs(item.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-gray-100 dark:bg-[#231F2E] p-1 rounded-lg">
          <TabsTrigger
            value="all"
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-[#7C3AED] data-[state=active]:text-[#7C3AED] dark:data-[state=active]:text-white"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            All
          </TabsTrigger>
          <TabsTrigger
            value="stocks"
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-[#7C3AED] data-[state=active]:text-[#7C3AED] dark:data-[state=active]:text-white"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Stocks
          </TabsTrigger>
          <TabsTrigger
            value="funds"
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-[#7C3AED] data-[state=active]:text-[#7C3AED] dark:data-[state=active]:text-white"
          >
            <PieChart className="h-4 w-4 mr-2" />
            Funds
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {investmentAccounts.map((account) => (
            <Card
              key={account.id}
              className="bg-white dark:bg-[#231F2E] border-gray-200 dark:border-0"
            >
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  {account.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {formatCurrency(account.balance)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Number: {account.number}
                </p>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                    onClick={() => setIsInvestmentModalOpen(true)}
                  >
                    Invest More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Symbol</span>
                  <span className="font-medium">Shares</span>
                  <span className="font-medium">Price</span>
                  <span className="font-medium">Value</span>
                  <span className="font-medium">Gain/Loss</span>
                </div>
                {[
                  {
                    symbol: "AAPL",
                    shares: 10,
                    price: 175.34,
                    value: 1753.4,
                    gain: 12.5,
                  },
                  {
                    symbol: "MSFT",
                    shares: 5,
                    price: 340.67,
                    value: 1703.35,
                    gain: 8.2,
                  },
                  {
                    symbol: "GOOGL",
                    shares: 3,
                    price: 129.45,
                    value: 388.35,
                    gain: -2.1,
                  },
                ].map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{stock.symbol}</span>
                    <span>{stock.shares}</span>
                    <span>{formatCurrency(stock.price)}</span>
                    <span>{formatCurrency(stock.value)}</span>
                    <span
                      className={
                        stock.gain >= 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {stock.gain >= 0 ? "+" : ""}
                      {stock.gain}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => setIsInvestmentModalOpen(true)}
                >
                  Buy Stock
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.success("Sell stock feature coming soon")
                  }
                >
                  Sell Stock
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mutual Funds & ETFs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Fund</span>
                  <span className="font-medium">Type</span>
                  <span className="font-medium">Units</span>
                  <span className="font-medium">NAV</span>
                  <span className="font-medium">Value</span>
                </div>
                {[
                  {
                    name: "Vanguard S&P 500",
                    type: "ETF",
                    units: 15,
                    nav: 420.35,
                    value: 6305.25,
                  },
                  {
                    name: "Fidelity Growth",
                    type: "Mutual Fund",
                    units: 45.25,
                    nav: 35.67,
                    value: 1614.07,
                  },
                  {
                    name: "iShares Russell 2000",
                    type: "ETF",
                    units: 8,
                    nav: 190.45,
                    value: 1523.6,
                  },
                ].map((fund) => (
                  <div
                    key={fund.name}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{fund.name}</span>
                    <span>{fund.type}</span>
                    <span>{fund.units}</span>
                    <span>{formatCurrency(fund.nav)}</span>
                    <span>{formatCurrency(fund.value)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => setIsInvestmentModalOpen(true)}
                >
                  Invest in Fund
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.success("Redeem fund feature coming soon")
                  }
                >
                  Redeem Fund
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        onSubmit={handleInvestmentSubmit}
      />
    </div>
  );
};

export default Investments;

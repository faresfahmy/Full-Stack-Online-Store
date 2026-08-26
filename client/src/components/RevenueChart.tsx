import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { MoreHorizontal } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const RevenueChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchRevenueData = async () => {
      try {
        const dataFromAPI = [
          { month: 'Jan', revenue: 120000 },
          { month: 'Feb', revenue: 210000 },
          { month: 'Mar', revenue: 160000 },
          { month: 'Apr', revenue: 280000 },
          { month: 'May', revenue: 200000 },
          { month: 'Jun', revenue: 320000 },
          { month: 'Jul', revenue: 290000 },
          { month: 'Aug', revenue: 420000 },
        ];
        setChartData(dataFromAPI);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 20 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2 bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Revenue Forecast</h2>
        <button className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Dynamic Chart Container */}
      <div className="w-full h-[280px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
            Loading chart data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#1e293b" />

              <XAxis
                dataKey="month"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val / 1000}k`}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#070c18',
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }}
                formatter={(val) => [`$${val?.toLocaleString()}`, 'Revenue']}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22d3ee"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#revenueGradient)"
                dot={{ stroke: '#22d3ee', strokeWidth: 2, r: 4, fill: '#070c18' }}
                activeDot={{ r: 6, fill: '#22d3ee' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default RevenueChart;
import React from 'react';
import { motion } from "framer-motion"
import { 
  Calendar, 
  Download, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  PlusCircle,
  Gem,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import RevenueChart from '../components/RevenueChart';

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen bg-[#070c18] text-white p-6 sm:p-8 ">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <motion.div
          initial={{x:-20, opacity:0}}
          animate={{x:0, opacity:20}}
          transition={{duration:0.5}}

          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Welcome back, Curator. Here is your daily performance summary.
            </p>
          </motion.div>
        </div>

        {/* 4 Stat Cards */}
        <motion.div
        initial={{y:-20, opacity:0}}
        animate={{y:0, opacity:20}}
        transition={{duration:0.5}}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Card 1: Total Revenue */}
          <div className="bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-[#34d399]" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#34d399] bg-[#22d3ee]/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +13.8%
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-white">$2,459,200</h3>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#34d399]" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#34d399] bg-[#22d3ee]/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +8.3%
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold text-white">1,248</h3>
            </div>
          </div>

          {/* Card 3: Active VIP Users */}
          <div className="bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-rose-400" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                <TrendingDown className="w-3 h-3" /> -2.4%
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Active VIP Users</p>
              <h3 className="text-2xl font-bold text-white">8,492</h3>
            </div>
          </div>

          {/* Card 4: Avg. Order Value */}
          <div className="bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-[#34d399]" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#34d399] bg-[#22d3ee]/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +15.7%
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Avg. Order Value</p>
              <h3 className="text-2xl font-bold text-white">$4,250</h3>
            </div>
          </div>

        </motion.div>

        {/* Charts & Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart />

          {/* Recent Activity Section (1 Column) */}
          <motion.div
          initial={{x:20, opacity:0}}
          animate={{x:0, opacity:20}}
          transition={{duration:0.5}}
          className="bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
            <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>

            <div className="space-y-6">
              
              {/* Item 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#22d3ee]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <PlusCircle className="w-4 h-4 text-[#34d399]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 leading-snug">
                    New order #ORD-992
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    2 mins ago • $12,400
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Gem className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 leading-snug">
                    Elena R. upgraded to VIP
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    45 mins ago
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 leading-snug">
                    Midnight Collection restocked
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    2 hours ago
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#22d3ee]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 leading-snug">
                    Concierge ticket resolved
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    5 hours ago
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default DashboardAdmin;
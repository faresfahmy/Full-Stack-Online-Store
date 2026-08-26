import React from 'react'
import Menu from './Menu'
import { assets } from '../assets/assets'
import { Armchair, Watch, Shirt, Gem, Sparkles, ArrowRight, ShoppingBagIcon, Laptop, ShirtIcon, HomeIcon, WatchIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
const categories = [
  { id: 1, name: "Electronics", icon: Laptop },
  { id: 2, name: "Apparel & Fashion", icon: ShirtIcon },
  { id: 3, name: "Home & Kitchen", icon: HomeIcon },
  { id: 4, name: "Accessories & Gear", icon: WatchIcon },
  { id: 5, name: "Accessories", icon: SparklesIcon },
];

export default function adminHome() {
  return (
    <div className="w-full min-h-screen relative bg-[#080d1a]">

      <Menu />

      <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 font-sans max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 20 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[1100px] min-h-[300px] sm:min-h-[350px] md:h-[380px] mx-auto mb-8 sm:mb-10 rounded-2xl overflow-hidden flex items-center p-6 sm:p-10 md:p-12">
          <img
            src={assets.sponsored_img}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dynamic Overlay for mobile & desktop */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#080d1a] via-[#080d1a]/90 to-[#080d1a]/40 sm:from-[#080d1a]/95 sm:via-[#080d1a]/80 sm:to-transparent" />

          <div className="relative z-10 w-full max-w-[500px]">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.2] sm:leading-[1.1] mb-3 sm:mb-4 tracking-tight">
              Track your store's statistics<br className="hidden sm:inline" />{" "}
              <span className="text-[#00e699]">Now</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8 leading-relaxed">
              Monitor sales performance, visitor traffic, and the latest orders in real-time via a smart, comprehensive dashboard.
            </p>

            <Link
              to="/dashboardadmin"
              className="inline-block bg-[#00e699] hover:bg-[#00c784] text-[#080d1a] font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors cursor-pointer border-none"
            >
              Dashboard View
            </Link>
          </div>
        </motion.div>
        {/* Categories Section */}
        <section className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Categories</h2>
            <a href="#" className="flex items-center gap-1.5 text-xs font-semibold text-[#00e699] hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Grid: 2 columns on mobile, 3 on tablets, 5 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category:any,i:number) => {
              const Icon = category.icon;
              return (
                <motion.button
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 20 }}
                  transition={{ duration: i/2 }}
                  key={category.id}
                  className="bg-[#121929]/70 hover:bg-[#162035] border border-slate-800/40 rounded-xl py-3.5 sm:py-4 px-4 sm:px-5 flex items-center gap-3 transition-colors cursor-pointer text-left"
                >
                  <Icon className="w-4 h-4 text-[#00e699] shrink-0" />
                  <span className="text-xs font-medium text-slate-200 truncate">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

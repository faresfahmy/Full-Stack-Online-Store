import React, { useState } from "react";
import { Upload, ChevronDown, Plus, Image as ImageIcon } from "lucide-react";


export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    publishImmediately: true,
  });
  // const [file,setFile] = 
  return (
    <div className="min-h-screen bg-[#070c18] text-slate-200 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
              <span className="hover:text-slate-200 cursor-pointer">Dashboard</span>
              <span>/</span>
              <span className="hover:text-slate-200 cursor-pointer">Products</span>
              <span>/</span>
              <span className="text-slate-100 font-semibold">Add New</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Add New Product
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0f172a] hover:bg-[#1e293b] text-slate-300 border border-slate-700/80 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#10b981] hover:bg-[#059669] text-white transition-all cursor-pointer shadow-lg shadow-[#10b981]/10"
            >
              Save Product
            </button>
          </div>
        </div>

        {/* Form Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left / Main Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Information Card */}
            <div className="bg-[#0f172a]/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-5">
              <h2 className="text-base font-semibold text-white tracking-wide">
                General Information
              </h2>

              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0b1120] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0b1120] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 focus:outline-none focus:border-slate-700 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="peripherals">Peripherals</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">
                    Description
                  </label>
                  <span className="text-[11px] text-slate-500">Optional</span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Enter product details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0b1120] border border-slate-800 rounded-xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 resize-none transition-all"
                />
              </div>
            </div>

            {/* Inventory & Pricing Card */}
            <div className="bg-[#0f172a]/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-5">
              <h2 className="text-base font-semibold text-white tracking-wide">
                Inventory & Pricing
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Base Price */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Base Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all"
                    />
                  </div>
                </div>

                {/* Stock Quantity */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-[#0b1120] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-6">
            
            {/* Media Card */}
            <div className="bg-[#0f172a]/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white tracking-wide">
                  Media
                </h2>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  REQUIRED
                </span>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center hover:border-slate-700 transition-colors cursor-pointer bg-[#0b1120]/50 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1e293b]/60 flex items-center justify-center text-slate-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-300">
                    <span className="text-[#10b981] cursor-pointer hover:underline">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[10px] text-slate-500 tracking-tight">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              </div>

              {/* Image Previews / Upload Slots */}
              <div className="flex items-center gap-3 pt-1">
                {/* Uploaded Thumbnail Placeholder */}
                <div className="w-12 h-12 rounded-xl bg-[#0b1120] border border-slate-800 overflow-hidden relative group cursor-pointer flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-slate-600" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white">Edit</span>
                  </div>
                </div>

                {/* Add More Thumbnail Button */}
                <button
                  type="button"
                  className="w-12 h-12 rounded-xl bg-[#0b1120] border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visibility Card */}
            <div className="bg-[#0f172a]/90 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-white tracking-wide">
                Visibility
              </h2>

              <div className="bg-[#0b1120] border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">
                    Publish Immediately
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Make product live upon saving
                  </p>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, publishImmediately: !formData.publishImmediately })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                    formData.publishImmediately ? "bg-[#10b981]" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      formData.publishImmediately ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
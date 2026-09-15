import React, { useRef, useState } from "react";
import { Upload, ChevronDown, Plus, Image as ImageIcon } from "lucide-react";
import { categoriesProduct } from "../../mock/categories";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAddProducts } from "../../api/api.product";


export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: categoriesProduct[0],
    description: "",
    price: "",
    quantity: "",
    couponCode: ""
  });
  const [files, setFiles] = useState<File[]>([]);
  const [error,setError] = useState<string|null>();
  const [urlPreviews, setUrlPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleSelectedFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFiles((prev) => [...(prev ?? []), selectedFile]);
      const urlObj = URL.createObjectURL(selectedFile);
      setUrlPreviews((prev) => [...(prev ?? []), urlObj]);
    }
  }

  const handleEditeImage = (imageIndex: number) => {
    const arrNewFile = files.filter((file: File, index: number) => index != imageIndex);
    const arrNewUrlPreviews = urlPreviews.filter((url: string, index: number) => index != imageIndex);
    setFiles((prev) => arrNewFile);
    setUrlPreviews((prev) => arrNewUrlPreviews);
    return arrNewUrlPreviews && arrNewFile;
  }
  const mutation = useMutation({
    mutationFn: fetchAddProducts,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
      console.log(res);
    },
    onError: (res) => {
      console.log(res);
    }
  })
  const handleSaveProduct = () => {
    if (
      formData.category.trim() != "" &&
      Number(formData.couponCode.trim()) >= 0 &&
      formData.name.trim() != "" &&
      Number(formData.price.trim()) != 0 &&
      Number(formData.quantity.trim()) >=1&&
      files.length>0
    ) {
      let form = new FormData();
      files.forEach((file:File, i:number)=>{
      form.append(`img_product`,file);
    })
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("description", formData.description);
    form.append("product_name", formData.name);
    form.append("category", formData.category)
    mutation.mutate({ dataForm:form });
      setError(null)
    }
    else{
      setError("Please enter the product details correctly")
    }
  }
  return (
<div className="min-h-screen bg-[#070c18] text-slate-200 p-4 sm:p-6 md:p-8 font-sans pb-24 sm:pb-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Add New Product
            </h1>
          </div>

          {/* Action Buttons*/}
          <div className="fixed bottom-0 left-0 w-full p-4 bg-[#070c18]/80 backdrop-blur-xl border-t border-slate-800/80 z-50 flex items-center justify-end gap-3 sm:relative sm:bottom-auto sm:left-auto sm:w-auto sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:z-auto">
            <button
              onClick={() => navigate("/products")}
              type="button"
              className="flex-1 sm:flex-none px-5 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#0f172a] hover:bg-[#1e293b] text-slate-300 border border-slate-700/80 transition-all cursor-pointer active:scale-95"
            >
              Cancel
            </button>
            <button
              disabled={mutation.isPending}
              type="submit"
              onClick={()=>handleSaveProduct()}
              className="flex-1 sm:flex-none px-5 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#10b981] hover:bg-[#059669] text-white transition-all cursor-pointer shadow-lg shadow-[#10b981]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>
        {error?(
          <span className=" w-full py-5 text-center  text-red-600 font-semibold ">{error}</span>
        ):null  
      }
        {/* Form Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">

          {/* Left / Main Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">

            {/* General Information Card */}
            <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-5 shadow-sm">
              <h2 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                General Information
              </h2>

              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 ml-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0b1120] border border-slate-800 rounded-xl px-4 py-3 sm:py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/10 transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 ml-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0b1120] border border-slate-800 rounded-xl px-4 py-3 sm:py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/10 appearance-none cursor-pointer transition-all"
                  >
                    <option value="" disabled>Select a category</option>
                    {categoriesProduct.map((category: string, index: number) => (
                      <option value={category} key={index}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-medium text-slate-300">
                    Description
                  </label>
                  <span className="text-[10px] sm:text-[11px] text-slate-500">Optional</span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Enter product details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0b1120] border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/10 resize-none transition-all"
                />
              </div>
            </div>

            {/* Inventory & Pricing Card */}
            <div className="bg-[#0f172a]/80 backdrop-blur-md  border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-5 shadow-sm">
              <h2 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Inventory & Pricing
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Base Price */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 ml-1">
                    Base Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                      $
                    </span>
                    <input
                      min={0}
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-8 pr-4 py-3 sm:py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Stock Quantity */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 ml-1">
                    Stock Quantity
                  </label>
                  <input
                    min={1}
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-[#0b1120] border border-slate-800 rounded-xl px-4 py-3 sm:py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/10 transition-all"
                  />
                </div>

                {/* Coupon Code */}
                <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
                  <label className="text-xs font-medium text-slate-300 ml-1">
                    Coupon Code
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                      %
                    </span>
                    <input
                      min={0}
                      max={99}
                      type="number"
                      placeholder="0"
                      value={formData.couponCode}
                      onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                      className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-8 pr-4 py-3 sm:py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/10 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-4 sm:space-y-6">

            {/* Media Card */}
            <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                  Media
                </h2>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 uppercase bg-[#0b1120] px-2 py-1 rounded-md border border-slate-800">
                  REQUIRED
                </span>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onClick={() => files.length != 4 && fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700/60 rounded-xl p-6 sm:p-8 text-center hover:border-[#10b981]/50 hover:bg-[#10b981]/5 transition-all cursor-pointer bg-[#0b1120]/40 flex flex-col items-center justify-center space-y-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1e293b]/60 flex items-center justify-center text-slate-400 group-hover:text-[#10b981] group-hover:bg-[#10b981]/10 transition-all">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs sm:text-sm font-medium text-slate-300">
                    <span className="text-[#10b981]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              </div>

              {/* Image Previews / Upload Slots */}
              <div className="flex items-center gap-3 pt-2 overflow-x-auto pb-2 scrollbar-hide">
                
                {/* Uploaded Thumbnail Placeholder */}
                {urlPreviews?.map((url: string, index: number) => (
                  <div
                    onClick={() => handleEditeImage(index) && fileInputRef.current?.click()}
                    key={index}
                    className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-[#0b1120] border border-slate-700/80 overflow-hidden relative group cursor-pointer flex items-center justify-center shadow-inner"
                  >
                    <img src={url} alt="preview" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-[#070c18]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] sm:text-xs font-medium text-white">Edit</span>
                    </div>
                  </div>
                ))}

                {/* Add More Thumbnail Button */}
                <div
                  onClick={() => files.length != 4 && fileInputRef.current?.click()}
                  className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-[#0b1120]/50 border border-dashed border-slate-700 hover:border-[#10b981]/50 hover:bg-[#10b981]/5 flex items-center justify-center text-slate-500 hover:text-[#10b981] transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleSelectedFile(e.target.files[0])}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
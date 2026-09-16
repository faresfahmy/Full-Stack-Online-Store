import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useGetAllOrders } from "../../lib/orders.query";
import PaginationCustom from "../../components/PaginationCustom";
import { ORDER_RESPONSE } from "../../../types/types";
import { v4 as uuidv4 } from 'uuid';



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
   const [page, setPage] = useState<number>(1);
   const [search, setSearch] = useState<string>("")
   const {data, isLoading} = useGetAllOrders(page, searchTerm);
   const countPages = data?.data.pages;
   const handleNextPage = (currentPage?:number)=>{
     if(currentPage){
         setPage(currentPage);
     }
     else{
         setPage((prev)=>prev+1)
     }
   };
   const handlePreviousPage = ()=>setPage((prev)=>prev-1);
   console.log(data);
  return (
    <div className="min-h-screen bg-[#0b101e] text-slate-200 p-4 sm:p-8 font-sans relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] bg-[#10b981]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Inventory Management
            </h1>
            <p className="text-sm sm:text-base text-slate-400">
              Oversee and update your exclusive product catalogue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search SKU or Title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#151c2c]/80 border border-slate-700/50 rounded-xl pl-4 pr-10 py-3 sm:py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </motion.div>

        {/* Table Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#151c2c]/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="py-5 px-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase w-24">Image</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Title & Category</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase text-center">SKU</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Price</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase text-center">Buyer</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase text-center">Payment Status</th>
                </tr>
              </thead>
              <motion.tbody 
                // variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-slate-700/30"
              >
                {data?.data.orders.map((order:ORDER_RESPONSE) => (
                  <motion.tr 
                    // variants={rowVariants}
                    key={uuidv4()} 
                    className="hover:bg-slate-800/20 transition-colors group"
                  >
                    {/* Image */}
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded-xl bg-[#0b101e] border border-slate-700/50 flex items-center justify-center overflow-hidden shadow-inner">
                        {(() => {
                          const imageUrl = Array.isArray(order.idProduct.img_product)
                            ? order.idProduct.img_product[0]?.secure_url
                            : order.idProduct.img_product?.secure_url;

                          return imageUrl ? (
                            <img src={imageUrl} alt={order.idProduct.product_name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-slate-600" />
                          );
                        })()}
                      </div>
                    </td>

                    {/* Title & Category */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white mb-0.5">{order.idProduct.product_name}</span>
                        <span className="text-xs text-slate-400 font-medium">{order.idProduct.category}</span>
                      </div>
                    </td>

                    {/* SKU */}
                  <td className="text-center">
                      <div className="flex items-center justify-center  ">
                        {order.idProduct.quantity}
                      </div>
                    </td>
                    {/* Price */}
                    <td className="py-4 px-6 text-sm font-bold text-white">
                      {order.idProduct.price}
                    </td>

                    <td className="text-center">
                      <div className="flex items-center justify-center  ">
                        {order.idBuyer.full_name}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        {order.paymentStatus}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
                  {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="text-center sm:text-left">
              Showing <span className="font-semibold text-white">{page}-{data?.data.pages}</span> of{' '}
              <span className="font-semibold text-white">{data?.data.count}</span> products
            </div>
            {
                countPages!=1&&(
                                <div className="flex items-center  sm:mr-10" >
                <PaginationCustom page={page} handlePageMenus={handlePreviousPage} handlePagePlus={handleNextPage} countPages={countPages||1}/>
            </div>
                )
            }
          </div>
        </motion.div>

      </div>
    </div>
  );
}
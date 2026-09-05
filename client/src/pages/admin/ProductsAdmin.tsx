import React, { useState } from 'react';
import { Search, ChevronDown, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { categoriesProduct } from '../../mock/categories';
import { v4 as uid4 } from 'uuid';
import PaginationCustom from '../../components/PaginationCustom';
import { useGetAllProduct } from '../../lib/product.query';
import { motion } from "framer-motion"

import ItemProduct from '../../components/ItemProduct';
import Selekton from '../../components/Selekton';
import { Link } from 'react-router-dom';
export default function ProductsAdmin() {
  const [page, setPage] = useState<number>(1);
  const [categorySelected, setCategorySelect] = useState<string>("all")
  const [search, setSearch] = useState<string>("")
  const {data, isLoading} = useGetAllProduct(page, search, categorySelected);
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
  console.log(categorySelected)
  return (
    <div className="min-h-screen bg-[#070c18] text-slate-200 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Products Directory</h1>
            <p className="text-xs text-slate-400 mt-0.5 sm:mt-1">{data?.data.count} total items</p>
          </div>
          <Link to={"/products/add-product"} className=" cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-white font-semibold px-4 py-2 rounded-xl text-sm  border border-[#10b981]/40 border-dashed w-full sm:w-auto">
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <motion.div
          initial={{y:-20, opacity:0}}
          animate={{y:0, opacity:20}} className="bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
              onKeyDown={(e)=>{
                if(e.currentTarget.value.trim()!=""&&e.key=='Enter'){
                    setSearch(e.currentTarget.value.trim())
                }
              }}
                type="text"
                placeholder="Search by product name, SKU..."
                className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select onChange={(e)=>setCategorySelect(e.target.value)} className="w-full sm:w-auto flex items-center justify-between gap-6 bg-[#0b1120] border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 font-medium">
                {
                categoriesProduct.map((category:string, i:number)=>(
                    <option value={category} key={i}>{category}</option>
                ))
                }
              </select>
            </div>
          </div>
        </motion.div>

        {/* Table Container */}
        <motion.div
          initial={{x:-20, opacity:0}}
          animate={{x:0, opacity:20}}
          transition={{duration:0.5}} className="bg-[#0f172a]/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-800/80 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  <th className="py-4 px-4 sm:px-6">PRODUCT</th>
                  <th className="py-4 px-4 sm:px-6">CATEGORY</th>
                  <th className="py-4 px-4 sm:px-6">PRICE</th>
                  <th className="py-4 px-4 sm:px-6">QUANTITY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs">
            
                {isLoading? Array.from({ length: 5 }).map((_, i:number)=>(
                    <tr>
                      <td>
                        <Selekton key={i} width={595} />
                      </td>
                      <td>
                        <Selekton key={i} width={150} />
                      </td>
                      <td>
                        <Selekton key={i} width={150} />
                      </td>
                      <td>
                        <Selekton key={i} width={150} />
                      </td>
                    </tr>
                ))
                    :
                    data?.data.products.map((product) => (
                    <ItemProduct key={product._id} detailsProduct={product} />
                ))}
              </tbody>
            </table>
          </div>

        </motion.div>
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
      </div>
    </div>
  );
}
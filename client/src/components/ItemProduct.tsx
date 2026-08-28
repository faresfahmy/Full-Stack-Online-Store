import React from 'react'
import { productTypes } from '../../types/types'



export default function ItemProduct({detailsProduct}:{detailsProduct:productTypes}) {
    return (
        <tr key={detailsProduct._id} className="hover:bg-slate-800/20 transition-colors">
            <td className="py-4 px-4 sm:px-6">
                <div className="flex items-center gap-3 min-w-[200px]">
                    <img
                        src={detailsProduct.img_product?.secure_url}
                        alt={detailsProduct.product_name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-slate-700/50 shrink-0"
                    />
                    <div>
                        <p className="font-semibold text-white text-sm">{detailsProduct.product_name}</p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">{detailsProduct.sku}</p>
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                <span className="inline-block bg-[#1e1b4b]/60 text-[#818cf8] border border-[#4338ca]/30 px-3 py-1 rounded-full text-[11px] font-medium">
                    {detailsProduct.category}
                </span>
            </td>

            <td className="py-4 px-4 sm:px-6 font-semibold text-white whitespace-nowrap">
                ${detailsProduct.price}
            </td>

            <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${detailsProduct.quantity >=50
                                ? 'bg-[#10b981]'
                                : detailsProduct.quantity < 50
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                            }`}
                    />
                    <span className="text-slate-300 font-medium">{detailsProduct.quantity}</span>
                </div>
            </td>
        </tr>
    )
}

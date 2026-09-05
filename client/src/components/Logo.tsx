import { ShoppingBag } from 'lucide-react'
import React from 'react'

export default function Logo({className, classNameText}:{className?:string, classNameText?:string}) {
    return (
        <div className={`flex items-center  ${className}`}>
          <div className={`sm:w-12 sm:h-12 h-7 w-7 max-sm:p-0  bg-[#1a253a]  rounded-full flex items-center justify-center mr-4`}>
            <ShoppingBag className="sm:w-6/12 sm:h-6/12 h-4/7 w-4/7  text-[#34d399]" />
          </div>
          <h1 className={`m-0 ${classNameText||'text-xl'} font-semibold text-[#34d399] leading-tight`}>VortexStore</h1>
        </div>
    )
}

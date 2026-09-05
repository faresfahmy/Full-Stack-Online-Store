import React, { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { X, Menu } from "lucide-react"
export default function layout() {
    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    const handleShowSidebar = useCallback((value: boolean): void => {
        setShowSidebar(value)
    },[])

    return (
        <div className=' max-w-screen min-h-screen bg-[#0F172A] relative flex' onScroll={(e) => {
            e.target.addEventListener("scroll", () => {
                scrollX == 640 && setShowSidebar(false)
            })
        }}>
            <div className=' z-10  min-md:w-[calc(100%-240px)] overflow-y-auto w-full absolute right-0 top-0 '>
                <Outlet />
            </div>
            <Sidebar showSidebar={showSidebar} setShowSidebar={handleShowSidebar} />
            
            <div className=' z-50 right-2 top-2 md:hidden fixed'>
                {
                    showSidebar ? (
                        <X size={10} onClick={() => setShowSidebar(false)} className=' w-10 h-10 bg-red-700 p-2 font-semibold text-white rounded-2xl' />
                    ) : (
                        <Menu size={10} onClick={() => setShowSidebar(true)} className=' w-10 h-10 bg-[#353537] p-2 font-semibold text-white rounded-2xl ' />

                    )
                }

            </div>

            {showSidebar && (<div className={` max-md:bg-black/40 max-md:z-40 max-md:w-screen max-md:h-screen max-md:backdrop-blur-2xl  max-md:top-0 max-md:left-0 fixed `} ></div>)}
        </div>
    )
}

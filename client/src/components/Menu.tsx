import { Bell, BellRing, Search, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { useUserContext } from '../context/userContextProvider'
import { Link } from 'react-router-dom';

export default function Menu() {
    const user = useUserContext();
    const [hover, setHover] = useState<boolean>(false)
    return (
        <header className="w-full bg-[#0c1221] relative px-8 py-4 flex items-center justify-between border-b border-[#1e293b]">
            {/* Search Bar Section */}
            <div className="relative w-[360px]">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-[#64748b]" />
                </div>
                <input
                    type="text"
                    placeholder="Search curated collections..."
                    className="w-full bg-[#141b2d] text-sm text-slate-200 placeholder-[#64748b] pl-10 pr-4 py-2.5 rounded-lg border border-[#1e293b]/50 focus:outline-none focus:border-[#34d399]/50 transition-colors"
                />
            </div>

            {/* Right Actions (Cart, Notifications, Avatar) */}
            <div className="flex items-center gap-5">
                {/* Shopping Cart Button with Notification Dot */}
                <button className="relative p-2 text-slate-300 hover:text-white transition-colors border-none bg-transparent cursor-pointer">
                    <ShoppingCart className="w-5 h-5" />
                    {/* Green notification dot */}
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#34d399] rounded-full ring-2 ring-[#0c1221]" />
                </button>

                {/* Notifications Button */}
                <button className="p-2 animate-pulse text-slate-300 hover:text-white transition-colors border-none bg-transparent cursor-pointer">
                    <Bell className="w-5 h-5" />
                </button>

                {/* User Avatar */}
                <Link to="/profile" className="relative cursor-pointer w-9 h-9 rounded-full" onMouseMove={() => {
                    setHover(true);
                }}
                    onMouseLeave={() => {
                        setHover(false)
                    }}>
                    <img
                        src={user?.data.avatar?.secure_url}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover ring-2 ring-[#1e293b] hover:ring-[#34d399] transition-all"
                    />
                </Link>{
                    hover && (
                        <div className=' bg-[#374257] flex flex-col justify-center  h-15 p-1 rounded-br-xl rounded-bl-xl rounded-tl-xl absolute right-15 top-8 transition  duration-200 border-gray-300/20 border-[1px] after:absolute after:-top-0 after:-right-0.5 after:bg-[#374257] after:w-2 after:h-1'>
                            <span className=' text-white text-sm '>{user?.data.full_name}</span>
                            <span className=' text-white text-sm '>{user?.data.email}</span>
                        </div>
                    )
                }

            </div>
        </header>
    )
}

import React from 'react'
import { motion } from "framer-motion"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from "../assets/assets"
import { CircleArrowDownIcon, Gem, ListOrdered, Grid3X3, LayoutDashboardIcon, Package, ShoppingBag, UserCircle, } from "lucide-react"
import { Home, Settings } from 'lucide-react'
import Logo from './Logo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchLogoutUser } from '../api/api.user'
const navLinks = [
  {
    page: "Home",
    link: "/",
    Icon: <Home className='w-5 h-5 mr-4' />
  },
  {
    page: "Dashboard",
    link: "/dashboardadmin",
    Icon: <LayoutDashboardIcon className='w-5 h-5 mr-4' />
  },
  {
    page: "Gategories",
    link: "/gategories",
    Icon: <Grid3X3 className='w-5 h-5 mr-4' />
  },
  {
    page: "Products",
    link: "/products",
    Icon: <Package className='w-5 h-5 mr-4' />
  }
  ,
  {
    page: "Orders",
    link: "/orders",
    Icon: <ListOrdered className='w-5 h-5 mr-4' />
  }
]
export default function Sidebar({ showSidebar, setShowSidebar }: { showSidebar: boolean, setShowSidebar: (value: boolean) => void }) {
    const navigate = useNavigate();
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:fetchLogoutUser,
    onSuccess:()=>{
      console.log("Logout SuccessFully")
      queryClient.setQueryData(["currentUser"], null)
      queryClient.invalidateQueries({queryKey:["currentUser"]})
      navigate("/")
    },
    onError:()=>{
      console.log("Logout Error")
    }
  })
  const handleLogout = ()=>{
    mutation.mutate()
  }
  const handleClickLink = () => {
    if (window.innerWidth < 640) {
      setShowSidebar(false)
    }
  }

  return (
    <motion.div className={` w-60 overflow-hidden max-sm:w-50 min-h-screen  py-10  space-y-10
      border border-r-gray-500/20 shadow-[0_0_6_rgba(0,0,0,0.7)] 
     bg-[#0F172A]   fixed top-0 left-0
     ${showSidebar ? 'max-md:left-0' : '  max-md:-left-100'} transition-all duration-200 z-50 flex flex-col
     `}
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: -1 }}
    >
      <div className='px-5  flex flex-col'>
        {/* Header Section */}
        <Logo className='mb-7 ' />
        <nav className="flex flex-col gap-3 mb-auto">
          {/* Active Link (Home) */} 
          {navLinks.map((Link: any, i: number) => (
            <NavLink key={i} to={Link.link} onClick={handleClickLink} className={({ isActive }) => (isActive ?
              "relative flex items-center px-[18px] py-[10px] text-[15px] font-medium rounded-xl text-[#34d399]  shadow-[inset_0_2px_4px_rgba(52,211,153,0.05)] transition-colors bg-[#141f34]"
              : "relative flex items-center px-[18px] py-[10px] text-[15px] font-medium rounded-xl text-[#e2e8f0]  shadow-[inset_0_2px_4px_rgba(52,211,153,0.05)] transition-colors")}>
              {Link.Icon}
              {Link.page}
              <span className='absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[70%] bg-[#34d399] rounded-l'></span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Navigation Links */}
        <nav className="flex mt-5 flex-col gap-3 pt-5 border-t border-[#1a253a]">
          <NavLink to={"/settings"} onClick={handleClickLink} className={({ isActive }) => (isActive ?
            " bg-[#141f34] flex items-center px-[15px] py-[12px] text-[14px] font-medium rounded-xl text-[#e2e8f0] hover:bg-[#1a253a] hover:text-white transition-colors" :
            "  flex items-center px-[15px] py-[12px] text-[14px] font-medium rounded-xl text-[#e2e8f0] hover:bg-[#1a253a] hover:text-white transition-colors")}
          >
            <Settings onClick={handleClickLink} className="w-5 h-5 mr-4 text-[#94a3b8]" />
            Settings
          </NavLink>

          <Link to={"/profile"}
          onClick={handleClickLink}
            className="flex items-center px-[18px] py-[14px] text-[14px] font-medium rounded-xl text-[#e2e8f0] hover:bg-[#1a253a] hover:text-white transition-colors"
          >
            <UserCircle  className="w-5 h-5 mr-4 text-[#94a3b8]" />
            Profile
          </Link>
        </nav>
        <div className=' w-full flex items-center flex-1 justify-start'>
                  <button className='   rounded-2xl bg-[#34d399] px-4 py-2 cursor-pointer font-semibold text-white transition duration-200  hover:bg-[#34d3999f] mt-5 hover:transform hover:scale-90 ' onClick={handleLogout}>Logout</button>

        </div>
      </div>


    </motion.div>
  )
}

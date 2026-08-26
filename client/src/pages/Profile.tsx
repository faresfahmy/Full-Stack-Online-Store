import { Mail, Pencil } from 'lucide-react'
import { motion } from "framer-motion"
import React from 'react'
import { useUserContext } from '../context/userContextProvider'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

export default function Profile() {
  const userData = useUserContext();
  return (
<div className="min-h-screen bg-[#070d18] flex items-center justify-center p-4 font-sans text-white">
      <motion.div
      initial={{x:-50, opacity:0}}
      animate={{x:0, opacity:20}}
      className="w-full max-w-[360px] bg-[#111927] rounded-3xl p-8 border border-slate-800/60 shadow-2xl flex flex-col items-center text-center">
        
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700/60 p-0.5">
            <img
              src={userData?.data.avatar?.secure_url||assets.default_profile}
              alt="Jane Doe"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <Link to={"/profile/edit"}
            type="button"
            className="absolute bottom-0 right-0 bg-[#10b981] hover:bg-[#059669] text-slate-950 p-1.5 rounded-full border-2 border-[#111927] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 fill-current" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
          {userData?.data.full_name}
        </h2>

        <p className="text-slate-400 text-xs font-medium mb-2">
          @{userData?.data.username}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-8">
          <Mail className="w-3.5 h-3.5" />
          <span>{userData?.data.email}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a2723] border border-[#10b981]/30">
          <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
          <span className="text-[11px] font-bold text-[#10b981] tracking-wider uppercase">
            {userData?.data.role}
          </span>
        </div>

      </motion.div>
    </div>
  )
}

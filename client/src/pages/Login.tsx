import React, { useCallback, useState, useTransition } from 'react';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import Logo from '../components/Logo';
import { motion } from "framer-motion"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { fetchLoginUser } from '../api/api';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delay } from '../utils/delay';
import LoadingButton from '../components/loadingButton';
const schemaLogin = z.object({
  email: z.string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'The email format is incorrect' }),
  password: z.string()
    .min(5, { message: "The password must be at least six characters long" })
    .max(12, { message: "The password must not exceed 12 characters" }),
  role: z.enum(["user", "admin"], {
    message: "You must choose admin or user"
  })
});
type LoginFormData = z.infer<typeof schemaLogin>;
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      role: "user"
    },
    resolver: zodResolver(schemaLogin),
  });

  
  const currentRole = watch("role");



  
  const loginMutation = useMutation({
    mutationFn:fetchLoginUser,
    onSuccess:(res)=>{
      console.log("Login Successfully", res)
      queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries({queryKey:["userCurrent"]})
      navigate(0);
    },
    onError:(res)=>{
       console.log("Login Failed", res)
    }
  })


  const onSubmitForm = useCallback((data: LoginFormData) => {
    loginMutation.mutate(data)
  }, [])

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4 font-sans text-white">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 20, x: 0 }}
        className="w-full max-w-[380px] bg-[#0e1626] rounded-2xl p-7 border border-slate-800/80 shadow-2xl text-center">
        <div className=' flex flex-col items-center text-center gap-2'>

          <Logo />
          <p className="text-slate-400 text-[11px] mb-6">Access your exclusive collections.</p>
        </div>

        <div className="bg-[#0a101d] p-1 rounded-lg flex mb-6 border border-slate-800/60">
          <button
            type="button"
            onClick={() => setValue("role", "user", { shouldValidate: true })}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${currentRole === 'user' ? 'bg-[#212b3d] text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setValue("role", "admin", { shouldValidate: true })}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${currentRole === 'admin' ? 'bg-[#212b3d] text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-left">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full bg-white text-slate-900 placeholder-slate-400 pl-9 pr-3 py-2 rounded-md text-xs focus:outline-none"
              />
            </div>
            {
              errors.email && (
                <span className=' text-sm text-red-600'>{errors.email.message}</span>
              )
            }
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-300">Password</label>
              <a href="#" className="text-[10px] text-[#10b981] hover:underline font-medium">Forgot?</a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password")}
                placeholder="Enter your password"
                className="w-full bg-white text-slate-900 placeholder-slate-400 pl-9 pr-9 py-2 rounded-md text-xs focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {
              errors.password && (
                <span className=' text-sm text-red-600'>{errors.password.message}</span>
              )
            }
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-semibold py-2.5 rounded-lg text-xs transition-colors mt-2 flex items-center justify-center"
          >
            {
              loginMutation.isPending ? (
                <LoadingButton />
              ) : "Log In"
            }

          </button>
        </form>

        <p className="text-[11px] text-slate-400 mt-6">
          Don't have an account?{' '}
          <NavLink to={"/signup"} className="text-[#10b981] font-semibold hover:underline">
            Sign Up
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
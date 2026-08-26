import React, { useRef, useState, useCallback } from 'react';
import { Eye, EyeOff, Upload, User, ShieldCheck, Check } from 'lucide-react';
import { motion } from "framer-motion";
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSginUpUser } from '../api/api';
import LoadingButton from '../components/loadingButton';

const signupSchema = z.object({
  role: z.enum(["admin", "user"], {
    message: "You must choose admin or user"
  }),
  fullName: z.string().max(30, { message: "The full name must not exceed 30 characters in length" }),
  username: z.string().max(30, { message: "The username must not exceed 30 characters" }),
  email: z.string()
    .min(1, { message: 'Email is required.' })
    .email({ message: "The email address is incorrect" }),
  password: z.string()
    .min(5, { message: "The password must be at least 5 characters long" })
    .max(12, { message: "The password must not exceed 12 characters" }),
});

type signupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: fetchSginUpUser,
    onSuccess: (res) => {
      console.log("Signup Successful:", res);
      queryClient.setQueryData(["currentUser"], null)
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/");
    },
    onError: (err: any) => {
      console.log("Signup Failed:", err.response?.data || err.message);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<signupFormData>({
    defaultValues: {
      role: "user",
      fullName: "",
      username: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(signupSchema)
  });

  const currentRole = watch("role");

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const onSubmitForm = (data: signupFormData) => {
    const form = new FormData();
    form.append("full_name", data.fullName);
    form.append("username", data.username);
    form.append("email", data.email);
    form.append("password", data.password);
    form.append("role", data.role);


    if (file) {
      form.append("avatar", file);
    }

    signupMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-[#070d18] flex items-center justify-center p-4 font-sans text-white">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-[420px] bg-[#0c1525] rounded-2xl p-7 border border-slate-800/80 shadow-2xl text-center"
      >
        <div className='flex flex-col items-center text-center gap-2'>
          <Logo />
          <p className="text-slate-400 text-xs mb-6">Create your exclusive account</p>
        </div>

        {signupMutation.isError && (
          <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-500 text-center">
            {(signupMutation.error as any)?.response?.data?.message || "Signup failed. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-left">

          {/* Full Name Field */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Jane Doe"
              className="w-full bg-[#111c2e] text-slate-200 placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-xs border border-slate-800 focus:outline-none focus:border-slate-700"
            />
            {errors.fullName && (
              <span className='text-xs text-red-500 mt-1 block'>{errors.fullName.message}</span>
            )}
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="janedoe"
              className="w-full bg-[#111c2e] text-slate-200 placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-xs border border-slate-800 focus:outline-none focus:border-slate-700"
            />
            {errors.username && (
              <span className='text-xs text-red-500 mt-1 block'>{errors.username.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              {...register("email")}
              placeholder="jane@example.com"
              className="w-full bg-[#111c2e] text-slate-200 placeholder-slate-500 px-3.5 py-2.5 rounded-lg text-xs border border-slate-800 focus:outline-none focus:border-slate-700"
            />
            {errors.email && (
              <span className='text-xs text-red-500 mt-1 block'>{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-[#111c2e] text-slate-200 placeholder-slate-500 pl-3.5 pr-9 py-2.5 rounded-lg text-xs border border-slate-800 focus:outline-none focus:border-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <span className='text-xs text-red-500 mt-1 block'>{errors.password.message}</span>
            )}
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Avatar Upload</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full  border border-dashed rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging
                  ? 'bg-[#11262d] border-[#10b981]'
                  : 'bg-[#111c2e]/60 border-slate-700/80 hover:bg-[#111c2e]'
                }`}
            >
              {file ? (
                <div className="flex items-center space-x-2 text-[#10b981]">
                  <Check className="w-5 h-5" />
                  <span className="text-[11px] font-medium truncate max-w-[200px]">{file.name}</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-[11px] text-slate-300 font-medium">Drag & drop or click to upload</span>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setValue("role", "user", { shouldValidate: true })}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${currentRole === 'user'
                    ? 'bg-[#11262d] border-[#10b981] text-[#10b981]'
                    : 'bg-[#111c2e] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
              >
                <User className="w-4 h-4 mb-1.5" />
                <span className="text-xs font-semibold">User / Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => setValue('role', "admin", { shouldValidate: true })}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${currentRole === 'admin'
                    ? 'bg-[#11262d] border-[#10b981] text-[#10b981]'
                    : 'bg-[#111c2e] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
              >
                <ShieldCheck className="w-4 h-4 mb-1.5" />
                <span className="text-xs font-semibold">Admin</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={signupMutation.isPending}
            type="submit"
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-semibold py-2.5 rounded-lg text-xs transition-colors mt-2 flex items-center justify-center"
          >
            {signupMutation.isPending ? (
              <LoadingButton />            
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-[11px] text-slate-400 mt-5">
          Already have an account?{' '}
          <Link to={"/"} className="text-[#10b981] font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
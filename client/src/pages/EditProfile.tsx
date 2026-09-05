import { Download, User2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { useUserContext } from '../context/userContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEditUser } from '../api/api.user';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../components/loadingButton';
import { FormEdit } from '../../types/types';

export default function EditProfile() {
  const [hoverAvatar, setHoverAvatar] = useState<boolean>(false);
  const [formEdit,setFormEdit] = useState<FormEdit>({
    fullname:'',
    username:''
  })
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const detailsUser = useUserContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn:fetchEditUser,
    onSuccess:(res)=>{
      console.log("Edit SuccessFully", res)
      queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries({queryKey:["currentUser"]});
      navigate("/profile");
    },
    onError:(res)=>{
      console.log("Edit Failed", res);
    }
  })
  useEffect(() => {
    if (detailsUser?.data) {
      setFormEdit((prev)=>{return{...prev, fullname:detailsUser.data.full_name || ''}})
      setFormEdit((prev)=>{return{...prev, username:detailsUser.data.username || ''}})
    }
  }, [detailsUser]);


  const handleSelectedFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };
  const handleSumbitForm = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData();
    form.append("full_name", formEdit.fullname);
    form.append("username", formEdit.username)
    if(file){
      form.append("avatar",file)
    }
    mutation.mutate({dataForm:form, id:detailsUser?.data.id||''});

  }
  return (
    <div className="min-h-screen bg-[#0b101b] flex items-center justify-center p-4">
           <motion.div
      initial={{x:-50, opacity:0}}
      animate={{x:0, opacity:20}} className="bg-[#121927] w-full max-w-[420px] rounded-2xl p-8 flex flex-col items-center shadow-2xl border border-slate-800/40">

        <h2 className="text-white text-2xl font-bold tracking-tight mb-2">
          Edit Profile
        </h2>
        <p className="text-slate-400 text-sm font-normal mb-6">
          Update your personal information
        </p>

        <div className="flex flex-col items-center mb-6">

          <div
            className="relative cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700/50 mb-3"
            onMouseEnter={() => setHoverAvatar(true)}
            onMouseLeave={() => setHoverAvatar(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className={`justify-center items-center h-full w-full absolute transition duration-200 inset-0 bg-black/40 z-50 ${hoverAvatar ? 'flex' : 'hidden'
                }`}
            >
              <Download className="text-white w-5 h-5" />
            </div>

            <img
              src={previewUrl || detailsUser?.data.avatar?.secure_url || assets.default_profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            PROFILE PICTURE
          </span>
        </div>

        <form className="w-full space-y-5" onSubmit={(e) => handleSumbitForm(e)}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleSelectedFile(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />

          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-2">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User2 className='absolute left-3 text-slate-400' size={15}/>
              <input
                type="text"
                value={formEdit.fullname}
                onChange={(e) => setFormEdit((prev)=>{return{...prev,fullname:e.target.value}})}
                className="w-full bg-[#182030] border border-[#2dd4bf]/40 rounded-md py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#2dd4bf]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-2">
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400 font-semibold text-sm">
                @
              </span>
              <input
                type="text"
                value={formEdit.username}
                onChange={(e) => setFormEdit((prev)=>{return{...prev,username:e.target.value}})}
                className="w-full bg-[#161d2b] border border-slate-800/80 rounded-md py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-slate-700"
              />
            </div>
          </div>

          <button type='submit' disabled={mutation.isPending} className="w-full bg-[#46ecab] hover:bg-[#3be0a0] text-slate-950 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 text-sm shadow-md">
            {
              mutation.isPending?
              <LoadingButton />
              :"Save Changes"
            }
          </button>
        </form>

      </motion.div>
    </div>
  );
}
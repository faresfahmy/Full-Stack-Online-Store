import React, { useEffect, useState } from 'react';
import AdminHome from '../components/AdminHome';
import UserHome from '../components/UserHome';
import { useUserContext } from '../context/userContextProvider';

export default function Home() {
  const user = useUserContext()
  console.log(user?.data.role)
  return user?.data.role === 'admin' ? <AdminHome /> : <UserHome />;
}
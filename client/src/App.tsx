
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Layout from "./pages/layout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import DashboardAdmin from "./pages/DashboardAdmin"
import { UserContextProvider, useUserContext } from "./context/userContextProvider"
import MainLayout from "./pages/MainLayout"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
export default function App() {
  const isAuth = useUserContext();
  console.log(isAuth);
  return (
    <>
      <Toaster />
      <Routes>
        {
          isAuth?.status == "success" ?
            (
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/dashboardadmin" element={<DashboardAdmin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
              </Route>

            ) : (
              <Route path='/' element={<MainLayout />}>
                <Route index  element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            )
        }
      </Routes>
    </>
  )
}

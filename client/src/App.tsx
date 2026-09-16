
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Layout from "./pages/layout/layout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import DashboardAdmin from "./pages/admin/DashboardAdmin"
import { UserContextProvider, useUserContext } from "./context/userContextProvider"
import MainLayout from "./pages/layout/MainLayout"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Products from "./pages/Products"
import AddProduct from "./pages/admin/AddProduct"
import Orders from "./pages/admin/Orders"
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
                <Route path="/products" element={<Products />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/products/add-product" element={<AddProduct />} />
                <Route path="/orders" element={<Orders />} />
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

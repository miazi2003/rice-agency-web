import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../layout/mainlayout/mainLayout";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import AddProductForm from "../pages/add product/AddProduct";
import ProductsPage from "../pages/All Product/AllProduct";
import CustomersPage from "../pages/client/AllClient";
import CustomerAddForm from "../pages/cutomer add form/CustomerAddForm";
import AddOrderForm from "../pages/Add order/AddOrder";
import LoginPage from "../pages/Auth/Log in/LogIn";
import SignupPage from "../pages/Auth/Sign In/SignIn";
import CustomerDetailsPage from "../component/customerDetails/CustomerDetails";
import ProductDetailsPage from "../component/product details/ProductDetails";
import PrivateRoute from "../Private route/PrivateRoute";
import NotificationsTable from "../component/data grid/DataGrid";
import Unauthorized from "../component/Unauthorized/Unauthorized";


export const router = createBrowserRouter([
  {
    path: "/",
    Component : MainLayout,
    children :[
        {index : true , element : <Dashboard></Dashboard>},
        {path : "/addProduct" , element : <PrivateRoute requiredRole="admin"><AddProductForm></AddProductForm></PrivateRoute>},
        {path : "/allProducts" ,  element : <PrivateRoute><ProductsPage></ProductsPage></PrivateRoute>},
        {path : "/allClient" , element : <PrivateRoute requiredRole="admin"><CustomersPage></CustomersPage></PrivateRoute>},
        {path : "/addCustomer" , element : <PrivateRoute requiredRole="admin"><CustomerAddForm></CustomerAddForm></PrivateRoute>},
        {path : "/dataGrid" , element : <PrivateRoute requiredRole="admin"><NotificationsTable></NotificationsTable></PrivateRoute>},
        {path : "/addOrder" , element : <PrivateRoute requiredRole="admin"><AddOrderForm></AddOrderForm></PrivateRoute>},
        {path : "/login" , element : <LoginPage></LoginPage>},
        {path : "/signUp" , element : <SignupPage></SignupPage>},
        {path : "/customer/:customerID" , element : <PrivateRoute requiredRole="admin"><CustomerDetailsPage></CustomerDetailsPage></PrivateRoute>},
        {path : "/products/:productID" , element :<PrivateRoute requiredRole="admin"><ProductDetailsPage></ProductDetailsPage></PrivateRoute>},
        {path : "/unauthorized" , element : <Unauthorized></Unauthorized>}
    ]
  },
]);
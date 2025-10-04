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
import EmployeesTable from "../component/data grid/DataGrid";
import AddOrderForm from "../pages/Add order/AddOrder";
import LoginPage from "../pages/Auth/Log in/LogIn";
import SignupPage from "../pages/Auth/Sign In/SignIn";
import CustomerDetailsPage from "../component/customerDetails/CustomerDetails";
import ProductDetailsPage from "../component/product details/ProductDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    Component : MainLayout,
    children :[
        {index : true , element : <Dashboard></Dashboard>},
        {path : "/addProduct" , element : <AddProductForm></AddProductForm>},
        {path : "/allProducts" ,  element : <ProductsPage></ProductsPage>},
        {path : "/allClient" , element : <CustomersPage></CustomersPage>},
        {path : "/addCustomer" , element : <CustomerAddForm></CustomerAddForm>},
        {path : "/dataGrid" , element : <EmployeesTable></EmployeesTable>},
        {path : "/addOrder" , element : <AddOrderForm></AddOrderForm>},
        {path : "/login" , element : <LoginPage></LoginPage>},
        {path : "/signUp" , element : <SignupPage></SignupPage>},
        {path : "/customer/:customerID" , element : <CustomerDetailsPage></CustomerDetailsPage>},
        {path : "/products/:productID" , element :<ProductDetailsPage></ProductDetailsPage> },
    ]
  },
]);
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


export const router = createBrowserRouter([
  {
    path: "/",
    Component : MainLayout,
    children :[
        {index : true , element : <Home></Home>},
        {path : "/dashBoard" , element : <Dashboard></Dashboard>},
        {path : "/addProduct" , element : <AddProductForm></AddProductForm>},
        {path : "/allProducts" ,  element : <ProductsPage></ProductsPage>},
        {path : "/allClient" , element : <CustomersPage></CustomersPage>},
        {path : "/addCustomer" , element : <CustomerAddForm></CustomerAddForm>}
    ]
  },
]);
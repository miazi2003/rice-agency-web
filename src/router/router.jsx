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
    ]
  },
]);
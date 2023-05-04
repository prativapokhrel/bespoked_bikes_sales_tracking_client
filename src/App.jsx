import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Dashboard from './pages/dashboard';
import Customers from './pages/customers';
import EditCustomer from "./pages/customers/edit";

import Sales from './pages/sales';
import EditSale from "./pages/sales/edit";
import Root from "./pages/root";

import Products from "./pages/products";
import EditProduct from "./pages/products/edit";
import Salespeople from "./pages/salespeople";
import EditSalesperson from "./pages/salespeople/edit";
import CreateSale from "./pages/sales/create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [{
      path: "/dashboard",
      element: <Dashboard />,
    },{
      path: "/customers",
      element: <Customers />,
    },
    {
      path: "/customers/:id/edit",
      element: <EditCustomer />
    },
    {
      path: "/sales",
      element: <Sales />,
    },
    {
      path: "/sales/new",
      element: <CreateSale />,
    },
    {
      path: "/sales/:id/edit",
      element: <EditSale />
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:id/edit",
      element: <EditProduct />
    },
    {
      path: "/salespeople",
      element: <Salespeople />,
    },
    {
      path: "/salespeople/:id/edit",
      element: <EditSalesperson />
    },
  ]
  },
  
]);

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />

    </QueryClientProvider>
  )
}

export default App

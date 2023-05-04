import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Root from "./pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  }
  
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

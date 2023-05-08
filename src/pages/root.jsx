import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/layout";
import { useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname==="/"){
      navigate("/dashboard");
    }

  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

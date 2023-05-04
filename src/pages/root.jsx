import { Outlet, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout";
import { useEffect } from "react";

export default function Root() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
navigate("/dashboard");
    }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

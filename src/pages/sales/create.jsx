import * as React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSale } from "../../hooks/useSales";
import { useGetAllProducts } from "../../hooks/useProducts";
import { useGetAllCustomers } from "../../hooks/useCustomers";
import { useGetAllSalespeople } from "../../hooks/useSalespeople";

import Select from "../../components/select";

export default function CreateSale() {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isLoadinProducts,
    isError,
    error: productError,
    isSuccess: isProductsSuccess,
  } = useGetAllProducts();
  const {
    data: customerData,
    isLoading: isLoadinCustomers,
    error: customerError,
    isSuccess: isCustomersSuccess,
  } = useGetAllCustomers();
  const {
    data: personData,
    isLoading: isLoadinPersons,
    error: personError,
    isSuccess: isPersonsSuccess,
  } = useGetAllSalespeople();

  const { mutate, isLoading, isSuccess } = useCreateSale();
  const [state, setState] = React.useState({
    id: "",
    product_id: "",
    salesperson_id: "",
    customer_id: "",
    sales_date: "",
  });

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    if (isProductsSuccess && data.length) {
      const temp = data.map(({ id: value, name: label }) => ({ value, label }));
      setProducts(temp);
    }
  }, [isProductsSuccess]);

  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    if (isCustomersSuccess && customerData.length) {
      const temp = customerData.map(({ id: value, first_name, last_name }) => ({
        value,
        label: `${first_name} ${last_name}`, // concatenate first_name and last_name with a space in between
      }));
      setCustomers(temp);
    }
  }, [isCustomersSuccess, customerData]);

  const [persons, setPersons] = React.useState([]);

  React.useEffect(() => {
    if (isPersonsSuccess && personData.length) {
      const temp = personData.map(({ id: value, first_name, last_name }) => ({
        value,
        label: `${first_name} ${last_name}`, // concatenate first_name and last_name with a space in between
      }));
      setPersons(temp);
    }
  }, [isPersonsSuccess, personData]);

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/sales");
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ ...state });
  };
  return (
    <div className="mx-10 my-4">
      <form onSubmit={handleSubmit}>
        <Input
          name="sales_date"
          label="Sales Date"
          value={state.sales_date}
          onChange={handleInputChange}
        />
        <Select
          label="Product"
          name="product_id"
          items={products}
          value={state.product_id}
          onChange={handleInputChange}
        />
        <Select
          label="Customer"
          name="customer_id"
          items={customers}
          value={state.customer_id}
          onChange={handleInputChange}
        />
        <Select
          label="Sales Person"
          name="salesperson_id"
          items={persons}
          value={state.salesperson_id}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          label="Submit"
          loading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}

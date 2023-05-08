import * as React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEditSale, useGetSaleById } from "../../hooks/useSales";
import Select from "../../components/select";
import { useGetAllProducts } from "../../hooks/useProducts";
import { useGetAllCustomers } from "../../hooks/useCustomers";
import { useGetAllSalespeople } from "../../hooks/useSalespeople";

export default function EditSale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetSaleById(id);
  const {
    mutate,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
    error,
  } = useEditSale();

  const {
    data: productData,
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

  const [state, setState] = React.useState({
    id: "",
    product_id: "",
    salesperson_id: "",
    customer_id: "",
    sales_date: "",
  });

  React.useEffect(() => {
    if (isSuccess && data.id) {
      setState({
        ...state,
        id: data.id,
        product_id: data.product_id,
        salesperson_id: data.salesperson_id,
        customer_id: data.customer_id,
        sales_date: data.sales_date,
      });
    }
  }, [isSuccess, data]);

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    if (isProductsSuccess && productData.length) {
      const temp = productData.map(({ id: value, name: label }) => ({
        value,
        label,
      }));
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
    if (isEditSuccess) {
      navigate("/sales");
    }
  }, [isEditSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
          label="Salesperson"
          name="salesperson_id"
          items={persons}
          value={state.salesperson_id}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          label="Submit"
          loading={isLoading || isEditing}
          disabled={isLoading || isEditing}
        />
      </form>
    </div>
  );
}

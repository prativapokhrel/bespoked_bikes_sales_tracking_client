import * as React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEditProduct, useGetProductById } from "../../hooks/useProducts";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetProductById(id);
  const {
    mutate,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
  } = useEditProduct();
  const [state, setState] = React.useState({
    id: "",
    name: "",
    manufacturer: "",
    style: "",
    purchase_price: "",
    sale_price: "",
    qty_on_hand: "",
    commission_percentage: "",
  });

  React.useEffect(() => {
    if (isSuccess && data.id) {
      setState({
        ...state,
        id: data.id,
        name: data.name,
        manufacturer: data.manufacturer,
        style: data.style,
        purchase_price: data.purchase_price,
        sale_price: data.sale_price,
        qty_on_hand: data.qty_on_hand,
        commission_percentage: data.commission_percentage,
      });
    }
  }, [isSuccess, data]);

  React.useEffect(() => {
    if (isEditSuccess) {
      navigate("/products");
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
          name="name"
          label="Name"
          value={state.name}
          onChange={handleInputChange}
        />
        <Input
          name="manufacturer"
          label="Manufacturer"
          value={state.manufacturer}
          onChange={handleInputChange}
        />

        <Input
          name="style"
          label="Style"
          value={state.style}
          onChange={handleInputChange}
        />
        <Input
          name="purchase_price"
          label="Purchase Price"
          value={state.purchase_price}
          onChange={handleInputChange}
        />
        <Input
          name="sale_price"
          label="Sale Price"
          value={state.sale_price}
          onChange={handleInputChange}
        />
        <Input
          name="qty_on_hand"
          label="Qty on Hand"
          value={state.qty_on_hand}
          onChange={handleInputChange}
        />
        <Input
          name="commission_percentage"
          label="Commission Percentage"
          value={state.commission_percentage}
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

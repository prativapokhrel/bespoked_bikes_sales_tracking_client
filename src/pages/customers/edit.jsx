import * as React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCustomer, useGetCutomerById } from "../../hooks/useCustomers";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetCutomerById(id);
  const {
    mutate,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
    error,
  } = useEditCustomer();
  const [state, setState] = React.useState({
    id: "",
    first_name: "",
    last_name: "",
    address: "",
    start_date: "",
    phone: "",
  });

  React.useEffect(() => {
    if (isSuccess && data.id) {
      setState({
        ...state,
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        start_date: data.start_date,
        phone: data.phone,
      });
    }
  }, [isSuccess, data]);

  React.useEffect(() => {
    if (isEditSuccess) {
      navigate("/customers");
    }
  });

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
          type="date"
          name="start_date"
          label="Start Date"
          value={state.start_date}
          onChange={handleInputChange}
        />
        <Input
          name="first_name"
          label="First Name"
          value={state.first_name}
          onChange={handleInputChange}
        />
        <Input
          name="last_name"
          label="Last Name"
          value={state.last_name}
          onChange={handleInputChange}
        />

        <Input
          name="address"
          label="Address"
          value={state.address}
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

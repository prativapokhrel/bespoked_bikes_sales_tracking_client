import * as React from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditSalesperson, useGetSalespersonById } from '../../hooks/useSalespeople';

export default function EditSalesperson(){
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isSuccess} = useGetSalespersonById(id);
    const {mutate, isLoading: isEditing, isSuccess: isEditSuccess, error} = useEditSalesperson();
    const [state, setState] = React.useState({
        id: '',
        first_name: '',
        last_name: '',
        address: '',
        phone: '',
        start_date: '',
        termination_date: '',
        manager_id: ''
    });

    React.useEffect(() => {
			if(isSuccess && data.id) {
					setState({...state, id: data.id, first_name: data.first_name, last_name: data.last_name, address: data.address,
															phone: data.phone, start_date: data.start_date, termination_date: data.termination_date, 
															manager_id: data.manager_id});
			}
					}, [isSuccess, data])

					React.useEffect(() => {
							if(isEditSuccess) {
			navigate("/salespeople");
							}
					})


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
       mutate({...state});
    }
    return(
        <div className="mx-10 my-4">
            <form onSubmit={handleSubmit}>
                <Input name="first_name" label="First Name" value={state.first_name} onChange={handleInputChange} />
                <Input name="last_name" label="Last Name" value={state.last_name} onChange={handleInputChange} />
                <Input name="address" label="Address" value={state.address} onChange={handleInputChange} />
                <Input name="phone" label="Phone" value={state.phone} onChange={handleInputChange} />
                <Input name="start_date" label="Start date" value={state.start_date} onChange={handleInputChange} />
                <Input name="termination_date" label="Termination date" value={state.termination_date} onChange={handleInputChange} />
                <Input name="manager_id" label="Manager id" value={state.manager_id} onChange={handleInputChange} />

                <Button type="submit" label="Submit" loading={isLoading} disabled={isLoading} />

            </form>
        </div>
    );
}
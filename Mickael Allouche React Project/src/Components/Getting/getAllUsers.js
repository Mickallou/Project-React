import axios from 'axios';
import { toast } from 'react-toastify';

const getAllUsers = async (token) => {
    try {
        const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
            headers: {
                'x-auth-token': token,
            }
        });
        return response.data;
    } catch (error) {
        toast.error(error.message);
        return [];
    }
};

export default getAllUsers;

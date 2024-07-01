import axios from 'axios';

const getAllUsers = async (token) => {
    try {
        console.log('Fetching users with token:', token);
        const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
            headers: {
                'x-auth-token': token,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users in getAllUsers:', error.response || error.message);
        throw error; 
    }
};

export default getAllUsers;

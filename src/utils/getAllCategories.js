import axios from 'axios';
import { CATEGORY_API } from './constants';


// Function to fetch products from the Fake Store API
export const fetchAllCategories = async () => {
    try {
        const response = await axios.get(`${CATEGORY_API}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

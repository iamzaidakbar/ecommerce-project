import axios from 'axios';
import { SORT_API } from './constants';


// Function to fetch products from the Fake Store API
export const fetchSortedProducts = async (query) => {
    try {
        const response = await axios.get(`${SORT_API + query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

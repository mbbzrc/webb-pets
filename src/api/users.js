import axios from 'axios';

import {BASE_URL} from './index';

export async function loginUser({username, password}) {
    try {
        const response = await axios.get(`${BASE_URL}/api/users/login`)
    } catch (error) {
        throw error;
    }
}
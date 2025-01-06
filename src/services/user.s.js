import axios from '../utils/axios';

const getUserToken = () => {
    // get user token from local storage
    return localStorage.getItem('token') ?? '';
};

const fetchListUsers = async () => {
    try {
        const token = getUserToken();

        const response = await axios.get(`/api/v1/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message ?? "",
                data: response.data ?? [],
            };
        }
    } catch (error) {
        console.log("Error fetching list users: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Lỗi chưa đăng nhập!"
        };
    }
};

const UserServices = {
    getUserToken,
    fetchListUsers,
};

export default UserServices;
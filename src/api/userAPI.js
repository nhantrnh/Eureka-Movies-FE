import axiosInstance from '../../utils/axios';

export const fetchMovieData = async (tmdbId) => {
    try {
        const response = await axiosInstance.get(`Movie/Detail/${tmdbId}`);
        return response.data.data.movie;
    } catch (error) {
        throw error;
    }
};



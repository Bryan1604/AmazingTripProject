import axiosClient from "./axiosClient";

const addressApi = {
    getAll: () => {
        const url = `/address`;
        return axiosClient.get(url);
    },
    get: (id) => {
        const url = `/address/${id}`;
        return axiosClient.get(url);
    },
    post: (data) => {
        const url = `/address`;
        return axiosClient.post(url, data);
    },
    getAllHostAddress: (user_id) => {
        const url = `/addressHost/${user_id}`;
        return axiosClient.get(url);
    },
    getHost: (address_id, user_id) => {
        const url = `/address_by_host/${address_id}/${user_id}`;
        return axiosClient.get(url);
    }
}
export default addressApi;
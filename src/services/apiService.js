import axios from "axios";


const tickets = 'tickets/';
const operacoes = 'operacoes/';

const apiService = axios.create({
    baseURL: "http://127.0.0.1/"
})

export default apiService;

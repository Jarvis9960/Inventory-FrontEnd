import axios from "axios";


const API = axios.create({
    baseURL:"https://inventory-wofq.onrender.com/"
})

export default API;
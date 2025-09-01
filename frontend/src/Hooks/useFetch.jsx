import { useEffect } from "react";
import { useState } from "react"

SERVER_URL = "http://127.0.0.1:3000/";

export const useFetch = (endpoint) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: null
    });
    /*
    si usamos JWToken
    const token = sessionStorage.getItem("accessToken")
    const options ={
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };
    */
    async function fetchData() {
        try {
            const response = await fetch(SERVER_URL + endpoint);//, options);
            const data = await response.json();
            setState({ data, isLoading: false, error: null });
        } catch (error) {
            setState({ data: null, isLoading: false, error });
        }
    }
    if (!endpoint) return { data: null, isLoading: false, error: "No se proveyó un endpoint" };
    //if (!token ) return { data: null, isLoading: false, error: "No token provided" };
    
    useEffect(() => { fetchData() }, [endpoint]);
    return state;
};

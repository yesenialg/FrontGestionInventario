import axios from 'axios';

const urlBase = "https://localhost:7281/Product/";

export function getAllProducts(){

    const url = `${urlBase}GetAll`;
    return axios.get(url)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log("Error al obtener los productos", error);
    })
}

export function putProduct(product){

    const url = `${urlBase}Update`;
    return axios.put(url, product)
    .then(function (response) {
        return response.data.code
    })
}

export function postProduct(product){

    const url = `${urlBase}Create`;
    return axios.post(url, product)
    .then(function (response) {
        return response.data.code
    })
}
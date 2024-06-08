import axios from 'axios';

export const darshanaApiNoToken = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
});
export const apiLocation = axios.create({
    baseURL: `https://countriesnow.space/api/v0.1/countries/`,
});
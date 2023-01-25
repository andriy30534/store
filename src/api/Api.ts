import axios from "axios";
import { querySlice } from "../store/QuerySlice";
import { ProductResponse, User, UserResponse } from "../store/Type";

	axios.defaults.baseURL = ' http://ec2-18-184-28-117.eu-central-1.compute.amazonaws.com/'
export const Auth = {
_token:null as string|null,
  
setToken(token:string | null){
	this._token = token
	token = localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
},
isLoggedIn (){
return !!this._token
},

login(email:string, password:string){
	return axios.post<UserResponse >('api/auth/login',{
		email,
		password
	},)},
register(fullName:string, email:string, password:string ,phone:string){
  return axios.post<UserResponse>('api/auth/register',{
		fullName,
	  email,
	  password,
	  phone,
}
	)},
}
export const Account={
	getUser(){
	return axios.get<User>('api/account')
} }
	 
//api/categories/1/products?offset=10&limit=10&sortBy=latest
	export const  Products ={
		getProducts(offset: number, limit: number,sortBy:string,){
			return axios.get(`api/products?offset=${offset}&limit=${limit}&sortBy=${sortBy}`)
		},
		getProduct(id:number){
			return axios.get(`api/products/${id}`)
		},
		filter(category?:number){
			return axios.get(`api/categories/${category}/products?offset=0&limit=12&sortBy=latest`)
	},
		searchProduct(search:string,offset:number){
		return axios.get(`api/products/search?keywords=${search}&offset=${offset}&limit=12`)
	}
}
	export const ProductsCategories = {
		getCategories(){
			return axios.get('api/categories')
		}
	}
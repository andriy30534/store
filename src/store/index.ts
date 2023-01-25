import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import registerSlice from "./registerSlice";
import getProductsSlice from './getProducts'
import viewerSlice from "./viewerSlice";
import getCategoriesSlice from './getCategories'
import querySlice from "./QuerySlice";
import getSearchProducts from './searchAsyncProduct'
import getProductSlice from './getProductCart'
import getCategoryProductsSlice from './productInCategory'

export const store = configureStore({
	reducer:{
		login: loginSlice,
		register: registerSlice,
		viewer:viewerSlice,
	
		products: getProductsSlice,
		productCart:getProductSlice,
		categories: getCategoriesSlice,
		asyncSearch:getSearchProducts,
		productCategory:  getCategoryProductsSlice,
		queryString:querySlice
	}
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch



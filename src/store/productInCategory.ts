import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductResponse } from "./Type";
import {Products} from '../api/Api'

export type ParametersType ={
	offset:number
	limit:number
	sortBy: string
	category: number
}


export const asyncGetCategoryProduct = createAsyncThunk<ProductResponse[],number,{rejectValue:any}>(
	'getCategoryProducts/asyncCategoryProducts',
	async function (category,{rejectWithValue}){
		try{
			const response = await Products.filter(category)

			return response.data

		}
		catch(error){
			return rejectWithValue (error)
		}})
		
	 interface IInitialState {
			  products: ProductResponse[]
        loading: boolean,
        error: null |  any
		}
		const initialState: IInitialState = {
        products:[],
        loading: false,
        error: null,
	  }

	const getCategoryProductsSlice = createSlice({
name :'getCategoryProducts',
initialState,
reducers:{},
extraReducers(builder) {
	builder
	.addCase(asyncGetCategoryProduct.pending, (state) => {
		state.loading = true;
		state.error = null

	})
	.addCase(asyncGetCategoryProduct.fulfilled,(state , action )=>{
		state.error = null
		state.loading = false;
		state.products = action.payload
	})
.addCase(asyncGetCategoryProduct.rejected,(state , action)=>{
	  state.loading = false;
	  state.error = action.error
})
},

	})


	export default getCategoryProductsSlice.reducer;

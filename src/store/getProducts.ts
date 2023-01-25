import { AnyAction ,createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductResponse } from "./Type";
import {Products} from '../api/Api'

export type ParametersType ={
	offset:number
	limit:number
	sortBy: string

}


export const asyncGetProducts = createAsyncThunk<ProductResponse[],ParametersType,{rejectValue:any}>(
	'getProducts/asyncProducts',
	async function ({offset, limit, sortBy},{rejectWithValue}){
		try{
		const response = await Products.getProducts(offset,limit,sortBy)
			return response.data
}
		catch(error){
			return rejectWithValue (error)
		}})
		
		interface IInitialState {
        products: ProductResponse[]
        loading: boolean
        error: null |  any
		}
      const initialState:IInitialState = {
        products:[],
        loading: false,
        error: null,
	}

	const getProductsSlice = createSlice({
		name :'getProducts',
		initialState,
		reducers:{},
extraReducers(builder) {
	builder
	.addCase(asyncGetProducts.pending, (state) => {
		state.loading = true;
		state.error = null

	})
	.addCase(asyncGetProducts.fulfilled,(state , action )=>{
		state.error = null
		state.loading = false;
		state.products = action.payload
	})
.addCase(asyncGetProducts.rejected,(state , action)=>{
	  state.loading = false;
	  state.error = action.error
})
},

	})


	export default getProductsSlice.reducer;

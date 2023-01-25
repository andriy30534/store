import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductResponse } from "./Type";
import {Products} from '../api/Api'

export type SearchType ={
	keywords:string
	offset:number
}
export const asyncGetProducts = createAsyncThunk<ProductResponse[],SearchType,{rejectValue:any}>(
	'getSearchProducts/SearchAsyncProducts',
	async function ({keywords,offset},{rejectWithValue}){
		try{

			const response = await Products.searchProduct(keywords,offset)
			return response.data
}
		catch(error){
			return rejectWithValue (error)
		}})

		interface IInitialState {
			 products: null | ProductResponse[]
        loading: boolean
        error: null |  any
				isSearch: boolean
				offset : number

		}
		
		const initialState:IInitialState = {
        products:null,
        loading: false,
        error: null,
				isSearch: false,
				offset: 0,
	}

	const getSearchProducts = createSlice({
		name :'getSearchProducts',
		initialState,

extraReducers(builder) {
	builder
	.addCase(asyncGetProducts.pending, (state) => {
		state.loading = true;
		state.error = null
	  state.isSearch = true

	})
	.addCase(asyncGetProducts.fulfilled,(state, action )=>{
		state.isSearch = true
		state.error = null
		state.loading = false;
		state.products = action.payload

	})
.addCase(asyncGetProducts.rejected,(state, action)=>{
	  state.loading = false;
	  state.error = action.error
		state.isSearch = true
})
},
		reducers:{
			isSearch(state){
				state.isSearch = false
			},
			offsetSearch(state,action){
				state.offset = action.payload
				console.log(action.payload)

			}
		},

  })

 export const {isSearch,offsetSearch} = getSearchProducts.actions
 export default getSearchProducts.reducer;

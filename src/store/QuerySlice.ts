import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  offset:1,
	limit:12,
	sortBy:'popular',
	category:1

}
export const querySlice = createSlice({
	name: 'queryString',
	initialState,
	reducers:{
		offset(state, action){
			state.offset = action.payload
		},
		limit(state, action){
			state.limit =  action.payload
		},
		sortBy(state,action){
			state.sortBy = action.payload

		},
		category(state, action){
     state.category = action.payload
		}
	}

})
export const {offset,limit,sortBy,category} = querySlice.actions
export default querySlice.reducer
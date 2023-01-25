import React, { useEffect } from 'react'
import { useAppDispatch, } from '../../hook/reduxHook'
import { asyncGetCategories } from '../../store/getCategories'
import { Categories } from './Categorise'
import { Popular } from './Popular'

import s from './SearchBar.module.scss'
import { SearchProduct } from './SearchProduct'
export const SearchBar = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(asyncGetCategories('_'))
	}, [])

	return (
		<div className={s.container}>
			<SearchProduct />
			<Categories />
			<Popular />

		</div>
	)
}

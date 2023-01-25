import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch } from '../../hook/reduxHook'
import { asyncGetProducts, isSearch } from '../../store/searchAsyncProduct'
import s from './SearchProduct.module.scss'
export const SearchProduct = () => {
	const dispatch = useAppDispatch()
	const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		if (event.target.value && event.target.value.length >= 3) {
			const param = {
				keywords: event.target.value,
				offset: 12
			}
			dispatch(asyncGetProducts(param))
		}
		dispatch(isSearch())

	}

	const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

	return (
		<div>
			<input className={s.inputSearch}
				onChange={debouncedChangeHandler}
				type='text'
				placeholder='Search...'
			/>
		</div>
	)
}

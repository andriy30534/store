import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { asyncGetProducts } from '../../store/getProducts'

import { useAppDispatch } from '../../hook/reduxHook'
import { useAppSelector } from '../../hook/reduxHook'

import { ProductCart } from '../../components/ProductCart/ProductCart'
import { ProductResponse } from '../../store/Type'
import { offset } from '../../store/QuerySlice'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchProduct } from '../SearchBar/SearchProduct'
import { offsetSearch } from '../../store/searchAsyncProduct'
import { start } from 'repl'


export const HomePage = () => {
	const [value, setValue] = useState<ProductResponse[]>([])
	const [viewerPopup, setViewerPopup] = useState(false)

	const dispatch = useAppDispatch()
	const data = useAppSelector(state => state.products.products)
	const parameters = useAppSelector(state => state.queryString)
	const isLoading = useAppSelector(state => state.products.loading)
	const isSearch = useAppSelector(state => state.asyncSearch.isSearch)
	let numberPage = useAppSelector(state => state.queryString.offset)
	const productCategory = useAppSelector(state => state.productCategory.products)
	const isproductCategoryLoa = useAppSelector(state => state.productCategory.loading)
	const isSearchLouding = useAppSelector(state => state.asyncSearch.loading)
	const searchProduct = useAppSelector(state => state.asyncSearch.products)

	const counter = () => {
		numberPage = numberPage + 12
		console.log(numberPage)
		if (!isSearch) dispatch(offset(numberPage))
		dispatch(offsetSearch(numberPage))
	}
	const counterMinus = () => {
		numberPage = numberPage - 12
		if (!isSearch) dispatch(offset(numberPage))
		dispatch(offsetSearch(numberPage))
	}

	useEffect(() => {
		dispatch(asyncGetProducts(parameters))
	}, [parameters])
	useEffect(() => {
		if (!isSearch)
			dispatch(asyncGetProducts(parameters))
	}, [isSearch])
	useEffect(() => {
		if (searchProduct)
			setValue(searchProduct)

	}, [searchProduct])

	useEffect(() => {
		setValue(data)
	}, [data])


	useEffect(() => {
		setValue(productCategory)
	}, [productCategory])


	return (
		<div className={s.container}>
			<div className={s.wrapper}>
				<SearchBar />
				<div className={s.home_container}>
					{isLoading || isSearchLouding || isproductCategoryLoa ? <h1>loading...</h1> :
						value.map((product: ProductResponse) => (
							<ProductCart key={product.id} data={product} />
						))}
				</div>
				<div className={s.container_button}>
					<button className={s.button} onClick={counterMinus}>Back</button>
					<button className={s.button} onClick={counter}>Next </button>
				</div>
				<Outlet />
			</div>
		</div>
	)
}

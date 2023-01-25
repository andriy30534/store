import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hook/reduxHook'
import s from './Categories.module.scss'
import { category } from '../../store/QuerySlice'
import { asyncGetCategoryProduct } from '../../store/productInCategory'
export const Categories = () => {
	const categories = useAppSelector(state => state.categories.categories)
	const dispatch = useAppDispatch()

	const handlerClick: React.ChangeEventHandler<HTMLSelectElement> = (event) => {

		console.log(event.target.value)
		dispatch(asyncGetCategoryProduct(+event.target.value))

	}
	return (
		<div>
			<select className={s.container}
				onChange={handlerClick}>
				{categories.map(category => (
					<option
						key={category.id}
						className={s.list}
						value={category.id}
					>
						{category.name}
					</option>
				))}
			</select>
		</div>
	)
}

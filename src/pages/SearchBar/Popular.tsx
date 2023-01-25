import React from 'react'
import { useAppDispatch } from '../../hook/reduxHook'
import { sortBy } from '../../store/QuerySlice'
import s from './Popular.module.scss'

export const Popular = () => {
	const dispatch = useAppDispatch()
	const handlerClick: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
		if (event?.currentTarget.value)
			dispatch(sortBy(event?.currentTarget.value))
	}
	return (
		<div>
			<select className={s.container}
				onChange={handlerClick}>
				<option value='popular'>popular</option>
				<option value='latest'>latest</option>
			</select>
		</div>
	)
}

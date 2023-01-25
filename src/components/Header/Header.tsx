import React, { FC, useEffect, useState } from 'react'

import s from './Header.module.scss'

import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { SelectedProduct } from '../SelectedProduct/SelectedProduct'
import { Cart } from '../Cart/Cart'
import { Logouts } from '../UserAuthBar/UserAuthBar'
import { UserInfo } from '../UserInfo/UserInfo'
import { Link } from 'react-router-dom'



import { asyncViewer } from '../../store/viewerSlice'

export const Header: FC = () => {

	const viewer = useAppSelector(state => state.viewer.isUser)
	const isUser = useAppSelector(state => state.login.isUser)
	const isRegisterUser = useAppSelector(state => state.register.isUser)
	const dispatch = useAppDispatch()




	useEffect(() => {

		dispatch(asyncViewer('_'))

	}, [isUser, isRegisterUser])

	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_header}>
				<div>
					<Link className={s.logo} to='/'>
						Logo
					</Link>
				</div>

				<div className={s.product_container}>
					<Link className={s.selectedProduct} to='/favorite'>
						{<SelectedProduct />}
					</Link>
					<Link className={s.cart} to='/cart'>
						{<Cart />}
					</Link>

					{viewer ? <UserInfo /> : <Logouts />}
				</div>
			</div>
		</div>
	)
}

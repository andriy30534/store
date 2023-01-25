import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Login } from './pages/UserAuth/Login'
import { RegisterNewUser } from './pages/UserAuth/RegisterNewUser'

import { HomePage } from './pages/Home/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'
import { Footer } from './components/Footer/Footer'
import s from './App.module.scss'
import { CartPage } from './pages/CartPage/CartPage'
import { FavoritePage } from './pages/FavoritePage/FavoritePage'
import { CategoryProductPage } from './pages/CategoryProductPage/CategoryProductPage'

export const App = () => {

	return (
		<div className={s.container} >
			<div className={s.content}>
				<Header />
				<main className={s.main}>
					<Routes>
						<Route path='/' element={<HomePage />}>
							<Route path='/category:/id' element={<CategoryProductPage />}></Route>
							<Route path='/product/:id' element={<ProductPage />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<RegisterNewUser />} />
							<Route path='/cart' element={<CartPage />} />
							<Route path='/favorite' element={<FavoritePage />} />
						</Route>
					</Routes>
				</main>
				<Footer />
			</div>
		</div>
	)
}

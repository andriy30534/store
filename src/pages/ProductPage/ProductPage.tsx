import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook"
import { asyncGetProductCart } from "../../store/getProductCart"
import s from './ProductPage.module.scss'
const ProductPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const cart = useAppSelector(state => state.productCart.products)
	const isLoading = useAppSelector(state => state.productCart.loading)
	const { id } = useParams()


	useEffect(() => {
		if (id) {
			let num = id?.slice(1)
			dispatch(asyncGetProductCart(+num))
		}


	}, [id])
	const handlerClick: React.MouseEventHandler<HTMLDivElement> = event => {
		navigate(-1)
	}

	return (
		<div className={s.modal} data-key={'123'} >
			<div className={s.container}>
				<div className={s.close} onClick={handlerClick}>X</div>
				{isLoading ? <h2>loading...</h2> :
					<div className={s.product__info}>
						<div >
							<img className={s.img} src={cart?.picture}></img>
						</div>
						<div className={s.info}>
							<h2 className={s.title}>{cart?.title}</h2>
							<p className={s.description}>{cart?.description}</p>
							<div className={s.wrapper_price}>
								<div className={s.price_t}>Price</div>
								<div className={s.prise}>${cart?.price}</div>

							</div>
						</div>

					</div>

				}
			</div>
		</div>
	)
}
export default ProductPage
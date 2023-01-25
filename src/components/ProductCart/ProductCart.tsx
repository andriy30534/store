import React, { FC } from 'react'
import s from './ProductCart.module.scss'
import { ProductResponse } from '../../store/Type'
import { AiOutlineHeart } from 'react-icons/ai'
import { useAppDispatch } from '../../hook/reduxHook'
import { asyncGetProductCart } from '../../store/getProductCart'
import { Link } from 'react-router-dom'
type Props = {
	data: ProductResponse
}

export const ProductCart: FC<Props> = ({ data }) => {
	const dispatch = useAppDispatch()

	const handleProduct: React.MouseEventHandler<HTMLDivElement> = (event) => {
		// event.stopPropagation()
		// dispatch(asyncGetProductCart(data.id))
		// console.log(data.id)

		let isFavorite = data.favorite

	}
	return (
		<div className={s.wrapper}>
			<div onClick={handleProduct} className={s.cart__container}>
				<div className={s.wrapper__img}>
					<div
						style={{
							backgroundImage: `url(${data.picture})`,
							backgroundSize: 'contain',
							backgroundPositionX: 'center',
							backgroundPositionY: 'center',
							backgroundRepeat: 'no-repeat',
						}}
						className={s.cart__img}
					></div>
				</div>
				<div className={s.cart__like}>
					<AiOutlineHeart />
				</div>
				<h2 className={s.cart__title}>{<Link className={s.text} to={`product/:${data.id}`}> {data.title}</Link>}</h2>
				<div className={s.cart__price}>
					<> $ {data.price}</>
				</div>
			</div>
		</div>
	)
}

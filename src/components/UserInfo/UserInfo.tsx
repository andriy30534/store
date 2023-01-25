import React, { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../hook/reduxHook'
import { UserResponse } from '../../store/Type'
import { Arrow } from '../Ar/Arrow'
import { UserPopup } from '../Ar/UserPopap'
import s from './UserInfo.module.scss'
type Props = {
	user: UserResponse
}
export const UserInfo: FC = () => {
	const [popup, setPopup] = useState(false)
	const [nameUser, setNameUser] = useState('')
  const [logoName, setLogoName] = useState('')
	const user = useAppSelector(state => state.viewer.user)
	useEffect(()=>{

	
	let fullName = ''
	if (user) {
		fullName = user.fullName
	}



	const getName = (name: string) => {
		let fullNameArr = name.split(' ')
	setNameUser( fullNameArr[0])
		if(fullNameArr.length === 2){ 
			setLogoName(fullNameArr[0][0] + fullNameArr[1][0])
			}else{
    setLogoName( fullNameArr[0][0])

			}
	}
	getName(fullName)

	},[user])
	


	return (
		<div className={s.container}>
			<div className={s.user}>Welcome, {nameUser}!</div>
			<div className={s.logo_user}>
				<div className={s.logo_user_text}>{logoName}</div>
			</div>
			<div onClick={() => setPopup(!popup)} className={s.arrow}>
				{<Arrow />}
			</div>
			{popup && <UserPopup user={user} />}
		</div>
	)
}

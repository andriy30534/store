import React, { FC, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { asyncRegisterUser } from '../../../store/registerSlice'

import { useAppDispatch } from '../../../hook/reduxHook'
import { useAppSelector } from '../../../hook/reduxHook'


import s from './RegisterForm.module.scss'

export const RegisterForm: FC = () => {
	const isLoading = useAppSelector(state => state.register.loading)
	const isEmailInvalid = useAppSelector(state => state.register.error)
	const isUser = useAppSelector(state => state.viewer.isUser)
	const navigate = useNavigate()

	useEffect(() => {
		if (isUser) {
			navigate('/')
		}
	}, [isUser])

	console.log(isEmailInvalid)
	const dispatch = useAppDispatch()
	const validateSchema = Yup.object().shape({
		fullName: Yup.string()
			.trim('ddd')
			.required('Full name is required')
			.matches(/^[a-zA-Z\s]+$/, 'Invalid full name'),

		email: Yup.string().email('Invalid email').required('Email is required'),
		phone: Yup.string()
			.required('Phone is required')
			.matches(/^(\+)?([0-9]){10,14}$/, 'invalid phone'),
		password: Yup.string()
			.min(8, 'Too Short!')
			.matches(
				/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
				'invalid password'
			)
			.required('Email is required')
			.max(35, 'Too Long!'),
	})
	return (
		<div>
			<Formik
				initialValues={{
					fullName: '',
					email: '',
					phone: '',
					password: '',
				}}
				validationSchema={validateSchema}
				onSubmit={values => {
					console.log(values)
					dispatch(asyncRegisterUser(values))
				}}
			>
				{({ errors, touched }) => (
					<Form className={s.form}>
						<Field
							className={s.input}
							type='text'
							name='fullName'
							placeholder='Full Name'
						/>
						{touched.fullName && (
							<div className={s.error}>{errors.fullName}</div>
						)}
						<Field
							className={s.input}
							type='email'
							name='email'
							placeholder='Email'
						/>
						{isEmailInvalid === 409 && (
							<div className={s.error}>
								A user with this email address or password exists
							</div>
						)}
						{touched.email && <div className={s.error}>{errors.email}</div>}
						<Field
							className={s.input}
							type='phone'
							name='phone'
							placeholder='Phone Number'
						/>
						{touched.phone && <div className={s.error}>{errors.phone}</div>}
						<Field
							className={s.input}
							type='password'
							name='password'
							placeholder='Password'
						/>
						{isEmailInvalid === 409 && (
							<div className={s.error}>
								A user with this email address or password exists
							</div>
						)}
						{touched.password && (
							<div className={s.error}>{errors.password}</div>
						)}
						<button className={s.button} type='submit'>
							<samp className={s.button_text}>
								{isLoading ? 'Loading...' : 'Register'}
							</samp>
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

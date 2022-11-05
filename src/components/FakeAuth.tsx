import React, { FormEvent, useState } from 'react';
import Cookies from 'universal-cookie';

import signinImage from '../assets/signup.jpg';
import ServiceRequest from '../services/request';

const cookies = new Cookies();

const initialState = {
	userId: '',
};

const FakeAuth = () => {
	const [form, setForm] = useState(initialState);

	const handleChange = (e: any) => {
		setForm({ ...form, [e.target?.name]: e.target?.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const token = await ServiceRequest.login( form.userId );

		cookies.set('userId', form.userId);
		cookies.set('token', token);
		window.location.reload();
	};

	return (
		<div className='auth__form-container'>
			<div className='auth__form-container_fields'>
				<div className='auth__form-container_fields-content'>
					<p>{'Fake Sign In'}</p>
					<form onSubmit={handleSubmit}>
						<div className='auth__form-container_fields-content_input'>
							<label>userId</label>
							<input
								name='userId'
								type='number'
								placeholder="user's id"
								onChange={handleChange}
								required
							/>
						</div>
						<div className='auth__form-container_fields-content_button'>
							<button>{'Sign In'}</button>
						</div>
					</form>
				</div>
			</div>
			<div className='auth__form-container_image'>
				<img src={signinImage} alt='sign in' />
			</div>
		</div>
	);
};

export default FakeAuth;

import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useRef} from 'react';
import styles from './Styles.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldsSchema = yup.object()
	.shape({
		login: yup
			.string()
			.email('Введенное значение не является почтой')
			.required('Почта является обязательной'),
		password: yup
			.string()
			.min(8, 'Минимальная длина пароля 8 символов')
			.required('Пароль является обязательным'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
			.min(8, 'Минимальная длина пароля 8 символов')
			.required('Пароль является обязательным')
	});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		watch,
	} = useForm({
		defaultValues: {
			login: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'onChange',
	});

	const buttonRef = useRef(null); // Создаем ref для кнопки


	useEffect(() => {

		const values = watch();
		const allFieldsFilled = values.login && values.password && values.confirmPassword;

		if (isValid && allFieldsFilled && buttonRef.current) {
			buttonRef.current.focus();
		}
	}, [watch(), isValid]);

	const loginError = errors.login?.message;
	const passwordError = errors.password?.message;
	const confirmError = errors.confirmPassword?.message;

	const onSubmit = (data) => {
		sendFormData(data);
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{loginError &&
					<div className={styles.errorMessage}>{loginError}</div>}
				<input
					name="login"
					type="text" {...register('login')}
					placeholder='Почта'
				/>
				{passwordError &&
					<div className={styles.errorMessage}>{passwordError}</div>}
				<input
					name="password"
					type="password" {...register('password')}
					placeholder='Пароль'
				/>
				{confirmError &&
					<div className={styles.errorMessage}>{confirmError}</div>}
				<input
					name="confirmPassword"
					type="password" {...register('confirmPassword')}
					placeholder='Повторите пароль'
				/>
				<button
					type="submit"
					disabled={!!loginError || !!passwordError || !!confirmError}
					ref={buttonRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;

import { useState, useRef, useEffect } from 'react';
import styles from './Styles.module.css';

function App() {
	const [userMail, setMail] = useState('');
	const [userPassword, setPassword] = useState('');
	const [userRepassword, setRepassword] = useState('');
	const [loginError, setLoginError] = useState(null);
	const submitButtonRef = useRef(null);

	useEffect(() => {
		validateForm(userMail, userPassword, userRepassword);
	}, [userMail, userPassword, userRepassword]);

	useEffect(() => {
		if (!loginError && userMail && userPassword && userRepassword) {
			submitButtonRef.current?.focus();
		}
	}, [loginError, userMail, userPassword, userRepassword]);

	const loginData = (regForm) => {
		console.log(regForm);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (!loginError) {
			loginData({ userMail, userPassword, userRepassword });
		}
	};

	const validateForm = (email, password, repassword) => {
		let newError = null;

		if (!email) {
			newError = 'Поле почты не может быть пустым';
		} else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
			newError = 'Неверный формат почты';
		} else if (!password) {
			newError = 'Поле пароля не может быть пустым';
		} else if (password.length < 3) {
			newError = 'Пароль должен быть не короче 3 символов';
		} else if (!repassword) {
			newError = 'Подтвердите пароль';
		} else if (password !== repassword) {
			newError = 'Пароли не совпадают';
		}

		setLoginError(newError);
		return !newError;
	};

	const newMail = ({ target }) => {
		const newValue = target.value;
		setMail(newValue);
	};

	const newPassword = ({ target }) => {
		const newValue = target.value;
		setPassword(newValue);
	};

	const rePassword = ({ target }) => {
		const newValue = target.value;
		setRepassword(newValue);
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				{loginError && <div className={styles.errorMessage}>{loginError}</div>}
				<input
					name="email"
					type="email"
					value={userMail}
					onChange={newMail}
					placeholder="Почта"
				/>
				<input
					name="password"
					type="password"
					value={userPassword}
					placeholder="Пароль"
					onChange={newPassword}
				/>
				<input
					name="repassword"
					type="password"
					value={userRepassword}
					placeholder="Повтор пароля"
					onChange={rePassword}
				/>
				<button
					className={styles.loginButton}
					type="submit"
					disabled={!!loginError}
					ref={submitButtonRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;

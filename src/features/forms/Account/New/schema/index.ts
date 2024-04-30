import * as yup from "yup";

export const schema = yup.object().shape({
	cv: yup.mixed(),
	salary: yup.number().positive("Число должно быть больше нуля").max(99999, ""),
	email: yup.string().email("Введите правильный адрес электронной почты"),
	password: yup.string().min(8, "Пароль должен содержать не менее 8 символов"),
	position: yup.string().min(3),
});

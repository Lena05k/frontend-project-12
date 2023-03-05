import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string(),
  password: Yup.string(),
});

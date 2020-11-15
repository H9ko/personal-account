import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { asyncActionsAuth, selectorsAuth } from './authSlice';

const customError = ({ children }) => (
  <div className="text-danger">{children}</div>
);

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authError = useSelector(selectorsAuth.selectAuthError);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        const { email, password } = values;
        const userData = { email, password };
        try {
          await dispatch(asyncActionsAuth.login(userData));
          history.push('/');
        } catch (error) {
          setSubmitting(false);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="w-50 mt-5 mx-auto">
          <div className="h2 text-center">Вход</div>
          <div className="form-group">
            <div className="text-center">
              У вас нет аккаунта?
              <Link to="/registration"> Зарегистрироваться</Link>
            </div>
          </div>
          <div className="form-group">
            <Field
              type="text"
              name="email"
              className="form-control form-control-lg"
              placeholder="Почта или телефон"
            />
            <ErrorMessage name="email" component={customError} />
          </div>
          <div className="form-group">
            <Field
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Пароль"
            />
            <ErrorMessage name="password" component={customError} />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              Войти
            </button>
          </div>
          {authError && (
            <div className="alert alert-danger" role="alert">
              <div>Failed to log in.</div>
              <div>{`Reason: ${authError}`}</div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Auth;

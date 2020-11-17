import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { asyncActionsAuth, selectorsAuth } from './authSlice';

const customError = ({ children }) => (
  <div className="text-danger">{children}</div>
);

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Registration = () => {
  const registrationError = useSelector(selectorsAuth.selectRegistrationError);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <div className="w-50 mt-5 mx-auto">
        <div className="h2 text-center">Регистрация</div>
        <div className="pt-4 d-flex justify-content-around">
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const { email, password } = values;
              const userData = { email, password };
              try {
                await dispatch(asyncActionsAuth.registation(userData));
                history.push('/signup');
              } catch (error) {
                setSubmitting(false);
              }
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="w-75 mx-auto">
                <div className="form-group">
                  <Field
                    type="text"
                    name="email"
                    className="form-control form-control-lg was-validated"
                    placeholder="Почта"
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
                  <Field
                    type="password"
                    name="passwordConfirmation"
                    className="form-control form-control-lg"
                    placeholder="Потверждение пароля"
                  />
                  <ErrorMessage
                    name="passwordConfirmation"
                    component={customError}
                  />
                </div>
                <div className="form-group ">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    Зарегистрировать
                  </button>
                </div>
                {registrationError && (
                  <div className="alert alert-danger" role="alert">
                    <div>Failed to registration.</div>
                    <div>{`Reason: ${registrationError}`}</div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <div className="text-center mb-4">
          У вас уже есть аккаунт?
          <Link to="/signup"> Войти</Link>
        </div>
      </div>
    </>
  );
};
export default Registration;

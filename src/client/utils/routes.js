const isProduction = process.env.NODE_ENV === 'production';
const { origin } = window.location;
const host = isProduction ? `${origin}/api` : 'http://localhost:8080/api';

export default {
  signinPath: () => [host, 'signin'].join('/'),
  registerPath: () => [host, 'register'].join('/'),
  contactsPath: () => [host, 'contacts'].join('/'),
};

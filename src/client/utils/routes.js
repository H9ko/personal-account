const host = 'http://localhost:8080/api';

export default {
  signinPath: () => [host, 'signin'].join('/'),
  registerPath: () => [host, 'register'].join('/'),
};

const host = 'http://localhost:8080/api';

export default {
  signinPath: () => [host, 'signin'].join('/'),
  // channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  // channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};

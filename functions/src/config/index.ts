import * as functions from 'firebase-functions';

export default () => ({
  ENV: functions.config().runtime.env || 'production',
  BAUTH_USER: functions.config().auth.user || 'user',
  BAUTH_PASSWORD: functions.config().auth.password || 'password',
});

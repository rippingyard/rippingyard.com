import * as functions from 'firebase-functions';

export default () => ({
  ENV: functions.config().runtime.env || 'production',
});

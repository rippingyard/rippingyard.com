import firebasemock from 'firebase-mock';

const mockauth = new firebasemock.MockAuthentication();
const mockdatabase = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();
const mockmessaging = new firebasemock.MockMessaging();

mockfirestore.autoFlush();

export const mocksdk = new firebasemock.MockFirebaseSdk(
  (path: string) => {
    return path ? mockdatabase.child(path) : mockdatabase;
  },
  () => mockauth,
  () => mockfirestore,
  () => mockstorage,
  () => mockmessaging
);

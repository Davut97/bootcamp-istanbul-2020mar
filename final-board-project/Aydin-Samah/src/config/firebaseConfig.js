// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyDjBfgu3Q5oDHuCclY4h-UhEhpRZb6MroQ',
  authDomain: 'shoppinglist-8b7f1.firebaseapp.com',
  databaseURL: 'https://shoppinglist-8b7f1.firebaseio.com',
  projectId: 'shoppinglist-8b7f1',
  storageBucket: 'shoppinglist-8b7f1.appspot.com',
  messagingSenderId: '208654856213',
  appId: '1:208654856213:web:34a37eef435668dc5cde1c',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

export default firebase.firestore();

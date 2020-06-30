import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import listReducer from './store/reducers/listReducer';
import {Provider} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  getFirebase,
} from 'react-redux-firebase';
import authReducer from './store/reducers/authReducer';
import {
  firestoreReducer,
  getFirestore,
  reduxFirestore,
  createFirestoreInstance,
} from 'redux-firestore';
import thunk from 'redux-thunk';
import firebaseConfig from './config/firebaseConfig';

import {useSelector} from 'react-redux';
import {isLoaded} from 'react-redux-firebase';
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  list: listReducer,
  auth: authReducer,
  firestore: firestoreReducer, // to sync with data base
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebase, firebaseConfig)
  )
);
//enhancer using  compose
const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};
const rrfProps = {
  firebase,
  config: firebaseConfig,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions',
};
function AuthIsLoaded({children}) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
  return children;
}
ReactDOM.render(
  <Provider store={store}>
    {' '}
    <ReactReduxFirebaseProvider {...rrfProps}>
      {' '}
      <AuthIsLoaded>
        <App />{' '}
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

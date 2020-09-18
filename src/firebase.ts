import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPqE6ZFrZhqCzO6_Qo5ZMTOV44qSCAtiQ',
  authDomain: 'staging-39b07.firebaseapp.com',
  databaseURL: 'https://staging-39b07.firebaseio.com',
  projectId: 'staging-39b07',
  storageBucket: 'staging-39b07.appspot.com',
  messagingSenderId: '908417751892',
  appId: '1:908417751892:web:df0c744d26e98d772c46c1',
  measurementId: 'G-Y4R31YMYTP'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

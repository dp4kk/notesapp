import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCy0W01Jmc56UDO8dNFemx7eEytkBjhIqU",
  authDomain: "productivity-app-a9983.firebaseapp.com",
  projectId: "productivity-app-a9983",
  storageBucket: "productivity-app-a9983.appspot.com",
  messagingSenderId: "830966040230",
  appId: "1:830966040230:web:cbf82747fd98214ce4d667",
};

const app=firebase.initializeApp(firebaseConfig)
export const auth=app.auth()
export default app
import app from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCakN0hzvK_TMN-4JG3oPDzXaQFySbtWPw',
  authDomain: 'gecmobile-ffbca.firebaseapp.com',
  projectId: 'gecmobile-ffbca',
}

class Firebase {
  db: any
  constructor() {
    app.initializeApp(config)
    this.db = app.firestore()
  }

  // Database
  connectDB = myRef => this.db.collection(myRef)
}

const initFirebase = new Firebase()

export default initFirebase

var firebaseConfig = {
    apiKey: "AIzaSyCZzwekbWMmvl3Up57FxH24r-Zf92chQug",
    authDomain: "tileflip-cc46b.firebaseapp.com",
    projectId: "tileflip-cc46b",
    storageBucket: "tileflip-cc46b.appspot.com",
    messagingSenderId: "479453202286",
    appId: "1:479453202286:web:7c4cccf6c5a3e0937ca37f"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({timesnapsInSnapshots: true});
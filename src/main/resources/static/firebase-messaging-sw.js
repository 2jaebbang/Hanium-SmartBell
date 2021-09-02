importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js');

// Initialize Firebase
let config = {
    apiKey: "AIzaSyBPF-SSd43xy_ags3mfNHMpkqpaKDaghFg",
    authDomain: "smartbell-alarm.firebaseapp.com",
    databaseURL: "https://smartbell-alarm.firebaseio.com",
    projectId: "smartbell-alarm",
    storageBucket: "smartbell-alarm.appspot.com",
    messagingSenderId: "1000310889464",
    appId: "1:1000310889464:web:166713d00d77f315fd540d"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload){
//
//     const title = "Hello World";
//     const options = {
//         body: payload.data.status
//     };
//
//     return self.registration.showNotification(title,options);
// });
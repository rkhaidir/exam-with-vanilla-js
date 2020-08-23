let correctAnswer = localStorage.getItem("correct")
let wrongAnswer = localStorage.getItem("wrong")
let answerUser = localStorage.getItem("userAnswer")
let nameUser = localStorage.getItem("name")
let questionLength = localStorage.getItem("questionLength")

let quizResults = {}
quizResults.results = []

let result = {}

let note
let score = (parseInt(correctAnswer) / parseInt(questionLength)) * 100
if(score >= 65) {
    note = "Lulus"
} else {
    note = "Tidak Lulus"
}
score = score < 100 ? score.toFixed(2) : score


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBDiqde_YlNmd4i9WmnDLO4XclbWTwd76E",
    authDomain: "exam-application-c4943.firebaseapp.com",
    databaseURL: "https://exam-application-c4943.firebaseio.com",
    projectId: "exam-application-c4943",
    storageBucket: "exam-application-c4943.appspot.com",
    messagingSenderId: "150768748127",
    appId: "1:150768748127:web:c0fa951ac23407cae97dea",
    measurementId: "G-66290TJEHE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let d = new Date();
const data = {
    useName         : nameUser,
    correctAnswer   : correctAnswer,
    wrongAnswer     : wrongAnswer,
    answerUser      : answerUser,
    score           : score,
    date            : `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
}
var database = firebase.database();
database.ref(`score/10B_RPL`).push(data);
removeLocal()

function removeLocal() {
    localStorage.removeItem("correct")
    localStorage.removeItem("wrong")
    localStorage.removeItem("userAnswer")
    localStorage.removeItem("name")
    localStorage.removeItem("questionLength")
}
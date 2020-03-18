let correctAnswer = sessionStorage.getItem("correct")
let wrongAnswer = sessionStorage.getItem("wrong")
let nameUser = sessionStorage.getItem("name")
let questionLength = sessionStorage.getItem("questionLength")

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

result.nameUser = nameUser
result.correctAnswer = correctAnswer
result.wrongAnswer = wrongAnswer
result.scoreUser = score
result.noteUser = note

if(localStorage && localStorage.getItem('quizMaster')) {
    quizResults = JSON.parse(localStorage.getItem('quizMaster'))

    if(result.correctAnswer != "" && result.wrongAnswer != "") {
        quizResults.results.push(result)
    }

    localStorage.setItem('quizMaster', JSON.stringify(quizResults))
    clearResults()
} else {
    localStorage.setItem('quizMaster', JSON.stringify(quizResults))
    if(result.correctAnswer != "" && result.wrongAnswer != "") {
        quizResults.results.push(result)
    }

    localStorage.setItem('quizMaster', JSON.stringify(quizResults))
    clearResults()
}

function clearResults() {
    sessionStorage.setItem("correct", "")
    sessionStorage.setItem("wrong", "")
    sessionStorage.setItem("name", "")
}

function resultsHistory(testNumber, nameUser, correctAnswer, wrongAnswer, scoreUser, noteUser) {
    let resultsContainer = document.querySelector(".resultsContainer")

    let tr = document.createElement('tr')
    let html = `
        <td>${testNumber}</td>
        <td>${nameUser}</td>
        <td>${correctAnswer}</td>
        <td>${wrongAnswer}</td>
        <td>${scoreUser}</td>
        <td>${noteUser}</td>
    `
    tr.innerHTML = html
    resultsContainer.appendChild(tr)
}

function newResults(numCorrect, numWrong, score) {

    let newScore = document.querySelector("#new-score")
    let wrongCorrect = document.querySelector("#wrong-correct")

    newScore.innerHTML = `Score yang anda peroleh<br/>${score}`
    wrongCorrect.innerHTML =`Jawaban Benar: <b>${numCorrect}</b>, Jawaban Salah: <b>${numWrong}</b><hr>`
}

document.addEventListener("DOMContentLoaded", function(){
    let quizMaster = quizResults["results"].length
    let testNumber = 1

    for(let i=0; i<quizMaster; i++) {
        if(quizResults["results"][i].correctAnswer != "" && quizResults["results"][i].wrongAnswer != "") {
            resultsHistory(testNumber, quizResults["results"][i].nameUser, quizResults["results"][i].correctAnswer, quizResults["results"][i].wrongAnswer, quizResults["results"][i].scoreUser, quizResults["results"][i].noteUser)
        }
        testNumber++
    }

    if(result.nameUser != ""){
        newResults(quizResults["results"][quizMaster-1].correctAnswer, quizResults["results"][quizMaster-1].wrongAnswer, quizResults["results"][quizMaster-1].scoreUser)
    }

    let tryAgain = document.querySelector("#try-again")
    tryAgain.addEventListener("click", function(){
        location.href = './index.html'
        clearResults()
    })
})


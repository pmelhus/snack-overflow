// const answer = require("../../db/models/answer");

window.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementsByClassName("form-field")
    const newForm = Array.from(form)
    const textArea = (newForm[0].children.body);
    const listButtons = document.getElementsByTagName("button")
    const answerList = document.getElementById('answer')


    listButtons[2].addEventListener('click', async(e)=>{
        e.preventDefault(); //stops reload on new answer button
//textArea.value = body text input
        if(e){
            console.log(answerList)
            const res = await fetch('/answers/new', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    body: textArea.value
                })
            })

            //const newAnswer = await res.json();

            // if(res.status === 200){
                const newDiv = document.createElement('div');
                const newAnswer = document.createElement('p');
                newAnswer.innerText = textArea.value;
                textArea.value = '';
                answerList.appendChild(newDiv);
                newDiv.appendChild(newAnswer);
            // }
        }
    })


})

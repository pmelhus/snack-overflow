// const answer = require("../../db/models/answer");
let count = 0;
let answerText = 'answers'
let text = null
let key = null

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementsByClassName("form-field")
    //works
    const newForm = Array.from(form)
    //works
    const textArea = (newForm[0].children.body);
  //works
    const answerButton = document.getElementById('submit-answer')
    //works
    const answerList = document.getElementById('answer')
    //works
    const answerCount = document.getElementById('answerId')
  //works
    const buttonCard = document.querySelectorAll('#button-card')
    const buttonCards = document.querySelectorAll('.a-card');
    const answerCards = Array.from(answerList.children)
    const answerCardsArray = answerCards.map(card => card.id.split('-')[2])
    const lastElArray = [(answerCardsArray[answerCardsArray.length - 1])]
    const lastEl = lastElArray.join('')
    const newElementId = parseInt(lastEl) + 1;
    const answerDisplay = answerCount.children[0]
    const answerListLength = parseInt(answerList.childNodes.length)


    answerCount.children[0].value = answerListLength

    if (answerListLength === 0) {
        answerDisplay.innerText = 'There are no answers yet! Maybe submit one to get things started?';
    }
    if (answerListLength === 1) {
        answerDisplay.innerText = `${answerListLength} answer`
    }
    if (answerListLength > 1) {
        answerDisplay.innerText = `${answerListLength} answers`
    }

    //posting and dynamically delete most recent answer
if (answerButton) {
    answerButton.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const h2 = document.getElementsByTagName('h2')[0]
        const questionId = h2.id.split('-')[1];
        const res = await fetch(`/answers/${questionId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                body: textArea.value
            })
        })
        const data = await res.json()
        console.log(data)
        const newId = data.id
        const newBody = data.body
        const createdAt = data.createdAt
        let today = new Date()
        let time = today.toLocaleTimeString()
        let date = today.toLocaleDateString()
        const newDiv = document.createElement('div');
        const newAnswerAt = document.createElement('p')
        newAnswerAt.innerText = 'answered at'
        const newAnswer = document.createElement('p');
        const buttonDiv = document.createElement('div');
        const newEditButton = document.createElement('button')
        const newDeleteButton = document.createElement('button')
        // const createdAt = newAnswerAt.id.split('-')[1]
        newDiv.style.display = 'flex'
        newDiv.style.flexDirection = 'column'
        newDiv.style.justifyContent = 'right'
        newDiv.style.alignItems = 'center'
        newDiv.style.width= '60%'
        newDiv.style.marginTop= '10px'
        newDiv.style.padding= '20px'
        newDiv.style.border= 'solid lightgray .5px'
        newAnswer.id= `answerBody-${newId}`
        newAnswerAt.id= `answerDate-${createdAt}`
        newAnswerAt.innerHTML = `answered at ${time}, ${date}`
        newAnswer.innerText = textArea.value;
        textArea.value = '';
        newDiv.id = `new-div-${newId}`
        answerList.appendChild(newDiv);
        newDiv.appendChild(newAnswerAt)
        newDiv.appendChild(newAnswer);
        newAnswer.appendChild(buttonDiv)
        newEditButton.innerText = 'EditAnswer'
        newDeleteButton.innerText = 'Delete Answer'
        newDeleteButton.id = `new-delete-button-${newId}`
        newEditButton.id = `new-edit-button-${newId}`
        buttonDiv.appendChild(newEditButton)
        buttonDiv.appendChild(newDeleteButton)
        newEditButton.class='editDeleteButtons'
        newDeleteButton.class='editDeleteButtons'
        const answerListLength = parseInt(answerList.childNodes.length)
        const answerDisplay = answerCount.children[0]
        answerDisplay.value = answerListLength

        if (answerListLength === 1) {
            answerDisplay.innerText = `${answerListLength} answer`
        }
        if (answerListLength > 1) {
            answerDisplay.innerText = `${answerListLength} answers`
        }
        newDeleteButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            e.preventDefault()
            const answerCard = document.getElementById(`new-div-${newId}`);
            const res = await fetch(`/answers/instant/${newId}`, {
                method: "DELETE",
            })
            answerCard.remove()
            const newAnswerListLength = answerListLength - 1
            if (newAnswerListLength === 1) {
                answerDisplay.innerText = `${newAnswerListLength} answer`
            }
            if (newAnswerListLength > 1) {
                answerDisplay.innerText = `${newAnswerListLength} answers`
            }


        })

        //instant edit button

        //!I AM HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        newEditButton.addEventListener('click', async (e)=>{
            e.stopPropagation();
            e.preventDefault();
            const buttonId = e.target.id.split('-')[2]
            textArea.id = `edit-box-${newId}`
            const answerCard = document.getElementById(`new-div-${newId}`);
            textArea.innerText = newBody
            textArea.style = "color:red;font-weight:bold"
            const newSubmitButton = document.createElement('button');
            newSubmitButton.id = `submit-edit-button-${newId}`
            newSubmitButton.innerText = "Submit Edited Answer";
            newSubmitButton.style = "color:red", "font-weight:bold"
            const newForm = document.querySelector('.form-field')
            newForm.appendChild(newSubmitButton)
            let textArray = []

            textArea.addEventListener('input', async (e)=>{
                textArray.push(e.data)
            })


            newSubmitButton.addEventListener('click', async (e) =>{
                e.preventDefault();
                e.stopPropagation();
                const content = textArray.join('')
                const res = await fetch(`/answers/instant/${newId}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content
                    })
                })
                const data = await res.json();
                const text = data.updatedBody
                const textArea = document.getElementById(`edit-box-${newId}`)
                const answerCard = document.getElementById(`new-div-${newId}`);
                const answerCardItems = answerCard.children
                // console.log(answerCardItems)
                // console.log(answerCard.children[1])
                answerCard.children[1].innerText = text
                textArea.innerText = ' '
                textArea.style = 'color:black;'
                newSubmitButton.remove()
             })
        })


    })
}
buttonCard.forEach(card => {
    console.log(card)
    const buttonGroups = card.children;
    const editButton = buttonGroups[0];
    const deleteButton = buttonGroups[1];
    editButton.class = 'editDeleteButtons'
    deleteButton.class = 'editDeleteButtons'
    deleteButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        const buttonId = e.target.id.split('-')[2]
        const answerCard = document.getElementById(`answer-card-${buttonId}`);
        const res = await fetch(`/answers/${buttonId}`, {
            method: "DELETE",
        })
        answerCard.remove();
    })
    //EDIT BUTTON
    editButton.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const buttonId = e.target.id.split('-')[2]
        // console.log(buttonId)
        const form = document.getElementById(`edit-form-${buttonId}`)
        if (form.className==='hidden') {
            form.classList.remove('hidden')
        } else {
            form.classList.add('hidden')
        }
        // textArea.id = `edit-box-${buttonId}`
        // const answerCard = document.getElementById(`answer-card-${buttonId}`);
        // const answerBody = answerCard.children[1]
        // textArea.innerText = answerBody.innerText
        // textArea.style = "color:red;font-weight:bold"
        // const newSubmitButton = document.createElement('button');
        // newSubmitButton.id = `submit-edit-button-${buttonId}`

        // newSubmitButton.innerText = "Submit Edited Answer";
        // newSubmitButton.style = "color:red", "font-weight:bold"
        // const newForm = document.querySelector('.form-field')
        // newForm.appendChild(newSubmitButton)
        // let textArray = []
        // textArea.addEventListener('input', async (e)=>{
        //     textArray.push(e.data)
        // })
        const submitButtonHidden = document.getElementById(`edit-submit-${buttonId}`)
        submitButtonHidden.addEventListener('click', async (e)=>{
            e.preventDefault();
            // e.stopPropagation();
            // const content = textArray.join('')
            const content = document.getElementById(`${buttonId}-edit-content`).value

            const res = await fetch(`/answers/${buttonId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content
                })
            })
            // const answeredAt = document.getElementById(`answerDate-${buttonId}`)

            const data = await res.json();
            // console.log(data)
            const newBody = document.getElementById(`answerBody-${buttonId}`)
            newBody.innerHTML = data.updatedBody
            // answeredAt.innerHTML = data.editedAt
            form.classList.add('hidden')
            // newSubmitButton.remove();
            // const textArea = document.getElementById(`edit-box-${buttonId}`)
            // textArea.innerText = ' '
            // textArea.style = 'color:black;'
        })
    }, )
})



})

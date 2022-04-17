

const askQuestionsButton = document.querySelector('#noAuthQuestion')


askQuestionsButton.addEventListener('click', e => {
  const errorMsg = document.createElement('div')
  const questions = document.getElementById('questions')
  errorMsg.id = 'errorMsgQuestion'
  errorMsg.style.height = '15px'
  errorMsg.style.marginLeft = '450px'
  errorMsg.style.top = '80px'
  errorMsg.style.fontSize = '14px'
  questions.insertAdjacentElement('afterend', errorMsg)
  errorMsg.innerHTML = '<p>Must be a logged-in user to ask a question!</p>'
}, {once: true})

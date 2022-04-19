const answerButtonNoAuth = document.getElementById('submit-answer-noAuth')

if (answerButtonNoAuth) {
answerButtonNoAuth.addEventListener('click', e => {
    // console.log('========================')
  const errorMsg = document.createElement('div')
  errorMsg.id = 'errorMsgAnswer'
  errorMsg.style.height = '15px'
  errorMsg.style.top = '80px'
  errorMsg.style.fontSize = '14px'
  answerButtonNoAuth.insertAdjacentElement('afterend', errorMsg)
  errorMsg.innerHTML = '<p>Must be a logged-in user to answer a question!</p>'
}, {once: true})

}

// const answer = require("../../db/models/answer");
let count = 0;
let answerText = "answers";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementsByClassName("form-field");
  const newForm = Array.from(form);
  const textArea = newForm[0].children.body;
  const listButtons = document.getElementsByTagName("button");
  const answerList = document.getElementById("answer");
  const answerCount = document.getElementById("answerId");
  const questionLinks = document.querySelectorAll("h2 > a");

  // questionLinks.forEach((link) => {
  //     const linkId = req.params.url.split('/')[2]
  //     link.addEventListener('click', async(e) => {
  //         const res = fetch(`/questions/${linkId}/answers`)
  //         const data = res.json()
  //         console.log(data)
  //     })
  // })

  listButtons[2].addEventListener("click", async (e) => {
    e.preventDefault(); //stops reload on new answer button
    //textArea.value = body text input
    if (e) {
      const res = await fetch("/answers/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: textArea.value,
        }),
      });

      //const newAnswer = await res.json();

      // if(res.status === 200){
      const newDiv = document.createElement("div");
      const newAnswer = document.createElement("p");
      newAnswer.innerText = textArea.value;
      textArea.value = "";
      answerList.appendChild(newDiv);
      newDiv.appendChild(newAnswer);
      count++;
      const updateAnswerCount = answerCount.children[0];
      updateAnswerCount.value = count;
      if (count === 1) {
        answerText = "answer";
        updateAnswerCount.innerHTML = `${count} ${answerText}`;
      } else {
        answerText = "answers";
        updateAnswerCount.innerHTML = `${count} ${answerText}`;
      }
      // }
    } //add error for if the quesiton couldnt be retrieved
  });
});

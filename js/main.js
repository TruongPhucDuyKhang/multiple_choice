var questionArr = [
  {
    id: 1,
    question: 'Chúng ta đặt JavaScript bên trong phần tử HTML nào?',
    type: 'radio',
    choiceA: '< javascript >',
    choiceB: '< script >',
    choiceC: '< js >',
    choiceD: '< scripting >',
    correct: 'A',
  },
  {
    id: 2,
    question: 'Cú pháp JavaScript chính xác để thay đổi nội dung của phần tử HTML dưới đây là gì?',
    type: 'radio',
    choiceA: "document.getElementById('demo').innerHTML = 'Hello World!';",
    choiceB: "document.getElement('p').innerHTML = 'Hello World!';",
    choiceC: "#demo.innerHTML = 'Hello World!';",
    choiceD: "document.getElementByName('p').innerHTML = 'Hello World!';",
    correct: "A",
  },
  {
    id: 3,
    question: 'Đâu là nơi chính xác để chèn JavaScript?',
    type: 'radio',
    choiceA: 'Cả phần < head > và phần < body > đều đúng',
    choiceB: 'Phần < body >',
    choiceC: 'Phần < head >',
    correct: 'C',
  },
  {
    id: 4,
    question: 'Vòng lặp WHILE bắt đầu như thế nào?',
    type: 'radio',
    choiceA: 'while i = 1 to 10',
    choiceB: 'while (i <= 10)',
    choiceC: 'while (i <= 10; i++)',
    correct: 'B',
  },
  {
    id: 5,
    question: 'Cú pháp chính xác để tham chiếu đến tập lệnh bên ngoài có tên "xxx.js" là gì?',
    type: 'radio',
    choiceA: "< script href='xxx.js' >",
    choiceB: "< script name='xxx.js' >",
    choiceC: "< script src='xxx.js' > ",
    correct: "C",
  },
  {
    id: 6,
    question: 'Làm cách nào bạn có thể thêm nhận xét trong JavaScript?',
    type: 'radio',
    choiceA: "'This is a comment",
    choiceB: '< !--This is a comment-- >',
    choiceC: '//This is a comment',
    correct: 'C',
  },
  {
    id: 7,
    question: 'Làm thế nào để bạn viết "Hello World" trong một hộp cảnh báo?',
    type: 'radio',
    choiceA: "msg('Hello World')",
    choiceB: "msgBox('Hello World')",
    choiceC: "alertBox('Hello World')",
    choiceD: "alert('Hello World')",
    correct: "D",
  },
  {
    id: 8,
    question: 'Làm cách nào để bạn tạo một hàm trong JavaScript?',
    type: 'radio',
    choiceA: "function = myFunction()",
    choiceB: "function:myFunction()",
    choiceC: "alertBox('Hello World')",
    choiceD: "function myFunction()",
    correct: "D",
  },
  {
    id: 9,
    question: 'Làm thế nào để bạn gọi một hàm có tên là "myFunction"?',
    type: 'radio',
    choiceA: 'call function myFunction()',
    choiceB: 'call myFunction()',
    choiceC: 'myFunction()',
    correct: 'C',
  },
  {
    id: 10,
    question: 'Làm thế nào để viết một câu lệnh IF trong JavaScript?',
    type: 'radio',
    choiceA: 'if i = 5 then',
    choiceB: 'if i == 5 then',
    choiceC: 'if (i == 5)',
    choiceD: 'if i = 5',
    correct: 'C',
  },
];
localStorage.setItem("contentQuestion", JSON.stringify(questionArr));
//Element selector
var btnStart = document.querySelector(".btn-start");
var btnSubmit = document.querySelector(".btn-submit");
var countElement = document.querySelector(".count");
var resultTimer = document.getElementById("result-timer");
var btnQuestionBody = document.getElementById("header");
var btnQuestion = btnQuestionBody.getElementsByClassName("btn-question");
var btnPrevious = document.querySelector('.btn-previous');
var btnNext = document.querySelector('.btn-next');
var previousInput = document.querySelector('.page-item');
var nextInput = document.querySelector('.page-item-next');
//Get timer start & timer end
let getTimer = localStorage.getItem("countTimer");
let countTimerEnd = localStorage.getItem("countTimerEnd");
//Content question & checked
let contentQuestion = JSON.parse(localStorage.getItem("contentQuestion"));
let contentChecked = JSON.parse(localStorage.getItem("contentChecked"));
//Get pagination
let getPagination = localStorage.getItem("getPagination");
if (!getPagination) localStorage.setItem("getPagination", 1);

if (getPagination <= 1) {
  previousInput.classList.add("disabled");
} else if (getPagination >= 10) {
  nextInput.classList.add("disabled");
}

//total test results
totalResult = () => {
  let scoreCount = 0;
  let score = 0;
  if (contentChecked) {
    contentQuestion.forEach((question, index) => {
      contentChecked.forEach((checked, indexChecked) => {
        if (checked.question == question.id) {
          if (checked.selected == question.correct) {
            score += 1;
            return scoreCount = Math.round(100 * score / contentQuestion.length);
          }
        }
      });
    });
    return scoreCount;
  }
}

//Show total result
showTotalResult = () => {
  if (totalResult() >= 70) {
    Swal.fire(
      totalResult() + '%',
      'YOU HAVE PASSED!',
      'success'
    )
  } else if (!contentChecked) {
    Swal.fire(
      '0%',
      'Sorry , you have been disqualified . Wish you luck next time',
      'error'
    )
  } else {
    Swal.fire(
      totalResult() + '%',
      'Sorry , you have been disqualified . Wish you luck next time',
      'error'
    )
  }
}

//Show checked radio
showContentChecked = () => {
  if (contentChecked) {
    contentChecked.forEach(function (contentChecked) {
      var radios = document.querySelectorAll(`input[value="${contentChecked.value}"]`);
      radios.forEach(function (radio) {
        radio.checked = true;
      })
    });
  }
}

//Check answer & empty
checkAnswer = () => {
  document.addEventListener('DOMContentLoaded', function () {
    var questionNumber = document.querySelectorAll(".question-number");
    if (contentChecked) {
      contentQuestion.forEach((question, index) => {
        contentChecked.forEach((checked, indexChecked) => {
          if (countTimerEnd) {
            if (checked.question == question.id) {
              if (checked.selected == question.correct) {
                questionNumber[indexChecked].classList.add("green-tick");
              } else {
                questionNumber[indexChecked].classList.add("failed");
              }
            }
          }
        });
      });
    }
  });
}
checkAnswer();

if (countTimerEnd) {
  if (contentChecked) {
    if (contentChecked.length != contentQuestion.length) {
      contentQuestion.forEach(function (contentCk) {
        contentChecked.push({
          id: contentChecked.length + 1,
          value: '',
          selected: '',
          question: contentChecked.length + 1,
        });
      });
    }
  }
}

//Show Question Content Head
HandleQuestionHead = (id) => {
  var questionHeadElement = document.querySelector(".show-question-head");
  var showQuestionHeadHtmls = contentQuestion.map((content, index) => {
    if (id == content.id) {
      if (content.choiceD) {
        return `
          <div class="question-content-title">
            <h5>Câu ${content.id}:</h5>
          </div>
          <div class="question-content">
            <p class="answer">${content.question}</p>
          </div>
          <div class="form-group">
            <input type="${content.type}" onclick="handleEventChecked(this, ${index}, ${content.id})" name="question" id="A" value="${content.choiceA}"/>
            <label for="">${content.choiceA}</label>
          </div>
          <div class="form-group">
            <input type="${content.type}" onclick="handleEventChecked(this, ${index}, ${content.id})" name="question" id="B" value="${content.choiceB}"/>
            <label for="label-${content.id}">${content.choiceB}</label>
          </div>
          <div class="form-group">
            <input type="${content.type}" onclick="handleEventChecked(this, ${index}, ${content.id})" name="question" id="C" value="${content.choiceC}"/>
            <label for="label-${content.id}">${content.choiceC}</label>
          </div>
          <div class="form-group">
            <input type="${content.type}" onclick="handleEventChecked(this, ${index}, ${content.id})" name="question" id="D" value="${content.choiceD}"/>
            <label for="label-${content.id}">${content.choiceD}</label>
          </div>
        `;
      } else {
        return `
          <div class="question-content-title">
            <h5>Câu ${content.id}:</h5>
          </div>
          <div class="question-content">
            <p class="answer">${content.question}</p>
          </div>
          <div class="form-group">
            <input type="${content.type}" onclick="handleEventChecked(this, ${index}, ${content.id})" name="question" id="A" value="${content.choiceA}"/>
            <label for="">${content.choiceA}</label>
          </div>
          <div class="form-group">
            <input type="${content.type}" onclick="handleEventChecked(this, ${index}, ${content.id})" name="question" id="B" value="${content.choiceB}"/>
            <label for="label-${content.id}">${content.choiceB}</label>
          </div>
          <div class="form-group">
            <input type="${content.type}" onclick="handleEventChecked(this, ${index}, ${content.id})" name="question" id="C" value="${content.choiceC}"/>
            <label for="label-${content.id}">${content.choiceC}</label>
          </div>
        `;
      }
    }
  });
  questionHeadElement.innerHTML = showQuestionHeadHtmls.join('');
  showContentChecked();
}

//Show question body
showQuestionBody = () => {
  getPagination = localStorage.getItem("getPagination");
  var questionBodyElement = document.querySelector(".question-body");
  var questionBodyHtmls = contentQuestion.map(content => {
    if (getPagination == content.id) {
      HandleQuestionHead(content.id);
      return `
          <div class="question-number">
            <button class="btn btn-question active">${content.id}</button>
            <span></span>
          </div>
        `;
    } else {
      return `
          <div class="question-number">
            <button class="btn btn-question">${content.id}</button>
            <span></span>
          </div>
        `;
    }
  });
  questionBodyElement.innerHTML = questionBodyHtmls.join('');
}
showQuestionBody();

//Handle active question
handleActive = (index) => {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace("active", "");
  btnQuestion[index - 1].classList.add("active");
}

//Handle check print html css
if (countTimerEnd) {
  let minutes = parseInt(countTimerEnd / 60);
  let seconds = parseInt(countTimerEnd % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  } else if (minutes < 10) {
    minutes = '0' + minutes;
  }
  countElement.innerHTML = '00:' + minutes + ':' + seconds;
  clearTimeout("countDownTimer()");
  localStorage.removeItem("countTimer");
  btnSubmit.parentElement.classList.add("hidden");
  btnStart.parentElement.classList.remove("hidden");
}

//Check empty get timer
if (getTimer) {
  var countTimer = localStorage.getItem("countTimer");
  setTimeout("countDownTimer()", 1000);
  btnSubmit.parentElement.classList.remove("hidden");
  btnStart.parentElement.classList.add("hidden");
} else {
  var countTimer = 300 * 2;
}

//Handle time out
var minutes = parseInt(countTimer / 60);
var seconds = parseInt(countTimer % 60);
countDownTimer = () => {
  if (seconds < 10) {
    seconds = '0' + seconds;
  } else if (minutes < 10) {
    minutes = '0' + minutes;
  }
  countElement.innerHTML = '00:' + minutes + ':' + seconds;
  if (countTimer < 1) {
    localStorage.removeItem("countTimer");
    btnSubmit.parentElement.classList.add("hidden");
    btnStart.parentElement.classList.remove("hidden");
    showTotalResult();
  } else {
    countTimer = countTimer - 1;
    minutes = parseInt(countTimer / 60);
    seconds = parseInt(countTimer % 60);
    localStorage.setItem("countTimer", countTimer);
    setTimeout("countDownTimer()", 1000);
  }
}

//Button start & submit
btnStart.addEventListener("click", () => {
  setTimeout("countDownTimer()", 1000);
  setTimeout("location.reload()", 1000);
  localStorage.removeItem("countTimerEnd");
  localStorage.removeItem("contentChecked");
  localStorage.setItem("getPagination", 1);
});

//Handle submit
btnSubmit.addEventListener("click", () => {
  if (window.confirm("Bạn có chắc chắn muốn nộp bài hay không ?")) {
    localStorage.setItem("countTimerEnd", countTimer);
    let countTimerEnd = localStorage.getItem("countTimerEnd");
    let minutes = parseInt(countTimerEnd / 60);
    let seconds = parseInt(countTimerEnd % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    } else if (minutes < 10) {
      minutes = '0' + minutes;
    }
    showTotalResult();
    resultTimer.innerHTML = 'Time spent on question: 00:' + minutes + ':' + seconds;
    btnSubmit.parentElement.classList.add("hidden");
    btnStart.parentElement.classList.remove("hidden");
    countElement.remove();
    setTimeout("location.reload()", 2000);
  }
});

//Handle Catch event click question active
for (let i = 0; i < btnQuestion.length; i++) {
  btnQuestion[i].addEventListener('click', (e) => {
    var newIndex = i + 1;
    //check Previous & next
    if (newIndex > 1) {
      previousInput.classList.remove("disabled");
    } else {
      previousInput.classList.add("disabled");
    }
    if (newIndex == 10) {
      nextInput.classList.add("disabled");
    } else {
      nextInput.classList.remove("disabled");
    }
    HandleQuestionHead(newIndex);
    handleActive(newIndex);
    localStorage.setItem("getPagination", newIndex);
  });
}

//Handle pagination
btnPrevious.addEventListener("click", () => {
  getPagination = localStorage.getItem("getPagination");
  var previous = getPagination--;
  var newPrevious = previous - 1;
  //check previous
  if (newPrevious == 1) {
    previousInput.classList.add("disabled");
  } else if (newPrevious == 9) {
    nextInput.classList.remove("disabled");
  } else {
    previousInput.classList.remove("disabled");
  }
  handleActive(newPrevious);
  HandleQuestionHead(newPrevious);
  localStorage.setItem("getPagination", getPagination--);
});

btnNext.addEventListener("click", () => {
  getPagination = localStorage.getItem("getPagination");
  var next = getPagination++;
  var newNext = next + 1;
  //Handle pervious
  if (newNext > 1) {
    previousInput.classList.remove("disabled");
  } else {
    previousInput.classList.add("disabled");
  }
  //Handle next
  if (newNext == 10) {
    nextInput.classList.add("disabled");
    handleActive(newNext);
    HandleQuestionHead(newNext);
  } else {
    handleActive(newNext);
    HandleQuestionHead(newNext);
  }
  localStorage.setItem("getPagination", getPagination++);
});

//Event click get checked
handleEventChecked = (e, newIndex, question) => {
  if (getTimer) {
    if (contentChecked) {
      var id = contentChecked.map(function (contentCk, index) {
        if (newIndex == index) {
          return contentCk.id;
        }
      });
      //Check newIndex == index
      var newId = id.join('');
      if (newId) {
        contentChecked.splice(newIndex, 1, {
          id: newId,
          value: e.value,
          selected: e.id,
          question: question,
        });
      } else {
        //Push content checked
        contentChecked.push({
          id: contentChecked.length + 1,
          value: e.value,
          selected: e.id,
          question: question,
        });
      }
      localStorage.setItem("contentChecked", JSON.stringify(contentChecked));
    } else {
      var newContentChecked = { id: 1, value: e.value, selected: e.id, question: question };
      localStorage.setItem("contentChecked", JSON.stringify([newContentChecked]));
      location.reload();
    }
  } else {
    Swal.fire(
      'Error',
      'You need to Start to be selected!',
      'error'
    )
  }
}

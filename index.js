
// The function that's called upon when a user selects the SPIN button at the center of the wheel
function rotateFunction(){
    let min = 1024;
    let max = 9999;
    //randomizes the degrees that the wheel will spin
    let deg = Math.floor(Math.random() * (max - min)) + min + 360;
    document.getElementById('box').style.transform = "rotate("+deg+"deg)";
    let degrees = deg % 360;
    //Declare wedge bindings in the DOM
    let wedgeOne = document.getElementById("wedge1")
    let wedgeTwo = document.getElementById("wedge2")
    let wedgeThree = document.getElementById("wedge3")
    let wedgeFour = document.getElementById("wedge4")
    let wedgeFive = document.getElementById("wedge5")
    let wedgeSix = document.getElementById("wedge6")
    let wedgeSeven = document.getElementById("wedge7")
    let wedgeEight = document.getElementById("wedge8")
  
   
    // Adds the activity title to the wedge's inner text and runs the wedgeReturn function to determine which wedge was selected
    const newActivity = (wedge) => {
      let title = wedge.childNodes[0]
      fetch(`http://www.boredapi.com/api/activity/`)
      .then(res => res.json())
      .then(data => {
        title.innerText = data.activity
        let wedgeKey = data.key
        setTimeout(wedgeReturn,4250,wedge,wedgeKey)
      })
    }
  
    // Based on the degree rotation, fetches the selected wedge's additional info to feed into the changeText function
    const wedgeReturn = (wedge, wedgeKey) => {
      switch (wedge) {
        case wedgeThree:
          if (degrees > 247.5 && degrees <= 292.5) {
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        case wedgeFour:
          if (degrees > 67.5 && degrees <= 112.5) {
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        case wedgeFive:
          if (degrees > 292.5 && degrees <= 337.5) {
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        case wedgeSix:
          if (degrees > 112.5 && degrees <= 157.5) {
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        case wedgeSeven:
          if (degrees > 22.5 && degrees <= 67.5) {  
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        case wedgeEight:
          if (degrees > 202.5 && degrees <= 247.5) {
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        case wedgeOne:
          if (degrees > 157.5 && degrees <= 202.5) {
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        case wedgeTwo:
          if (degrees <= 22.5 || degrees >337.5) {
            fetch(`http://www.boredapi.com/api/activity?key=${wedgeKey}`)
            .then(res => res.json())
            .then(data => { changeText(data)
            })
          }
          break;
        default: console.log("This should never happen, but NO wedge was selected?!")
      }
    }
  
    // Based on the wedge that was returned from the above function, changes the text of the card to the left of the wheel
    function changeText (data){
    let textIntro = document.querySelector("#mainTitle")
    let textType = document.querySelector("#mainDescription");
    let textGuest = document.querySelector("#secondDescription");
    textIntro.textContent = data.activity 
    textType.textContent = `${data.type}` 
    textGuest.textContent= `Participants: ${data.participants}`
    let recommendationDiv = document.querySelector(".gameInto")
    let activityButton = document.createElement("button")
    activityButton.setAttribute("id","activityBtn")
    activityButton.innerText = "Add activity"
    // Add an event listener so that the user can add the activity to the My List ul AND the db.json file
    activityButton.addEventListener('click',addActivity)
    // Ensures that only ONE activity button gets added (vs. one every spin)
    if (recommendationDiv.contains(document.querySelector("button"))) {
      console.log("This div contains a button!")
      } else {
      recommendationDiv.append(activityButton)
      }
    }
  
    //The callback function of the "Add activity" button, which creates a workable object to POST to db.json
    const addActivity = () => {
      let textIntro = document.querySelector("#mainTitle")
      let textType = document.querySelector("#mainDescription");
      let textGuest = document.querySelector("#secondDescription");
      let activityObj = {
        activity: textIntro.innerText,
        type: textType.innerText,
        participants: textGuest.innerText
      }
      postActivity(activityObj)
    }  
  
    //The post to db.json based on the information within the activity card at the time the "Add activity" button was clicked
    function postActivity(activity){
      fetch("http://localhost:3000/activities", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      })
      .then(res => res.json())
      .then(data => renderActivity(data))
    }
  
     // Adds the description of the activity to each wedge and runs the necessary fetch requests for each
     const renderWedges = () => {
      newActivity(wedgeOne);
      newActivity(wedgeTwo);
      newActivity(wedgeThree);
      newActivity(wedgeFour);
      newActivity(wedgeFive);
      newActivity(wedgeSix);
      newActivity(wedgeSeven);
      newActivity(wedgeEight);
    }
    renderWedges();
  
    // These make the pointer arrow bounce after the wheel is spun
    let element = document.getElementById('mainbox');
    element.classList.remove('animate');
  
    setTimeout(function(){
      element.classList.add('animate');
      }, 5000);
  
  }
  
  // Fetches existing activities from the db.json file
  fetch("http://localhost:3000/activities")
  .then(res => res.json())
  .then(data => data.forEach(renderActivity))
  
  // Renders an activity, whether upon initially POSTing the activity to db.json or upon page load
  const renderActivity = (recommendation) => {
    let activityList = document.getElementById("list")
    let title = document.createElement("li")
    let fetchId = recommendation.id
    title.id = "lipadding"
    title.innerHTML = `<strong><font color="#892fe2">${recommendation.activity}</font></strong> | <strong>${recommendation.type}</strong> | <strong><font color="#892fe2">${recommendation.participants}</font><strong> `
    //Delete activity button
    let deleteButton = document.createElement('button')
    deleteButton.innerText = "X"
    deleteButton.className = "deleteButton"
    title.append(deleteButton)
    deleteButton.addEventListener('click', (e) => {
      deleteActivity(e, fetchId);
    })
    activityList.append(title)
  }
  
  // Function which, upon clicking a delete activity button, removes the button...
  const deleteActivity = (e, fetchId) => {
    // ...from the unordered list
    let lineItem = e.target.parentNode;
    lineItem.parentNode.removeChild(lineItem);
    // ...and from db.json
    fetch(`http://localhost:3000/activities/${fetchId}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json"
      }
    })
  }
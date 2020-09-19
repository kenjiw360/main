function goSomewhere(x){
  location = x;
}
function signup(x=""){
  var username = document.getElementById('username').value
  username = username.replace(/>/g,"›")
  username = username.replace(/</g,"‹")
  var password = document.getElementById('password').value
  var name = document.getElementById('name').value
  name = name.replace(/>/g,"›")
  name = name.replace(/</g,"‹")
  if(username && password && name){
    db.collection("users")
    .where("username","==",username)
    .get()
    .then(function (snapshot){
      if(snapshot.empty){
        db.collection("users")
        .add({
          username: username,
          password: CryptoJS.SHA256(password).toString(),
          name: name,
          roomsin: [],
          date: [],
          score: [],
          color: [],
          mentality: [],
          roomsmade: []
        })
        .then(function (snapshot){
          localStorage.setItem("userToken",snapshot.id)
          localStorage.setItem("type",x)
          location = "hub.html"
        })
      }else{
        return
      }
    })
  }else{
    alert("Oh No! You didn't fill all of the inputs!")
  }
}
function login() {
  var username = document.getElementById('username').value
  username = username.replace(/>/g,"‹")
  username = username.replace(/</g,"›")
  var password = CryptoJS.SHA256(document.getElementById('password').value).toString()
  db.collection('users')
  .where("username","==",username)
  .where("password","==",password)
  .get()
  .then(function(snapshot){
    if(!snapshot.empty){
    localStorage.setItem("userToken",snapshot.docs[0].id)
    location = "hub.html"
    }else{
      document.getElementById('warning').innerHTML = "<h1>User Doesn't Exist<h1>"
    }
  })
}
function forumpost() {

}
function displayforum(x) {

}
function anonymousyn(x) {

}
function changename() {

}
function setemail() {

}
function profilepic() {
  
}
function hub(){
  db.collection("groups")
  .where("creator","==",localStorage.getItem("userToken"))
  .get()
  .then(function (snapshot){
    if(!(snapshot.empty)){
      for(i = 0;i < snapshot.docs.length;i++){
        var img = document.createElement("img")
        img.style["width"] = "100px"
        img.style["height"] = "100px"
        img.style["border-radius"] = "50%"
        img.style["object-fit"] = "cover"
        img.src = snapshot.docs[i].data().logo
        var h3 = document.createElement("h3")
        h3.innerText = snapshot.docs[i].data().name
        var p = document.createElement("p")
        var id = snapshot.docs[i].id
        p.innerText = "Share Code: "+id
        var button = document.createElement("button")
        button.innerText = "Go To Linx"
        button.onclick = function(){location = "linx.html?id="+id}
        var hr = document.createElement("hr")
        hr.style["width"] = "90%"
        document.getElementById("ownedlinxes").appendChild(hr)
        document.getElementById("ownedlinxes").appendChild(img)
        document.getElementById("ownedlinxes").appendChild(h3)
        document.getElementById("ownedlinxes").appendChild(p)
        document.getElementById("ownedlinxes").appendChild(button)
      }
    }else{
      document.getElementById("ownedlinxes").innerHTML = "<p><i>*Cricket*Cricket</i><br>You didn't make any linx groups!</p>";
    }
  })
}
function moodtracksubmit(x) {
  var userToken = localStorage.getItem('userToken')
  var date = Date.now();
  var score = x/2;
  var color = 50 + score;
  var colorr;
  if(x <= 20){
    var colorr = "rgb(0, 70, 128)"
  } else if (x >= 21 && x <= 40) {
    var colorr = "rgb(0, 84, 154)"
  } else if (x >= 41 && x <= 60) {
    var colorr = "rgb(0, 99, 179)"
  } else if (x >= 61 && x <= 80){
    var colorr = "rgb(0, 113, 205)"
  } else if (x >= 81 && x <= 100) {
    var colorr = "rgb(0, 141, 255)"
  }
  var mentality = 'replacethis';
  if(x > 55){
    mentality = 'Happy'
  } else if(x < 45) {
    mentality = 'Sad'
  } else {
    mentality = 'Meh'
  }
  db.collection('users')
  .doc(userToken)
  .get()
  .then(function(snapshot){
    var dater = snapshot.data().date
    var scorer = snapshot.data().score
    var color = snapshot.data().color
    var mentalityr = snapshot.data().mentality
    dater.push(date)
    scorer.push(x)
    color.push(colorr)
    mentalityr.push(mentality)
    db.collection('users')
    .doc(userToken)
    .update({
      date: dater,
      score: scorer,
      color: color,
      mentality: mentalityr
    })
  })
}
function clickme(){
  var a = parseInt(document.getElementById('q1').value)
  console.log(a)
  var b = parseInt(document.getElementById('q2').value)
  console.log(b)
  var c = parseInt(document.getElementById('q3').value)
  console.log(c)
  var d = parseInt(document.getElementById('q4').value)
  console.log(d)
  var e = parseInt(document.getElementById('q5').value)
  console.log(e)
  var f = parseInt(document.getElementById('q6').value)
  console.log(f)
  var g = parseInt(document.getElementById('q7').value)
  console.log(g)
  var h = parseInt(document.getElementById('q8').value)
  console.log(h)
  var i = parseInt(document.getElementById('q9').value)
  console.log(i)
  var j = parseInt(document.getElementById('q10').value)
  console.log(j)
  var qwertyuiop = a + b + c + e + d + f + g + h + i + j
  console.log(qwertyuiop)
  moodtracksubmit(qwertyuiop)
}
function loadmood(){
  var userToken = localStorage.getItem('userToken')
  db.collection('users')
  .doc(userToken)
  .get()
  .then(function (snapshot){
    var i;
    for(i = 0; i < snapshot.data().date.length; i++){
      var scorer = snapshot.data().score[i]
      var backgroundcolorr = snapshot.data().color[i]
      var moodr = snapshot.data().mentality[i]
      var dater = parseInt(snapshot.data().date[i])
      var timerr = new Date(dater)
      var time = timerr.toDateString();
      var container = document.getElementById('displaymood')
      var day = document.createElement('day')
      var mood = document.createElement('h1')
      var br = document.createElement('br')
      var date = document.createElement('h2')
      var br2 = document.createElement('br')
      var emotion = document.createElement('h2')
      mood.style["color"] = "white"
      mood.style["background-color"] = backgroundcolorr
      mood.style["border-radius"] = "50%"
      mood.style["width"] = "50px"
      mood.style["height"] = "50px"
      mood.style["padding"] = "5px"
      mood.style["padding-bottom"] = "0px"
      mood.style["padding-top"] = "10px"
      mood.style["text-align"] = "center"
      mood.innerText = scorer
      date.innerText = time
      emotion.innerText = "Emotion: " + moodr
      day.appendChild(mood)
      day.appendChild(date)
      day.appendChild(emotion)
      document.getElementById('displaymood').appendChild(day)

    }
  })
}
function submit(){
  document.getElementById("button").innerText = "Uploading To Our Servers..."
  var name = document.getElementById("name").value
  name = name.replace(/>/g,"›")
  name = name.replace(/</g,"‹")
  var volunteername = document.getElementById("volunteername").value
  volunteername = volunteername.replace(/>/g,"›")
  volunteername = volunteername.replace(/</g,"‹")
  var description = document.getElementById("description").value
  description = description.replace(/>/g,"›")
  description = description.replace(/</g,"‹")
  var meetinglink = document.getElementById("meetinglink").value
  meetinglink = meetinglink.replace(/>/g,"‹")
  meetinglink = meetinglink.replace(/</g,"›")
  var meetingschedule = document.getElementById("meetingschedule").value
  meetingschedule = meetingschedule.replace(/>/g,"›")
  meetingschedule = meetingschedule.replace(/</g,"‹")
  var logo = document.getElementById("image").src
  if(description && name && meetinglink && meetingschedule && logo && volunteername && document.getElementById("logo").files.length > 0){
  db.collection('groups')
  .where("name","==",name)
  .get()
  .then(function (snapshot){
    if(snapshot.empty){
      db.collection('groups')
      .add({
        name: name,
        description: description,
        members: [localStorage.getItem("userToken")],
        creator: localStorage.getItem("userToken"),
        meetinglink: meetinglink,
        chat: [],
        people: [],
        logo: logo
      })
      .then(function (snapshot){
          document.getElementById("button").innerText =   "Done!";
        })
      }else{
      if(!(confirm("Oh No! That Book Group Already Exists.\nAre you sure you still want to use that name?"))){
        return
      }
      db.collection('groups')
      .add({
        name: name,
        description: description,
        members: "",
        creator: localStorage.getItem("userToken"),
        meetinglink: meetinglink,
        chat: [],
        people: [],
        logo: logo
      })
      .then(function (snapshot){
        db.collection("groups")
        .doc(snapshot.id)
        .update({
          id: snapshot.id
        })
       document.getElementById("button").innerText =   "Done!";
      })
    }
  })
  }else{
    alert("Mayday! One or more inputs are empty")
  }
}
function linxcreateforever(){
  setInterval(linxcreate(),1);
}
function linxcreate(){
  var fileButton = document.getElementById("logo")
  fileButton.addEventListener("change",function (){
    file = fileButton.files[0];
      document.getElementById("image").style["width"] = "200px";
    document.getElementById("image").style["height"] = "200px";
    var reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById("image").src = event.target.result;
    };
    document.getElementById("image").src = reader.readAsDataURL(file);
  })
}
function linxsearch(x){
  var search = document.getElementById("search").value
  db.collection('groups')
  .where("name",">=",search)
  .where("members","==","")
  .get()
  .then(function (snapshot){
    if(!(snapshot.empty)){
      document.getElementById("everything").innerHTML = ""
      var checking = 0;
      for(i=0;i < snapshot.docs.length; i++){
        if(snapshot.docs[i].data().transparency == "1"){
          checking ++
        }
      }
      if(checking == snapshot.docs.length){
        document.getElementById("everything").innerHTML = `<pre>Echo! Echo!
      There seems to be no linx groups that match that search.</pre>`
        return
      }
      for(i=0;i < snapshot.docs.length;i++){
        if(snapshot.docs[i].data().transparency == "0" && snapshot.docs[i].data().creator != localStorage.getItem("userToken")){
          var img = document.createElement("img")
          img.style["width"] = "100px"
          img.style["height"] = "100px"
          img.style["border-radius"] = "50%"
          img.style["object-fit"] = "cover"
          img.src = snapshot.docs[i].data().logo
          var h3 = document.createElement("h3");
          h3.innerHTML = snapshot.docs[i].data().name
          var p = document.createElement("p");
          p.innerHTML = (snapshot.docs[i].data().description).substr(0, 15)+"..."
          var button = document.createElement("button")
          button.innerText = "Join Room"
          button.setAttribute("onClick","goSomewhere(\"linxconfirm.html?id="+snapshot.docs[i].id+"\")")
          var div = document.createElement("div")
          div.style["border-radius"] = "20px";
          div.style["border"] = "solid";
          div.style["padding"] = "10px";
          div.style["margin"] = "10px";
          div.style["width"] = "300px";
          div.style["overflow"] = "auto";
          div.appendChild(img)
          div.appendChild(h3)
          div.appendChild(p)
          div.appendChild(button)
          document.getElementById("everything").appendChild(div)
        }else{
          document.getElementById("everything").innerHTML = `<i><pre>Echo! Echo!
      There seems to be no linx groups that match that search.</pre></i>`
        }
      }
    }else{
      document.getElementById("everything").innerHTML = `<i><pre>Echo! Echo!
      There seems to be no linx groups that match that search.</pre></i>`
    }
  })
}
function linxsharecode(){
  document.getElementById("input").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      var code = document.getElementById("input").value
      if(code.length == 20){
        db.collection("groups")
        .where("id","==",code)
        .get()
        .then(function (snapshot){
          if(!(snapshot.empty) && !((snapshot.docs[0].data().members).includes(localStorage.getItem("userToken")))){
            goSomewhere("linxconfirm.html?id="+snapshot.docs[i].id)
          }else{
            document.getElementById("i").innerHTML = "Mayday!!!<br>That linx group either doesn't exist or was made by you"
          }
        })
      }else{
        document.getElementById("i").innerHTML = "Oh no!<br>Every linx group share code is 20 characters long and no shorter."
      }
    }
  });
}
function linxconfirm(){
  var url = new URL(location.href);
  var id = url.searchParams.get("id");
  db.collection("groups")
  .where("id","==",id)
  .get()
  .then(function (snapshot){
    if(!(snapshot.empty) && !(snapshot.docs[0].data().members.includes(localStorage.getItem("userToken")))){
      document.getElementById("name").innerText = snapshot.docs[0].data().name
      document.getElementById("image").src = snapshot.docs[0].data().logo
      document.getElementById("confirm").setAttribute("onClick","linxbuttonconfirm('"+id+"')")
    }else{
      location = "linx.html?id="+id
    }
  })
}
function linxbuttonconfirm(x){
  db.collection("groups")
  .doc(x)
  .get()
  .then(function (snapshot){
    var members = snapshot.data().members
    members.push(localStorage.getItem("userToken"))
    db.collection("groups")
    .doc(x)
    .update({
      members: members
    })
    .then(function (snapshot){
      db.collection("users")
      .doc(localStorage.getItem("userToken"))
      .get()
      .then(function (snapshot){
        var attending = snapshot.data().roomsin
        attending.push(x)
        db.collection("users")
        .doc(localStorage.getItem("userToken"))
        .update({
          smallgroupsattending: attending
        })
        .then(function (snapshot){
          goSomewhere("linx.html?id="+x)
        })
      })
    })
  })
}
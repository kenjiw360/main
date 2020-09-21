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
function hub(x="members"){
  db.collection("groups")
  .where(x,"==",localStorage.getItem("userToken"))
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
        var button = document.createElement("button")
        button.innerText = "Go To Room"
        button.onclick = function(){location = "storiology.html?id="+id}
        var hr = document.createElement("hr")
        hr.style["width"] = "90%"
        document.getElementById("ownedlinxes").appendChild(hr)
        document.getElementById("ownedlinxes").appendChild(img)
        document.getElementById("ownedlinxes").appendChild(h3)
        document.getElementById("ownedlinxes").appendChild(button)
      }
    }else{
      document.getElementById("ownedlinxes").innerHTML = "<p><i>*Cricket*Cricket</i><br>Their aren't any rooms!</p>";
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
      }else{
      if(!(confirm("Oh No! That Book Room Already Exists.\nAre you sure you still want to use that name?"))){
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
  .get()
  .then(function (snapshot){
    if(!(snapshot.empty)){
      document.getElementById("everything").innerHTML = ""
      var checking = 0;
      for(i=0;i < snapshot.docs.length; i++){
        if(snapshot.docs[i].data().members != ""){
          checking ++
        }
      }
      if(checking == snapshot.docs.length){
        document.getElementById("everything").innerHTML = `<pre>Echo! Echo!
      There seems to be no books that match that search.</pre>`
        return
      }
      for(i=0;i < snapshot.docs.length;i++){
        if(snapshot.docs[i].data().members == "" && snapshot.docs[i].data().creator != localStorage.getItem("userToken")){
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
          button.setAttribute("onClick","goSomewhere(\"storiologyconfirm.html?id="+snapshot.docs[i].id+"\")")
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
      There seems to be no books that match that search.</pre></i>`
        }
      }
    }else{
      document.getElementById("everything").innerHTML = `<i><pre>Echo! Echo!
      There seems to be no books that match that search.</pre></i>`
    }
  })
}
function linxconfirm(){
  var url = new URL(location.href);
  var id = url.searchParams.get("id");
  db.collection("groups")
  .where("id","==",id)
  .get()
  .then(function (snapshot){
    if(!(snapshot.empty) && snapshot.docs[0].data().members != localStorage.getItem("userToken")){
      document.getElementById("name").innerText = snapshot.docs[0].data().name
      document.getElementById("image").src = snapshot.docs[0].data().logo
      document.getElementById("confirm").setAttribute("onClick","linxbuttonconfirm('"+id+"')")
    }else{
      location = "https://example.com"
    }
  })
}
function linxbuttonconfirm(x){
  db.collection("groups")
  .doc(x)
  .get()
  .then(function (snapshot){
    db.collection("groups")
    .doc(x)
    .update({
      members: localStorage.getItem("userToken")
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
          roomsin: attending
        })
        .then(function (snapshot){
          goSomewhere("storiology.html?id="+x)
        })
      })
    })
  })
}
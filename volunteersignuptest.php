<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Storiology - Sign Up</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <script src='https://www.google.com/recaptcha/api.js'></script>
  <link href="style.css" rel="stylesheet" type="text/css" />
  <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans&family=Lato:wght@900&family=Nunito:wght@300&family=Quicksand:wght@500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="row" style="margin:0px;">
    <div class="col no-gutters" style="text-align:center;background-color:crimson;height:100vh;position:relative;">
      <div style="position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);">
        <h1 style="color:white;">Volunteer Application</h1>
      </div>
    </div>
    <div class="col no-gutters" style="position:relative;">
    <center style="position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%);">
      <form>
      <input type="text" style="text-align:center;" placeholder="Username" id="username" maxlength="20">
      <br>
      <br>
      <input type="text" style="text-align:center;" placeholder="Full Name" id="name" maxlength="25">
      <br>
      <br>
      <input type="email" style="text-align:center;" placeholder="Email" id="email">
      <br>
      <br>
      <input type="password" style="text-align:center;" placeholder="Password" id="password">
      <br>
      <br>
      <textarea id="description" placeholder="Your description"></textarea>
      <br>
      <br>
      <button onclick="mail()">Submit</button>
      <br>
      <div class="g-recaptcha" data-sitekey="6LdwOc4ZAAAAADPhh981ONrkq9nHcuxy8WMVbbfH"></div>
      </form>
    </center>
    </div>
  </div>
  <script src="https://smtpjs.com/v3/smtp.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js">
		</script>
		<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-auth.js">
		</script>
		<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-firestore.js">
		</script>
    <script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-storage.js">
		</script>
		</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js">
		</script>
		<script>
			var firebaseConfig = {
    		apiKey: "AIzaSyABaCNIW3tcJV-uzqtP6v7irI2eHghSPyI",
        authDomain: "linx-70fe6.firebaseapp.com",
        databaseURL: "https://linx-70fe6.firebaseio.com",
        projectId: "linx-70fe6",
        storageBucket: "linx-70fe6.appspot.com",
        messagingSenderId: "1035025595006",
        appId: "1:1035025595006:web:921df85f55a7b53a10b62f"
  		};
  		firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
      function mail(){
        if(document.getElementById("email").value && document.getElementById("name").value && document.getElementById("description").value && document.getElementById("username").value && document.getElementById("password").value){
          Email.send({
            SecureToken : "129bdd55-9ab5-4d42-a225-eb412ce9bd0c",
            Host : "smtp.mailtrap.io",
            Username : "c1d3e6aa88a22f",
            Password : "623b5974c13bc9",
            To : "storiologyteam@gmail.com",
            From : document.getElementById("email").value,
            CC : "storiologyteam@gmail.com",
            Subject : "Volunteer Request",
            Body : "<html><center><h1 style=\"font-family:sans-serif;\">Volunteer Request</h1><h2 style=\"font-family:sans-serif;\">"+document.getElementById("name").value+"</h2><pre style=\"font-family:sans-serif;\">"+document.getElementById("description").value+"</pre><br><button onclick=\"volunteersignup(\\\""+document.getElementById("name").value+"\\\",\\\""+document.getElementById("username").value+"\\\",\\\""+document.getElementById("password").value+"\\\",\\\""+document.getElementById("email").value+"\\\")\">Allow Volunteer</button></center></html>"
          })
        }else{
          alert("You didn't fill all of the inputs!")
        }
      }
		</script>
    <script src="script.js"></script>
    <?php

if(isset($_POST['submit']))
{

function CheckCaptcha($userResponse) {
        $fields_string = '';
        $fields = array(
            'secret' => 6LdwOc4ZAAAAAJde3BN64bEzeAag-zAtDZ8fY9eQ
            'response' => $userResponse
        );
        foreach($fields as $key=>$value)
        $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

        $res = curl_exec($ch);
        curl_close($ch);

        return json_decode($res, true);
    }


    // Call the function CheckCaptcha
    $result = CheckCaptcha($_POST['g-recaptcha-response']);

    if ($result['success']) {
        '<script>localStorage.setItem('poc', 1)</script>'
	
    } else {
        // If the CAPTCHA box wasn't checked
       echo '<script>localStorage.setItem('poc', 0)</script>';
    }
}
    ?>
</body>
</html>
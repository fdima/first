<html>
<head>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
</head>
<body>
<script>
   window.fbAsyncInit = function() {
     FB.init({
       appId      : '2066301470277423',
   	   cookie     : true,
       xfbml      : true,
       version    : 'v3.0',
	   status: true,
	   debug: true
     });
     FB.AppEvents.logPageView();
	//
 FB.login(function(response) {
 //console.log(response);  //response.authResponse.accessToken response.authResponse.userID

 //++0
  FB.api (
	"/me", function (response) {  //response.name response.id
		if (response && !response.error) {
			console.log(response);
		}
	}
  ); 
  //++0
  FB.api (
	"/" + response.authResponse.userID + "?fields=email, link" , function (response) { //response.email response.link
	if (response && !response.error) {
		console.log(response);
	}
   }
  );  
  //++0
  var s = window.location.href;
  var arUr = s.split("?");
  //console.log(arUr[1].split("=")[1]);
   FB.api (
	"/"+arUr[1].split("=")[1] , function (response) { //ivent 2139324229679531
	if (response && !response.error) {
		console.log(response);
		//console.log(response.place.id);
		//+
		   FB.api (
			"/"+response.place.id+"/picture?redirect=false&type=large" , function (response) { // page inc ivents "/244242539704576/picture?redirect=false&type=large"
			if (response && !response.error) {
				console.log(response);
			} else {
				console.log(response);
			}
		   }
		  ); 
		//+
	} else {
		console.log(response.error.message);
	}
   }
  );  
    //++0 
}, {scope: 'public_profile,email,publish_pages'});

};


(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//http://graph.facebook.com/100001689342861/picture?type=large картинка со страницы

/////244242539704576/picture?type=large 
/// хорошее описание https://www.kv.by/content/obzor-facebook-api

</script>

</body>
</html>
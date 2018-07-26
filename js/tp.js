var desc, user;
//////////////////////////////////////////////////////////////////////
//http://localhost/fb/tp/index.php?%D1%83=2139324229679531&d=123#
//https://fdima.ru/fb/index.php?ev=2139324229679531&d=123#
window.onload = function () {
	$(".content2").css({'display': 'none'});
	$(".div-ticket-itog").css({'display': 'none'});
	$(".itog").css({'display': 'none'});
	$(".div-fb").css({'display': 'none'});
	$(".btn-success").attr({'disabled': 'disabled'});
	set_event();

	$(".data-choice").on('click', function(event) {
		// вернуться назад (повторный выбор с первой страницы)
		$(".content2").css({'display': 'none'});
		$(".itog").css({'display': 'none'});
		$(".content1").css({'display': ''});
		$(".header-div").html ("Выберите дату и время");
	});

	$("#ch-readed").on('click', function(event) {
		//console.log($( "#ch-readed:checked").val());
		if ($( "#ch-readed:checked").val() == 'on') {
			$(".btn-success").removeAttr("disabled");
		} else {
			$(".btn-success").attr({'disabled': 'disabled'});
		}
		//тут сделать валидацию полей формы для оплаты!
	});
	$(".btn-success").on('click', function(event) {
		// собрать все данные для отправки
		//$(".header-div").text() // название с кнопки i-email i-name i-phone ch-anons ch-readed if ($( "#ch-readed:checked").val() == 'on') 
		//console.log($('#myForm').validator());

		var items = $(".item"); //ticket-name ticket-price
		var tickets_name = $(".ticket-name"); //ticket-name ticket-price
		var tickets_price = $(".ticket-price"); //ticket-name ticket-price
		var header = $(".header-div").text();
		var chanons  = $( "#ch-anons:checked").val();
		var chreaded = $( "#ch-readed:checked").val();
		var mail     = $( "#i-email").val();
		var fio      = $( "#i-name").val();
		var phone    = $( "#i-phone").val();
		console.log(items);
		console.log(tickets_name);
		console.log(tickets_price);
		console.log(header);
		console.log(chanons);
		console.log(chreaded);
		console.log(mail);
		console.log(fio);
		console.log(phone);
		$("#ya-sum").val(printitog());
		$("#ya-comment").val(header);
		$("#ya-email").val(mail);
		alert(9);
	});	
}
/////////////////////////////////////////////////////////////////////////////////////// FB
 function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $(".div-fb").css({'display': 'none'});
      $(".content1").css({'display': ''});
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Войдите в приложение.';
        $(".div-fb").css({'display': ''});
        $(".content1").css({'display': 'none'});
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
/////////////////////////////////////////////////////////////////////////////////////// FB
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '2066301470277423',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
    version      : 'v3.0', // use graph api version 2.8
	 status      : true,
	  debug      : true      
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };
/////////////////////////////////////////////////////////////////////////////////////// FB
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email,birthday', function(response) {
      console.log(response);
      document.getElementById('status').innerHTML =
        'logging, ' + response.name + '!';
    });

  var s = window.location.href;
  var arUr = s.split("?");
  var arUrp = arUr[1].split("&");
   FB.api (
	"/"+arUrp[0].split("=")[1] , function (response) { //ivent 2139324229679531
	if (response && !response.error) {
		console.log(response);
		load_data_event(response);
		set_event();
	} else {
		console.log(response.error.message);
	}
   }
  );   

  }
/////////////////////////////////////////////////////////////////////////////////////// FB  
function activ_inc_dec() {
	$(".b-dec").on('click', function(event) {
		if (event.currentTarget.parentElement.children[1].value > 0) { 
			--event.currentTarget.parentElement.children[1].value;
		}
		printitog();
	});

	$(".b-inc").on('click', function(event) {
		if (event.currentTarget.parentElement.children[1].value < 10) { 
			++event.currentTarget.parentElement.children[1].value;
		}	
		printitog();
	});	
}
///////////////////////////////////////////////////////////////////////////////////////
function printitog() {
	//ticket-itog
	//var $y = $("input");
	var $y = $(".item"); //ticket-name ticket-price
	var count = 0;
	var sum =0;
	$y.each(function(index) {
		//console.log($(this).val());
		count = count + Number($(this).val()); 
		sum = sum + Number($(this).val()) * Number($(this).attr('price'));
	});
	//console.log(count);
	$(".ticket-itog").html("Вы выбрали "+count+" "+skl(count)+" на сумму "+sum+" руб.");
	//console.log(skl(count));
	if (count > 0) {
		$(".div-ticket-itog").css({'display': ''});
		$(".itog").removeAttr('display');
		$(".itog").css({'display': 'block'});
	} else {
		$(".div-ticket-itog").css({'display': 'none'});
		$(".itog").css({'display': 'none'});
	}
	return sum;
}
///////////////////////////////////////////////////////////////////////////////////////
function skl(i) {
	//console.log(i);
	var list1 = [1,21];
	var list2 = [2,3,4,22,23,24];
	var list3 = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25,26,27,28,29,30];
	if (i == 5) {
		return "билетов";
	}
	if (i in list1) {
		return "билет";
	}
	if (i in list2) {
		return "билета";
	}
	if (i in list3) {
		return "билетов";
	}
}
///////////////////////////////////////////////////////////////////////////////////////
function load_data_event(s) {
	desc = '';
	//console.log(s);
	//console.log('event_times' in s);
	desc = s.description;
	//alert(desc);
	//++$(".page-choice-root").empty();
	if ('event_times' in s) {
		// есть слоты
		s.event_times.forEach(function(item, i, arr) {
			//
			//console.log(item.id);
			//--console.log(item.start_time);
			//--console.log(item.end_time);
			//++var ds = new Date(item.start_time);
			//++var de = new Date(item.end_time);
			//++var fds = ds.toLocaleDateString()+' '+ds.toTimeString().substring(0, ds.toTimeString().indexOf("GMT"));
			//++var fde = de.toLocaleDateString()+' '+de.toTimeString().substring(0, de.toTimeString().indexOf("GMT"));
			//++var fds = ds.toLocaleDateString()+' c'+ds.toTimeString().substring(0, 5);
			//++var fde = /*de.toLocaleDateString()+' '+*/de.toTimeString().substring(0, 5);
			var fds = item.start_time;  //"2018-08-14T19:00:00+0300"
			fds  = fds.substr(8,2)+'-'+fds.substr(5,2)+'-'+fds.substr(0,4)+'  '+fds.substr(11,5);
			var fde = item.end_time;
			fde = fde.substr(11,5);
			/*console.log(fds + ' ' + fde);*/
			// добавить в DOM
			var titem = "";
			titem = titem +  "<div class='row-choice' id='ch"+i+"' data_loaded='"+$(".page-choice-root").attr('data_loaded')+"'>";
			titem = titem +  "<div class='row-choice-date'> "+fds + " до " + fde+"</div>";
			titem = titem +  "<div class='row-choice-dop'></div>";
			titem = titem +  "<div class='row-choice-price'></div>";
		    titem = titem +  "</div>";
		    $(".page-choice-root").append(titem);
		});
	} else {
		// нет слотов
			//++var ds = new Date(s.start_time);
			//++var de = new Date(s.end_time);
			//++var fds = ds.toLocaleDateString()+' '+ds.toTimeString().substring(0, ds.toTimeString().indexOf("GMT"));
			//++var fde = de.toLocaleDateString()+' '+de.toTimeString().substring(0, de.toTimeString().indexOf("GMT"));
			//++var fds = ds.toLocaleDateString()+' с'+ds.toTimeString().substring(0, 5);
			//++var fde = /*de.toLocaleDateString()+' '+*/de.toTimeString().substring(0, 5);
			var fds = s.start_time;  //"2018-08-14T19:00:00+0300"
			fds  = fds.substr(8,2)+'-'+fds.substr(5,2)+'-'+fds.substr(0,4)+'  '+fds.substr(11,5);
			var fde = s.end_time;
			fde = fde.substr(11,5);			
			/*console.log(fds + ' ' + fde);*/
			// добавить в DOM
			var titem = "";
			titem = titem +  "<div class='row-choice' id='ch"+0+"' data_loaded='"+$(".page-choice-root").attr('data_loaded')+"'>";
			titem = titem +  "<div class='row-choice-date'>с "+fds + " по " + fde+"</div>";
			titem = titem +  "<div class='row-choice-dop'></div>";
			titem = titem +  "<div class='row-choice-price'></div>";
		    titem = titem +  "</div>";
		    $(".page-choice-root").append(titem);			
	}
}
///////////////////////////////////////////////////////////////////////////////////////
function set_event() {
		$(".row-choice").on('click',function(event){ 
		//console.log(event);
		// выбрали одно значение на первой странице)
		$(".row-choice").removeClass("row-choice-checed");
		$("#"+event.currentTarget.id).toggleClass("row-choice-checed");
		s = event.currentTarget.innerText;
		s = s.replace("бесплатно","");
		$(".header-div").html (desc +"<br>"+s);
		$(".content1").css({'display': 'none'});
		$(".content2").css({'display': ''});
		// сформировать данные для билетов
		//console.log(event.currentTarget.id); //data_loaded
		var items = JSON.parse($("#"+event.currentTarget.id).attr('data_loaded'));
		//alert(items[0].name); //name pricet price
		$(".page-choice").empty();
		var titem="";		
		items.forEach(function(item, i, arr) {
  			//alert( i + ": " + item.name);
				titem = titem + "<div class=type-ticket><div class='ticket-name'><span class='ticket-name-t'>"+item.name;
				titem = titem + "</span></div><div class='ticket-price'><span class='ticket-price-t'>"+item.pricet;
				titem = titem + "</span></div><div class='ticket-kol'><button class='b-dec'>-</button><input value ='0' price='"+item.price;
				titem = titem + "' class='item'></input><button class='b-inc'>+</button></div></div>";
		});
		//var titem = "<br>";
		titem = titem + "<div class='type-ticket div-ticket-itog'><div class='ticket-itog'>Вы не выбрали ни одного билета!</div></div>";
		$(".page-choice").append(titem);
		activ_inc_dec();
	});
}
///////////////////////////////////////////////////////////////////////////////////////
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
///////////////////////////////////////////////////////////////////////////////////////
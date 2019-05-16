<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes"> 
    <meta http-equiv="Cache-Control" content="no-cache">	
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" /> 

	<link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="./css/tp.css">
	<script src="./js/jquery.js" type="text/javascript"></script>
	<script src="./js/bootstrap.js" type="text/javascript"></script>
	<script src="./js/validator.min.js" type="text/javascript"></script>
	<title></title>
	<link rel="shortcut icon" type="image/ico" href="./favicon.ico">
</head>
<body>
	<!--  -->
	<?
	if (isset($_GET['d']) == false) {
		echo("нет данных для загрузки");
		exit();
	}
	if (file_exists("./data/".$_GET['d'].".json") == false) {	
		echo('не найден файл');
		exit();
	}
	?>
	<div class="page">
		<div class="content content1">
			<div class="header-div">
				Выберите дату и время
			</div>
			<div class="page-choice-root" <? $f1 = $_GET['d'];
											 $json1 = file_get_contents("./data/$f1.json"); 
											 $data1 = json_decode($json1);
											 $s = trim(json_encode($data1->item, JSON_UNESCAPED_UNICODE));
											 echo ("data_loaded= '$s'");
										  ?> >
			</div>
		</div>
		<div class="content content2">
			<div class="header-div">
				конкретная дата
			</div>
			<div class="header-div-sub1">
				Выберите тип билетов:
			</div>
			<div class="header-div-sub2">
				<a href="#" class="data-choice">Выбрать новую дату</a>
			</div>
			<div class="page-choice">
				<!-- 
				<div class="type-ticket div-ticket-itog">
					<div class="ticket-itog"></div>
				</div>											
				-->
			</div>

			<div class="itog"> <!-- демоданные + расчет -->
				
				<form role="form" data-toggle="validator">
				
				  <div class="form-group">
				    <label for="i-email">Email</label>
				    <input type="email" class="form-control" id="i-email" placeholder="Введите Ваш email" data-error="Неправильный e-mail" required>
				    <div class="help-block with-errors"></div>
				  </div>
				  <div class="form-group">
				    <label for="i-name">Имя</label>
				    <input type="text" class="form-control" id="i-name" placeholder="Введите Ваше имя" data-error="Поле обязательно для заполнения" required>
				    <div class="help-block with-errors"></div>
				  </div>
				  <div class="form-group">
				    <label for="i-phone">Номер телефона</label>
				    <input type="tel" class="form-control" id="i-phone" placeholder="Введите Ваш номер для связи" data-error="Неправильный номер телефона" required>
				    <div class="help-block with-errors"></div>
				  </div>
				  <div class="checkbox">
				    <label>
				    <input type="checkbox" id="ch-anons"><span class="t-checkbox">Я хочу получать анонсы событий этого организатора по электронной почте</span>
				    </label>
				  </div>
				  <div class="checkbox">
				    <label>
				    <input type="checkbox" id="ch-readed"><span  class="t-checkbox">Я подтверждаю свое согласие с условиями <a href="#">Пользовательского соглашения</a> и <a href="#">Договором оказания услуг по организации мероприятия и политикой возвратов</a></span>
				    </label>
				  </div>				  
				  <!--
				  <button type="button" class="btn-lg btn-success">Купить билет</button>
				-->
				</form>
				
				<!-- -->
				<form class="f-pay" method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">    
				  <input type="hidden" name="receiver" value="41001741478922">    
				  <input type="hidden" name="formcomment" value="sportme.network">    
				  <input type="hidden" name="short-dest" value="Тут правильно указать данные о ивенте">    
				  <input type="hidden" name="label" value="$order_id">   
				  <input type="hidden" name="quickpay-form" value="donate">    
				  <input type="hidden" name="targets" value="транзакция {order_id}">    
				  <input type="hidden" id="ya-sum" name="sum" value="100.00" data-type="number">    
				  <input type="hidden" id="ya-comment" name="comment" value="Тут тоже данные по ивенту - конкретно, что куплено и т.п.">   
				  <input type="hidden" name="need-fio" value="false">    
				  <input type="hidden" id="ya-email" name="need-email" value="false">    
				  <input type="hidden" name="need-phone" value="false">    
				  <input type="hidden" name="need-address" value="false">    
				  <input type="hidden" name="paymentType" value="AC"> 
				  <!--<input type="submit" value="Перевести">-->
				  <button type="submit" class="btn-lg btn-success">Купить билет</button>
				</form>
				<!-- -->
			</div>
		</div>	
	</div>

<div class="div-fb">
	<!--
	<fb:login-button scope="public_profile,email,publish_pages" onlogin="checkLoginState();"></fb:login-button>
	-->
	<div id="status"></div>
	<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true" scope="public_profile,email,publish_pages" onlogin="checkLoginState();"></div>
</div>

	<script src="./js/tp.js" type="text/javascript"></script>
</body>
</html>
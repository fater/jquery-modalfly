<?php

$json = [];
if ($_POST['action'] == 'get_form')
{
	// Выводим заголовок формы
	$json['title'] = 'Форма 1';

	// Выводим содержимое формы
	$json['content'] = '
<div class="row">
	<div class="col-sm-7">
		<input type="text" data-trigger="enter" data-name="text_field" value="" autofocus class="form-control" />
	</div>
	<div class="col-sm-5">
		Укажите первое значение
	</div>
</div>
<br />
<div class="row">
	<div class="col-sm-7">
		<input type="checkbox" data-trigger="enter" data-name="option" value="option_value" /> Option <br />
		<input type="radio" name="name1" data-name="radio_option" value="1" /> 1
		<input type="radio" name="name1" data-name="radio_option" value="2" /> 2
		<input type="radio" name="name1" data-name="radio_option" value="3" /> 3
		<input type="radio" name="name1" data-name="radio_option" value="4" /> 4
	</div>
	<div class="col-sm-5">
		Отметить параметры
	</div>
</div>
<p>От сервера были полученны данные, их дальше можно отправлять на сервер</p>
	';

	// Отображаем кнопку сохранить и меняем заголовок
	$json['button_save'] = 'Save custom name';

	// Прикрепляем к форме параметры, котоыре при нажатии на кнопку сохранить, будут отправлены на сервер
	$json['param'] = array
	(
		'action' => 'add_category',
		'id' => $_POST['id']
	);

	// Отображается кнопка Закрыть и меняем заголовок
	$json['button_close'] = 'Custom close title';
}
elseif ($_POST['action'] == 'add_category')
{
	// Выводим заголовок формы
	$json['title'] = 'Указанные вами данные';

	// Выводим содержимое формы
	$json['content'] = 'Сервер получил следующие данные:<br /><pre>'.print_r ($_POST, true).'</pre>';
	// Изменяем название кнопки Закрыть и отображаем ее
	$json['button_close'] = 'ОК!';
	$json['size_small'] = true;

}
elseif ($_POST['action'] == 'func_close')
{
	$json['close'] = true;
	$json['jsa'] = 'alert ("JS команда с сервера, после закрытия окна");';
}

echo json_encode ($json);
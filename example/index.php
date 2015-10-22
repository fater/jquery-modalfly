<?php

$json = [];
if ($_POST['action'] == 'get_form')
{
	// Выводим заголовок формы
	$json['title'] = 'Form title';

	// Выводим содержимое формы
	$json['content'] = '
<div class="row">
	<div class="col-sm-7">
		<input type="text" data-trigger="enter" data-name="field1" data-object="fld" value="" autofocus class="form-control" />
	</div>
	<div class="col-sm-5">
		Укажите первое значение
	</div>
</div>
<br />
<div class="row">
	<div class="col-sm-7">
		<input type="checkbox" data-trigger="enter" data-name="field2" data-object="fld" value="checked1" />
	</div>
	<div class="col-sm-5">
		Отметить параметр
	</div>
</div>
<p>От сервера были полученны данные, их дальше можно отправлять на сервер</p>
	';

	// Отображаем кнопку сохранить и меняем заголовок
	$json['button'] = 'Save custom name';

	// Прикрепляем к форме параметры, котоыре при нажатии на кнопку сохранить, будут отправлены на сервер
	$json['param'] = array
	(
		'action' => 'add_category',
		'id' => $_POST['id']
	);

	// Отображается кнопка Закрыть
	$json['button_close'] = true;
	// Изменяем название кнопки Закрыть
	$json['button_close_text'] = 'Custom close title';
}
elseif ($_POST['action'] == 'add_category')
{
	// Выводим заголовок формы
	$json['title'] = 'Указанные вами данные';

	// Выводим содержимое формы
	$json['content'] = 'Сервер получил следующие данные: Первое значение "'.$_POST['field1'].'"';
	if (isset ($_POST['field2']))
	{
		$json['content'] .= ', а так же параметр "'.$_POST['field2'].'"';
	}

	// Отображается кнопка Закрыть
	$json['button_close'] = true;
	// Изменяем название кнопки Закрыть
	$json['button_close_text'] = 'ОК!';
}

echo json_encode ($json);
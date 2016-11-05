#ModalFly jQuery Plugin

Version: **2.5.0**

[ [Русская версия Readme](README-RU.md) ]

###What does the module?
* Модуль может отображать модальное окно с заданным содержимым; 
* Модуль может отправлять запросы на сервер с заданными параметрами;
* Модуль может отправлять запросы на сервер и возвращать их в виде исполняемого JS кода или/и отображать полученные данные от сервера в модальном окне;
* Модуль может активировать события по специальным HTML командам, например отправить параметры на сервер, а полученные от сервера данные отобразить в модальном окне.
* Модуль не требует написания JS кода, чтобы автоматически отправить данные нужных полей с модального окна. Кроме того к текстовым полям можно добавлять триггер на нажатие клавиши Enter и форма будет отправлена.
* Отправка на сервер и получение данных в формате JSON.



##Dependencies
* **jQuery** 
* **Bootstrap** CSS Framework

##Bower installation
`bower install jquery-modalfly --save` - Installs the component.
 Required dependencies will be installed with the current package automatically.


###How to include the module on your page?

Подключите файлы в HTML проект:
```html
// Modalfly Plugin
<script src="url-to-module/jquery-modalfly/dist/jquery.modalfly.min.js"></script>
// Modalfly Styles
<link rel="stylesheet" href="url-to-module/jquery-modalfly/dist/jquery.modalfly.min.css">

// jQuery
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
// Bootstrap CSS Framework
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

```


#Описание параметров
```js
$.modalfly([первый аргумент функции], [второй аргумент функции]);
```
**Первый аргумент функции**
Тип входящих данных: текстовый
Варианты входящих данных:

* **options** - задаем глобальные настройки плагина. Вторым аргументом функции задаются глобальные настройки: `{url: 'путь к API', lang_save: 'Язык кнопки сохранить', lang_close: 'Язык кнопки закрыть'}`;
* **show** - отображение формы;
* **load** - происходит последовательность действий:
	* отправка данных на сервер (из вызываемой функции или триггеров - заданных параметров в HTML коде);
	* сервер может передать HTML код для отображения в форме;
	* сервер может передать дополнительные данные, которые также можно использовать на странице;
	* сервер может передать JS коды, которые могут выполняться при отображении формы или закрытии формы.
* **close** - закрывает форму, второй аргумент функции не нужен.


**Второй аргумент функции**
Тип входящих данных: JSON объект:

{

* **title** - заголовок модального окна (задается только если первый аргумент функции **show**)
* **content** - тело модального окна (задается только если первый аргумент функции **show**)
* **param** - Является не обязательным атрибутом. JSON формат данных. Отправляется в модальное окно в качестве возвращаемых параметров. *Удобно использовать передавая ID элемента, с которым работается, статусы и другие параметры* 
* **size_wide** - boolean. По умолчанию значение false. True - отобразить широкую форму
* **size_small** - boolean. По умолчанию значение false. True - отобразить маленькую форму
* **button_color** - Строка. По умолчанию значение `"btn-primary"`. Определяется цвет кнопки согласно набору цветов Bootstrap
* **button_close** - Не обязательный параметр. Текстовое значение или boolean.
	* Если указать значение TRUE, то на модальном окне отобразится кнопка Закрыть. Заголовок этой кнопки будет взят из глобальной конфигурации плагина `$.modalfly('config', {lang_close: 'Заголовок кнопки'});`. Если глобальные настройки модуля не были указаны, то заголовок кнопки будет "Закрыть".
	* Если указать текстовое значение, то на модальном окне отобразится кнопка с функцией "Закрыть окно" и надписью, указанной в текущем значении.
* **button_save** - Не обязательный параметр. Текстовое значение или boolean.
	* Если указать значение TRUE, то на модальном окне отобразится кнопка Сохранить. Заголовок этой кнопки будет взят из глобальной конфигурации плагина `$.modalfly('config', {lang_save: 'Заголовок кнопки'});`. Если глобальные настройки модуля не были указаны, то заголовок кнопки будет "Сохранить".
	* Если указать текстовое значение, то на модальном окне отобразится кнопка с функцией "Сохранить" и надписью, указанной в текущем значении.
* **js** - JavaScript код, который выполнится при передаче данных от сервера к плагину (функция **load**).
* **jsa** - JavaScript код, который выполнится после закрытия модального окна (функция **load**).
* **close** - Закрытие окна. Дополнительно можно отправить параметр **jsa** для выполнения JS кода после закрытия модального окна.

}


#Примеры использования с JS
###Отображение модального окна
*Пример:*
Если нам необходимо вывести модальное окно с текстом "Some text".
```js
$.modalfly('show', 'Some text');
// Или более правильный вариант
$.modalfly('show', {content: 'Some text'});
```


*Пример:*
Если нам необходимо вывести модальное окно с текстом "Some text" и заголовком "Some title"
```js
$.modalfly('show', {title: 'Some title', content: 'Some text'});
```


###Отправка данных на сервер
*Пример:*
Нам необходимо отправить следующие параметры на сервер без callback:

	id = 74; 
	action = 'get_form';  
	param = 'user_info'; 

Для этого используется первый аргумент функции "load"

```js
var opt = {};
opt.id = 74;
opt.action = 'get_form';
opt.param = 'user_info';
$.modalfly('load', {url: 'http://yoursite.com/api.php', param: opt});
```

Результатом выполнения данной функции будет отправка указанных параметров на сервер по указанному адресу API.

#Examples of the call using only html
###Sending data to the server

*Пример:*
На странице мы можем вызывать выполнение плагина, задавая атрибуты HTML объектам.
*Выполнение скрипта абсолютно аналогичное коду выше.

```html
<a href="javascript:;" data-module="modalfly" data-url="http://yoursite.com/api.php" data-action="get_form" data-param="user_info" data-id="74">Отправить запрос на сервер</a>
```

Разберем данный пример:

* **data-module="modalfly"** - Является обязательным атрибутом. Выполнение запроса на сервер при нажатии на ссылку.
* **data-url="[url]"** - Является не обязательным атрибутом. Задается URL адрес API, на который будет отправляться запрос. В случае если этот атрибут не задан, адрес отправки будет по умолчанию, который будет задан через глобальный параметр `$.modalfly('options', {url: 'http://globalurl...'});`;
* **data-action="[param]"** - Является не обязательным атрибутом. Задается как параметр, отправляемый на сервер. Со стороны сервера будет получен как `$_POST['action']`;
* **data-param="[param]"** - Является не обязательным атрибутом. Задается как параметр, отправляемый на сервер. Со стороны сервера будет получен как `$_POST['param']`;
* **data-id="[id]"** - Является не обязательным атрибутом. Задается как параметр, отправляемый на сервер. Со стороны сервера будет получен как `$_POST['id']`;

####В каких случаях это удобно использовать?

* В качестве простой отправки данных на сервер, например команду вызова формы авторизации, подтверждение удаления чего-либо;
* Когда команду для отправки на сервер достаточно написать в атрибутах HTML тега;
* Если есть большое количество различных ссылок и кнопок, нажимая на которые, необходимо получать от сервера какое-либо подтверждение;
* Ну и наконец, самое удобное - это вызвав модальное окно, можем отправлять заполненные данные форм и полей на сервер, без использования JS кода;
* Так же мы можем получать от сервера результат, который будет отображаться в модальном окне, с последующим интерактивным редактированием данных между браузером и сервером;
* Модальное окно может быть как уведомление, так и формой редактирования данных;
* Присутствуют различные настройки отображения модального окна (ширина окна, цвет кнопки, отображение кнопок).

В большинстве проектов очень удобно использовать такой API метод обращения к серверу, чтобы работать с данными. Если рассматривать пример с панелью управления сайта, то при помощи данного модуля очень легко задать атрибуты с данными прямо в HTML код кнопок. При нажатии на которые, модуль автоматически формирует запрос, собирает данные с атрибутов и отправляет на сервер. Ответом сервера может быть отображение нового содержимого в модальном окне с последующим его редактированием и взаимодействием с сервером. И таких итераций между браузером и сервером может быть сколько угодно.

Так же в качестве примера может быть опрос-форма, которая может потребовать нескольких шагов-вопросов и различных вариантов выбора или ответов. Изначально вызвать такую форму можно, как описывалось ранее, нажав на кнопку (в которой мы активизировали атрибуты для плагина Modalfly) - всего 2-3 атрибута. Происходит обращение на сервер, сервер выдает модулю HTML код. И этот ответ может быть уже первым вопросом-формой. Затем, заполнив необходимое количество полей, нажимает на кнопку далее - происходит отправка на сервер заполненной информации. Плюс к тому же к форме можно добавлять необходимое количество JSON данных, для последующей передачи серверу. Затем сервер отображает уже другую форму, и таких итераций может быть сколько угодно. 

---
###Получение данных с сервера

Список всех JSON параметров, которые можно отправить с сервера:

{

* **title** - Не обязательный параметр. Текстовое значение. Является заголовком модального окна.
* **content** - Не обязательный параметр. Текстовое значение (HTML). В случае если данный параметр будет указан, будет открыто модальное окно с этим кодом.
* **param** - Является не обязательным атрибутом. JSON формат данных. Отправляется в модальное окно в качестве возвращаемых параметров. *Удобно использовать передавая ID элемента, с которым работается, статусы и другие параметры* 
* **button_close** - Не обязательный параметр. Текстовое значение или boolean.
	* Если указать значение TRUE, то на модальном окне отобразится кнопка Закрыть. Заголовок этой кнопки будет взят из глобальной конфигурации плагина `$.modalfly('config', {lang_close: 'Заголовок кнопки'});`. Если глобальные настройки модуля не были указаны, то заголовок кнопки будет "Закрыть".
	* Если указать текстовое значение, то на модальном окне отобразится кнопка с функцией "Закрыть окно" и надписью, указанной в текущем значении.
* **button_save** - Не обязательный параметр. Текстовое значение или boolean.
	* Если указать значение TRUE, то на модальном окне отобразится кнопка Сохранить. Заголовок этой кнопки будет взят из глобальной конфигурации плагина `$.modalfly('config', {lang_save: 'Заголовок кнопки'});`. Если глобальные настройки модуля не были указаны, то заголовок кнопки будет "Сохранить".
	* Если указать текстовое значение, то на модальном окне отобразится кнопка с функцией "Сохранить" и надписью, указанной в текущем значении.
* **button_color** - Не обязательный параметр. Текстовое значение. По умолчанию значение "btn-primary". Определяется цвет кнопки согласно набору цветов Bootstrap.
* **size_wide** - Не обязательное значение. Тип boolean. По умолчанию значение false. True - отобразить широкую форму
* **size_small** - не обязательное значение. Тип boolean. По умолчанию значение false. True - отобразить маленькую форму
* **js** - JavaScript код, который выполнится при передаче данных от сервера к плагину (функция **load**).
* **jsa** - JavaScript код, который выполнится после закрытия модального окна (функция **load**).
* **close** - Закрытие окна. Дополнительно можно отправить параметр **jsa** для выполнения JS кода после закрытия модального окна.
}

*Пример PHP:*

```php
<?php
$json = [];
$json['title'] = 'Заголовок окна';
$json['content'] = 'Содержимое окна<br />
<input type="text" data-trigger="enter" data-name="text_field" value="" autofocus />';
$json['button_close'] = 'ОК!';
$json['size_small'] = true;
$json['jsa'] = 'alert("Уведомление после закрытия окна");';

echo json_encode($json);
```


###Интерактивные элементы в форме

Есть еще одна удобная сторона в плагине - возможность автоматически опознавать загруженные в форму поля.
Перечислим все атрибуты, которые могут прикрепляться к элементам форм в модальном окне (например, при ответе сервера)

* **data-trigger="enter"** - Если такой атрибут указан у вас в теге `input` и если у вас стоит на этом поле курсор, при нажатии на клавишу Enter, форма отправит данные на сервер. Она дублирует функцию нажатия кнопки Сохранить.
* **data-name="[field1]"** - Указав такой атрибут, вы зададите имя для отправляемого параметра на сервер. Такой атрибут можно задавать для всех элементов форм. Если такого атрибута не будет в поле формы, то данные с этого поля не будут отправляться на сервер.
* **autofocus** - Добавление такого атрибута в тег `input` является автофокусом.


###Changelist

#####v 2.5.0
- Added sending multiple field array date (as `field[]`) 

#####v 2.4.5
- Code refactoring

#####v 2.4.4
- Added a new property `animate` to `options`. Animate parameter allows animate form on load. Defaults `animate` = true, to disable animation you need to set options:
```js
$.modalfly('options', {animate: false});
```
- Renamed example files.
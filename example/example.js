$(document).ready(function () {
    $('[data-action="modalfly_example"]').click(function () {
        var obj = {};
        obj.title = 'Заголовок окна';
        obj.content = 'Из JS мы задаем содержимое этой формы<br />' +
            '<input class="form-control" type="text" data-trigger="enter" data-name="data" autofocus /> ' +
            ' Задаем элементу формы тригер на срабатывание на этом поле при нажатии клавиши Enter, Задаем имя поля, чтобы отправить его со значением на сервер. А так же добавляем атрибут автофокуса' +
            '<p><input type="checkbox" data-trigger="enter" data-name="checkbox1" value="val2" autofocus /> ' +
            'Выводим эемент формы, значение которого так же можно отправить на сервер, если поставить галочку.</p>' +
            '<p><b>При нажатии на кнопку "Отправить на сервер", данные формы отправятся на сервер, затем сервер выдаст команду close и окно закроется</b></p>';
        obj.button_save = 'Отправить на сервер';
        obj.button_close = 'Отменить действие и закрыть окно';
        obj.param = {};
        obj.param.id = 6;
        obj.param.status = 2;
        obj.param.action = 'func_close';

        $.modalfly('show', obj);
    });
});
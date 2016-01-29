/*
 * Module: jQuery ModalFly Plugin
 * Version: 2.4.5
 * Author: Chaikin Evgenii
 * Release date: 26 Feb 2015
 * Updated: 29 Jan 2016
 * Site: http://www.fater.ru
 * Dependence: Bootstrap (CSS + JS), JQuery
 * */


(function ($) {
    // Options
    var opt =
    {
        template_loaded: false,
        object_name_loading: 'module_modalfly_loading',
        object_name_form: 'module_modalfly_form',

        // Run custom script when modal is closed
        jsa: '',
        // Default values
        url: 'api/',
        lang_close: 'Закрыть',
        lang_save: 'Сохранить',
        animate: true
    };

    $.modalfly = function (action, options) {
        if (action == 'options') {
            // Set default values
            $.extend(opt, options);
        }
        else if (action == 'show') {
            // Show form

            // First time create an element
            if (!opt.template_loaded) {
                opt.template_loaded = true;

                $('body').prepend('<div class="modal' + (opt.animate == true ? ' fade' : '') + '" id="' + opt.object_name_form + '"><div data-object="modalfly_dialog" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" data-object="module_modalfly_close_button" autofocus>' + opt.lang_close + '</button><button type="button" class="btn btn-primary" data-object="modalfly_save" data-param="" autofocus>' + opt.lang_save + '</button></div></div></div></div>');
            }

            if (typeof options == 'string') {
                options = {content: options};
            }
            else if (!options.title) {
                options.title = '';
            }

            $('#' + opt.object_name_form + ' h4[class=modal-title]').html(options.title);
            $('#' + opt.object_name_form + ' div[class=modal-body]').html(options.content);

            // Задается отображение кнопки закрыть и текста на ней
            if (options.button_close) {
                $('#' + opt.object_name_form + ' button[data-object="module_modalfly_close_button"]')
                    .html(typeof options.button_close == 'string' ? options.button_close : opt.lang_close)
                    .show(0);
            }
            else {
                $('#' + opt.object_name_form + ' button[data-object="module_modalfly_close_button"]')
                    .hide(0);
            }

            // Определяем новый широкий стиль для модального окна
            if (options.size_wide) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .addClass('modal-lg');
            }
            else if ($('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').hasClass('modal-lg')) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .removeClass('modal-lg');
            }

            // Определяем новый узкий стиль для модального окна
            if (options.size_small) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .addClass('modal-sm');
            }
            else if ($('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').hasClass('modal-sm')) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .removeClass('modal-sm');
            }

            // Отображение кнопок
            if (options.button_save || options.param) {
                $('#' + opt.object_name_form + ' div[class="modal-footer"]').show(0);
                // Задаем цвет кнопки, согласно стилям bootstrap
                if (options.button_color) {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .removeClass('btn-primary')
                        .addClass(options.button_color);
                }
                else {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .removeClass()
                        .addClass('btn btn-primary');
                }

                // Показываем кнопку
                if (options.button_save) {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .html(typeof options.button_save == 'string' ? options.button_save : opt.lang_save)
                        .show();
                }
                else {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .hide();
                }

                // Накладываем на кнопку параметры
                if (options.param) {
                    if (typeof options.param == 'object') {
                        options.param = JSON.stringify(options.param);
                    }
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .attr('data-param', options.param);
                }
                else {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .attr('data-param', '');
                }
            }
            else {
                // Если отображается только кнопка закрыть, то отображаем панель с одной кнопкой
                if (options.button_close) {
                    $('#' + opt.object_name_form + '  [data-object="modalfly_save"]').hide(0);
                }
                else {
                    $('#' + opt.object_name_form + ' div[class="modal-footer"]').hide(0);
                }
            }
            // Находим атрибут "autofocus" в полях формы и ставим на него курсор
            $('#' + opt.object_name_form)
                .on('show.bs.modal', function () {
                    $(this).find("[autofocus]:first").focus();
                })
                .on('shown.bs.modal', function () {
                    $(this).find("[autofocus]:first").focus();
                });

            // Отображение формы средствами Bootstrap
            $('#' + opt.object_name_form).modal('show');
            // После ответа от сервера парсим полученные значения
            $.modalfly('check_actions', 'modal_load');
        }
        else if (action == 'load') {
            // Отправка данных на сервер, ответ сервера отображается в модальном окне

            $.modalfly('show_loading');
            $.ajax({
                url: options.url ? options.url : opt.url,
                type: 'POST',
                dataType: 'json',
                data: options.param,
                success: function (callback) {
                    $.modalfly('close_loading');
                    if (callback.content) {
                        $.modalfly('show', callback);
                    }
                    if (callback.js) {
                        $.globalEval(callback.js);
                    }
                    if (callback.jsa) {
                        opt.jsa = callback.jsa;
                    }
                    if (callback.close) {
                        $.modalfly('close');
                    }
                },
                complete: function () {
                    $.modalfly('close_loading');
                }
            });
        }
        else if (action == 'show_loading') {
            // Отображение иконки загрузки

            if (!opt.overflow_loading) {
                opt.overflow_loading = true;
                $('body').prepend('<div id="' + opt.object_name_loading + '"></div>');
            }
            $('#' + opt.object_name_loading)
                .css({marginTop: '-10px'})
                .animate({opacity: 'show', marginTop: 0}, 'fast');
        }
        else if (action == 'close_loading') {
            // Скрытие иконки загрузки

            $('#' + opt.object_name_loading)
                .animate({opacity: 'hide', marginTop: '-10px'}, 'fast');
        }
        else if (action == 'check_actions') {
            // Полученный в форму HTML код проверяется и добавляются триггеры

            $('#' + opt.object_name_form + ' [data-trigger="enter"]').on('keypress', function (event) {
                if (event.which === 13) {
                    $('button[data-object="modalfly_save"]').click();
                }
            });

            var param = '';
            if (options == 'modal_load') {
                param = '#' + opt.object_name_form + ' ';
            }
            $(param + '[data-module="modalfly"]').each(function (i, e) {
                var opt = {};
                opt.param = {};
                if ($(this).is('[data-action]')) {
                    opt.param.action = $(this).attr('data-action');
                }
                if ($(this).is('[data-param]')) {
                    opt.param.param = $(this).attr('data-param');
                }
                if ($(this).is('[data-id]')) {
                    opt.param.id = $(this).attr('data-id');
                }
                if ($(this).is('[data-url]')) {
                    opt.url = $(this).attr('data-url');
                }
                $(this).on('click', function () {
                    $.modalfly('load', opt);
                });
            });
        }
        else if (action == 'close') {
            // Скрытие формы средствами Bootstrap
            $('#' + opt.object_name_form).modal('hide');
        }
    };

    // Выполнить загруженный JS код после закрытия окна
    $(document).on('hidden.bs.modal', '#' + opt.object_name_form, function () {
        if (opt.jsa != '') {
            $.globalEval(opt.jsa);
            opt.jsa = '';
        }
    });

})(jQuery);

$(window).load(function () {
    $.modalfly('check_actions');

    $(document).on('click', 'button[data-object="modalfly_save"]', function () {
        if ($(this).is(':visible')) {
            var opt = {param: {}};
            if ($(this).attr('data-param').length) {
                opt.param = $.parseJSON($(this).attr('data-param'));
            }

            $('div[class="modal-body"] [data-name]').each(function (i, e) {
                if
                (
                    $(this).attr('type') == 'checkbox' && !$(this).is(':checked')
                    || $(this).attr('type') == 'radio' && !$(this).is(':checked')
                ) {
                    return;
                }
                opt.param[$(this).attr('data-name')] = $(this).val();
            });

            if (opt.param.url) {
                opt.url = opt.param.url;
                delete opt.param.url;
            }
            $.modalfly('load', opt);
        }
    });
});
/*
 * Module: jQuery ModalFly Plugin
 * Version: 2.7.0
 * Author: Chaikin Evgenii
 * Release date: 26 Feb 2015
 * Updated: 11 Dec 2016
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
        } else if (action == 'show') {
            // Show form

            // First time create an element
            if (!opt.template_loaded) {
                opt.template_loaded = true;

                $('body').prepend('<div class="modal' + (opt.animate == true ? ' fade' : '') + '" id="' + opt.object_name_form + '"><div data-object="modalfly_dialog" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" data-object="module_modalfly_close_button" autofocus>' + opt.lang_close + '</button><button type="button" class="btn btn-primary" data-object="modalfly_save" data-param="" autofocus>' + opt.lang_save + '</button></div></div></div></div>');
            }

            if (typeof options == 'string') {
                options = {content: options};
            } else if (!options.title) {
                options.title = '';
            }

            $('#' + opt.object_name_form + ' h4[class=modal-title]').html(options.title);
            $('#' + opt.object_name_form + ' div[class=modal-body]').html(options.content);

            // Задается отображение кнопки закрыть и текста на ней
            if (options.button_close) {
                $('#' + opt.object_name_form + ' button[data-object="module_modalfly_close_button"]')
                    .html(typeof options.button_close == 'string' ? options.button_close : opt.lang_close)
                    .show(0);
            } else {
                $('#' + opt.object_name_form + ' button[data-object="module_modalfly_close_button"]')
                    .hide(0);
            }

            // Define wide modal style by default
            if (options.size_wide) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .addClass('modal-lg');
            } else if ($('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').hasClass('modal-lg')) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .removeClass('modal-lg');
            }

            // Define small size for modal by default
            if (options.size_small) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .addClass('modal-sm');
            } else if ($('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').hasClass('modal-sm')) {
                $('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]')
                    .removeClass('modal-sm');
            }

            // Show buttons
            if (options.button_save || options.param) {
                $('#' + opt.object_name_form + ' div[class="modal-footer"]').show(0);
                // Define color for button using Bootstrap class names
                if (options.button_color) {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .removeClass('btn-primary')
                        .addClass(options.button_color);
                } else {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .removeClass()
                        .addClass('btn btn-primary');
                }

                // SHow button
                if (options.button_save) {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .html(typeof options.button_save == 'string' ? options.button_save : opt.lang_save)
                        .show();
                } else {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .hide();
                }

                // Add parameters to button
                if (options.param) {
                    if (typeof options.param == 'object') {
                        options.param = JSON.stringify(options.param);
                    }
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .attr('data-param', options.param);
                } else {
                    $('#' + opt.object_name_form + ' [data-object="modalfly_save"]')
                        .attr('data-param', '');
                }
            } else {
                // Show one button when only close button
                if (options.button_close) {
                    $('#' + opt.object_name_form + '  [data-object="modalfly_save"]').hide(0);
                } else {
                    $('#' + opt.object_name_form + ' div[class="modal-footer"]').hide(0);
                }
            }

            // Finds "autofocus" attribute and insert cursor into
            $('#' + opt.object_name_form)
                .on('show.bs.modal', function () {
                    $(this).find("[autofocus]:first").focus();
                })
                .on('shown.bs.modal', function () {
                    $(this).find("[autofocus]:first").focus();
                });

            // Shows form using Bootstrap engine
            $('#' + opt.object_name_form).modal('show');
            // After server response parse parameters
            $.modalfly('check_actions', 'modal_load');
        } else if (action == 'load') {
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
                    if (callback.assign_element) {
                        for (var element in callback.assign_element) {
                            if (callback.assign_element.hasOwnProperty(element)) {
                                $(element).html(callback.assign_element[element]);
                                $.modalfly('check_actions', element);
                            }
                        }
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
        } else if (action == 'show_loading') {
            // Show loading icon

            if (!opt.overflow_loading) {
                opt.overflow_loading = true;
                $('body').prepend('<div id="' + opt.object_name_loading + '"></div>');
            }
            $('#' + opt.object_name_loading)
                .css({marginTop: '-10px'})
                .animate({opacity: 'show', marginTop: 0}, 'fast');
        } else if (action == 'close_loading') {
            // Hide loading icon

            $('#' + opt.object_name_loading)
                .animate({opacity: 'hide', marginTop: '-10px'}, 'fast');
        } else if (action == 'check_actions') {
            // Полученный в форму HTML код проверяется и добавляются триггеры

            $('#' + opt.object_name_form + ' [data-trigger="enter"]').on('keypress', function (event) {
                if (event.which === 13) {
                    $('button[data-object="modalfly_save"]').click();
                }
            });

            var param = '';
            if (options == 'modal_load') {
                param = '#' + opt.object_name_form + ' ';
            } else if (options) {
                param = options;
            }
            $(param + ' [data-module="modalfly"]').each(function () {
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
        } else if (action == 'close') {
            // Hide form using Bootstrap
            $('#' + opt.object_name_form).modal('hide');
        }

        this.checkActions = function (element) {
            console.log('Run2+');
        }
    };

    // Run JS code after closing modal window / Bootstrap initialisation
    $(document).on('hidden.bs.modal', '#' + opt.object_name_form, function () {
        if (opt.jsa != '') {
            // Run code if exist
            $.globalEval(opt.jsa);
            // Clear code
            opt.jsa = '';
        }
    });

})(jQuery);

$(window).load(function () {
    $.modalfly('check_actions');

    // Add a watcher on the save button
    $(document).on('click', 'button[data-object="modalfly_save"]', function () {
        if ($(this).is(':visible')) {
            var opt = {param: {}};
            if ($(this).attr('data-param').length) {
                opt.param = $.parseJSON($(this).attr('data-param'));
            }

            $('div[class="modal-body"] [data-name]').each(function (i, e) {
                if ($(this).attr('type') == 'checkbox' && !$(this).is(':checked') || $(this).attr('type') == 'radio' && !$(this).is(':checked')) {
                    return;
                }
                var name = $(this).attr('data-name');
                var value = $(this).val();
                if (name.indexOf('[]') != -1) {
                    if (opt.param[name] && opt.param[name].length > 0) {
                        opt.param[name].push(value);
                    } else {
                        opt.param[name] = [value];
                    }
                } else {
                    opt.param[name] = value;
                }
            });

            if (opt.param.url) {
                opt.url = opt.param.url;
                delete opt.param.url;
            }
            $.modalfly('load', opt);
        }
    });
});
/*
* Module: Modal window
* Version: 2.2
* Author: Fater Media Group
* Release date: 26 Feb 2015
* Updated: 26 Mar 2015
* */


(function ($)
{
	// Options
	var opt =
	{
		template_loaded: false,
		object_name_loading: 'module_modalfly_loading',
		object_name_form: 'module_modalfly_form',

		// Run custom script when modal is closed
		jsa: ''
	};

	$.modalfly = function (action, options)
	{
		// Show form
		if (action == 'show')
		{
			// First time create an elements
			if (!opt.template_loaded)
			{
				opt.template_loaded = true;

				$ ('body').prepend ('<div class="modal fade" id="' + opt.object_name_form + '"><div data-object="modalfly_dialog" class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" data-object="module_modalfly_close_button">Закрыть</button><button type="button" class="btn btn-primary" data-object="modalfly_save" data-param="">Сохранить</button></div></div></div></div>');
			}

			if (!options.title)
			{
				options.title = '';
			}

			$ ('#' + opt.object_name_form + ' h4[class=modal-title]').html (options.title);
			$ ('#' + opt.object_name_form + ' div[class=modal-body]').html (options.content);

			if (options.button_close)
			{
				$ ('#' + opt.object_name_form + ' button[data-object="module_modalfly_close_button"]').show (0);
				if (options.button_close_text)
				{
					$ ('#' + opt.object_name_form + ' button[data-object="module_modalfly_close_button"]').html (options.button_close_text);
				}
			}
			else
			{
				$ ('#' + opt.object_name_form + ' button[data-object="module_modalfly_close_button"]').hide (0);
			}

			if (options.size_wide)
			{
				$ ('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').addClass ('modal-lg');
			}
			else if ($ ('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').hasClass ('modal-lg'))
			{
				$ ('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').removeClass ('modal-lg');
			}

			if (options.size_small)
			{
				$ ('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').addClass ('modal-sm');
			}
			else if ($ ('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').hasClass ('modal-sm'))
			{
				$ ('#' + opt.object_name_form + ' div[data-object="modalfly_dialog"]').removeClass ('modal-sm');
			}

			if (options.button || options.param)
			{
				$ ('#' + opt.object_name_form + ' div[class="modal-footer"]').show (0);
				if (options.button_color)
				{
					$ ('#' + opt.object_name_form + ' [data-object="modalfly_save"]').removeClass ('btn-primary').addClass (options.button_color);
				}
				else
				{
					$ ('#' + opt.object_name_form + ' [data-object="modalfly_save"]').removeClass ().addClass ('btn btn-primary');
				}

				if (options.button)
				{
					$ ('#' + opt.object_name_form + ' [data-object="modalfly_save"]').html (options.button);
				}
				else
				{
					$ ('#' + opt.object_name_form + ' [data-object="modalfly_save"]').html ('Сохранить');
				}

				if (options.param)
				{
					$ ('#' + opt.object_name_form + ' [data-object="modalfly_save"]').attr ('data-param', options.param);
				}
				else
				{
					$ ('#' + opt.object_name_form + ' [data-object="modalfly_save"]').attr ('data-param', '');
				}
			}
			else
			{
				if (options.button_close)
				{
					$ ('#' + opt.object_name_form + '  [data-object="modalfly_save"]').hide (0);
				}
				else
				{
					$ ('#' + opt.object_name_form + ' div[class="modal-footer"]').hide (0);
				}
			}

			$ ('#' + opt.object_name_form).on ('shown.bs.modal', function ()
			{
				$ (this).find ("[autofocus]:first").focus ();
			});

			$ ('#' + opt.object_name_form).modal ('show');
			$.modalfly ('check_actions', 'modal_load');
		}
		// Ajax load form
		else if (action == 'load')
		{
			$.modalfly ('show_loading');
			$.ajax ({
				url: options.url,
				type: 'POST',
				dataType: 'json',
				data: options.param,
				success: function (callback)
				{
					$.modalfly ('close_loading');
					if (callback)
					{
						$.modalfly ('show', callback);
					}
				}
			});
		}
		// Ajax request
		else if (action == 'request')
		{
			$.modalfly ('show_loading');
			$.ajax ({
				url: options.url,
				type: 'POST',
				dataType: 'json',
				data: options.param,
				success: function (callback)
				{
					$.modalfly ('close_loading');
					if (callback.content)
					{
						$.modalfly ('show', callback);
					}
					if (callback.js)
					{
						$.globalEval (callback.js);
					}
					if (callback.jsa)
					{
						opt.jsa = callback.jsa;
					}
				}
			});
		}
		// Show loading icon
		else if (action == 'show_loading')
		{
			if (!opt.overflow_loading)
			{
				opt.overflow_loading = true;
				$ ('body').prepend ('<div id="' + opt.object_name_loading + '"></div>');
			}
			$ ('#' + opt.object_name_loading)
				.css ({marginTop: '-10px'})
				.animate ({opacity: 'show', marginTop: 0}, 'fast');
		}
		// Hide loading icon
		else if (action == 'close_loading')
		{
			$ ('#' + opt.object_name_loading)
				.animate ({opacity: 'hide', marginTop: '-10px'}, 'fast');
		}
		else if (action == 'check_actions')
		{
			$('#' + opt.object_name_form + ' [data-trigger="enter"]').on ('keypress', function (event)
			{
				if(event.which === 13)
				{
					$ ('button[data-object="modalfly_save"]').click ();
				}
			});

			var param = '';
			if (options == 'modal_load')
			{
				param = '#' + opt.object_name_form + ' ';
			}
			$ (param + '[data-module="modalfly"]').each (function (i, e)
			{
				var opt = {};
				opt.param = {};
				if ($ (this).is ('[data-action]'))
				{
					opt.param.action = $ (this).attr ('data-action');
				}
				if ($ (this).is ('[data-param]'))
				{
					opt.param.param = $ (this).attr ('data-param');
				}
				if ($ (this).is ('[data-id]'))
				{
					opt.param.id = $ (this).attr ('data-id');
				}
				if ($ (this).is ('[data-url]'))
				{
					opt.url = $ (this).attr ('data-url');
				}
				else
				{
					opt.url = '/api';
				}
				$ (this).on ('click',function ()
				{
					$.modalfly ('request', opt);
				});
			});
		}
	};

	$ (document).on ('hide.bs.modal','#' + opt.object_name_form, function ()
	{
		if (opt.jsa != '')
		{
			$.globalEval (opt.jsa);
			opt.jsa = '';
		}
	});

}) (jQuery);

$ (window).load (function ()
{
	$.modalfly ('check_actions');

	$ (document).on ('click', 'button[data-object="modalfly_save"]', function ()
	{
		if ($ (this).attr ('data-param').length)
		{
			var opt = {};
			opt.param = $.parseJSON ($ (this).attr ('data-param'));

			$ ('div[class="modal-body"] [data-object="fld"]').each (function (i, e)
			{
				if
				(
						$ (this).attr ('type') == 'checkbox' && !$ (this).is (':checked') ||
						$ (this).attr ('type') == 'radio' && !$ (this).is (':checked')
				)
				{
					return;
				}
				opt.param[$ (this).attr ('data-name')] = $ (this).val ();
			});
			$ ('div[class="modal-body"] [data-object="fld_check"]').each (function (i, e)
			{
				opt.param[$ (this).attr ('data-name')] = $ (this).val ();
			});

			if (opt.param.url)
			{
				opt.url = opt.param.url;
				delete opt.param.url;
			}
			else
			{
				opt.url = '/api';
			}
			$.modalfly ('request', opt);
		}
	});
});
$ (document).ready (function ()
{
	$ ('[data-action="modalfly_example"]').click (function ()
	{
		var obj = {};
		obj.title = 'Some title';
		obj.content = 'Some content <input type="text" data-trigger="enter" data-name="data" data-object="fld" autofocus /> <input type="checkbox" data-trigger="enter" data-name="checkbox1" data-object="fld" value="val2" autofocus />';
		obj.button = 'Save new title';
		obj.button_close = true;
		obj.button_close_text = 'Custom close text button';
		obj.param = {};
		obj.param.id = 6;
		obj.param.status = 2;

		$.modalfly ('show', obj);
	});
});
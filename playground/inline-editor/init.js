frp_v = objectfactory(frp_inline_editor)();

frp_v.setAjaxBasePath($('form.frp_v').attr('action'));
frp_v.setMessageHolder($('form.frp_v .messageholder'));

$.getScript('messages_'+frp_v.getInterfaceLanguage()+'.js');

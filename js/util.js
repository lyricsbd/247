var ajaxFailedHandle = function(jqXHR, textStatus, errorThrown) {
    return false;
}
var fx = {
    'alertMessage': function(title,text,theme){
	    $.notiny({title: title, text: text, theme: theme, position: 'right-top' });
	},
    'showLoad': function() {
        jQuery('#fxloading,#fxLoading,#fx-loading,._fxLoading,.fx-loading').fadeIn('fast');
    },
    'hideLoad': function(handler) {
        jQuery('#fxloading,#fxLoading,#fx-loading,._fxLoading,.fx-loading').fadeOut('fast');
    },
    'removeMessage': function(messageId) {
        jQuery('#' + messageId).slideUp('slow', function() {
            jQuery(this).remove();
        });
    },
    'errorStatusHandler': function(data) {
        console.log('errorStatusHandler:');
        console.log(data);
        if (typeof data != 'object') {
            console.error('data pháº£i lÃ  1 Ä‘á»‘i tÆ°á»£ng:');
            console.error(data);
            return false;
        }
        if (typeof data._fxErrorHandled != 'undefined' && data._fxErrorHandled) {
            return false;
        }
        if (typeof data._fxError == 'string' && jQuery.trim(data._fxError) != '') {
            fx.alertMessage('CÃ³ lá»—i xáº£y ra', data._fxError,'error');
        } else if (typeof data._fxErrors == 'object' && data._fxErrors.length > 0) {
            var errorStr = data._fxErrors.join('<br />');
            fx.alertMessage('CÃ³ lá»—i xáº£y ra', errorStr,'error');
            console.log(data._fxErrors);
        } else if (typeof data._fxHtml == 'string' && jQuery.trim(data._fxHtml) != '') {
            alert(data._fxHtml);
        } else {
            alert('Xáº£y ra lá»—i khÃ´ng mong muá»‘n, báº­t cá»­a sá»• consolse Ä‘á»ƒ xem chi tiáº¿t.');
        }
    },
    'scrollTo': function(selector, scrollTime) {
        if (typeof scrollTime != 'number' || scrollTime < 1000) var scrollTime = 1000;
        if (jQuery(selector).length == 0) {
            console.error('KhÃ´ng xÃ¡c Ä‘á»‹nh Ä‘Æ°á»£c selector: ' + selector + ' Ä‘á»ƒ tÃ¬m vá»‹ trÃ­ cuá»™n.');
            return false;
        }
        var boxOffset = jQuery(selector).offset();
        var currentScrollTop = jQuery(document).scrollTop();
        if (typeof boxOffset == 'object' && typeof currentScrollTop == 'number' && boxOffset.top != currentScrollTop) {
            jQuery('body,html').animate({
                'scrollTop': boxOffset.top
            }, scrollTime);
        } else {
            console.error('boxOffset:');
            console.log(boxOffset);
            console.error('currentScrollTop');
            console.log(currentScrollTop);
        }
    }
};
fx.getCookie = function(name) {
    var regStr = "/" + name + "\=([^;]*)/i"
    eval('var cookieReg=' + regStr);
    var results = cookieReg.exec(document.cookie);
    if (results != null && results.length > 1) return results[1];
    return '';
}

fx.localStorage = {
    'check': function() {
        if (typeof window.localStorage == "undefined") {
            console.error("TrÃ¬nh duyá»‡t cá»§a báº¡n khÃ´ng há»— trá»£ localStorage cá»§a Html5");
            return false;
        }
        return true;
    },
    'set': function(name, value) {
        if (!fx.localStorage.check()) return false;
        if (typeof name != "string" || typeof value != "string") {
            console.error("name vÃ  value  muá»‘n lÆ°u trong localStorage pháº£i lÃ  string");
            return false;
        }
        window.localStorage.setItem(name, value);
        return true;
    },
    'get': function(name) {
        if (!fx.localStorage.check()) return false;
        if (typeof name != "string") {
            console.error("name cá»§a record muá»‘n láº¥y tá»« localStorage pháº£i lÃ  string");
            return false;
        }
        var value = window.localStorage.getItem(name);
        if (value == null) return '';
        return value;
    }
};
fx.callReady = function() {
    jQuery(document).ready();
}
fx.fireReadyDelay = function() {
    setTimeout("fx.callReady()", 2000);
}
jQuery.ajaxSetup({
    'beforeSend': function(jqXHR, settings) {
        if (typeof fx.token == "string") {
            if (settings.url.indexOf('?') == -1) settings.url += "?_fxToken=" + escape(fx.token);
            else
                settings.url += "&_fxToken=" + escape(fx.token);
        }
        if (typeof settings.silentLoad == "undefined" || !settings.silentLoad) {
            fx.showLoad();
        }
    },
    'complete': function(jqXHR, textStatus) {
        fx.hideLoad();
        if (textStatus == 'success') {}
    },
    /*
    'success': function(data) {
        if (typeof data._fxStatus != 'undefined' && !data._fxStatus) {
            console.error('Xáº£y ra lá»—i khi xá»­ lÃ½ trÃªn server !');
            fx.errorStatusHandler(data);
        }
    },
    */
    /*'error': function(jqXHR, textStatus, errorThrown) {
        if (typeof jqXHR.silentError != "undefined" && jqXHR.silentError) return false;
        if (typeof this.silentError != "undefined" && this.silentError) return false;
        console.error('ajax lá»—i khi gá»­i/nháº­n !');
        console.warn('errorThrown:' + errorThrown);
        console.warn('Loáº¡i lá»—i:' + textStatus);
        console.warn('Ná»™i dung pháº£n há»“i:');
        console.warn(jqXHR.responseText);
        console.log(jqXHR);
        console.log(this);
        switch (textStatus) {
            case 'timeout':
                alert('KhÃ´ng nháº­n Ä‘Æ°á»£c tráº£ lá»i tá»« mÃ¡y chá»§. Vui lÃ²ng thá»­ láº¡i.');
                break;
            case 'parsererror':
                alert('Dá»¯ liá»‡u mÃ¡y chá»§ tráº£ vá» bá»‹ lá»—i. Vui lÃ²ng thá»­ láº¡i.');
                break;
            case 'error':
                if (errorThrown === '') fx.messageBox("Lá»—i", "KhÃ´ng káº¿t ná»‘i Ä‘Æ°á»£c vá»›i mÃ¡y chá»§. Vui lÃ²ng thá»­ láº¡i sau.");
                else if (errorThrown !== 0 && errorThrown !== '0') alert('Lá»—i mÃ¡y chá»§: ' + errorThrown + '. Vui lÃ²ng thá»­ láº¡i.');
                break;
            default:
                alert('Xáº£y ra lá»—i khi gá»­i yÃªu cáº§u, vui lÃ²ng thá»­ láº¡i.');
        }
    }*/
});
var isToutchDevice = null;
var FX_DEVICE_TOUTCH = false;
var FX_DEVICE_SMALL = false;
jQuery(document).ready(function() {
    if (jQuery('#fxloading').length == 0) {
        jQuery('body').append('<div id="fxloading" style="display:none"></div>');
    }
    isToutchDevice = function() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {}
        try {
            return ('ontouchstart' in document.documentElement);
        } catch (e) {}
        return false;
    }
    if (isToutchDevice()) {
        jQuery('body').addClass("fx-device-toutch");
        FX_DEVICE_TOUTCH = true;
    } else {
        FX_DEVICE_TOUTCH = false;
    }
    try {
        if (jQuery(window).width() <= 480 || jQuery(window).height() <= 480) {
            jQuery('body').addClass("fx-device-small");
            FX_DEVICE_SMALL = true;
        } else {
            FX_DEVICE_SMALL = false;
        }
    } catch (e) {
        FX_DEVICE_SMALL = false;
    }
});

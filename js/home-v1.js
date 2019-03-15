jQuery(document).ready(function(t) {
    //$(window).load(function() {$("#loading").fadeOut(500);});
    $('#keyword').keyup(function () {
        var keyword = $("#keyword").val();
        if (keyword.length > 1) {
            $.ajax({
                url: MAIN_URL + '/search/',
                type: 'GET',
                data: {
					searchinstant: keyword
				},
                success: function (data) {
                    if (data) {
                        $('.search-suggest').show();
						$('.search-suggest').html(data);
                    } else {
                        $('.search-suggest').hide();
                    }
                }
            })
        } else {
            $('.search-suggest').hide();
        }
    });
    $('div.Top').on('click', 'a', function(e) {
        e.preventDefault();
        $this = $(this);
        var $parent = $this.parents("section").attr("id");
        var $tag = $this.data("tag");
        $('#' + $parent + ' .Top a').removeClass("Current");
        $this.addClass("Current");
        $("#loading").css({
            "display": "block"
        });
        $.ajax({
            type: 'POST',
            url: MAIN_URL + '/ajax/film',
            data: {
                widget: 'list-film',
                type: $tag
            },
            success: function(html) {
                $('#' + $parent + ' ul.MovieList').html(html);
                $("#loading").css({
                    "display": "none"
                });
            },
            error: function() {
                fx.alertMessage("Lá»—i", "ÄÃ£ cÃ³ lá»—i xáº£y ra trong quÃ¡ trÃ¬nh gá»­i dá»¯ liá»‡u!", "error");
            }
        });
    });
    $(".AAIco-arrow_upward").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
    $("#logout").click(function() {
        var d = {
            Member_Logout: 1
        };
        $.post(MAIN_URL, d, function(data) {
            if (data != 1) {
                fx.alertMessage("Lá»—i", "ÄÃ£ cÃ³ lá»—i xáº£y ra trong quÃ¡ trÃ¬nh gá»­i dá»¯ liá»‡u!", "error");
            } else {
                location.reload();
            }
        });
        return false;
    });
    function setCookie(name, value, days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    var fixKeyword = function(str) {
        str = str.toLowerCase();
        str = str.replace(/(<([^>]+)>)/gi, "");
        str = str.replace(/[`~!@#$%^&*()_|\=?;:'",.<>\{\}\[\]\\\/]/gi, "");
        str = str.split(" ").join("-");
        return str;
    }
    jQuery('#form-search').submit(function() {
        var keywordObj = jQuery(this).find('input[name=keyword]')[0];
        if (typeof keywordObj != 'undefined' && keywordObj != null) {
            var keyword = jQuery(keywordObj).val();
            keyword = fixKeyword(keyword);
            keyword = jQuery.trim(keyword);
            if (keyword == '') {
				fx.alertMessage("Lá»—i", "Báº¡n chÆ°a nháº­p tá»« khÃ³a. (KhÃ´ng tÃ­nh cÃ¡c kÃ½ tá»± Ä‘áº·c biá»‡t vÃ o Ä‘á»™ dÃ i tá»« khÃ³a)", "error");
                jQuery(keywordObj).focus();
                return false;
            }
            window.location.replace('/tim-kiem/' + keyword + '.html');
        }
        return false;
    });

});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Facebook SDK
jQuery('body').append('<div id="fb-root"></div>');
_loadFbSDk = function() {
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/all.js#xfbml=1&version=v2.12&appId=184143509048305";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}
jQuery(window).load(function() {
    setTimeout("_loadFbSDk()", 100);
});

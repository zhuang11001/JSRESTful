/**
 * Created by Admin on 2019/4/21.
 */
function adaptive() {
    var _window_h = $(window).height();
    var _window_w = $(window).width();
    var _banner_h = $("#banner").outerHeight(true);
    $("#menuBar").height(_window_h - _banner_h);
    $("#main").height(_window_h - _banner_h);
    var _mainHead_h = $("#mainHead").outerHeight(true);
    $("iframe[name='iframe']").height(_window_h - _banner_h - _mainHead_h);
}

function createMenu(jsonStr) {
    var jsonObject = JSON.parse(jsonStr);
    var html = new Array();
    if (jsonObject) {
        html.push('<ul>');
        for (var i = 0; i < jsonObject.length; i++) {
            html.push('<li><a data-target="');
            html.push(jsonObject[i].url);
            html.push('" data-name="');
            html.push(jsonObject[i].name);
            html.push('"><span><i class="fa fa-angle-down"></i></span> ');
            html.push(jsonObject[i].name);
            html.push('</a>');
            if (jsonObject[i].item.length > 0) {
                html.push('<ul>');
                for (var j = 0; j < jsonObject[i].item.length; j++) {
                    html.push('<li><a data-target="');
                    html.push(jsonObject[i].item[j].url);
                    html.push('" data-name="');
                    html.push(jsonObject[i].item[j].name);
                    html.push('">');
                    html.push('<span class="second"><i class="fa fa-angle-down"></i></span> ');
                    html.push(jsonObject[i].item[j].name);
                    html.push('</a>');
                    if (jsonObject[i].item[j].item.length > 0) {
                        html.push('<ul>');
                        for (var l = 0; l < jsonObject[i].item[j].item.length; l++) {
                            html.push('<li><a data-target="');
                            html.push(jsonObject[i].item[j].item[l].url);
                            html.push('" data-name="');
                            html.push(jsonObject[i].item[j].item[l].name);
                            html.push('"><span class="third">');
                            html.push(jsonObject[i].item[j].item[l].name);
                            html.push('</span></a></li>');
                        }
                        html.push('</ul>');
                    }
                    html.push('</li>');
                }
                html.push('</ul>');
            }
            html.push('</li>');
        }
        html.push("</ul>");
        $("#menuBar").html(html.join(''));
        $("#menuBar").find("a").unbind('click');
        $("#menuBar").find("a").click(function () {
            if ($(this).next().prop("nodeName") && "UL" == $(this).next().prop("nodeName")) {
                if ($(this).next().is(":hidden")) {
                    $(this).next().show();
                    $(this).find("i").attr("class", "fa fa-angle-down");
                } else {
                    $(this).next().hide();
                    $(this).find("i").attr("class", "fa fa-angle-right");
                }
            } else {
                var url = "openPage?url=" + $(this).attr("data-target");
                $("#title").html($(this).attr("data-name"));
                $("iframe[name='iframe']").attr("src", url);
            }
        });
    }
}


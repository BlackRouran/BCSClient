(function(_D) {
    var _self = {};
    _self.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    _self.Html = _D.getElementsByTagName("html")[0];
    _self.widthProportion = function() {
        var p = Number((_D.body && _D.body.clientWidth || _self.Html.offsetWidth) / 750).toFixed(3); //750为设计稿宽度
        return p > 1.067 ? 1.067 : p < 0.444 ? 0.444 : p; //计算最小最大值 分别是768/750  320/750 
    };
    var test = 123;
    _self.changePage = function() {
        _self.Html.setAttribute("style", "height:100%;" + "font-size:" + _self.widthProportion() * 100 + "px");
        _self.correctPx();
    };
    _self.correctPx = function() { //重新校检 font-size
        var docEl = document.documentElement;
        var clientWidth = docEl.clientWidth;
        var clientHeight = docEl.clientHeight;
        if (!clientWidth || clientWidth > 768) return; //如果最大值 不用重新校检
        var div = document.createElement('div');
        div.style.width = '1.4rem';
        div.style.height = '0';
        if (document.body) {
            document.body.appendChild(div);
        };
        var ideal = 140 * clientWidth / 750;
        var rmd = (div.clientWidth / ideal); //div的实际宽度 /理论的宽度

        if (rmd > 1. || rmd < 0.9) { //阀值为.1 如果超出 就重新计算
            docEl.style.fontSize = 100 * (clientWidth / 750) / rmd + 'px';
            if (document.body) {
                document.body.removeChild(div);
            };
        }
    };
    _self.changePage();
    if (!document.addEventListener) return;
    window.addEventListener(_self.resizeEvt, _self.changePage, false);
    document.addEventListener('DOMContentLoaded', _self.changePage, false);
})(document);
'use strict';
var vnexpressView = {
    ROOT : "#col_660",
    HEADER : 'div.title_news',
    HIGH_LIGHT : 'div.short_intro',
    CONTENT : 'div.fck_detail',
    viewData : {},
    getData : function(data){
        var self = this;
        var html = document.createElement('html');
        html.innerHTML = data;
        var domNews = html.querySelector(self.ROOT);
        self.viewData.header = domNews.querySelector(self.HEADER).innerHTML;
        self.viewData.highLight = domNews.querySelector(self.HIGH_LIGHT).innerHTML;
        self.viewData.content = domNews.querySelector(self.CONTENT).innerHTML;
        //TODO: Remove video content
        return self.viewData;
    }
}


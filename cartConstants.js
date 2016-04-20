angular.module('isCheckout').constant("isCartConstants", {
       //EVENTS
        "PageLoad": "cartSummary",
        "PageUpdate": "cartSummaryRefresh",
        "CountryChange": "countryChange",
        "formName": "cartMultiple",
        
        //TEMPLATE URLS
       "GetCartURL":"https://api.github.com/users/angular",
       "GetJsonURL":"./data.json",
        "contentType":"{'Content-Type': 'application/x-www-form-urlencoded'}",
        
        //REST Methods
        "Get":"GET",
        "Post": "POST"
        
    });
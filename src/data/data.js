import config from "./config/config.js";
var instance = null;
class AppData {
    constructor()
    {
        if(instance === null)
        {
            instance = this;
        }

        return instance;
    }

    loadProducts(callback)
    {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "products",
            "method": "GET",
            "dataType":"json",
            "headers": {
              "x-dbp-apikey": "ff53752b-10e9-479f-ae66-4250d81ee42f",
              "cache-control": "no-cache",
              "postman-token": "d2e05f9c-d197-6812-d07c-f0b727825365"
            }
          }
          
          $.ajax(settings).done(function (response) {
            instance.business_date = response.business_date;
            callback(response.products);
          });
    
    }

    
    loadSeries(productId,callback)
    {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "series?products=" +productId,
            "method": "GET",
            "dataType":"json",
            "headers": {
              "x-dbp-apikey": "ff53752b-10e9-479f-ae66-4250d81ee42f",
              "cache-control": "no-cache",
              "postman-token": "d2e05f9c-d197-6812-d07c-f0b727825365"
            }
          }
          
          $.ajax(settings).done(function (response) {
            instance.business_date = response.business_date;
            callback(response.list_series);
          });
    
    }

    estimate(product,series,callback)
    {

        var data = "{\r\n  \"business_date\": "+instance.business_date+","+
        "\r\n  \"snapshot_timestamp\": 0,"+
        "\r\n  \"clearing_currency\": \"EUR\","+"\r\n  \"portfolio\": ["+
        "\r\n    "+
        "{\r\n      \"line_no\": 1,"+
        "\r\n      \"product_id\": \""+ product.productId +"\","+
        "\r\n      \"call_put_flag\": \"C\","+
        "\r\n      \"exercise_price\": 160,"+
        "\r\n      \"version_number\": \""+ series.versionNumber +"\","+
        "\r\n      \"iid\": "+ series.iid +","+
        "\r\n      \"maturity\": 201806,"+
        "\r\n      \"instrument_type\": \""+ product.instrumentType +"\","+
        "\r\n      \"exercise_style\": \"EUROPEAN\","+
        "\r\n      \"net_ea\": 0,"+
        "\r\n      \"net_ls_balance\": 1"+
        "\r\n    }\r\n  ]\r\n}";

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "estimator",
            "method": "POST",
            "data": data,
            "processData": false,
            'contentType': "application/json; charset=utf-8",
	        'dataType': "json",
            "headers": {
              "x-dbp-apikey": "ff53752b-10e9-479f-ae66-4250d81ee42f",
              "cache-control": "no-cache",
              "postman-token": "d2e05f9c-d197-6812-d07c-f0b727825365"
            }
          }
          
          $.ajax(settings).done(function (response) {
            instance.business_date = response.business_date;
            callback(response.portfolio_margin);
          });
    }
}

export default new AppData()

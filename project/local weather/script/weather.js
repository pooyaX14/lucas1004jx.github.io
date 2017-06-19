//operweather api  0b723ce4aade68f38bd6fb0ae3303df4
//{lat: 41.637188, lng: -4.739163}
//google geo api AIzaSyAnIcTjsNB5mCVOHW7KUuJVIR9kFV1G28E
//var url= "https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY";

//get icon http://openweathermap.org/img/w/10d.png

//------------weather api-------------------
$(function(){
    var lat=0;
    var lng=0;
    var url="";
    var api="0b723ce4aade68f38bd6fb0ae3303df4";
   var degC;
    var degF;
    
    getLocation();
    
    function getInfo(){
        
       $.get(url + "&appid=" + api).done(function(response){
        console.log(response);
        weatherInfo(response);
    }); 
    }
    
    
    function weatherInfo(response){
        var condition = response.weather[0].main;
        var descri=response.weather[0].description;
        degC = Math.floor(response.main.temp_max-273.15);
        degF = Math.floor(degC*1.8+32);
        var windSpeed=response.wind.speed;
        var humidity = response.main.humidity + "%";
        var city=response.name;
        var country=response.sys.country;
        var icon=response.weather[0].icon;
        /*var info ="You are in "+city+", "+country+ "<br>Current weather condition: "+condition+"<br>Current temperature: "+ degC + "&#176;C/" + degF +"&#176;F"+"<br>Current humidity : "+ humidity+"<br>Current wind speed: "+ windSpeed + "mps";
        
        $("#weather").append("<p>" + info + "</p>");*/
        $("#city").html("<h1>"+city+"</h1>");
        $("#descri").html("<p>"+descri+"</p>");
         $("#temp").html("<h1>"+degC+"&#176;C</h1>");
        $("#weather img").attr("src","http://openweathermap.org/img/w/" + icon +".png");
        
    }
    
    function getLocation(){
        
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(function(position){
            lat =position.coords.latitude;
            lng =position.coords.longitude;
               
            url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng;
             console.log(url);  
               
               getInfo();
               
           },function(){
              $("#weather").html("<p>Sorry, can´t get your location, please refresh the browser agian</p>");
           });
            
           }/*----if navagator*/
        
        
    }

  
//-----------------main js-------------------------

    
    //-----------fullheight function
   function fullHeight(){
       var wHeight=$(window).height();
    $(".fullHeight").css("height",wHeight);
   }
    
    fullHeight();
    $(window).resize(fullHeight);
    
    /*---------------turn to Fahrenheit btn*/
    $("#deg").click(function(){
        var control=$("#deg").attr("data-deg");
        
        if(control==="c"){
           $("#temp").html("<h1>"+degF+"&#176;F</h1>");
        $("#deg").text("Turn to Celsius").attr("data-deg","f");
    
           } else if(control==="f"){
        $("#temp").html("<h1>"+degC+"&#176;C</h1>");
        $("#deg").text("Turn to Fahrenheit").attr("data-deg","c");
                     }
        
        
    });
    
    
    /*-------------------navbar overlay------------*/
            $("#open").click(function() {
                    $("#nav").fadeToggle();
                $("#open").css("visibility","hidden");
               
                });
            $("#close").click(function(){
                $("#nav").fadeToggle();
               $("#open").css("visibility","visible");
            });              
            
    $(window).resize(function() {
        if (window.innerWidth >=769) {
            $("#nav").css("display", "block");
        }else{
            $("#nav").css("display", "none");
            $("#open").css("visibility","visible");
        }

    });      
});
  




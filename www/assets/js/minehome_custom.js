// JavaScript Document
//Decrare values
var strMD5;
var u_encript;
var username_se = localStorage.getItem("uname_r");
var passs_se = localStorage.getItem("passwd_r");
var serialnumber_se = localStorage.getItem("gatewayse");
var url_serv_se = localStorage.getItem("serverurl_r");
var sent_url;
var grobal_token;
var urllogtype = url_serv_se+"/json.htm?type=command&param=getlogintype";

$.mobile.defaultPageTransition = 'none';
$.mobile.buttonMarkup.hoverDelay = 0;

$.getScript('assets/js/sha.js', function()
            {
            // script is now loaded and executed.
            // put your dependent JS here.
            });
$.getScript('assets/js/toast/toast.js', function()
            {
            // script is now loaded and executed.
            // put your dependent JS here.
            });
$.getScript('assets/js/jquery.base64.js', function()
            {
            
            u_encript=   base64(username_se);
            
            });



//
function getlogintype()
{
    $.getScript('assets/js/jquery.md5.min.js', function()
                {
                strMD5 =  $.md5(passs_se);
                sent_url=	url_serv_se+"/json.htm?type=command&param=logincheck&username=" + u_encript + "&password=" + strMD5 + "&rememberme=false&os=iphone";
                authen(sent_url);
                });
    
}
function authen(urll){
    
    //HttpContext.Current.Response.AddHeader("Access-Control-Expose-Headers", "Set-Cookie");
    $.ajax({
           dataType:"jsonp",
           url: urll,
           
           jsonpCallback:"jsonp123"
           
           
           });
}

function otprunning(){
    
    
}

/// ##**** Auto Reload function **** ###///
function autoUpdate(token){
    // alert(token);
    grobal_token=token;
    //alert(grobal_token);
    $.ajax({
           dataType:"jsonp",
           url: url+"&rhtpasswd="+token,
           type:"GET",
           jsonpCallback:"jsonp123"
           
           });
    //  autorefresh=setTimeout(autoUpdate(),10000); /// Reload new data every 10 sec
}
function intoquery(rcode){
    autoUpdate(rcode);
    
}

function sent_to_server(url4sent){
		  $.ajax({
                 url: url4sent+"&os=iphone&rhtpasswd="+grobal_token,
                 dataType: 'jsonp',
                 jsonpCallback:"jsonp123"
                 //success: function(){toast("Switch :"+name_object+" : "+name_icon);
                 //update list
                 //$(autoUpdate2(grobal_token));
                 //}
                 
                 });
    //	getlogintype();
}


function autoUpdate2(){
    ///For button refresh ///
    //alert("autoupdate2");
    $.ajax({
           dataType:"jsonp",
           type:'GET',
           url: url+"&rhtpasswd="+grobal_token,
           jsonpCallback:"jsonp123"
           });
}
//** END Function **//


function toast(text){
    Toast.init();
    Toast({
          text: text,
          textAlign:'center',
          time: 300,
          
          type: 'fixedBottom'
          }).show();
    
}

function jsonp123(data){
    //alert(data.title);
    var dataTile = data.title;
    switch (dataTile) {
        case "logincheck":
            var rht=data.rhtpasswd;
            
            intoquery(rht);
            break;
        case "Devices":
            json_fetch(data);
            break;
        case "Scenes":
            json_fetch(data);
            break;
        case "Cameras":
            json_fetch(data);
            break;
        case "SetSecStatus":
            if(data.status=="ERROR"){
                toast(data.message);
            }else{  toast("Arm updated");}
            json_fetch(data);
            break;
        default:
            //  alert("update ok");
            autoUpdate2(); //-->refresh listview
            
    }
    
}


function hslToRgb(h, s, l){
    //  alert(l);
    var r, g, b;
    
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return {r:parseInt(r*255), g:parseInt(g*255), b:parseInt(b*255)};
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    //alert(l*.8);
    //return [h*100, s*100, l*70];
    //return {h:parseFloat(h*360), s:parseInt(s*100), l:parseInt(l*80)};
    return {h:h*360, s:s, l:l*100};
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
    } : null;
    
    
    
}

function opendialog_arm() {
    // NOTE: The selector can be whatever you like, so long as it is an HTML element.
    //       If you prefer, it can be a member of the current page, or an anonymous div
    //       like shown.
    $('<div>').simpledialog2({
                             mode: 'blank',
                             headerText: 'ARM',
                             headerClose: true,
                             blankContent :
                             "<input type ='text' id='secure' value = '' /> <br />"+
                             "<form id='myForm'>"+
                             "<input type='radio' name='radioName' value='Disarm' /> Disarm <br />"+
                             "<input type='radio' name='radioName' value='Arm Home' /> Arm Home <br />"+
                             "<input type='radio' name='radioName' value='Arm Away' /> Arm Away <br />"+
                             "</form>"+
                             // NOTE: the use of rel="close" causes this button to close the dialog.
                             "<a rel='close' data-role='button' href='#'>Close</a>"
                             });
}


function dec2hex(s) { return (s < 15.5 ? '0' : '') + Math.round(s).toString(16); }
function hex2dec(s) { return parseInt(s, 16); }

function base32tohex(base32) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var bits = "";
    var hex = "";
    
    for (var i = 0; i < base32.length; i++) {
        var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += leftpad(val.toString(2), 5, '0');
    }
    
    for (var i = 0; i+4 <= bits.length; i+=4) {
        var chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16) ;
    }
    return hex;
    
}

function leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}

function timer()
{
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var countDown = 30 - (epoch % 30);
    if (epoch % 30 == 0) updateOtp();
    $('#updatingIn').text(countDown);
    
}
function start_get(data)
{
    if (data.title=="logincheck"){var rht=data.rhtpasswd;
        //alert(rht);
        intoquery(rht);
    }else if ((data.title!="Devices")&&(data.title!="logincheck")) {
        //alert("update OK");
        //$(autoUpdate2);
    }
    
}
function updateOtp() {
    
    var key = base32tohex(localStorage.getItem("gatewayse"));
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, '0');
    
    // updated for jsSHA v2.0.0 - http://caligatio.github.io/jsSHA/
    var shaObj = new jsSHA("SHA-1", "HEX");
    shaObj.setHMACKey(key, "HEX");
    shaObj.update(time);
    var hmac = shaObj.getHMAC("HEX");
    var offset = hex2dec(hmac.substring(hmac.length - 1));
    var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
    return    otp = (otp).substr(otp.length - 6, 6);
    //alert(otp);
    
}

function base64(uname){
    
    //svar kk = Base64.encode(uname);
    //alert(kk);
    var Base64 = {
        
        
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        
        
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = Base64._utf8_encode(input);
        
        while (i < input.length) {
            
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            
        }
        
        return output;
    },
        
        
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        
        while (i < input.length) {
            
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            
            output = output + String.fromCharCode(chr1);
            
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
            
        }
        
        output = Base64._utf8_decode(output);
        
        return output;
        
    },
        
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        
        for (var n = 0; n < string.length; n++) {
            
            var c = string.charCodeAt(n);
            
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            
        }
        
        return utftext;
    },
        
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        
        while (i < utftext.length) {
            
            c = utftext.charCodeAt(i);
            
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
            
        }
        
        return string;
    }
        
    }
    
    
    
    var encode = document.getElementById('encode'),
    decode = document.getElementById('decode'),
    output = document.getElementById('output'),
    input = document.getElementById('input');
    
    
    
    var ss = Base64.encode(uname);
    //alert(ss);
    return ss;
    
}

function initDatabase() {
    try {
        if (!window.openDatabase) {
            alert('Databases are not supported in this browser.');
        } else {
            
            createTables();
            selectAll();
        }
    } catch(e) {
        
        if (e == 2) {
            // Version number mismatch.
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error "+e+".");
        }
        return;
    }
}


function createTables(){
    
    DEMODB.transaction(
                       function (transaction) {
                       transaction.executeSql('CREATE TABLE IF NOT EXISTS serialS(sname TEXT NOT NULL)');
                       }
                       );
    //prePopulate();
}


function prePopulate(se){
    
    DEMODB.transaction(
                       function (transaction) {
                       //Optional Starter Data when page is initialized
                       //var data = se;
                       //alert(data);
                       //transaction.executeSql("DELETE FROM serialS");
                       //transaction.executeSql("INSERT INTO serialS(sname) VALUES ('"+data+"')");
                       }
                       );
}


function selectAll(){
    DEMODB.transaction(
                       function (transaction) {
                       transaction.executeSql("SELECT * FROM serialS;",[],
                                              dataSelectHandler);
                       //alert("ee");
                       }
                       );
}


function dataSelectHandler(transaction, results){
    
    // Handle the results
    //alert(results.rows.length);
    
    
    var row = results.rows.item(0);
    var newFeature = new Object();
    
    newFeature.sname   = row['sname'];
    alert(newFeature.sname);
    
    
}

function dec2hex(s) { return (s < 15.5 ? '0' : '') + Math.round(s).toString(16); }
function hex2dec(s) { return parseInt(s, 16); }

function base32tohex(base32) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var bits = "";
    var hex = "";
    
    for (var i = 0; i < base32.length; i++) {
        var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += leftpad(val.toString(2), 5, '0');
    }
    
    for (var i = 0; i+4 <= bits.length; i+=4) {
        var chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16) ;
    }
    return hex;
    
}

function leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}
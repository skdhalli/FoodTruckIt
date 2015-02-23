/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function truck_signup()
{
    var title = $("#title").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirm_password = $("#confirm_password").val();
    if(password != confirm_password)
    {
        alert("Passwords do not match !!");
    }
    else if(password.length <8)
    {
        alert("Minimum password length is 8 characters");
    }
    else if(title == "")
    {
        alert("Title cannot be empty");
    }
    else if(!validate_phonenumber(phone) || !validate_email(email))
    {
        alert("Please enter a valid telephone number / email address");
    }
    else
    {
        //proceed to sign up
        var _url = "http://localhost:8080/FoodTruckServices/webresources/rest/add/truck?title="+title+"&email="+email+"&phone="+phone+"&password="+password;
        console.log(_url);
        $.ajax({
        type: "GET",
        crossOrigin: true,
        url: _url,
        dataType: "jsonp",
        jsonpCallback: 'callback',
        jsonp: 'callback',
        success: function (json) {
            //console.log(json);
            var status = json.Result[0].status;
            if(status == "success")
            {
                window.location.href = document.URL.replace("#truck_signup", "#truck_signin");
            }
            else if(status == "failed")
            {
                alert(json.Result[0].message);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){ 
        
        }
    });
        
    }
}

function validate_phonenumber(inputtxt)  
{  
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
  if(inputtxt.match(phoneno) !== null)  
        {  
      return true;  
        }  
      else  
        {  
        return false;  
        }  
}

function validate_email(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
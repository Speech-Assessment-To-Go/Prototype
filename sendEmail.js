export function sendEmail(textEAddress, subject, body)
{
  var Email = 
  { 
    send: function (a) 
    { 
        return new Promise(function (n, e) 
        { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) 
            { 
                n(e) 
            }) 
        }) 
    }, ajaxPost: function (e, n, t) 
    { 
        var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () 
        { 
            var e = a.responseText; null != t && t(e) 
        }, a.send(n) 
    }, ajax: function (e, n) 
    { 
        var t = Email.createCORSRequest("GET", e); t.onload = function () 
        { 
            var e = t.responseText; null != n && n(e) 
        }, t.send() 
    }, createCORSRequest: function (e, n) 
    { 
        var t = new XMLHttpRequest; 
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t 
    } 
  };

  Email.send({
  Host: "smtp.elasticemail.com",
  Username: "stackunderflow2021@gmail.com",
  Password: "7637EF12FF54E310A2824C17E3D6F629342D",
  To: textEAddress,
  From: "stackunderflow2021@gmail.com",
//   Subject: "Student Profile",
//   Body: "This is the file sent for the speech assessment. Please do not respond to this email.",
    Subject: subject,
    Body: body,
  //use when we have the pdf/attachment
  // Attachments:[
  // {
  //     Name: studentname.pdf,
  //     Data: studentdata
  // }]
}).then(
      alert("Email sent successfully")
  );

}
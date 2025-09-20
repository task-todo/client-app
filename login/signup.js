var email;
var password;
var URI;
document.addEventListener('DOMContentLoaded',async()=>{
  URI = await window.onstart.getURL();
})
function btnpress(){
    email = document.getElementById("emailinp").value;
    password = document.getElementById("passwordinp").value.trim();
    passwordagain = document.getElementById("passwordinpagain").value.trim();
    if(password != passwordagain){
        //show invalid email or password
        alert("Passwords do not match");
        return;
    }
    if(!email || !password){
        //show invalid email or password
        alert("Invalid email or password");
        return;
    }
    if(password.trim().length<6){
        alert("Password must be minimum 6 characters long");
        return;
    }
    //send to server at localhost:8080/login
    fetch(URI+"/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:email, password })
    })
    .then(res => res.json())
    .then(data => {
        if(data.message == "Username already taken"){
            alert("User already exists");
            return;
        }
        if(data.token){
        window.Login.sendLoginSuccess(data.token);
        } else {
        window.Login.sendLoginFailed();
        alert("Password must be minimum 6 characters long");
        }
    })
    .catch(() => {
        window.Login.sendLoginFailed();
    });
}
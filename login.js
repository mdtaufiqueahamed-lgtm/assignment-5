// login button click
document.getElementById("login-btn").addEventListener("click", function () {

    // input value get
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // check credential
    if (username === "admin" && password === "admin123") {

        // success message (optional)
        alert("Login Successful");

        // redirect to main page
        window.location.href = "assets/home.html";

    } else {
        alert("Wrong Username or Password");
    }

});
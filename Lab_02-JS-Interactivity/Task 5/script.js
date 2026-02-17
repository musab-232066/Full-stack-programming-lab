function validateForm(){

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let password = document.getElementById("password").value;

    let valid = true;

    // clear previous errors
    document.getElementById("nameError").innerText="";
    document.getElementById("emailError").innerText="";
    document.getElementById("ageError").innerText="";
    document.getElementById("passError").innerText="";
    document.getElementById("success").innerText="";


    // NAME
    if(name === ""){
        document.getElementById("nameError").innerText="Name cannot be empty";
        valid = false;
    }

    // EMAIL
    if(!email.includes("@")){
        document.getElementById("emailError").innerText="Invalid email";
        valid = false;
    }

    // AGE
    if(isNaN(age) || age < 18 || age > 60){
        document.getElementById("ageError").innerText="Age must be between 18 and 60";
        valid = false;
    }

    // PASSWORD
    if(password.length < 6){
        document.getElementById("passError").innerText="Password must be at least 6 characters";
        valid = false;
    }

    // SUCCESS
    if(valid){

        if(confirm("Submit form?")){
            document.getElementById("success").innerText="Registration Successful!";

            // BONUS interaction
            let city = prompt("Enter your city:");
            alert("Welcome from " + city + " 🎉");
        }
    }
}

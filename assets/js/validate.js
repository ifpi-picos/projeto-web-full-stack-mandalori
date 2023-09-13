
function login(){

    const email = form.email().value;
    const password = form.password().value;
        firebase.auth().signInWithEmailAndPassword(email, password).then(respose =>{
            console.log('sucesso', respose)
            window.location.href= "./pages/feed.html"
            console.log()
        }).catch(error => {
            alert(getErrorMessage(error));
            console.log('erro',error)
        })

}


function recoverPassword(){
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() =>{
        alert("email enviado");
    }).catch (error => {
        alert(getErrorMessage(error));
    }); 
}


function getErrorMessage(error){
    if (error.code == "auth/user-not-found"){
        return "usuario nao encontrado"
    }
    if (error.code == "auth/missing-password") {
        return"digite a senha"
    }
    if (error.code == "auth/wrong-password") {
        return"senha incorreta"
    }
    return error.message;
}

function register(){
    window.location.href = "./pages/registro.html";
}

// function recover(){
//     window.location.href = "./pages/esqueceu.html";
// }



function validateFields(){
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid;
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}

function isEmailValid() {
    const email = form.email().value;
    if(!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if(!password){
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: ()=> document.getElementById("email"),
    password: ()=> document.getElementById("password"),
    // emailRecover: ()=> document.getElementById("emailRecover"),
}

// validacao adm login teste

// function validateFields() {
//     const email = document.getElementById('emailLogin').value
//     if (!email) {
//         document.getElementById('login-button').disabled= true;
//     }else if (validateFields(email)) {
//         document.getElementById('login-button').disabled= false;
//     }else{
//             function validateEmail(email) {
//         return /\S+@\S+\.\S+/.test(email);
//     }
//     }
// }

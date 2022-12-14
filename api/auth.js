
const {getAuth} = require('firebase/auth');
const {app} = require('./config');
const auth = getAuth(app);

function createAccount(){
    // obtain user email and user password from HTML
    var userEmail = "email_field";
    var userPass = "password_field";
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch((error) =>{
        //error code
        var errorCode = error.code

        //error message
        var errorMessage = error.message                
    }).then(() => {
        //redirect the user to profile page
        window.location.assign("/profile");
    });
}
function login() {
    // obtain user email and user password from HTML
    var userEmail = "email_field";
    var userPass = "password_field";
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        //error code
        var errorCode = error.code
        //errod message
        var errorMessage = error.message
        //show error message
        window.alert("Error : " + errorMessage);
    }).then(() => {
        //redirect the user to profile page
        window.location.assign("/profile");
    });
}
const user = firebase.auth().currentUser;

// send verification email
function sendVerificationEmail() {
    // extracting the user from the firebase
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        window.alert("Verification link sent to your email. Kinldy check to verify your account")
    }).catch(function(error) {
        // An error happened.
    });
}

module.exports = {auth};
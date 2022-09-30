function Login(props){
    currentUser = {};

    function handle(input){
        // validate fields
        let errMsg = "";
        (input.email.length === 0) ? errMsg = "Email cannot be empty.  " : "";
        (input.password.length === 0) ? errMsg += "Password cannot be empty.  " : "";

        if (errMsg.length === 0) {
            const url = `/account/login/${input.email}/${input.password}`;
            (async () => {
                var res = await fetch(url);
                var data = await res.json();

                if (data.length === 1) {
                    currentUser = data[0];
                    input.setLoginStatus("logged in");
                    input.setStatus("Welcome "+ currentUser.name + " to BadBank.");
                    input.setShow(false);
                }
                else {
                    console.log("Error: DUPLICATED emails.");
                    if (data.length > 1) {
                        errMsg = "Contact BadBank Customer Service since two or more accounts having a same email.";
                    } else {
                        errMsg = "Verify email and password. Try to Login again.";
                    }
                    currentUser = {}; // forcing logout
                    input.setLoginStatus();
                    input.setStatus(errMsg);
                    input.setShow(true);
                }
            })();
        } 
        else {
            currentUser = {};
            input.setLoginStatus();
            input.setStatus(errMsg);
            input.setShow(true);
        }
        if (errMsg.length > 0) {
            currentUser = {};
            input.setLoginStatus();
            input.setStatus(errMsg);
            input.setShow(true);
        }
        else {
            input.setLoginStatus("logged in");
            input.setStatus("Welcome "+ currentUser.name + " to BadBank.");
            input.setShow(false);            
        }
    }

    return(
        <BankForm
            activity="login"
            bgcolor="secondary"
            label="Login"
            title="Login Your BadBank Account"
            text="We are here to serve you."
            txtcolor="white"
            handle={handle}
            hideName={true}
            hideEmail={false}
            hidePassword={false}
            hideAmount={true}
            successButton=""    // empty for no button after action completed
            emailValue=""
            setLoginStatus={props.setLoginStatus}
        />
    )
}
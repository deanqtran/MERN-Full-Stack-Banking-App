function Logout(props){
    if (currentUser.email === undefined) {
        console.log("You are currently not logged in.");
        currentUser = {};
    }

    function handle(input){
        let successMsg = ""
        let errMsg = "";
        // login verificaion
        if (currentUser.email === undefined) {
            console.log("You are currently not logged in.");
            errMsg = "Not logged in.  Please click Home page to Login.";
            currentUser = {};
        } else {
            // validate email field
            if (input.email.length === 0 || input.email !== currentUser.email) {
                (input.email.length === 0) ? errMsg = "Email cannot be empty.  " : "";
                (input.email !== currentUser.email) ? errMsg += "Email is not matched with your email in profile.  Verify email.  " : "";
            } else {
                currentUser = {};
                input.setLoginStatus();
                console.log("Logged out.");
                successMsg = "Logged out.";
            }
        }
        // re-enforce/override previous status
        if (errMsg.length > 0) {
            input.setLoginStatus();
            input.setStatus(errMsg);
            input.setShow(true);
        }
        else {
            input.setLoginStatus();
            input.setStatus(successMsg + " || Thank you for having us to serve you.");
            input.setShow(false);            
        }
    }

    return(
        <BankForm
            activity="logout"
            bgcolor="info"
            label="Logout"
            title={"Customer Name: "+currentUser.name+".  Logging out"}
            text="Please come back in near future."
            txtcolor="black"
            handle={handle}
            hideName={true}
            hideEmail={false}
            hidePassword={true}
            hideAmount={true}
            successButton=""    // empty for no button after action completed
            emailValue={currentUser.email}
            setLoginStatus={props.setLoginStatus}
        />
    )
}
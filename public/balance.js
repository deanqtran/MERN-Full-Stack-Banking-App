function Balance(props){
    if (currentUser.email === undefined) {
        console.log("You are currently not logged in.");
        currentUser = {};
        input.setLoginStatus();
    }

    function handle(input){
        let successMsg = ""
        let errMsg = "";
        // login verificaion
        if (currentUser.email === undefined) {
            errMsg = "Not logged in.  Please click Home page to Login.";
            currentUser = {};
            input.setLoginStatus();
        } else {
            // validate email field
            if (input.email.length === 0 || input.email !== currentUser.email) {
                (input.email.length === 0) ? errMsg = "Email cannot be empty.  " : "";
                (input.email !== currentUser.email) ? errMsg += "Email is not matched with your email in profile.  Verify email.  " : "";
            } else {
                successMsg = "Current balance: $ "+ (currentUser.balance*1.0).toFixed(2);
            }
            input.setLoginStatus("logged in");
        }
        // re-enforce/override previous status
        if (errMsg.length > 0) {
            input.setStatus(errMsg);
            input.setShow(true);
        }
        else {
            input.setLoginStatus("logged in");
            input.setStatus(successMsg + " || Thank you for having us to serve you.");
            input.setShow(false);            
        }
    }

    return(
        <BankForm
            activity="balance"
            bgcolor="info"
            label="Balance"
            title={"Customer Name: "+currentUser.name+".  Inquiring: Balance of Your BadBank Account"}
            text="Any issue with the Balance, Please Contact BadBank customer service (800) 234-4567."
            txtcolor="black"
            handle={handle}
            hideName={true}
            hideEmail={false}
            hidePassword={true}
            hideAmount={true}
            successButton="Check Balance Again"
            emailValue={currentUser.email}
            setLoginStatus={props.setLoginStatus}
        />
    )
}
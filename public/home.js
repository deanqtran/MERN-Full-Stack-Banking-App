function Home(props){
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
            input.setLoginStatus();
        } else {
            input.setStatus("Welcome "+ currentUser.name + " to BadBank.");
            input.setLoginStatus("logged in");
        }
        // re-enforce/override previous status
        if (errMsg.length > 0) {
            input.setStatus("");
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
            activity="home"
            bgcolor="light"
            label="BadBank Landing Module"
            title={"Welcome "+(currentUser.name=== undefined ? '': currentUser.name+' ')+"to BadBank Account"}
            text="BadBank is best in serving your financial needs."
            txtcolor="black"
            handle={handle}
            hideName={true}
            hideEmail={true}
            hidePassword={true}
            hideAmount={true}
            imgFile="bank.png"
            successButton=""    // empty for no button after action completed
            emailValue=""
            setLoginStatus={props.setLoginStatus}
        />
    )
}
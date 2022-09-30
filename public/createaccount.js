function CreateAccount(props){
    currentUser = {};

    function handle(input){
        // validate fields
        let errMsg = "";
        (input.name.length === 0) ? errMsg = "Name cannot be empty.  " : "";
        (input.email.length === 0) ? errMsg += "Email cannot be empty.  " : "";
        (input.password.length === 0) ? errMsg += "Password cannot be empty.  " : "";

        if (errMsg.length === 0) {
            const user_exist_url = `/account/exist/${input.email}`;
            (async () => {
                var res = await fetch(user_exist_url);
                var data = await res.json();

                if (data.length === 0) {
                    const url = `/account/create/${input.name}/${input.email}/${input.password}`;
                    (async () => {
                        var res = await fetch(url);
                        var data = await res.json();
                        console.log("user created: ", data);
                    })();
                    input.setStatus("Account created.");
                    input.setShow(false);
                }
                else {
                    errMsg = `This email, ${input.email}, already had account.  Please verify email or contact BadBank customer service (800) 234-4567.`;
                    input.setStatus(errMsg);
                    input.setShow(true);
                }
            })();
        }
        // re-enforce/override previous status
        if (errMsg.length === 0) {
            input.setStatus("Account created.");
            input.setShow(false);
        } else {
            input.setStatus(errMsg);
            input.setShow(true);
        }
        currentUser = {};
        input.setLoginStatus();
    }

    return(
        <BankForm
            activity="create"
            bgcolor="primary"
            label="Create Account"
            title="Create BadBank Account"
            text="Trust BadBank to Manage Your Saving/Checking Account/Other Investment Accounts."
            txtcolor="white"
            handle={handle}
            hideName={false}
            hideEmail={false}
            hidePassword={false}
            hideAmount={true}
            successButton="Add another account"
            emailValue=""
            setLoginStatus={props.setLoginStatus}
        />
    )
}
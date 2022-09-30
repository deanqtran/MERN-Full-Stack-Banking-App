function Deposit(props){
    if (currentUser.email === undefined) {
        console.log("You are currently not logged in.");
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
            var mynewbalance = 0;
            // validate fields
            if (input.email.length === 0 || input.email !== currentUser.email) {
                (input.email.length === 0) ? errMsg = "Email cannot be empty.  " : "";
                (input.email !== currentUser.email) ? errMsg += "Email is not matched with your email in profile.  Verify email.  " : "";
            } else {
                // balance before deposit
                console.log("INIT currentUser.balance: $ " + (currentUser.balance*1.0).toFixed(2))
                mynewbalance = currentUser.balance*1.0 + input.amount*1.0;

                // validate amount field
                if (input.amount*1.0 <= 0 || input.amount.length < 0) {
                    console.log("Error: Must enter amount ($) greater than 0, or cannot be empty.");
                    if (input.amount.length === 0) {
                        errMsg = "Amount ($): field cannot be empty.  ";
                    } else {
                        errMsg = "Amount ($): "+input.amount+ " not allowed.  ";
                    }
                    errMsg += "Must enter amount ($) greater than 0.";
                }
            }
            // proceed deposit
            if (errMsg.length === 0) {
                const url = `/account/update/${input.email}/${mynewbalance}`;
                (async () => {
                    var res = await fetch(url);
                    var data = await res.json();

                    console.log("$ "+(input.amount*1.0).toFixed(2)+ " Deposited.");
                    successMsg = "$ "+(input.amount*1.0).toFixed(2)+ " Deposited. || ";
                    successMsg += "initial balance: $ "+(currentUser.balance*1.0).toFixed(2)+" || ";
                    successMsg += "after deposited balance: $ "+(mynewbalance*1.0).toFixed(2);

                    currentUser.balance = mynewbalance;

                    input.setLoginStatus("logged in");
                    input.setStatus(successMsg);
                    input.setShow(false);
                })();
            }
        }
        // re-enforce/override previous status
        if (errMsg.length > 0) {
            input.setStatus(errMsg);
            input.setShow(true);
        }
        else {
            input.setLoginStatus("logged in");
            input.setStatus(successMsg);
            input.setShow(false);            
        }
    }

    return(
        <BankForm
            activity="deposit"
            bgcolor="warning"
            label="Deposit"
            title={"Customer Name: "+currentUser.name+".  Depositing $ to Your BadBank Account"}
            text="BadBank Has Very Secured Deposit service."
            txtcolor="black"
            handle={handle}
            hideName={true}
            hideEmail={false}
            hidePassword={true}
            hideAmount={false}
            successButton="Perform another deposit"
            emailValue={currentUser.email}
            setLoginStatus={props.setLoginStatus}
        />
    )
}
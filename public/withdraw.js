function Withdraw(props){
    if (currentUser.email === undefined) {
        console.log("You are currently not logged in.");
        currentUser = {};
    }

    function handle(input){
        let successMsg = ""
        let errMsg = "";
        // login verification
        if (currentUser.email === undefined) {
            console.log("You are currently not logged in.");
            errMsg = "Not logged in.  Please click Home page to Login.";
            currentUser = {};
            input.setLoginStatus();
        } else {
            var mynewbalance = 0;
            // validate email field
            if (input.email.length === 0 || input.email !== currentUser.email) {
                (input.email.length === 0) ? errMsg = "Email cannot be empty.  " : "";
                (input.email !== currentUser.email) ? errMsg += "Email is not matched with your email in profile.  Verify email.  " : "";
            } else {
                // verify balance allowable for withdraw
                console.log("INIT currentUser.balance: $ " + (currentUser.balance*1.0).toFixed(2))
                mynewbalance = currentUser.balance*1.0 - input.amount*1.0;
                if (mynewbalance < 0) {
                    console.log("Error: NOT enough money.");
                    errMsg += "Not enough money in account. || Current balance: $ "+(currentUser.balance*1.0).toFixed(2)+" || ";
                    errMsg += "Withdrawing $ "+(input.amount *1.0).toFixed(2) + " declined.  Please verify account balance.";
                    mynewbalance = 0.0;
                }
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
            // proceed withdraw
            if (errMsg.length === 0) {
                const url = `/account/update/${input.email}/${mynewbalance}`;
                (async () => {
                    var res = await fetch(url);
                    var data = await res.json();

                    console.log("$ "+(input.amount*1.0).toFixed(2)+ " Withdrew.");
                    successMsg = "$ "+(input.amount*1.0).toFixed(2)+ " Withdrew. || ";
                    successMsg += "initial balance: $ "+(currentUser.balance*1.0).toFixed(2)+" || ";
                    successMsg += "after withdrew balance: $ "+(mynewbalance*1.0).toFixed(2);

                    currentUser.balance = mynewbalance;

                    input.setLoginStatus("logged in");
                    input.setStatus(successMsg + " || Withdraw completed.  Please take your cash.");
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
            input.setStatus(successMsg + " || Withdraw completed.  Please take your cash.");
            input.setShow(false);            
        }
    }

    return(
        <BankForm
            activity="withdraw"
            bgcolor="danger"
            label="Withdraw"
            title={"Customer Name: "+currentUser.name+".  Withdrawing $ from Your BadBank Account"}
            text="BadBank Has Very Secured Withdraw service."
            txtcolor="black"
            handle={handle}
            hideName={true}
            hideEmail={false}
            hidePassword={true}
            hideAmount={false}
            successButton="Perform another withdraw"
            emailValue={currentUser.email}
            setLoginStatus={props.setLoginStatus}
        />
    )
}
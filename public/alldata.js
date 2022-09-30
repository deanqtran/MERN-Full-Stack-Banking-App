function AllData(props){
    const [data, setData] = React.useState('');

    if (currentUser.email === undefined) {
        console.log("You are currently not logged in.");
        currentUser = {};
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
                console.log("currentUser: " + JSON.stringify(currentUser));
                if (currentUser.role === 'customer'){
                    successMsg = "currentUser: "+ JSON.stringify(currentUser);
                    input.setStatus(JSON.stringify(currentUser) + " || Thank you for having us to serve you.");
                    input.setShow(false);
                } else if (currentUser.role === 'admin') {
                    console.log("I has a admin role.");
                    const url = `/account/all`;
                    (async () => {
                        var res = await fetch(url);
                        var result = await res.json();
                        setData(result);
                        successMsg = "All Customers:" + JSON.stringify(result);
                        input.setStatus(JSON.stringify(result) + " || Thank you for having us to serve you.");
                        input.setShow(false);
                    })();
                }
                 
            }
            input.setLoginStatus("logged in");
        }
        // re-enforce/override previous status
        if (errMsg.length > 0) {
            input.setStatus(errMsg);
            input.setShow(true);
        }
        else {
            input.setStatus((data.length === 0 ? JSON.stringify(currentUser): JSON.stringify(data)) + " || Thank you for having us to serve you.");
            input.setShow(false);            
        }
    }

    return(
        <BankForm
            activity="alldata"
            bgcolor="info"
            label="AllData"
            title={"Customer Name: "+currentUser.name+".  Inquiring: AllData of Your BadBank Account"}
            text="Any issue with Profile and Balance, Please Contact BadBank customer service (800) 234-4567."
            txtcolor="black"
            handle={handle}
            hideName={true}
            hideEmail={false}
            hidePassword={true}
            hideAmount={true}
            successButton="View AllData Again"
            emailValue={currentUser.email}
            setLoginStatus={props.setLoginStatus}
        />
    )

}
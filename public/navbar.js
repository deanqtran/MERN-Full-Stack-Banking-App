function NavBar(props) {

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#">BadBank</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{(!props.loginStatus) && ( 
                        <li className="nav-item">
					        <a className="nav-link active" href="#/CreateAccount">Create Account<span className="sr-only">(current)</span></a>
                        </li>)}
						{(!props.loginStatus) && ( 
                        <li className="nav-item">
						    <a className="nav-link" href="#/login/">Login</a>
                        </li>)}
						{(props.loginStatus) && ( 
                        <li className="nav-item">
						    <a className="nav-link" href="#/deposit/">Deposit</a>
                        </li>)}
						{(props.loginStatus) && ( 
                        <li className="nav-item">
						    <a className="nav-link" href="#/withdraw/">Withdraw</a>
                        </li>)}
						{(props.loginStatus) && ( 
                        <li className="nav-item">
						    <a className="nav-link" href="#/balance/">Balance</a>
                        </li>)}
						{(props.loginStatus) && ( 
                        <li className="nav-item">
						    <a className="nav-link" href="#/alldata/">All Data</a>
                        </li>)}
						{(props.loginStatus) && ( 
                        <li className="nav-item">
						    <a className="nav-link" href="#/logout/">Logout</a>
                        </li>)}
					</ul>
				</div>
			</nav>
		</>
	);
}
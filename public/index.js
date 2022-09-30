function Spa(){
	const [loginStatus, setLoginStatus] = React.useState('');

	return(
	<HashRouter>
		<div>
			<NavBar loginStatus={loginStatus}/>
				<div className="container" style={{padding: "20px"}}>
					<Route path="/" exact render={() => <Home setLoginStatus={setLoginStatus}/>} />
					<Route path="/CreateAccount" exact render={() => <CreateAccount setLoginStatus={setLoginStatus}/>} />
					<Route path="/alldata/"  render={() => <AllData setLoginStatus={setLoginStatus}/>} />
					<Route path="/login/"  render={() => <Login setLoginStatus={setLoginStatus}/>} />
					<Route path="/deposit/"  render={() => <Deposit setLoginStatus={setLoginStatus}/>} />
					<Route path="/exist/"  render={() => <CreateAccount setLoginStatus={setLoginStatus}/>} />
					<Route path="/withdraw/"  render={() => <Withdraw setLoginStatus={setLoginStatus}/>} />
					<Route path="/balance/"  render={() => <Balance setLoginStatus={setLoginStatus}/>} />
					<Route path="/logout/"  render={() => <Logout setLoginStatus={setLoginStatus}/>} />
				</div>
		</div>
	</HashRouter>
   )
}

// ReactDOM.render(
// 	<Spa />,
// 	document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Spa/>);
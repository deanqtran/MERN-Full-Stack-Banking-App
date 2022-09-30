const Route			= ReactRouterDOM.Route;
const Link			= ReactRouterDOM.Link;
const HashRouter 	= ReactRouterDOM.HashRouter;
const currentUser = {};


// Card(): input arguments (activity, bgcolor, header, title, text, txtcolor, handle,
//		successButton, status, hidePassword, hideAmount, emailValue, setLoginStatus, body)
//	- using these arguments (bgcolor, txtcolor, header, title, text, body, status)
//	- other arguments were previously used inside BankForm() to assemble "body"
function Card(props){
	function classes() {
		const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
		const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
		
		return 'card mb-3 ' + bg + txt;
	}
	
	return (
		<div className={classes()} style={{maxWidth: "36rem"}}>
			<div className="card-header">{props.header}</div>
			<div className="card-body">
				{props.title && (<h5 className="card-title">{props.title}</h5>)}
				{props.text && (<h5 className="card-text">{props.text}</h5>)}
				{props.body}
				{props.status && (<div id='createStatus'>{props.status}</div>)}
			</div>
		</div>
	);
}

// BankForm():		input arguments (activity, bgcolor, label,  title, text, txtcolor, handle, successButton, hideAmount, emailValue, setLoginStatus )
//	return <Card /> input arguments	(activity, bgcolor, header, title, text, txtcolor, handle, successButton, status, hidePassword, hideAmount, emailValue, setLoginStatus, body)
//						
function BankForm(props){
	const [show, setShow]			= React.useState(true);
	const [status, setStatus]		= React.useState('');

	return(
		<Card
			activity={props.activity}
			bgcolor={props.bgcolor}
			header={props.label}
			title={props.title}
			text={props.text}
			txtcolor={props.txtcolor}
			handle={props.handle}
			successButton={props.successButton}
			status={status}
			hidePassword={props.hidePassword}
			hideAmount={props.hideAmount}
			emailValue={props.emailValue}
			body={show ?
				<CreateForm setShow={setShow} setStatus={setStatus}
					header={props.label} handle={props.handle}
					activity={props.activity} hideName={props.hideName} hideEmail={props.hideEmail}
					hidePassword={props.hidePassword} hideAmount={props.hideAmount} imgFile={props.imgFile}
					emailValue={props.emailValue} setLoginStatus={props.setLoginStatus} /> :
				<CreateMsg setShow={setShow} setStatus={setStatus} successButton={props.successButton} />}
		/>
	)
}

// CreateMsg(): input arguments (setShow, setStatus, successButton)
//	if successButton string is empty, no button generated
function CreateMsg(props){
	return(<>
		<h5>Success</h5>
		{(props.successButton) &&
			(
				<>
				<button type="submit" 
					className="btn btn-light"
					onClick={() => {props.setShow(true); props.setStatus(''); }}>{props.successButton}</button>
				</>
			)
		}
	</>)
}

// CeateForm(): input arguments (setShow, setStatus, header, handle, activity, hideName, hideEmail, hidePassword, hideAmount,
//					imgFile, emailValue, setLoginStatus)
function CreateForm(props){
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState(props.emailValue);
	const [password, setPassword] = React.useState('');
	const [amount, setAmount] = React.useState('');

	return(
	<>
		{(props.imgFile) &&
			(
				<>
				<img src={props.imgFile} className="img-fluid" alt="Responsive image" />
				</>
			)
		}
		{(!props.hideName) &&
			(
				<>	
				Name<br/>
				<input type="input"
					className="form-control"
					placeholder="Enter name"
					value={name}
					onChange={e => setName(e.currentTarget.value)} /><br/>
				</>
			)
		}
		{(!props.hideEmail) &&
			(
				<>
				Email<br/>
				<input type="input"
					id="id-email"
					className="form-control"
					placeholder="Enter email"
					value={email}
					onChange={e => setEmail(e.currentTarget.value)} /><br/>

				</>
			)
		}
		{(!props.hidePassword) &&
			(
				<>
				Password<br/>
				<input type="password"
					className="form-control"
					placeholder="Enter password"
					value={password}
					onChange={e => setPassword(e.currentTarget.value)} /><br/>
				</>
			)
		}
		{(!props.hideAmount) &&
			(
				<>
				Amount ($)<br/>
				<input type="number"
					id="id-amount"
					className="form-control"
					placeholder="Enter amount"
					value={amount}
					onChange={e => setAmount(e.currentTarget.value)} /><br/>
				</>
			)
		}
		{(props.activity !== 'home') &&
			(
				<>
				<button type="submit"
					className="btn btn-light"
					onClick={() => {
						props.handle({"name": name, "email": email, "password": password, "amount": amount
						, "setShow": props.setShow, "setStatus": props.setStatus, "setLoginStatus": props.setLoginStatus});
					}}>
							{((props.header) === 'Balance') ? (<>Show </>) : (<></>)}{props.header}
				</button>
				</>
			)
		}
	</>)
}
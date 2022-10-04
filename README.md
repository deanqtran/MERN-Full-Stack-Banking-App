# MERN-Full-Stack-Banking-App
<p><img src="public/bank.png" width='300'></p>
Banking Application Using MongoDB, Express.js, React.js and Node.js
<ul>
  <li>mongoDB version: 4.9.1</li>
  <li>express version: 4.18.1</li>
  <li>react version: 18.2.0</li>
  <li>node version: 18.7.0</li>
  <li>react-dom version: 18.2.0</li>
  <li>react version: 18.2.0</li>
  <li>react-router version: 6.3.0</li>
  <li>react-router-dome version: 6.3.0</li>
  <li>bootstrap version: 4.5.2</li>
  <li>babel version: 7.18.13</li>
  </li>
</ul>

### **Deployment / Installation**:
### ***Following are commands executed on a VM on Digital Ocean Cloud***
<ul>
    <li>Fork the repository</li>
    <li>sudo ufw allow 3001</li>
    <li>mv MERN-Full-Stack-Banking-App badbank_three_tiers</li>
    <li>cd badbank_three_tiers</li>
    <li>npm install express@4.18.1</li>
    <li>npm install cors@2.8.5</li>
    <li>npm install mongodb@4.9.1</li>
    <li>snap install docker</li>
    <li>docker run -p 27017:27017 --name deanbadbank -d mongo</li>
    <li>apt install net-tools</li>
    <li>ifconfig -a</li>
    <li>Modify dal.js file
        <ul>
            <li>From: const url = 'mongodb://localhost:27017’;</li>
            <li>To: const url = 'mongodb://<your VM IP address>:27017’;</li>
        </ul>
    </li>
    <li>Modify index.js file
        <ul>
            <li>From: port 3000</li>
            <li>To: port 3001</li>
        </ul>
    </li>
</ul>

### **Run**:
<ul>
	<li>cd ~/badbank_three_tiers</li>
	<li>node index.js</li>
</ul>

### **Ingest: Bank employee**:
<ul>
	<li>cd ~/badbank_three_tiers</li>
	<li>node mongo_add_user.js</li>
</ul>

### **Usage**:
<ul>
	<li>Home</li>
	<li>Create Account</li>
	<li>Login</li>
    <li>Deposit</li>
    <li>Withdraw</li>
    <li>Balance</li>
    <li>AllData</li>
    <li>Logout</li>
</ul>

### **Support**:
<ul><li>None.</li></ul>

### **Roadmap**:
<ul>
  <li>TBD</li>
</ul>

### **License information**:
<ul>
  <li>MIT: Some provided materials from the lecture videos and from assignment solutions are used in this project</li>
</ul>
var SignupInfo = React.createClass({ //Data Retrieval
		
		render:function(){
			return (
				<div className='signupInfo'>
					{this.props.children}
				</div>
			)
		}
})

var SignupForm = React.createClass({ //Data Posting & Events
	getInitialState:function(){
		return {name:'',email:''}
	},
	getName:function(e){
		this.setState({name:e.target})
	},
	getEmail:function(e){
		this.setState({email:e.target})
	},
	sendUserForm:function(e){
		e.preventDefault();
		var details ={
			name:this.state.name.value,
			email:this.state.email.value
		}
		if(!details.name || !details.email){
			return;
		}
		console.log('nothing empty sending...')
		this.props.submitForm(details)
		this.state.name.value='';
		this.state.email.value='';
	},
	render:function(){
		return (
			
			<form onSubmit={this.sendUserForm}>
				<input type='text' onChange={this.getName} placeholder='your Name' className='required validate black orange-text' />
				<input type='text' onChange={this.getEmail} placeholder='your email' className='required validate black orange-text' />
				<input type='submit' value='Send' className='btn-large white black-text' />
			</form>

		)
	}
})

var SignupBox = React.createClass({
	    getInitialState:function(){
			return {signupStory:''}
		},
		fetchSignUpStory:function(){
			console.log('fetching story')
			$.ajax({
				url:this.props.url,
				success:function(data){
					console.log('success')
					this.setState({signupStory:data.story})
				}.bind(this),
				error:function(err){
					console.log('failure :\t'+err)
					this.setState({signupStory:'Please check your connection'})
				}.bind(this)
			})
		},
		componentDidMount:function(){
			console.log(this.state)
			this.fetchSignUpStory();
			setInterval(this.fetchSignUpStory,this.props.refreshRate)
		},
		serverSubmit:function(details){
			console.log('psoting')
			$.ajax({
				url:this.props.url,
				type:'POST',
				data:details,
				success:function(data){
					alert('Successful Sign up!') //redirect here later
				}.bind(this),
				error:function(err){
					console.log(err)
					this.setState({signupStory:'Please check your connection'})
				}.bind(this)
			})
		},
		render:function(){
			return(
				<div className='userform'>
					<SignupInfo url={this.props.url}>{this.state.signupStory}</SignupInfo>
					<SignupForm submitForm={this.serverSubmit}/>
				</div>
			)
		}
})

ReactDOM.render( <SignupBox url='/signup' refreshRate={2000} />,document.getElementById('new-user'));
var SignupInfo = React.createClass({ //Data Retrieval
		whenLoad:function(){
			return ({signupStory:''})
		},
		fetchSignUpStory:function(){
			$.ajax({
				url:this.props.url,
				type:'GET',
				success:function(data){
					this.setState({signupStory:data.story})
				}.bind(this),
				error:function(err){
					console.log(err)
					this.setState({signupStory:'Please check your connection'})
				}.bind(this)
			})
		},
		render:function(){
			return (
				<div className='signupInfo'>
					{this.state.signupStory}
				</div>
			)
		}
})

var SignupForm = React.createClass({ //Data Posting & Events
	whenLoad:function(){
		this.setState({name:'',email:''})
	},
	getName:function(e){
		this.setState({name:e.target})
	},
	getEmail:function(e){
		this.setState({email:e.target})
	},
	sendForm:function(){
		var details ={
			name:this.state.name.value,
			email:this.state.email.value
		}
		if(!details.name || !details.email){
			return;
		}
		this.props.submitForm(details)
		this.state.name.value='';
		this.state.email.value='';
	},
	render:function(){
		return (
			<form onSubmit={this.sendForm}>
				<input type='text' onChange={this.getName} placeholder='your Name' className='required validate'>
				<input type='text' onChange={this.getEmail} placeholder='your email' className='required validate'>
				<input type='submit' value='Send' className='btn-large white' onSubmit={this.sendForm}>
			</form>

		)
	}
})

var SignupBox = React.createClass({
		serverSubmit:function(details){
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

				<SignupInfo url = {this.props.url}></SignupInfo>
				<SignupForm submitForm ={this.serverSubmit} ></SignupForm>
			)
		}
})

ReactDOM.render(<SignupBox url='/signup' />,document.getElementById('new-user'))
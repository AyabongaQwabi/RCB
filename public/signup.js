var SignupInfo = React.createClass({
		whenLoad:function(){
			return ({signupStory:''})
		},
		fetchSignUpStory:function(){
			$.ajax({
				url:this.props.url,
				type:'GET',
				success:function(data){
					this.setState({signupStory:data.story})
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

var SignupForm = React.createClass({
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
			<form>
				<input type='text' onChange={this.getName} placeholder='your Name' className='required validate'>
				<input type='text' onChange={this.getEmail} placeholder='your email' className='required validate'>
				<input type='submit' value='Send' className='btn-large white' onSubmit={this.sendForm}>
			</form>

		)
	}
})
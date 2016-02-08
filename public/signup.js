var SignupInfo = React.createClass({
		getInitialState:function(){
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
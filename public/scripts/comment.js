var Comment = React.createClass({

	render:function(){

		return (
			<div className='comment col s12 m12'>
			 	<div className='grey row'>
			 	    <span className='col s2 m4'>
			 	    	<img src={this.props.image} className='cirle btn-floating '></img>
						<p  className='commentAuthor chip grey '>
							{this.props.author}
						</p>
					</span>
					<div className='col s8 m8'>
						<p>{this.props.children}</p>
					</div>
				</div>			
			</div>
		);
	}
});

var CommentList = React.createClass({

	render:function(){
		
		var commentNodes = this.props.userComments.map(function(comment){
			return (
				<Comment author={comment.name} key={comment.id} image={comment.img}> {comment.comment} </Comment>
			)
		})
		
		return (
			<div className='commentList'>
				{commentNodes}
				
			</div>
		);
	}
})

var CommentForm = React.createClass({render:function(){
	return (
		<div className='commentForm'>
			Hey I am a CommentForm 
		</div>
	)
}})


var CommentBox = React.createClass({
	getInitialState:function(){
		return {commentsMap:[]}
	},
	componentDidMount:function(){
		$.ajax({
			url:this.props.url,
			dataType:'json',
			cache:false,
			success:function(data){
				console.log('Data fetched from server ')
				console.log(data)
				this.setState({commentsMap:data})
			}.bind(this),
			error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
		});
	},
	render:function(){
		return (
				 <div className='commentBox'>
					<h1 className='flow-text'> Comments </h1>
					<CommentList userComments = {this.state.commentsMap}/>
					<CommentForm />
				 </div>
		);

	}

})

ReactDOM.render( <CommentBox url='/api/comments' /> , document.getElementById('content') )
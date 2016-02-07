var Comment = React.createClass({

	render:function(){

		return (
			<div className='comment col s12 m12'>
			 	<div className='grey  row'>
			 	    <span className='col s2 m4'>
			 	    	<img src={this.props.image} className='cirle btn-floating '></img>
						<p  className='commentAuthor chip grey '>
							{this.props.author}
						</p>
					</span>
					<div className='col s8 m8 grey lighten-1 card-panel hoverable'>
						<p >{this.props.children}</p>
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
			<form className="commentForm"  onSubmit={this.sendComment}>
		        <input type="text" placeholder="Your name" className='center orange black-text flow-text' value={this.author} onChange={this.newAuthor} />
		        <input type="text" placeholder="Say something..." className='center orange black-text' value={this.comment} onChange={this.newComment} />
		        <input type="submit" value="Post" className='btn-large center blue'/>
		    </form>
		</div>
	)
}})


var CommentBox = React.createClass({
	loadComments:function(){
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
	getInitialState:function(){
		return {commentsMap:[],author:'',comment:''}
	},
	newAuthor:function(e){
		this.setState({author:e.target.value})

	},
	newComment:function(e){
		this.setState({comment:e.target.value})
	},
	sendComment: function(e) {
	    e.preventDefault();
	    var author = this.state.author.trim();
	    var text = this.state.text.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.setState({author: '', text: ''});
  },
	componentDidMount:function(){
		this.loadComments();
		setInterval(this.loadComments,this.props.pollInteerval)
	},
	render:function(){
		return (
				 <div className='commentBox'>
					<h1 className='flow-text center'> Comments </h1>
					<CommentList userComments = {this.state.commentsMap}/>
					<CommentForm />
				 </div>
		);

	}

})

ReactDOM.render( <CommentBox url='/api/comments' pollInterval={2000} /> , document.getElementById('content') )
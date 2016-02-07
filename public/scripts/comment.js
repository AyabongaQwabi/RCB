var Comment = React.createClass({

	render:function(){

		return (
			<div className='comment col s12 m12'>
			 	<div className='col s4 m4 waves-effect waves-light'>
					<h5  className='commentAuthor'>
						{this.props.author}
					</h5>
				</div>
				<div className='col s8 m8 blue lighten-4'>
					
					<h6>{this.props.children}</h6>
					
				</div>
			</div>
		);
	}
});

var CommentList = React.createClass({

	render:function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}> {comment.text} </Comment>
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

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
var CommentBox = React.createClass({render:function(){

	return (
			 <div className='commentBox'>
				<h1 className='flow-text'> Comments </h1>
				<CommentList data={this.props.data}/>
				<CommentForm />
			 </div>
	);

}})

ReactDOM.render( <CommentBox data={data}/> , document.getElementById('content') )
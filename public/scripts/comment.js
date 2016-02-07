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
		return (
			<div className='commentList'>
				<Comment author='Ayanai'> Jahman Rastafarai ! </Comment>
				<Comment author='Thandi'> I knew it ...they are together </Comment>
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

var CommentBox = React.createClass({render:function(){

	return (
			 <div className='commentBox'>
				<h1 className='flow-text'> Comments </h1>
				<CommentList />
				<CommentForm />
			 </div>
	);

}})

ReactDOM.render( <CommentBox /> , document.getElementById('content') )
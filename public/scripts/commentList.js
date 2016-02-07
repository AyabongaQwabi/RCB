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
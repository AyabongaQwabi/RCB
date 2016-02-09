var Product = React.createClass({
	render:function(){
		return(
			<tr>
				<td>{this.props.product.name}<td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
})

var Category = React.createClass({	
	render:function(){
		return (
			<tr><td>{this.props.category}</td></tr>
		)
	}
})
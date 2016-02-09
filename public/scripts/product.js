var Product = React.createClass({
	render:function(){
		return(
			<tr>
				<td>{this.props.product.ame}<td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
})
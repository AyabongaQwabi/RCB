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
			<tr><td>{this.props.name}</td></tr>
		)
	}
})

var ProductsTable = React.createClass({
     
	render:function(){
		var ProductsInCategories =[]
		this.props.categories.forEach(function(category){
				ProductsInCategories.push(<Category name={category.name} />)
				category.products.forEach(function(product){
					ProductsInCategories.push(<Product product={product} />)
				})
		})

		<table>
			<thead> 
				<td>Name</td>
				<td>Price</td>
			</thead>
			<tbody> 
				{ProductsInCategories}
			</tobody>
		</table>
	}
})
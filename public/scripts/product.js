var raw_products =[
  {category: "Sporting Goods", price: "R45.39", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "R99.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "R209.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "R1099.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "R3399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "R1199.99", stocked: true, name: "Nexus 7"}
];


var Product = React.createClass({
	render:function(){
		return(
			<tr>
				<td>{this.props.product.name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
})

var Category = React.createClass({	
	render:function(){
		return (
			<tr><td className='chip'>{this.props.category}</td></tr>
		)
	}
})

var ProductsTable = React.createClass({
     
	render:function(){
		var ProductsInCategories =[]
		this.props.categories.forEach(function(category){
				ProductsInCategories.push(<Category category={category.name} />)
				category.products.forEach(function(product){
					ProductsInCategories.push(<Product product={product} />)
				})
		})
		return (
				<table className='table'>
					<thead> 
						<td><b>Name</b></td>
						<td><b>Price</b></td>
					</thead>
					<tbody> 
						{ProductsInCategories}
					</tbody>
				</table>
		)
		
	}
})

var FindProductBox = React.createClass({
	findProduct:function(e){

	},
	render :function(){
		    var categories ={}
			this.props.unsortedProductList.forEach(function(product){
				if(categories[product.category]==undefined)
				{	
					var category=product.category;
					delete product.category;
					categories[category]={products:[product],name:category}
				}
				else{
					categories[product.category].products.push(product)
				}
			})
			var categoryList = [];
			for(var category in categories){
				categoryList.push(categories[category])
			}
			console.log("Category List")
			console.log(categoryList)
			return(
				<div className='filterbox'>
					<input type='text' className='center white' placeholder='type to search' onChange={this.findProduct} />
					<ProductsTable categories ={categoryList} />
				</div>
			)

	}
})

ReactDOM.render(<FindProductBox unsortedProductList={raw_products} />,document.getElementById('content'))
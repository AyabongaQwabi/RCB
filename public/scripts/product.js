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

var FindProductBox = React.createClass({
	findProduct:function(e){

	},
	render :function(){
		    var categories ={}
			raw_products.forEach(function(product){
				if(categories[product.category]==undefined)
				{	
					var category=product.category;
					delete product.category;
					categories[category]={products:[product],name:product.category}
				}
				else{
					categories[product.category].products.push(product)
				}
			})
			var categoryList = [];
			for(category in categories){
				categoryList.push(category)
			}
			return(
				<div className='filterbox'>
					<input type='text' onChange={findProduct} />
					<ProductsTable categories ={_categoryList} />
				</div>
			)

	}
})
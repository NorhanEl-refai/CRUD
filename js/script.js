var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var ProductCategoryInput = document.getElementById("ProductCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var mainBtn = document.getElementById("mainBtn");
var productsContainer;
var isUpdated = false;
var indx = 0

if(localStorage.getItem("myProducts") == null)//First time to open
{
    productsContainer = [];
}
else
{
    productsContainer = JSON.parse( localStorage.getItem("myProducts"));//has opened 
    displayProducts();
}

function addProduct() {

    var product = {

        name: productNameInput.value,
        price: productPriceInput.value,
        category: ProductCategoryInput.value,
        desc: productDescInput.value
    };
    
    if(isUpdated == true){
        changeAfterUpdate(indx)
        clearForm(); 

    }else{
        productsContainer.push(product);//1
        localStorage.setItem("myProducts" ,  JSON.stringify( productsContainer) );
        clearForm(); 
        displayProducts();
        console.log(productsContainer);

    }
    
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    ProductCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProducts() {
    var cartoona = ``;

    isUpdated = false;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
        <td>`+i+`</td>
        <td>`+productsContainer[i].name+`</td>
        <td>`+productsContainer[i].price+`</td>
        <td>`+productsContainer[i].category+`</td>
        <td>`+productsContainer[i].desc+`</td>
        <td> <button onclick="changeFormForUpdate(`+i+`)" class="btn btn-outline-warning">update</button> </td>
        <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">delete</button> </td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
};

function deleteProduct(productIndex)
{
    productsContainer.splice(productIndex,1);
    localStorage.setItem("myProducts" ,  JSON.stringify( productsContainer) );

    displayProducts();
}


function searchProduct(searchTerm)//sam
{
    var cartoona = ``;

    for(var i=0 ; i< productsContainer.length ; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true 
        || productsContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            cartoona += `<tr>
            <td>`+i+`</td>
            <td>`+productsContainer[i].name+`</td>
            <td>`+productsContainer[i].price+`</td>
            <td>`+productsContainer[i].category+`</td>
            <td>`+productsContainer[i].desc+`</td>
            <td> <button class="btn btn-outline-warning">update</button> </td>
            <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">delete</button> </td>
            </tr>`;
        }
        else
        {
            console.log("not availale");
            
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;

}


function changeFormForUpdate(productIndex)
{
    
    productNameInput.value  = productsContainer[productIndex].name;
    productPriceInput.value  = productsContainer[productIndex].price;
    ProductCategoryInput.value  = productsContainer[productIndex].category;
    productDescInput.value  = productsContainer[productIndex].desc;
    indx = productIndex
    mainBtn.innerHTML = "update";

    isUpdated = true;
}

function changeAfterUpdate(productIndex)
{
    productsContainer[productIndex].name = productNameInput.value  ;
    productsContainer[productIndex].price = productPriceInput.value  ;
    productsContainer[productIndex].category =  ProductCategoryInput.value ;
    productsContainer[productIndex].desc = productDescInput.value  ;
 
    var cartoona = ``;

    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
        <td>`+i+`</td>
        <td>`+productsContainer[i].name+`</td>
        <td>`+productsContainer[i].price+`</td>
        <td>`+productsContainer[i].category+`</td>
        <td>`+productsContainer[i].desc+`</td>
        <td> <button onclick="changeFormForUpdate(`+i+`)" class="btn btn-outline-warning">update</button> </td>
        <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">delete</button> </td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
    mainBtn.innerHTML = "add product";
    localStorage.setItem("myProducts" ,  JSON.stringify( productsContainer) );
}


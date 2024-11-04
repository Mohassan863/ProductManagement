 let title = document.getElementById("title");
 let price = document.getElementById("price");
 let taxes = document.getElementById("taxes");
 let ads = document.getElementById("ads");
 let discount = document.getElementById("discount");
 let total = document.getElementById("total");
 let count = document.getElementById("count");
 let category = document.getElementById("category");
 let submit = document.getElementById("submit");
 let search = document.getElementById("search");
 let Table = document.getElementById("tbody");
 
 
 let mood = "create";


 

let tmp;

 
 
 
 
 
 
 
 
 
 //get total
function getTotal() {
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#0aa08e";
    }else{
        total.innerHTML = "";
        total.style.background = "#031796";

    }
}
    
 //create product
 let dataproduct;
 if(localStorage.product != null){
     dataproduct = JSON.parse(localStorage.product);
 } else{
     dataproduct = [];   
 }
submit.onclick = function(){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value != ""){
        if(mood === "create"){
            if (newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    dataproduct.push(newProduct);
                }
                }else{
        
                dataproduct.push(newProduct);
                }
        
            }else{
                dataproduct[tmp] = newProduct;
                mood = "create";
                submit.innerHTML = "Create";
                count.style.display = "block";
               
            }
            clearData()
    }
    
        localStorage.setItem("product",JSON.stringify(dataproduct));
        
        showData()

    
}


 //save localstorage
 //clear inputs
 function clearData(){
     title.value = "";
     price.value = "";
     taxes.value = "";
     ads.value = "";
     discount.value = "";
     total.innerHTML = "";
     count.value = "";
     category.value = "";
 }
 //read
 function showData(){
    getTotal();
    let table = "";
    for(let i = 0; i < dataproduct.length; i++){
        table += `
        <tr>
         <td> ${i} </td>
         <td> ${dataproduct[i].title}  </td>
         <td> ${dataproduct[i].price}</td>
         <td> ${dataproduct[i].taxes} </td> 
         <td> ${dataproduct[i].ads}</td>
         <td>  ${dataproduct[i].discount} </td>
         <td> ${dataproduct[i].total} </td>
         <td> ${dataproduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
         <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`


    }
    Table.innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");

    if(dataproduct.length > 0){
       deleteAll.innerHTML = `
       <button onclick="deleteAllData()"> Delete All (${dataproduct.length})</button>`
    }else{
        deleteAll.innerHTML = "";
    }
     
}
 showData();

 //count




 //delete

function deleteData(i){
    dataproduct.splice(i,1);
    localStorage.product = JSON.stringify(dataproduct);
    showData()
}

function deleteAllData(){
    localStorage.clear();
    dataproduct.splice(0);
    showData()
}

 //update

 function updateData(i){
     title.value = dataproduct[i].title;
     price.value = dataproduct[i].price;
     taxes.value = dataproduct[i].taxes;
     ads.value = dataproduct[i].ads;
getTotal();
     discount.value = dataproduct[i].discount;
     category.value = dataproduct[i].category;
     count.style.display = "none";

     submit.innerHTML = "Update";
     mood = "update";
     tmp = i;
     scroll({top:0,behavior:"smooth"})

 }
 //search
let searchMood = "title";
function getSearchMood(id){
    let search = document.getElementById("search");

if(id == 'searchTitle'){
    searchMood = "title";
    search.placeholder = "Search By Title";
}else{
    searchMood = "category";
    search.placeholder = "Search By Category";

}
search.focus();
search.value = "";
showData()

}

function searchData(value){
let table = "";
    if(searchMood == "title"){


for(let i = 0; i < dataproduct.length; i++){
    if(dataproduct[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
         <td> ${i} </td>
         <td> ${dataproduct[i].title}  </td>
         <td> ${dataproduct[i].price}</td>
         <td> ${dataproduct[i].taxes} </td>
         <td> ${dataproduct[i].ads}</td>
         <td> ${dataproduct[i].discount}</td>
         <td> ${dataproduct[i].total}</td>
         <td> ${dataproduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
         <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>   
        </tr>`;

}
}

}else{

    for(let i = 0; i < dataproduct.length; i++){
        if(dataproduct[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
             <td> ${i} </td>
             <td> ${dataproduct[i].title}  </td>
             <td> ${dataproduct[i].price}</td>
             <td> ${dataproduct[i].taxes} </td>
             <td> ${dataproduct[i].ads}</td>
             <td> ${dataproduct[i].discount}</td>
             <td> ${dataproduct[i].total}</td>
             <td> ${dataproduct[i].category}</td>
             <td><button onclick="updateData(${i})" id="update">Update</button></td>
             <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`
        
}
} 

}
document.getElementById("tbody").innerHTML = table;

    }


 //clean data
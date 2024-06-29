

const queryString = window.location.search; // ?id=123&name=John
const params = new URLSearchParams(queryString);

// Access the value of the 'id' parameter
const id = params.get('productID'); // '123'
console.log(id);

fetch(`/productIDforUpdate?pid=${id}`, {
    method: "POST"
}).then(response => {
    return response.json()
}).then(data => {
    console.log(data);
    var child = document.createElement("div");
    child.className = "con";
    child.innerHTML = `
    <div id="logo" class="Login_segment">
    <div class="circle">
    <img src="data:image/png;base64,${data[0].image}">
    
    </div>
    
    
    
    </div>
    <div id="title" class="Login_segment">
    <p id="temp">PRODUCT INFORMATION</p>

    </div>
<div id="phone_email" class="Login_segment">
<div class="left">
<label>Product Name</label>

</div>
<div class="right">
<input placeholder="${data[0].name}" name="product_name" id="adminId" type="text">

</div>

</div>
<div id="phone_email" class="Login_segment">
<div class="left">
<label>Product ID</label>

</div>
    <div class="right">
        <input readonly value="${data[0].id}" name="product_id" id="adminId" type="text">

        </div>

</div>
<div id="password" class="Login_segment">
    <div class="left">
    <label>Product Type</label>
    
    </div>
    <div class="right">
    <input placeholder="${data[0].product_type}" name="product_type" id="adminPass" type="text">

    </div>
    
    </div>
    <div id="password" class="Login_segment">
    <div class="left">
    <label>Price</label>
    
    </div>
    <div class="right">
        <input placeholder="${data[0].price}" name="price" id="adminPass" type="text">
        
        </div>
        
        </div>
        <div id="password" class="Login_segment">
        <div class="left">
        <label>Category</label>
        
        </div>
        <div class="right">
        <input placeholder="${data[0].category}" name="category" id="adminPass" type="text">
        
        </div>
        
        </div>
<div id="password" class="Login_segment">
    <div class="left">
        <label>Discount</label>
        
        </div>
        <div class="right">
        <input placeholder="${data[0].discount}" name="discount" id="adminPass" type="text">
        
        </div>
        
</div>
<div id="password" class="Login_segment">
<div class="left">
<label>Warranty</label>

    </div>
    <div class="right">
    <input placeholder="${data[0].warranty}" name="warranty" id="adminPass" type="text">

    </div>

    </div>
    <div id="password" class="Login_segment">
    <div class="left">
    <label>Brand</label>
    
    </div>
    <div class="right">
    <input placeholder="${data[0].brand}" name="brand" id="adminPass" type="text">

    </div>
    
    </div>
    <div id="password" class="Login_segment">
    <div class="left">
    <label>Available Quantity</label>
    
    </div>
    <div class="right">
    <input placeholder="${data[0].quantity}" name="quantity" id="adminPass" type="text">
    
    </div>
    
    </div>
    <div id="password" class="Login_segment">
    <div class="left">
        <label>Size</label>
        
    </div>
    <div class="right">
    <input placeholder="${data[0].size}" name="size" id="adminPass" type="text">
    
    </div>
    
    </div>
<div id="password" class="Login_segment">
<div class="left">
<label>Weight</label>

</div>
<div class="right">
<input placeholder="${data[0].weight}" name="weight" id="adminPass" type="text">

</div>

</div>
<div id="password" class="Login_segment">
<div class="left">
<label>Color</label>

</div>
<div class="right">
<input placeholder="${data[0].available_colors}" name="color" id="adminPass" type="text">

</div>

</div>
<div id="password" class="Login_segment">
<div class="left">
        <label>Rating</label>
        
    </div>
    <div class="right">
        <input placeholder="${data[0].rating}" name="rating" id="adminPass" type="text">

        </div>

        </div>
<div id="password" class="Login_segment">
<div class="left">
<label>Cartification</label>

</div>
<div class="right">
<input readonly placeholder="${data[0].certification_file_name}" name="certification" id="adminPass" type="text">

</div>

</div>

<div id="password" class="Login_segment">
<div class="left">
<label>Description</label>

</div>
    <div class="right">
    <input placeholder="${data[0].description}" name="description" id="adminPass" type="text">
    
    </div>
    
    </div>




    
    
    <div id="last" class="last">
    

    <div  id="edit_img2" class="submit">
        <label >Certification</label>
        
        
        
        

        </div>
    <div id="e_img" class="submit">
        <label>Update Image</label>
        
        
        
        

        </div>
    <div id="submit" class="submit">
    <p>UPDATE</p>

        </div>
    <div id="delete" class="submit">

    <p>DELETE</p>

        </div>
        </div>
        <input  name="user_image" id="user_image" type="file">
        
        
        `

        

    document.getElementById("container").appendChild(child);

    document.getElementById("edit_img2").addEventListener("click",function(){
        document.getElementById("Certi").click();
   
   
    })




    document.getElementById("e_img").addEventListener("click",function(){
      
        document.getElementById("pic_list_con").style.visibility= "visible";
    })
    document.getElementById("subm_it").addEventListener("click",function(){
        document.getElementById("pic_list_con").style.visibility="hidden";
    })
   
    document.getElementById("submit").addEventListener("click", function (event) {

        event.preventDefault();

        document.getElementById("form").submit();


        setTimeout(function () {
            window.location.reload();
        }, 500);
    });
    document.getElementById("delete").addEventListener("click", function (event) {
        if (confirm("Confirm to Delete?")) {
            var promise= new Promise((resolve, reject)=>{
                fetch(`/delete_product?productID=${id}`, {
                    method: "POST"
                }).then((response) => {
                    return response.json();
                })
                    .then((data) => {
                        if (data == "Error Occurred")
                            document.getElementById(`temp`).innerText = data;
                        else {
    
    
                            document.getElementById(`temp`).innerText = "Product Deleted";
                            resolve("");
                        }
    
                    })

            })

            promise.then((empty)=>{
                
                
                fetch(`/deleting_effects?pid="${id}"`, {
                    method: "POST"
                })

            })
           
        }
    });


})


fetch(`/fetch_added_all_imageSecondary?pid=${id}`,{
    method:"POST"
})
.then((response)=>{
    return response.json();
})
.then((data)=>{
    console.log(data);
    for(var i=0;i<data.length;i++){
        document.getElementById(`${data[i].img_no}`).src=`data:image/png;base64,${data[i].image}`
    }
})




fetch(`/fetch_added_all_imagePrimary?pid=${id}`,{
    method:"POST"
})
.then((response)=>{
    return response.json();
})
.then((data)=>{
   
        document.getElementById(`1`).src=`data:image/png;base64,${data[0].image}`
   
})
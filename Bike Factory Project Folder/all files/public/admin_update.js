



function edit_Html(data) {
  
  
  
  
  
  table_obj = data;
  var product = document.getElementById("con-3-1");
  
  
  
  
  const childElements = product.getElementsByClassName('item1');
  
  while (0 < childElements.length) {
    product.removeChild(childElements[0]);
  }

  

  for (var i = 0; i < table_obj.length; i++) {
    var template;
    if(table_obj[i].slide_inclusion=="YES"){
      template="Added To Slide";

    }
    else
    template="Add To Slide"
    var item = document.createElement("div");
    item.className = "item1"

    item.innerHTML = `
    <div style="font-family: 'Oswald', sans-serif" class="discount">
${table_obj[i].discount} % off

</div>
<div style="font-family: 'Oswald', sans-serif" class="tkbox">
${table_obj[i].price} TK

</div>
    <div
    class="item1Pic" id="${table_obj[i].id}">
    
    <img class="item1_image" src="data:image/png;base64,${table_obj[i].image}">
    </div>
    <div class="item1PicDetails">
    ${table_obj[i].name}
    </div>
    <div class="tk">
    ${table_obj[i].brand}
    </div>
    <button id="slide${table_obj[i].id}" name="${table_obj[i].id}" class="addToCart">
    <p>${template}</p>
    </button>
    <button id="update${table_obj[i].id}" name="${table_obj[i].id}" class="addToCart">
    <p>Update Info</p>
    </button>
    <button id="delete${table_obj[i].id}" name="${table_obj[i].id}" class="addToCart">
    <p>Delete Product</p>
    </button>
    `
    
    product.appendChild(item);

    if(table_obj[i].slide_inclusion=="YES"){

      document.getElementById(`slide${table_obj[i].id}`).style.backgroundColor="GREEN";
    }
   
    
    
    
    var p = document.getElementById(`${table_obj[i].id}`);
    var q = document.getElementById(`update${table_obj[i].id}`);
    var r = document.getElementById(`delete${table_obj[i].id}`);
    var s = document.getElementById(`slide${table_obj[i].id}`);

    
    p.addEventListener("click", function (e) {
      
      
      window.location.href = `http://localhost:3001/update?productID=${e.currentTarget.id}`;
      
      
    })
    q.addEventListener("click", function (e) {
      
      
      window.location.href = `http://localhost:3001/update?productID=${e.currentTarget.name}`;
      
      
    })
    r.addEventListener("click", function (e) {
      var id= e.currentTarget.id.replace("delete","");
      
      
      if (confirm("Confirm to Delete?")) {
        var promise= new Promise((resolve, reject)=>{
          fetch(`/delete_product?productID=${e.currentTarget.name}`, {
            method: "POST"
          }).then((response) => {
            return response.json();
          })
          .then((data) => {
              if (data == "Error Occurred")
                document.getElementById(`delete${table_obj[i].id}`).innerText = data;
              else {
  
  
                document.getElementById(`delete${data}`).innerText = "Deleted";
                document.getElementById(`delete${data}`).style.backgroundColor="RED";
              }
              resolve("");
            })
           
        })

        promise.then((empty)=>{
          
          fetch(`/deleting_effects?pid="${id}"`, {
            method: "POST"
          })
          
      })
       
          
      }
      
    })
    s.addEventListener("click", function (e) {

     
        if(e.currentTarget.innerText !="Added To Slide"){


        fetch(`/Add_to_slide?productID=${e.currentTarget.name}`, {
          method: "POST"
        }).then((response) => {
          return response.json();
        })
        .then((data) => {
          if(data=="out of bound"){
            alert("maximum 10 items can be added to slide");
          }
  
         
          document.getElementById(`slide${data}`).innerText = "Added To Slide";
          
          document.getElementById(`slide${data}`).style.backgroundColor="GREEN";
        })
        
        
        
      }
    else{
      
      fetch(`/remove_from_slide?productID=${e.currentTarget.name}`, {
        method: "POST"
      }).then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        document.getElementById(`slide${data}`).innerText = "Add To Slide";
        
        document.getElementById(`slide${data}`).style.backgroundColor="AQUA";
        
        })


    }
  
  
  
  
  })




  }




}

fetch('/data')
  .then(response => {
    return response.json();
  })
  .then(data => {

    edit_Html(data);


  })








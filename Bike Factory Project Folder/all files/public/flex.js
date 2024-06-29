

var table_obj;
let promise;


var cart_Array = [];
var cart_piece = [];

function edit_Html(data) {
  //////*********************************** */

  if (localStorage.getItem(`${localStorage.getItem("userID")}_cart`) != "" && localStorage.getItem(`${localStorage.getItem("userID")}_cart`) != null) {

    cart_Array = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart`));


  }
  if (localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`) != "" && localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`) != null) {

    cart_piece = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));
  }

  //////*********************************** */


  table_obj = data;
  var product = document.getElementById("con-3-1");




  const childElements = product.getElementsByClassName('item1');

  while (0 < childElements.length) {
    product.removeChild(childElements[0]);
  }



  for (var i = 0; i < table_obj.length; i++) {

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
       class="item1Pic" id="${table_obj[i].id}" onclick="tracking_product(${i})">
      
      <img class="item1_image"  src="data:image/png;base64,${table_obj[i].image}">
</div>
<div class="item1PicDetails"  style="margin-left:20px; display:flex; align-items:center; font-family: 'Oswald', sans-serif;
;">
 ${table_obj[i].name}
</div>
<div class="tk" style="margin-left:20px; display:flex; align-items:center; font-family: 'Oswald', sans-serif;
;" >
${table_obj[i].brand}
</div>
<button name="${table_obj[i].id}" class="addToCart">
<p>ADD TO CART</p>
</button>
`

    product.appendChild(item);


    //////*********************************** */

    if (cart_Array.includes(`${table_obj[i].id}`)) {
      document.getElementsByName(`${table_obj[i].id}`)[0].innerText = "Remove From Cart";
      document.getElementsByName(`${table_obj[i].id}`)[0].style.backgroundColor = "black";
      document.getElementsByName(`${table_obj[i].id}`)[0].style.color = "white";
    }
    else {
      document.getElementsByName(`${table_obj[i].id}`)[0].innerText = "ADD TO CART";
      document.getElementsByName(`${table_obj[i].id}`)[0].style.backgroundColor = "white";

    }
    //////*********************************** */



   
    var p = document.getElementById(`${table_obj[i].id}`);


    p.addEventListener("click", function (e) {
      
      fetch(`/id?identity=${e.currentTarget.id}`, {
        method: "post"
      })
      window.location.href = `http://localhost:3001/nxt?id=${e.currentTarget.id}`;


    })

    //////*********************************** */

    document.getElementsByName(`${table_obj[i].id}`)[0].addEventListener("click", function (e) {

      
      if (localStorage.getItem("userID") != "" && localStorage.getItem("userID") != null) {

        if (e.currentTarget.innerText == "ADD TO CART") {


          if (localStorage.getItem(`${localStorage.getItem("userID")}_cart`) != null)
            cart_Array = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart`));
          if (localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`) != null)
            cart_piece = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));

          cart_Array.push(e.currentTarget.name);
          cart_piece.push(e.currentTarget.name);
          e.currentTarget.innerText = "Remove From Cart";
          localStorage.setItem(`${localStorage.getItem("userID")}_cart`, JSON.stringify(cart_Array));
          localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`, JSON.stringify(cart_piece));


          e.currentTarget.style.backgroundColor = "black";
          e.currentTarget.style.color = "white";
        }
        else {
          var index_to_remove = cart_Array.indexOf(e.currentTarget.name);
          cart_Array.splice(index_to_remove, 1);
          cart_piece = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));
          cart_piece.splice(index_to_remove, 1);

          localStorage.setItem(`${localStorage.getItem("userID")}_cart`, JSON.stringify(cart_Array));
          localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`, JSON.stringify(cart_piece));


          e.currentTarget.innerText = "ADD TO CART";
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.color = "black";


        }
      }
      else{
        alert("You Are not Logged In!!")
      }
    })
  }
  //////*********************************** */



}

fetch('/data')
  .then(response => {
    return response.json();
  })
  .then(data => {

    edit_Html(data);
    
  })



var type_Selected;
var Brand_Selected;
var sort;

function on_cng1() {
  document.getElementById("Brand_Selected").selectedIndex = 0;
  type_Selected = document.getElementById("type_Selected").value;
  sort = document.getElementById("sort").value;


  fetch(`/type_Sorting?type_Selected=${type_Selected}&sort=${sort}`, {
    method: "POST"
  }).then(response => {
    return response.json();
  }).then(data => {

    edit_Html(data);


  })


}
function on_cng2() {
  sort = document.getElementById("sort").value;
  Brand_Selected = document.getElementById("Brand_Selected").value;;
  document.getElementById("type_Selected").selectedIndex = 0;


  fetch(`/brand_Sorting?&sort=${sort}&Brand_Selected=${Brand_Selected}`, {
    method: "POST"
  }).then(response => {
    return response.json()
  }).then(data => {
    edit_Html(data);

  })




}
function on_cng3() {
  sort = document.getElementById("sort").value;
  Brand_Selected = document.getElementById("Brand_Selected").value;;
  type_Selected = document.getElementById("type_Selected").value;;



  fetch(`/_Sorting?type_Selected=${type_Selected}&Brand_Selected=${Brand_Selected}&sort=${sort}`, {
    method: "POST"
  }).then(response => {
    return response.json()
  }).then(data => {
    edit_Html(data);

  })


}





/*********************login********************* */
if (localStorage.getItem("userID") != ""  && localStorage.getItem("userID") != null) {
  document.getElementById("login").innerText = "Log off";

}

document.getElementById("login").onclick = function () {
  if (document.getElementById("login").innerText == "Log off") {
    localStorage.setItem("userID", "");
    document.getElementById("login").innerText = "Login"



    window.location.href = "http://localhost:3001";
  }
  else{

    fetch(`admin_req?adminId=${localStorage.getItem("adminID")}&adminPass=${localStorage.getItem("adminPass")}`,{
      method:"Post"
    }).then((response)=>{
      return response.json();
    })
    .then((data)=>{
      console.log(data);
      if(data=="wrong phone or password!!"){

          window.location.href = "http://localhost:3001/user_login";
      }
      else if(data.id==`${localStorage.getItem("adminID")}` && data.pass==`${localStorage.getItem("adminPass")}`){ 
          
           window.location.href = "http://localhost:3001/mid_login";
          }
      //  
    })
  }


}




document.getElementById("cart").addEventListener("click", function () {
  fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if(data=="not logged in"){
        alert(data);
        
      }
      else if(data=="BLOCKED"){
        alert("Admin Restricted You From This Action");

      }
      else{

        window.location.href = "http://localhost:3001/cart";
      }

    })


})


/////////**********profile*********** */
document.getElementById("profile").addEventListener("click", function () {
  fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if(data=="not logged in"){
        alert(data);

      }
      else{

        
        window.location.href = "http://localhost:3001/your_profile";
      }

    })
  


})

///****************ask question******** */
document.getElementById("ask").addEventListener("click", function () {
  fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if(data=="not logged in"){
        alert(data);
        
      }
      else if(data=="BLOCKED"){
        alert("Admin Restricted You From This Action");

      }
      else{

        
        window.location.href = "http://localhost:3001/ask_question";
      }

    })

})


///***********************Slider fetch************ */
fetch("/slide_data_fetch", {
  method: "GET"
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
   
    const parent = document.getElementById('slide');


    for (var i = 0; i < data.length; i++) {

      var item = document.createElement("div");
      item.className = "slide"

      item.innerHTML = `
<div class="discount">

</div>
<div class="slidePic" id="${data[i].id}" style="position:relative;display:flex; align-items:center; justify-content:center; height:100%; background-color:white;">
      
      <img  style="cursor:pointer; height:80%; aspect-ratin:1/1" class="item1_image" src="data:image/png;base64,${data[i].image}">

      <div  style="position:absolute; display:block;  bottom:0; height:20%; width:100%; font-weight: 900; /* Heavy font weight */
      font-size: 2em; /* Large font size for impact */
      color: #fff; /* White text color */
      text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8); "  class="">
      
      
      <div style="height:50%; display:flex; align-items:center;   font-family: 'Oswald', sans-serif;">
      <p style="margin-left:30px; margin-top:0px; padding:0px;">${data[i].name}</p>
      </div>
      <div style="height:50%; display:flex; align-items:center;   font-family: 'Oswald', sans-serif;">
      <p style="margin-left:30px; margin-top:0px;  padding:0px;">${data[i].product_type}</p>
      </div>
   

         
      </div>
</div>


`

      parent.appendChild(item);

      var p = document.getElementById(`${data[i].id}`);


    p.addEventListener("click", function (e) {
      console.log("mashiat");
      
      fetch(`/id?identity=${e.currentTarget.id}`, {
        method: "post"
      })
      window.location.href = `http://localhost:3001/nxt?id=${e.currentTarget.id}`;


    })


    }


  })


///////////////*******user view notification******** */
document.getElementById("notify").addEventListener("click", function () {
  fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if(data=="not logged in"){
        alert(data);

      }
      else{

        window.location.href = "http://localhost:3001/user_view_notification";
      }

    })

})


function fetch_notify_num() {
  fetch(`/fetch_notify_num?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((resoponse) => {
      return resoponse.json();
    })
    .then((data) => {

      if (data[0].c != 0) {
        ;
        document.getElementById("notify_num").style.display = "";
        document.getElementById("notify_num").innerText = `${data[0].c}`

      }
      else {
        document.getElementById("notify_num").style.display = "none";

      }

    })

}


repeat();
function repeat() {

  fetch_notify_num();
  setTimeout(() => {
    repeat();

  }, 500);
}





fetch(`all_brands_fetch`, {
  method: "POST"
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (var i = 0; i < data.length; i++) {
    
      var child = document.createElement("option");
      child.value = data[i].brand;
      child.innerHTML = `${data[i].brand}`
      document.getElementById("Brand_Selected").appendChild(child);

    }

  })



fetch(`all_types_fetch`,{
  method:"POST"
})
.then((response)=>{
   return response.json();
})
.then((data)=>{
  for (var i = 0; i < data.length; i++) {
    
    var child = document.createElement("option");
    child.value = data[i].product_type;
    child.innerHTML = `${data[i].product_type}`
    document.getElementById("type_Selected").appendChild(child);


  }
})

function tracking_product(i){

  console.log(table_obj[i].id);

  window.location.href = `http://localhost:3001/nxt?id=${table_obj[i].id}`;



}


 

document.getElementById("Ask_footer").addEventListener("click",function(){
  document.getElementById("ask").click();
  
})
document.getElementById("Notify_footer").addEventListener("click",function(){
  document.getElementById("notify").click();
  
})
document.getElementById("profile_footer").addEventListener("click",function(){
  document.getElementById("profile").click();
  
})
document.getElementById("reg_footer").addEventListener("click",function(){
  window.location.href= `http://localhost:3001/user_login`

})
document.getElementById("shopMap").addEventListener("click",function(){
  window.location.href= `https://www.google.co.uk/maps/place/24%C2%B053'25.5%22N+91%C2%B051'38.2%22E/@24.890428,91.860611,17z/data=!3m1!4b1!4m4!3m3!8m2!3d24.890428!4d91.860611?entry=ttu`

})




const url = new URL(window.location.href);


const url_id = url.searchParams.get('id');


const item = document.getElementById("picdiv");

var cart_Array = [];
var cart_piece = [];
if (localStorage.getItem(`${localStorage.getItem("userID")}_cart`) != "" && localStorage.getItem(`${localStorage.getItem("userID")}_cart`) != null) {

  cart_Array = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart`));


}
if (localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`) != "" && localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`) != null) {

  cart_piece = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));
}

fetch(`/id?identity=${url_id}`, {
  method: "POST"

}).then(response => {
  // console.log(response);
  return response.json();
}).then(data => {


  document.getElementById("relation").innerText = `Explore Related Products: Showing all products` +
    ` of::: type: '${data[0].product_type}' brand: '${data[0].brand}' or color: '${data[0].available_colors}'----> similar to the product:'${data[0].name}'.`;

  item.src = `data:image/png;base64,${data[0].image}`



})
  .catch(error => {

    console.error('Error fetching data:', error);
  });




var idObj;
fetch(`/idObj?url_id=${url_id}`).then(response => {
  // console.log(response);
  return response.json();
}).then(data => {



  idObj = data;

  var product = document.getElementById("con-3-1");


  for (var i = 0; i < idObj.length; i++) {

    var item = document.createElement("div");
    item.className = "item1"

    item.innerHTML = `
<div style="font-family: 'Oswald', sans-serif" class="discount">
${idObj[i].discount} % off

</div>
<div style="font-family: 'Oswald', sans-serif" class="tkbox">
${idObj[i].price} TK

</div>
<div
       class="item1Pic" id="${idObj[i].id}" onclick="tracking_product(${i})">
      
      <img class="item1_image" src="data:image/png;base64,${idObj[i].image}">
</div>
<div class="item1PicDetails"  style="margin-left:20px; display:flex; align-items:center; font-family: 'Oswald', sans-serif;
;">
 ${idObj[i].name}
</div>
<div class="tk" style="margin-left:20px; display:flex; align-items:center; font-family: 'Oswald', sans-serif;
;" >
${idObj[i].brand}
</div>
<button name="${idObj[i].id}" class="addToCart">
<p>ADD TO CART</p>
</button>
`

    product.appendChild(item);
    var p = document.getElementById(`${idObj[i].id}`);


    p.addEventListener("click", function (e) {

      fetch(`/id?identity=${e.currentTarget.id}`, {
        method: "post"
      })
      window.location.href = `http://localhost:3001/nxt?id=${e.currentTarget.id}`;


    })


    if (cart_Array.includes(`${idObj[i].id}`)) {
      document.getElementsByName(`${idObj[i].id}`)[0].innerText = "Remove From Cart";
      document.getElementsByName(`${idObj[i].id}`)[0].style.backgroundColor = "black";
      document.getElementsByName(`${idObj[i].id}`)[0].style.color = "white";
    }
    else {
      document.getElementsByName(`${idObj[i].id}`)[0].innerText = "ADD TO CART";
      document.getElementsByName(`${idObj[i].id}`)[0].style.backgroundColor = "white";
      document.getElementsByName(`${idObj[i].id}`)[0].style.color = "black";

    }

    document.getElementsByName(`${idObj[i].id}`)[0].addEventListener("click", function (e) {

      if (localStorage.getItem("userID") != "") {

        if (localStorage.getItem(`${localStorage.getItem("userID")}_cart`) == null || !localStorage.getItem(`${localStorage.getItem("userID")}_cart`).includes(e.currentTarget.name)) {


          if (localStorage.getItem(`${localStorage.getItem("userID")}_cart`) != null)
            cart_Array = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart`));
          if (localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`) != null)
            cart_piece = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));

          cart_Array.push(e.currentTarget.name);
          cart_piece.push(e.currentTarget.name);
          e.currentTarget.innerText = "Remove From Cart";
          e.currentTarget.style = "font-size: small";
          localStorage.setItem(`${localStorage.getItem("userID")}_cart`, JSON.stringify(cart_Array));
          localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`, JSON.stringify(cart_piece));


          e.currentTarget.style.backgroundColor = "black";
         
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
          e.currentTarget.style = "font-size: small; color: gray;";


        }
      }
      else{
        alert("You Are not Logged In!!")
      }
    })

  }





})
  .catch(error => {

    console.error('Error fetching data:', error);
  });





/*******************************COMMENT SECTION****************************** */
var comment_tracker;
var com_or_reply = 0;

fetch(`/commentFetch?p_id=${url_id}`, {
  method: "POST"
})
  .then((response) => {
    return response.json();


  })
  .then((data) => {
    f(data);


  })


async function f(data) {
  if(data.length==0){
    document.getElementById("title_Comments").innerText="No Previous Comments";
    document.getElementById("title_Comments").style.marginLeft="5px"
  }

  while (document.getElementById("contain").contains(document.getElementsByClassName("combox")[0])) {
    document.getElementById("contain").removeChild(document.getElementsByClassName("combox")[0]);

  }



  
 
  for (var i = 0; i < data.length; i++) {
     
    var cid = data[i].comment_id;
   

  



    var parent = document.getElementById("contain");
    var child = document.createElement("div");
    child.className = "combox";

    child.innerHTML = `
       <div class="combox">
       <div class="pro_pic">
           <img src="data:image/png;base64,${data[i].picture}">
       </div>
       <div class="comment_area">
           <div class="up">
               <div class="commentor">
                   <p>${data[i].name}</p>  
   
               </div>
   
           </div>
           <div style="padding:5px; " class="imgAttached">
              
           <img src="data:image/png;base64,${data[i].attachment}">
   

           </div>
           <div style="padding:5px; border-left:2px solid black" class="middle">
               <p>${data[i].comment_text}</p>
   
           </div>
           <div id="${data[i].comment_id}"class="bottom">
              
               <div  class="time">
                   <p class="reply_button" id="${i}reply_button">reply</p>
               </div>
               <div  class="time">
                   <p class="reply_button" style="margin-left:15px; text-decoration:none; color:black;cursor:auto">${getTimePassed(data[i].comment_time)}</p>
               </div>
   
           </div>
   
       </div>
   
      
   </div>
   
       
       `
    parent.appendChild(child);


    document.getElementById(`${i}reply_button`).addEventListener("click", function (e) {
      document.getElementById("textarea_cont").style.display = "";
      comment_tracker = e.currentTarget.parentElement.parentElement.id;
      console.log(comment_tracker);
      document.getElementById("textarea_cont").style.visibility = "visible";

      e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(document.getElementById("textarea_cont"), e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling);
    })






    /////*************reply**************** */


    await fetch(`/replyFetch?c_id=${cid}`, {
      method: "POST"
    })
      .then((response) => {
        return response.json();

      })
      .then((data) => {
       
        for (var i = 0; i < data.length; i++) {
         
          var parent = document.getElementById("contain");
          var child = document.createElement("div");
          child.className = "combox";
          child.id = "test";

          child.innerHTML = `
        <div class="combox">
        <div class="pro_pic">
            <img src="data:image/png;base64,${data[i].picture}" >
        </div>
        <div class="comment_area">
            <div class="up">
                <div class="commentor">
                    <p>${data[i].name}</p>  
    
                </div>
    
            </div>
            <div class="imgAttached">
            <img id="imgNo${i}" src="data:image/png;base64,${data[i].attachment}">
    
            </div>
            <div class="middle">
                <p>${data[i].reply}</p>                       
    
            </div>
            <div class="bottom">
                <div id="${cid}" class="time">
                    <p class="reply_button" id ="${cid}reply_button${i}">reply</p>
  
                </div>
                <div id="${cid}" class="time">
                    <p class="reply_button" style="margin-left:15px; text-decoration:none; color:black;cursor:auto; ">${getTimePassed(data[i].reply_time)}</p>
  
                </div>
                
                <div id="time" class="time">
                    <p  id ="reply"></p>
                </div>
    
            </div>
    
        </div>
    
    
    </div>
      
        `
          parent.appendChild(child);
         

          document.getElementById(`${cid}reply_button${i}`).addEventListener("click", function (e) {
            document.getElementById("textarea_cont").style.display = "";
            comment_tracker = e.currentTarget.parentElement.id;
            console.log(comment_tracker);
            com_or_reply = 1;

            document.getElementById("textarea_cont").style.visibility = "visible";


            e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.insertBefore(document.getElementById("textarea_cont"), e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling);
          })


        }
      })





  }

}














// })






// document.getElementsByClassName("cont")[0].scrollTop=document.getElementById(comment_tracker).offsetTop;



fetch(`fetch_other_images?pid=${url_id}`, {
  method: "post"
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {

   

    var parent = document.getElementById("pics");

    for (var i = 0; i < data.length; i++) {
      var child= document.createElement("div");
      child.className=`smallpics`
      child.innerHTML = `
      <img style="cursor:pointer" id="image${i}" class="item1_image" src="data:image/png;base64,${data[i].image}">
      
      `
      parent.appendChild(child);
      document.getElementById(`image${i}`).addEventListener("click", function (e) {

        var temp = document.getElementById("picdiv").src;
        document.getElementById("picdiv").src = e.currentTarget.src;
        e.currentTarget.src = temp;

      })

    }









  })










/*********************rating products********* */

function fetch_average_rating() {
  fetch(`/fetch_average_rating?pid=${url_id}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      if (data[0].votes != 0)
        document.getElementById("crnt_rating_fetched").innerText = `Current Product Rating: ${data[0].average_rate}   [Votes: ${data[0].votes}]`

    })

}
fetch_average_rating();













var fetched_rate;

fetch(`/fetch_past_rating?uid=${localStorage.getItem("userID")}&pid=${url_id}&rate=${rate}`, {
  method: "POST"
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {

    if (data != "") {
      fetched_rate = data[0].rate;
      rate = data[0].rate;
      for (var j = 0; j < data[0].rate; j++) {
        document.getElementsByClassName("starbox")[j].firstChild.nextSibling.style.opacity = '1';
      }
      document.getElementById("rating_btn").innerText = "Overwrite";
      document.getElementById("rating_btn").style.color = "grey";
    }
  })



var rate;
var clicked = 0;
for (var i = 0; i < 5; i++) {
  document.getElementsByClassName("starbox")[i].firstChild.nextSibling.addEventListener("click", function (e) {
    rate = get_n(e.currentTarget.parentElement) + 1;

    clicked++;
    for (var j = 0; j <= get_n(e.currentTarget.parentElement); j++) {
      document.getElementsByClassName("starbox")[j].firstChild.nextSibling.style.opacity = '1';
    }
    for (var j = 4; j > get_n(e.currentTarget.parentElement); j--) {
      document.getElementsByClassName("starbox")[j].firstChild.nextSibling.style.opacity = '0.3';
    }

  })
  document.getElementsByClassName("starbox")[i].firstChild.nextSibling.addEventListener("mouseover", function (e) {

    for (var j = 0; j <= get_n(e.currentTarget.parentElement); j++) {
      if (document.getElementsByClassName("starbox")[j].firstChild.nextSibling.style.opacity != '1') {
        document.getElementsByClassName("starbox")[j].firstChild.nextSibling.style.opacity = '0.6';
      }

    }

  })
  document.getElementsByClassName("starbox")[i].firstChild.nextSibling.addEventListener("mouseout", function (e) {

    for (var j = 0; j <= get_n(e.currentTarget.parentElement); j++) {
      if (document.getElementsByClassName("starbox")[j].firstChild.nextSibling.style.opacity != '1') {
        document.getElementsByClassName("starbox")[j].firstChild.nextSibling.style.opacity = '0.3';
      }
    }
  })




}



function get_n(element) {
  var count = 0;
  var child = element;
  while (child = child.previousElementSibling) {
    count++;

  }
  return count;
}


document.getElementById("rating_btn").addEventListener("click", function () {
  
  fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data == "NOT_BLOCKED") {
        
        if (fetched_rate != rate) {
          const formattedDate = new Date();
          
          console.log("hi");
    
          fetch(`/rating_rout?uid=${localStorage.getItem("userID")}&pid=${url_id}&rate=${rate}&time=${formattedDate}`, {
            method: "POST"
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              fetch_average_rating();
    
              fetch(`/fetch_past_rating_all?pid=${url_id}`, {
                method: "POST"
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
    
                  fetch(`insert_rating_to_product_table?rate=${data[0].rate}&pid="${url_id}"`, {
                    method: "POST"
                  })
    
                })
    
    
    
    
            })
        }
      }
      else if(data=="not logged in") {
        
        alert(data);
        
      }
      else{
        alert("Admin Restricted You From This Action");

      }
    })




})


var commenthtml;

document.getElementById("Details").addEventListener("click", function () {
  if(document.getElementById("comment_title").innerText=="Comments")
   commenthtml= document.getElementById("container1").innerHTML;

  
  document.getElementsByClassName("cont")[0].innerHTML = "";
  document.getElementById("comment_title").innerHTML = "<p>Details<p/>";
  
  
  fetch(`/id?identity=${url_id}`, {
    method: "POST"

  }).then(response => {
    // console.log(response);
    return response.json();
  }).then(data => {

    console.log(data);
    document.getElementsByClassName("cont")[0].style.color = "Black";
    
    document.getElementsByClassName("cont")[0].innerHTML = `<p style="display:flex; align-items:center; justify-content:center" id="tempor">${data[0].description}<p/>`;
    document.getElementById("tempor").style.padding = "100px";
  })


})





//*************refreshing with click on comment button******** */

document.getElementById("Comment").addEventListener("click", function () {
  if(document.getElementById("comment_title").innerText!="Comments")
  document.getElementById("container1").innerHTML= commenthtml;
  document.getElementById("comment_title").innerText="Comments"

})


///********certification button ******* */
document.getElementById("Certification").addEventListener("click", function () {
  if(document.getElementById("comment_title").innerText=="Comments"){
    console.log(document.getElementById("comment_title").innerText);
    commenthtml= document.getElementById("container1").innerHTML;

  }

  document.getElementById("comment_title").innerHTML = "<p>Certification<p/>";
  fetch(`/id?identity=${url_id}`, {
    method: "POST"

  }).then(response => {
    return response.json();
  })
    .then(data => {
      console.log(data[0].certification);
      document.getElementsByClassName("cont")[0].innerHTML = "";
      document.getElementsByClassName("cont")[0].style = "overflow: hidden";
      
      if (data[0].certification != null) {
        document.getElementsByClassName("cont")[0].innerHTML = `
      
    <object 
    data="data:application/pdf;base64,${data[0].certification}" 
    
    width="100%" 
    height="100%">
   
</object>
    `;

      }
      else {
        document.getElementsByClassName("cont")[0].innerHTML = `<p style="display:flex; align-items:center; justify-content:center" id="tempor">No Certification to show<p/>`;
        document.getElementById("tempor").style.padding = "100px";
      }

    })



})


//////////////////////*******comments_notification******* */


function comments_notification(comment_tracker, writing, formattedDate) {

  fetch(`/comments_notification?cid=${comment_tracker}&commenter_id=${localStorage.getItem("userID")}&reply="${writing}"&time="${formattedDate}"&tracker=${url_id}`, {
    method: "POST"
  })


}




function getTimePassed(time) {
  var Time = time;
  var now = new Date();

  var date = Math.abs((new Date(Time).getTime() / 1000).toFixed(0));
  var currentDate = Math.abs((new Date().getTime() / 1000).toFixed(0));
  var diff = currentDate - date;
  var year = Math.floor((diff / 31536000));
  var month = Math.floor((diff / 2592000) % 12);
  var day = Math.floor((diff / 86400) % 30);
  var hours = Math.floor(diff / 3600) % 24;
  var minutes = Math.floor(diff / 60) % 60;
  var seconds = Math.floor(diff % 60);

  if (year == 0 && month == 0 && day == 0 && hours == 0 && minutes == 0) {
    return ` ${seconds} seconds ago`
  }
  else if (year == 0 && month == 0 && day == 0 && hours == 0) {
    return `${minutes} minutes and ${seconds} seconds ago`
  }
  else if (year == 0 && month == 0 && day == 0 && minutes == 0) {
    return `${hours} hours ago`
  }
  else if (year == 0 && month == 0 && day == 0) {
    return `${hours} hours and ${minutes} minutes ago`
  }
  else if (year == 0 && month == 0) {
    return ` ${day} days ago`
  }
  else if (year == 0) {
    return `${month} months and ${day} days ago`
  }
  else if (year != 0) {
    return `${year} years ${month} and months ${day} days ago`
  }

}

var formObject;
document.getElementById("textarea_cont_comment").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const form = event.target;
  const formData = new FormData(form);
   formObject = {};

  formData.forEach((value, key) => {

      if(typeof(value)=="object")
      formObject[key] = value.name;
  else
  formObject[key] = value;

  });

  console.log(formObject);

  fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      console.log(data);
      if (data == "NOT_BLOCKED") {

        if (document.getElementById("Writing1").value != "" || formObject.commentPicfile!="") {
          
        
          const formattedDate = new Date();
    
    
          document.getElementById("Writing1").value = "";
    
          fetch(`/insert_to_comment_table?userID=${localStorage.getItem("userID")}&writing=${formObject.comment_text}&time="${formattedDate}"&pid=${url_id}&commentImage=${formObject.commentPicfile}`, {
            method: "POST"
          })
    
    
            .then((response) => {
    
    
              return response.json();
            })
    
            .then(() => {
    
              fetch(`/commentFetch?p_id=${url_id}`, {
                method: "POST"
              })
                .then((response) => {
                  return response.json();
    
    
                })
                .then((data) => {
    
                  f(data);
                  document.getElementById("textarea_cont_comment").reset();
                  document.getElementById("title_Comments").innerText="Previous Comments";
                  document.getElementById("title_Comments").style.marginLeft="5px"
    
    
                })
    
            })
    
    
    
        }
      }
      else if(data=="not logged in") {
        
        alert(data);
        
      }
      else{
        alert("Admin Restricted You From This Action");

      }
   
    })


});












































document.getElementById("textarea_cont").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const form = event.target;
  const formData = new FormData(form);
  const formObject2 = {};

  formData.forEach((value, key) => {

      if(typeof(value)=="object")
      formObject2[key] = value.name;
  else
  formObject2[key] = value;

  });

  console.log(formObject2);
    fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
    method: "POST"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {


      console.log(data);
      if (data == "NOT_BLOCKED") {

        document.getElementById("textarea_cont").style.display = "none";

        if (document.getElementById("Writing2").value != "" || formObject.commentPicfile!="") {
          
          const formattedDate = new Date();


          



          document.getElementById("Writing2").value = "";


          fetch(`/insert_to_reply_table?cid=${comment_tracker}&userID=${localStorage.getItem("userID")}&writing=${formObject2.reply_text}&time=${formattedDate}&pid=${url_id}&replytImage=${formObject2.commentPicfile}`, {
            method: "POST"
          })


            .then((response) => {


              return response.json();
            })

            .then(() => {

              comments_notification(comment_tracker, formObject2.reply_text, formattedDate);

              fetch(`/commentFetch?p_id=${url_id}`, {
                method: "POST"
              })
                .then((response) => {
                  return response.json();


                })
                .then((data) => {

                  f(data);
                  document.getElementById("textarea_cont").reset();
               

                })

            })



        }
      }
      else if(data=="not logged in"){
        alert("not logged in");
        
        
      }
      else {
        alert("Admin Restricted You From This Action");

      }


})
});




 function clickcommentPic(){
  document.getElementById("commentPicfile").click();
 }
 function clickreplyPic(){
  document.getElementById("replyPicfile").click();
 }


 document.getElementById("Ask_footer").addEventListener("click",function(){
  askFooter();
  
})
document.getElementById("Notify_footer").addEventListener("click",function(){
  notifyFooter();
  
})
document.getElementById("profile_footer").addEventListener("click",function(){
  profileFooter();
  
})
document.getElementById("reg_footer").addEventListener("click",function(){
  window.location.href= `http://localhost:3001/user_login`

})
document.getElementById("shopMap").addEventListener("click",function(){
  window.location.href= `https://www.google.co.uk/maps/place/24%C2%B053'25.5%22N+91%C2%B051'38.2%22E/@24.890428,91.860611,17z/data=!3m1!4b1!4m4!3m3!8m2!3d24.890428!4d91.860611?entry=ttu`

})



function askFooter(){
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
}
function notifyFooter(){
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
}
function profileFooter(){
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
}


  
  // console.log(localStorage.getItem(`${localStorage.getItem("userID")}_cart`).includes(url_id));


if(localStorage.getItem(`${localStorage.getItem("userID")}_cart`).includes(url_id)){
  console.log("1");
  document.getElementById("mainAdd_to_cart").innerText = "Remove From Cart";
  
  document.getElementById("mainAdd_to_cart").style.backgroundColor = "black";
  document.getElementById("mainAdd_to_cart").style.color = "white";
}
else {
  console.log("2");
  document.getElementById("mainAdd_to_cart").innerText = "ADD TO CART";
  document.getElementById("mainAdd_to_cart").style.backgroundColor = "white";
  document.getElementById("mainAdd_to_cart").style.color = "black";

}


function Main_add_to_cart(){
  

  
    if (localStorage.getItem("userID") != "" &&  localStorage.getItem("userID")!=null) {

      if (localStorage.getItem(`${localStorage.getItem("userID")}_cart`) == null || !localStorage.getItem(`${localStorage.getItem("userID")}_cart`).includes(url_id)) {

        console.log("in");
        if (localStorage.getItem(`${localStorage.getItem("userID")}_cart`) != null)
          cart_Array = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart`));
        if (localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`) != null)
          cart_piece = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));
        
        cart_Array.push(url_id);
        cart_piece.push(url_id);
        document.getElementById("mainAdd_to_cart").innerText = "Remove From Cart";
        localStorage.setItem(`${localStorage.getItem("userID")}_cart`, JSON.stringify(cart_Array));
        localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`, JSON.stringify(cart_piece));

        
        document.getElementById("mainAdd_to_cart").style.backgroundColor = "black";
        document.getElementById("mainAdd_to_cart").style.color = "white";
      }
      else {
        console.log("out");
        var index_to_remove = cart_Array.indexOf(url_id);
        cart_Array.splice(index_to_remove, 1);
        cart_piece = JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));
        cart_piece.splice(index_to_remove, 1);
        
        localStorage.setItem(`${localStorage.getItem("userID")}_cart`, JSON.stringify(cart_Array));
        localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`, JSON.stringify(cart_piece));
        

        document.getElementById("mainAdd_to_cart").innerText = "ADD TO CART";
        document.getElementById("mainAdd_to_cart").style.backgroundColor = "white";
        document.getElementById("mainAdd_to_cart").style.color = "black";


      }
    }
    else{
      alert("You Are not Logged In!!")
    }
  }



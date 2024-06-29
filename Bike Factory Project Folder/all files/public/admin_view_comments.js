


fetch(`/fetchAllcommentsAndReplies`,{
    method:"POST"
  })
  .then((response)=>{
    return response.json();
    

  })
  .then((data)=>{
    f(data);
    
   console.log(data);
  })

 async function f(data){

    var color;

  for(var i=0;i<data.length;i++){

    color="";
    if(data[i].admin_view!= "Viewed"){
        color =`style="background-color:aqua; color:black"`
    }


    if(data[i].block_status=="BLOCKED")
         template= "UNBLOCK";
    else
    template= "BLOCK";
   
var child= document.createElement("div");
child.className="elements";

child.innerHTML=`
<div class="elements">
<div ${color} class="inside">

<p title="${data[i].commenter_name}">${data[i].commenter_name}</p>
</div>
<div ${color} id="img" class="inside">
<img id="image" src="data:image/png;base64,${data[i].commenter_image}">

</div>
<div ${color} title="${data[i].commenter_id}" id="email" class="inside">
<p>
${data[i].commenter_id}
</p>



</div>
<div ${color} class="inside">

<p title="${data[i].comment_time}">${getTimePassed(data[i].comment_time)}</p>




</div>
<div ${color} id="blk" class="inside">
        <p name="blk"  class="${i}${data[i].commenter_id}"  id="${data[i].commenter_id}">${template}</p>
        

    
    </div>
<div ${color} title="${data[i].comment_text}" id="question" class="inside">
<p id="elipsis">
${data[i].comment_text}

</p>






</div>
<div ${color} id="blk" class="inside">
<p name="blk" class="${i}${data[i].product_id}"   id="${data[i].product_id}">view</p>



</div>



</div>

`

document.getElementById("con").appendChild(child);
  


var p = document.getElementsByClassName(`${i}${data[i].product_id}`);
  
     
    p[0].addEventListener("click",function(e){
      console.log(e.currentTarget.id);
      
      fetch(`/id?identity=${e.currentTarget.id}`,{
        method:"post"
      })
        window.location.href=`http://localhost:3001/nxt?id=${e.currentTarget.id}`;
      
      
    })




document.getElementsByClassName(`${i}${data[i].commenter_id}`)[0].addEventListener("click",function(e){
  console.log(document.getElementById(`${e.currentTarget.id}`)); 

  if(document.getElementById(`${e.currentTarget.id}`).innerText=="BLOCK"){
      
      fetch(`/block_user?user_id=${e.currentTarget.id}`,{
          method:"POST"
          
      
      })
      

          window.location.href=`http://localhost:3001/admin_view_comments`
   
  }
  else{

      fetch(`/unblock_user?user_id=${e.currentTarget.id}`,{
          method:"POST"
          

        
          
          
          
          
          
          
          
      })
     

          window.location.href=`http://localhost:3001/admin_view_comments`
     

      
  }
 

 })
}

fetch(`/resetTo_admin_viewed_all?table=comments`, {
  method: "POST"
  })
fetch(`/resetTo_admin_viewed_all?table=replies`, {
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
  var day = Math.floor((diff / 86400)%30);
  var hours = Math.floor(diff / 3600) % 24;
  var minutes = Math.floor(diff / 60) % 60;
  var seconds = Math.floor(diff % 60);

  if(year==0 && month==0 && day==0 && hours==0 && minutes==0 ){
      return ` ${seconds} seconds ago`
  }
  else if(year==0 && month==0 && day==0 && hours==0 ){
      return `${minutes} minutes and ${seconds} seconds ago`
  }
  else if(year==0 && month==0 && day==0 && minutes==0){
      return `${hours} hours ago`
  }
  else if(year==0 && month==0 && day==0 ){
      return `${hours} hours and ${minutes} minutes ago`
  }
  else if(year==0 && month==0  ){
      return ` ${day} days ago`
  }
  else if(year==0 ){
      return `${month} months and ${day} days ago`
  }
  else if(year!=0 ){
      return `${year} years ${month} and months ${day} days ago`
  }

}


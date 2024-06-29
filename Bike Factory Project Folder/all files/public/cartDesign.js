var cart_ids=[];
var currentOffset;
refresh();



var total_tk;
 async function refresh(currentOffset){
    
    total_tk=0
    
  if(localStorage.getItem(`${localStorage.getItem("userID")}_cart`)!="" && localStorage.getItem(`${localStorage.getItem("userID")}_cart`)!=null){

  cart_ids=JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart`));
 
  // cart_piece= JSON.parse(localStorage.getItem("cart_no_pieces"));
}
if(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`)!="" && localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`)!=null){

  cart_piece= JSON.parse(localStorage.getItem(`${localStorage.getItem("userID")}_cart_no_pieces`));
}
while (document.getElementById("con").firstChild) {
    document.getElementById("con").removeChild(document.getElementById("con").firstChild); 
}





for(var i=0;i<cart_ids.length;i++){
  await  fetch(`/info_cart?cart_id=${cart_ids[i]}`,{
        method: "POST"
    })
    .then(response=>{
        return response.json();
    }).then((data)=>{
        
        if(data.length !==0){
        if(cart_piece[cart_ids.indexOf(data[0].id.toString())]==data[0].id.toString()){
            cart_piece[cart_ids.indexOf(data[0].id.toString())]=1;
        }
        var money= data[0].price * cart_piece[cart_ids.indexOf(data[0].id.toString())];
        
        
        
        
        
        
        
        total_tk= total_tk+money;
        console.log(total_tk);
document.getElementById("total_tk").innerText=`Total Payable: ${total_tk} TK`;
   


    var child= document.createElement("div");
    child.className="elements";
    
    child.innerHTML=`
    <div class="elements">
    <div class="inside">
        <p id="title">${data[0].name}</p>
    </div>
    <div id="img" class="inside">
    <img id="image" src="data:image/png;base64,${data[0].image}">
       
    </div>
    <div class="inside">
        
        <p>${data[0].product_type} of type ${data[0].brand}</p>
     

    </div>
    <div name="inc_dc" class="inside">
    <div id="minus${i}" onclick="dc(${data[0].id})" class="inc_dc">
    -
    </div>
    <div id="middle${i}" name="count" " class="inc_dc">
    <p >${cart_piece[cart_ids.indexOf(data[0].id.toString())]}</p>
    </div>
    <div id="plus${i}"  onclick="inc(${data[0].id},)"  class="inc_dc">
    +
    
    </div>
    

        
    </div>
    <div id="tk" class="inside">
        <p>${money.toFixed(2)} TK</p>

        

    </div>

</div>
    
    `
    document.getElementById("con").appendChild(child);

}
else{
    console.log("cart ids"+cart_ids);
    console.log("cart piece"+cart_piece);
    cart_ids.splice(cart_ids.indexOf(cart_ids[i]),1);
    cart_piece.splice(cart_ids.indexOf(cart_ids[i]),1);
    localStorage.setItem(`${localStorage.getItem("userID")}_cart`,JSON.stringify(cart_ids));
    localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`,JSON.stringify(cart_piece));
    i--;
    
    
    // // cart_ids.splice(i,1);
    // console.log(cart_ids[i]);
}

})}

    
    document.getElementById("con").scrollTop=currentOffset;
    


}


    

    function inc(id,i){

       
        
        if(cart_piece[cart_ids.indexOf(id.toString())]==id){
            
            cart_piece[cart_ids.indexOf(id.toString())]= 2;
           
        }
        else{
            
            console.log("--->"+cart_piece[cart_ids.indexOf(id.toString())]);
            
            cart_piece[cart_ids.indexOf(id.toString())]= cart_piece[cart_ids.indexOf(id.toString())]+1;
            console.log(cart_piece[cart_ids.indexOf(id.toString())]);
        }
        
        localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`,JSON.stringify(cart_piece));
     
        currentOffset= document.getElementById("con").scrollTop;
      
        refresh(currentOffset);
    }
    
    
    function dc(id,i){
        if(cart_piece[cart_ids.indexOf(id.toString())]==1 || cart_piece[cart_ids.indexOf(id.toString())]==id){
            
            
        }
        else{
            
          
            cart_piece[cart_ids.indexOf(id.toString())]= cart_piece[cart_ids.indexOf(id.toString())]-1;
        }
        
        localStorage.setItem(`${localStorage.getItem("userID")}_cart_no_pieces`,JSON.stringify(cart_piece));
        
        currentOffset= document.getElementById("con").scrollTop;
        refresh(currentOffset);
        
    }
    


    document.getElementById("payment").addEventListener("click",function(){
        console.log(total_tk);
        const formattedDate = new Date();

        fetch(`pushPaymentReq?item_count=${cart_piece}&cart_ids=${cart_ids}&money=${total_tk}&client=${localStorage.getItem("userID")}&time=${formattedDate}`,{

            method:"POST"
        })
    })
    





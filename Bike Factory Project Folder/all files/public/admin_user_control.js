

   


    fetch_all();
    async function fetch_all(){
        await fetch(`/bring_registered_users`,{
            method:"POST"
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
    
            
            
            var color;
            var template;
           
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
            
            <p>${data[i].name}</p>
        </div>
        <div id="img" class="inside">
        <img id="image" src="data:image/png;base64,${data[i].picture}">
           
        </div>
        <div ${color} id="email" class="inside">
            
        ${data[i].creation_time}
            
            
            </div>
            <div ${color}  class="inside">
            ${data[i].address}<br>
            ${data[i].city}<br>
            ${data[i].postal_code}
            
            <p></p>
        
    
    
            
        </div>
        <div ${color} id="phn" class="inside">
        ${data[i].phone},<br>
        ${data[i].additional_phone}
    
            
    
        </div>
        <div ${color} id="blk" class="inside">
            <p name="blk"  id="${data[i].phone}">${template}</p>
    
            
    
        </div>
        <div ${color} id="pass"  class="inside">
        password<br>
        ${data[i].password}
    
            
    
        </div>
      
       
    
    </div>
        
        `
        
        document.getElementById("con").appendChild(child);
    
        
    
        document.getElementById(`${data[i].phone}`).addEventListener("click",function(e){
            // console.log(document.getElementById(`${e.currentTarget.id}`));
            if(document.getElementById(`${e.currentTarget.id}`).innerText=="BLOCK"){
                
                fetch(`/block_user?user_id=${e.currentTarget.id}`,{
                    method:"POST"
                    
                
                })
                
    
                    window.location.href=`http://localhost:3001/user_list`
             
            }
            else{
          
                fetch(`/unblock_user?user_id=${e.currentTarget.id}`,{
                    method:"POST"
                    
                    
                    
                    
                    
                    
                    
                    
                })
               
    
                    window.location.href=`http://localhost:3001/user_list`
               
    
                
            }
           
        
           })
        }})
        fetch(`/resetTo_admin_viewed_all?table=registered_user_info`, {
            method: "POST"
            })

    }
  

    
   

   



    
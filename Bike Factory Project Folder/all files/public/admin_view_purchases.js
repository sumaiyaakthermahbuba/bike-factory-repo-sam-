
   


    var click=[];
    allfetching();

    async function allfetching(){
      await  fetch(`/fetch_purchase_req`,{
            method:"POST"
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            
            var color;
            
            for(var i=0;i<data.length;i++){
                color="";
                if(data[i].admin_view!= "Viewed"){
                    color =`style="background-color:aqua; color:black; "`
                }
                
              
              
               
            var child= document.createElement("div");
        child.className="elements";
        
        child.innerHTML=`
        <div class="elements">
        <div ${color} class="inside">
            
            <p title="${data[i].phone}">${data[i].phone}</p>
        </div>
        <div ${color} id="img" class="inside">
        <img id="image" src="data:image/png;base64,${data[i].picture}">
           
        </div>
        <div ${color} title="${data[i].client_name}" id="email" class="inside">
            <p>
        ${data[i].client_name}
        </p>
        
            
            </div>
            <div ${color}  class="inside">
            
            <p title="${data[i].product_list}">${data[i].product_list}</p>
        
    
    
            
        </div>
       
        <div ${color} title="${data[i].purchase_date_time}" id="question" class="inside">
        <p id="elipsis">
        ${getTimePassed(data[i].purchase_date_time)}
    
        </p>
    
        
        
    
            
    
        </div>
        <div ${color} id="blk" class="inside">
            <p id="elipsis"   id="${data[i].transaction_amount}">${data[i].transaction_amount}TK</p>
            
    
    
        </div>
        <div ${color} id="blk" class="inside">
            <p id="elipsis">${data[i].transaction_id}</p>
            
    
        
        </div>
        <div ${color} id="view${data[i].transaction_id}"   class="inside">
            <p name="blk"  id="elipsis">view</p>
            
    
        
        </div>
        <div ${color} class="inside ">
            <p name="blk"   id="${i}">${data[i].status}</p>
            
    
        
        </div>
        <div ${color} id="blk" class="inside">
            <p name="blk"   id="push_notify${i}">Push</p>
            
    
        
        </div>
       
    
        
      
       
    
    </div>
        
        `
        click[i]=-1;
        document.getElementById("con").appendChild(child);
    
    
    
        document.getElementById(`view${data[i].transaction_id}`).addEventListener("click",function(e){
            var track= e.currentTarget.id.replace("view","");
            console.log(track);
            window.location.href=`http://localhost:3001/openSlip?purID=${track}`

        })



        document.getElementById(`push_notify${i}`).addEventListener("click",function(e){
            const formattedDate = new Date();
           
    
            var eid=e.currentTarget.id.replace("push_notify","")
           
            if(Status[click[eid]]!= undefined){
                fetch(`/push_notification_to_purchase_table?subject=${data[eid].transaction_id}&message="${Status[click[eid]]}"`,{
                    method:"post"
                })
    
    
    
                fetch(`/push_notification_to_users?to="${data[eid].phone}"&subject=${data[eid].transaction_id}&time="${formattedDate}"&message="${Status[click[eid]]}"&title=notified on Purchase Request id:&tracker=${data[eid].transaction_id}`,{
                    method:"POST"
                })
                .then((response)=>{
                    return response.json();
    
                    
                })
                .then((data)=>{
                    
                    if(data=="sent"){
                        document.getElementById(`${"push_notify"+eid}`).innerText="sent";
                        setTimeout(() => {
                            document.getElementById(`${"push_notify"+eid}`).innerText="push again";
                            
                        }, timeout);
                    }
                })
                
    
    
                
    
            }
           
        })
    
    
    
    
    
    
        
        document.getElementById(`${i}`).addEventListener("click",function(e){
            
            console.log(e.currentTarget.id);
            click[e.currentTarget.id]++;
            
            
            if(click[e.currentTarget.id]>=Status.length)
                {
                    click[e.currentTarget.id]=0;
                }
            document.getElementById(`${e.currentTarget.id}`).innerText=Status[click[e.currentTarget.id]]
       
        })
    
    
        }})

        
fetch(`/resetTo_admin_viewed_all?table=purchase_requests`, {
    method: "POST"
    })

    }
   

   
   
   var Status= ["payment revieved","ready for delivery","dispatched for delivery","delivery completed","delivery failed","on hold"]
  

   

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



    
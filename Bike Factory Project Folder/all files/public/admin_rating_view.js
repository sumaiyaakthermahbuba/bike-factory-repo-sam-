

     
   

    
    fethc_all();
    async function fethc_all(){
       await fetch(`/bring_rating_info`,{
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
                    color =`style="background-color:aqua; color:black"`
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
        <div ${color} title="${data[i].name}" id="email" class="inside">
            <p>
        ${data[i].name}
        </p>
        
            
            </div>
            <div ${color}  class="inside">
            
            <p title="${data[i].p_name}">${data[i].p_name}</p>
        
    
    
            
        </div>
    
        <div ${color} id="blk" class="inside">
            <p id="elipsis"   id="${data[i].product_type}">${data[i].product_type}</p>
            
    
    
        </div>
    
    
       
        <div ${color} title="${data[i].time}" id="question" class="inside">
        <p id="elipsis">
        ${getTimePassed(data[i].time)}
    
        </p>
    
        
        
        
    
            
    
        </div>
        
        <div ${color} id="blk" class="inside">
            <p id="elipsis">${data[i].rate}</p>
            
    
        
        </div>
        <div ${color} id="blk"  class="inside">
            <p id="${i}product" style="font-weight: bold; cursor:pointer; color:blue">View</p>
            
        
        </div>
        
        
       
    
        
      
       
    
    </div>
        
        `
        
        document.getElementById("con").appendChild(child);
    
                document.getElementById(`${i}product`).addEventListener("click",function(e){
                    var item= e.currentTarget.id.replace("product","");
                    
                    window.location.href=`http://localhost:3001/nxt?id=${data[item].product_id}`
                })
    
    
    
        }})


        fetch(`/resetTo_admin_viewed_all?table=rating`, {
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
    
    
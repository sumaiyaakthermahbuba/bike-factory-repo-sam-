
    



    fetch_all();
    async function fetch_all(){
       await  fetch(`/bring_questions`,{
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
            
            <p title="${data[i].user_name}">${data[i].name}</p>
        </div>
        <div ${color} id="img" class="inside">
        <img id="image" src="data:image/png;base64,${data[i].user_image}">
           
        </div>
        <div ${color} title="${data[i].subject}" id="email" class="inside">
            <p>
        ${data[i].subject}
        </p>
        
            
            </div>
            <div ${color} class="inside">
            
            <p title="${data[i].user_phone}">${data[i].user_phone}</p>
        
    
    
            
        </div>
        <div ${color} id="phn" class="inside">
        <p title="${data[i].q_time}" >${getTimePassed(data[i].q_time)}<br></p>
        
        
        
    
            
    
        </div>
        <div ${color} title="${data[i].question}" id="question" class="inside">
        <p id="elipsis">
        ${data[i].question}
    
        </p>
    
        
        
    
            
    
        </div>
        <div ${color} id="blk" class="inside">
            <p name="blk"   id="${data[i].q_id}">ANSWER</p>
            
    
        
        </div>
      
       
    
    </div>
        
        `
        
        document.getElementById("con").appendChild(child);
    
        
    
        document.getElementById(`${data[i].q_id}`).addEventListener("click",function(e){
            console.log(document.getElementById(`${e.currentTarget.id}`));
            if(document.getElementById(`${e.currentTarget.id}`).innerText=="ANSWER"){
              console.log(e.currentTarget.id);
               
                
                window.location.href=`http://localhost:3001/admin_answer?qid=${e.currentTarget.id}`
                
                    
             
            }
           
           
        
           })
        }})


        fetch(`/resetTo_admin_viewed_all?table=questions`, {
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
    
    
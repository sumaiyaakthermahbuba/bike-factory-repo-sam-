var Stopper=false;
document.getElementById("form").addEventListener("submit",function(e){
    e.preventDefault();
    
    
    fetch(`checkIf_blocked?uid=${localStorage.getItem("userID")}`, {
        method: "POST"
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data=="NOT_BLOCKED") {
                 
            var question= document.getElementById("question").value;
            var subject= document.getElementById("subject").value;
              const formattedDate = new Date();

                
                fetch(`/Question_rout?userID=${localStorage.getItem("userID")}&question=${question}&time=${formattedDate}&subject=${subject}`,{
                  method:"POST"
                })
                .then((response)=>{
                    return response.json();
                })
                .then(data=>{
                    document.getElementById("temp").innerText= data;
                    setTimeout(function(){
                        document.getElementById("temp").innerText= "Ask Question";
            
        
                    },3000);
                })
               

                
            }
            else{
              
                alert(data);
            

            }
          

        })

  })

 
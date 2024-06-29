var stack=[];





    

        document.getElementById("ed_img").addEventListener("click",function(){
            document.getElementById("Main").click();
       
       
        })
        document.getElementById("certification_load").addEventListener("click",function(){
            document.getElementById("Certi").click();
       
       
        })
        document.getElementById("form").addEventListener("submit", function(event) {
            event.preventDefault(); 

            const form = event.target;
            const formData = new FormData(form);
            const formObject = {};
        
            formData.forEach((value, key) => {

                if(typeof(value)=="object")
                formObject[key] = value.name;
            else
            formObject[key] = value;

            });

            console.log(formObject);
            fetch('/push_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
            .then((response)=>{
                console.log("oo"+response);
                return response.json();
            })
            .then((data)=>{
                console.log("-->"+data);
                if(data==""){
                    document.getElementById("temp__").innerText=`Product Added Successfully!!!`
                    setTimeout(() => {
                        document.getElementById("temp__").innerText=`ENTER PRODUCT INFORMATION`
                        
                    }, 2000);
                }
                else if(data=="error"){
                    console.log("mashiat");
                    document.getElementById("temp__").innerText=`Something Went Wrong!!!`
                    setTimeout(() => {
                        document.getElementById("temp__").innerText=`ENTER PRODUCT INFORMATION`
                        
                    }, 2000);

                }
            })
         
        
        });

  
    document.getElementById("e_img").addEventListener("click",function(){
      
        document.getElementById("pic_list_con").style.visibility= "visible";
    })
    document.getElementById("subm_it").addEventListener("click",function(){
        document.getElementById("pic_list_con").style.visibility="hidden";
    })
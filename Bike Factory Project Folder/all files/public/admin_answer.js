const urlParams = new URLSearchParams(window.location.search);
var Data;

const qid = urlParams.get('qid');
fetch(`/fetch_question&subject?qid=${qid}`,{
    method:"post"
})
.then((response)=>{
    return response.json();
})
.then((data)=>{
    
    Data=data;
    document.getElementById("subject").value= data[0].subject;
    document.getElementById("question").value= data[0].question;
    if(data[0].answer!="")
        {
            if(localStorage.getItem("userID")=="")
            document.getElementById("temp").innerText="You Already Answered, But You Can Make Update";

            document.getElementById("answer").value= data[0].answer;
        }

})

document.getElementById("submit").addEventListener("click",function(){
    event.preventDefault(); 
    if(document.getElementById("submit").innerText=="Send"){
          const time = new Date();
  





  
    fetch(`/post_admin_s_answer?ans=${document.getElementById("answer").value}&qid=${qid}&time="${time}"`,{

        method:"post"
    }).then((response)=>{
        return response.json();
    })
    .then((data)=>{
        setTimeout(() => {
            document.getElementById("temp").innerText="You Already Answered, But You Can Make Update";
            
        }, 2000);
        document.getElementById("temp").innerText=data;
        

    })



    fetch(`/push_notification_to_users?to="${Data[0].user_phone}"&subject=${Data[0].subject}&time="${time}"&message="${document.getElementById("answer").value}"&title=Question&tracker=${qid}`,{
        method:"POST"
    })
    .then((response)=>{


        return response.json();


        
    })
    .then((data)=>{
        
        if(data=="sent"){
            setTimeout(() => {
                
                document.getElementById("temp").innerText="Reply Sent";
            }, 1000);
            document.getElementById(`temp`).innerText="sent";
        }
    })
    
    
}


else{

    window.location.href=`http://localhost:3001/ask_question`
}
})


if(localStorage.getItem("userID")!=""){
    console.log("bah");
    document.getElementById(`temp`).innerText="Admin Answered Your Question";
    document.getElementById(`answer`).readOnly=true;
    document.getElementById("submit").innerText="Ask Another Question"
    
    
    

}










 
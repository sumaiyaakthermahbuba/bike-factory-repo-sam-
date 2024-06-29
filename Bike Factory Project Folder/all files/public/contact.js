


fetch(`/provideUserInfo?userID=${localStorage.getItem("userID")}`,{
    method:"POST"
}).then((response)=>{
    return response.json();
}).then((data)=>{
    console.log(data);
    var child= document.createElement("div");
    child.className="container";
    child.innerHTML=`
    
    <div class="container">
    <div class="con">
        <div id="logo" class="Login_segment">
            <div class="circle">
                <img id="image" src="data:image/png;base64,${data[0].picture}">
                
            </div>
            
            
        </div>
        <div id="title" class="Login_segment">
            <p id="temp">USER INFORMATION</p>
            
        </div>
        <div id="phone_email" class="Login_segment">
            <div class="left">
                <label>Name</label>
                
            </div>
            <div class="right">
                <input placeholder="${data[0].name}" name="userName"  id="userName" type="text">
                
            </div>
            
        </div>
        <div id="password" class="Login_segment">
            <div class="left">
                <label>Email ID</label>
                
            </div>
            <div class="right">
                <input placeholder="${data[0].email}" name="userEmail" id="userEmail" type="text">
                
            </div>

        </div>
        <div id="password" class="Login_segment">
            <div class="left">
                <label>Varified Phone</label>
                
            </div>
            <div class="right">
                <input placeholder="${data[0].phone}" name="varified_Phone" readonly  id="varified_Phone" type="text">
                
            </div>
            
        </div>
        <div id="password" class="Login_segment">
            <div class="left">
                <label>Address</label>

            </div>
            <div class="right">
                <input placeholder="${data[0].address}" name="user_address" id="user_address" type="text">
                
            </div>
            
        </div>
        <div id="password" class="Login_segment">
            <div class="left">
                <label>City</label>
                
            </div>
            <div class="right">
                <input placeholder="${data[0].city}" name="user_city" id="user_city" type="text">
                
            </div>
            
        </div>
        <div id="password" class="Login_segment">
            <div class="left">
                <label>Postal Code</label>
                
            </div>
            <div class="right">
                <input placeholder="${data[0].postal_code}" name="user_postal" id="user_postal" type="text">
                
            </div>
            
        </div>
        <div id="password" class="Login_segment">
            <div class="left">
                <label>Other Phone</label>

            </div>
            <div class="right">
                <input placeholder="${data[0].additional_phone}" name="user_other_phone"  id="user_other_phone" type="text">

            </div>

        </div>
        <div id="password" class="Login_segment">
            <div class="left">
                <label>Password</label>
                
            </div>
            <div class="right">
                <input placeholder="${data[0].password}" name="user_password" id="user_password" type="text">
                
            </div>
            
        </div>
        <div id="last" class="last">
            
            
            <div id="edit_img"  class="submit">
                <label id="upd">Update Image</label>
                
                
                
                
                
            </div>
            <div id="submit" class="submit">
                <p >UPDATE</p>
                
                
            </div>
        </div>
        
    </div>
    
    <input name="user_image" id="user_image" type="file">
    
</div>

</div>
    
    
    `
    document.getElementById("form").appendChild(child);
    document.getElementById("edit_img").addEventListener("click",function(){
        document.getElementById("user_image").click();
    })
    document.getElementById("varified_Phone").value= localStorage.getItem("userID");
    
     document.getElementById("submit").addEventListener("click", function(event) {
       
        event.preventDefault();
        
        document.getElementById("form").submit();
        
       
        setTimeout(function() {
            window.location.reload();
        }, 500); 
    });
    if(data[0].picture==null){
        document.getElementById("image").src= `userpic.jpg`;
        document.getElementById("upd").innerText= "ADD YOUR IMAGE"
    }
})




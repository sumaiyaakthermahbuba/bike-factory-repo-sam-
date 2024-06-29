

async function fetch_notification_num(table) {
    const response = await fetch(`/fetch_not_viewed_notification_num?table=${table}`, {
        method: "POST"
    });
    const data = await response.json();
    return data;
}


function refresh_notification(){
    (async () => {
        const replies_ = await fetch_notification_num("replies");
        const comments_ = await fetch_notification_num("comments");
        const rating_ = await fetch_notification_num("rating");
        const questions_ = await fetch_notification_num("questions");
        const registered_user_ = await fetch_notification_num("registered_user_info");
        const purchase_req_ = await fetch_notification_num("purchase_requests");
    
       
    
        document.getElementById("coms").innerText=comments_+replies_;
        document.getElementById("rates").innerText=rating_;
        document.getElementById("ques").innerText=questions_;
        document.getElementById("reg_user").innerText=registered_user_;
        document.getElementById("purchase").innerText=purchase_req_;

        if(comments_+replies_==0){
            console.log(document.getElementById("coms").innerText)
            document.getElementById("coms_con").style.display="none";
        }
        else{
            document.getElementById("coms_con").style.display="";

        }
        
        if(rating_==0){
            document.getElementById("rates_con").style.display="none";
        }
        else{
            document.getElementById("rates_con").style.display="";

        }
        if(questions_==0){
            document.getElementById("ques_con").style.display="none";
        }
        else{
            document.getElementById("ques_con").style.display="";

        }
        if(registered_user_==0){
            document.getElementById("reg_user_con").style.display="none";
        }
        else{
            document.getElementById("reg_user_con").style.display="";

        }
        if(purchase_req_==0){
            document.getElementById("purchase_con").style.display="none";
        }
        else{
            document.getElementById("purchase_con").style.display="";

        }
    })();

}



function repeat(){
    setTimeout(function(){
        refresh_notification();
        repeat();
        
    },500);

}
    repeat();




document.getElementById("Delete_Update").addEventListener("click",function(){
    window.location.href="http://localhost:3001/admin_update"
})
document.getElementById("add_p").addEventListener("click",function(){
    window.location.href="http://localhost:3001/add_product"
})
document.getElementById("ui").addEventListener("click",function(){
    window.location.href="http://localhost:3001/user_list"
})
document.getElementById("q_a").addEventListener("click",function(){
    window.location.href="http://localhost:3001/admin_Q&A_review"
})
document.getElementById("comments").addEventListener("click",function(){
    window.location.href="http://localhost:3001/admin_view_comments"
})
document.getElementById("purchaseReq").addEventListener("click",function(){
    window.location.href="http://localhost:3001/admin_view_purchases"
})
document.getElementById("rating").addEventListener("click",function(){
    window.location.href="http://localhost:3001/admin_rating_view"
})
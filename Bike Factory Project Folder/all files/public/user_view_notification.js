


fetch(`/resetTo_user_viewed_all?table=user_notification&uid="${localStorage.getItem("userID")}"`, {
    method: "POST"
})





var click = [];
fetch(`/fetch_all_notifications?uid="${localStorage.getItem("userID")}"`, {
    method: "POST"
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        


        for (var i = 0; i < data.length; i++) {
            if (data[i].name == null)
                data[i].name = "admin"



            var child = document.createElement("div");
            child.className = "elements";

            child.innerHTML = `
    <div class="elements">
    <div id="message" class="inside">
    <p title="${data[i].phone}">${data[i].name} ${data[i].subject_} "${data[i].message_}" ${getTimePassed(data[i].time_)} </p>
        
    </div>
  
   

     
    <div id="blk" class="inside">
        <p name="blk"   id="push_notify${i}">view</p>
        

    
    </div>
   

    
  
   

</div>
    
    `
            click[i] = -1;
            document.getElementById("con").appendChild(child);




            document.getElementById(`push_notify${i}`).addEventListener("click", function (e) {
                var element = e.currentTarget.id.replace("push_notify", "");
                if(data[element].notification_tracker!="unavailable"){
                    if (data[element].subject_.substring(0, 7) == "Replied") {
                        window.location.href = `http://localhost:3001/nxt?id=${data[element].notification_tracker}`;
                    }
                    else if (data[element].subject_.substring(0, 8) == "Question") {
    
                        window.location.href = `http://localhost:3001/admin_answer?qid=${data[element].notification_tracker}`;
                    }
                    else if (data[element].subject_.substring(0, 8) == "notified") {
                        window.location.href = `http://localhost:3001/openSlip?purID=${data[element].notification_tracker}`;
    
                    }

                    
                }
                else{
                    alert("The Product Is Deleted");
                }
                

            })










            


            document.getElementById(`push_notify${i}`).addEventListener("click", function (e) {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                var eid = e.currentTarget.id.replace("push_notify", "")

                if (Status[click[eid]] != undefined) {
                    fetch(`/push_notification_to_purchase_table?subject=${data[eid].transaction_id}&message="${Status[click[eid]]}"`, {
                        method: "post"
                    })



                    fetch(`/push_notification_to_users?to="${data[eid].phone}"&subject=${data[eid].transaction_id}&time=${formattedDate}&message="${Status[click[eid]]}"&title=Purchase ID:`, {
                        method: "POST"
                    })
                        .then((response) => {
                            return response.json();


                        })
                        .then((data) => {

                            if (data == "sent") {
                                document.getElementById(`${"push_notify" + eid}`).innerText = "sent";
                            }
                        })





                }

            })










        }
    })



var Status = ["payment revieved", "ready for delivery", "dispatched for delivery", "delivery completed", "delivery failed", "on hold"]














///////////testing time*************




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




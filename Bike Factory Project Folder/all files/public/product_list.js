
const url = new URL(window.location.href);


const url_id = url.searchParams.get('purID');


fetch(`fetch_purchase_data?purID=${url_id}`, {
    method: "POST"
})
    .then((response) => {
        return response.json()
    })
    .then((data) =>{


        document.getElementById("total_pay").innerText=`${data[0].transaction_amount}`
        document.getElementById("status").innerText=`${data[0].status}`
        var Item = data[0].product_list.split("/");


        for(var i= Item.length-2;i>-1;i--){
            var child = document.createElement("div");
            child.className = `Login_segment`
            child.innerHTML = `
    
           
                        <div class="left">
                            <label>Item ${i+1}:</label>

                        </div>
                        <div class="right">
                           <p>${Item[i]}</p>

                        </div>

                    

     
    `
    document.getElementById("title").insertAdjacentElement("afterend",child);
    }
    }

)

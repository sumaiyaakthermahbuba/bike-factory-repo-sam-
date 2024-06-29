const fs = require("fs");
const path = require("path");
const router = require("./app");

const body_parser = require("body-parser");
router.use(body_parser.urlencoded({ extended: false }));
var mysql = require("./my sql connection/mysql");

router.use(body_parser.urlencoded({ extended: false }));



router.get("/", (req, res) => {
    res.sendFile(__dirname + "/flex.html");


})

router.get("/data", (req, res) => {
    mysql.query("select * from products", (err, result) => {
        if (err) {
            console.log("error fetching data");
        }

        else
            res.json(result);
    })


})


// router.post("/id", (req, res) => {

//     mysql.query("select * from products", (err, result) => {
//         res.json(result);
//     })



// });
router.post("/id", (req, res) => {
    var identity;
    identity = req.query.identity;
    mysql.query(`select image, name, brand, product_type, available_colors, description, certification from products where id= "${identity}"`, (err, result) => {

        res.json(result);
    })



});
router.get("/nxt", (req, res) => {
    res.sendFile(__dirname + "/flexNext.html");



});




router.post("/type_Sorting", (req, res) => {
    var type_Selected;
    var sort;
    type_Selected = req.query.type_Selected;
    sort = req.query.sort;




    mysql.query(`SELECT * from products 
        where product_type LIKE '%${type_Selected}%' 
        
        ORDER BY ${sort}
    `, (err, result) => {
        if (err) {
            console.log("errorrrrrr");
        } {

            res.json(result);

        }
    }

    )
})


router.post("/brand_Sorting", (req, res) => {

    var Brand_Selected;
    var sort;

    Brand_Selected = req.query.Brand_Selected;
    sort = req.query.sort;




    mysql.query(`SELECT * from products 
        where brand LIKE '%${Brand_Selected}%' 
        
        ORDER BY ${sort}
        `, (err, result) => {
        if (err) {
            console.log("errorrrrrr");
        } {

            res.json(result);

        }
    }
    )
})





router.post("/_Sorting", (req, res) => {
    var type_Selected;
    var Brand_Selected;
    var sort;

    Brand_Selected = req.query.Brand_Selected;
    type_Selected = req.query.type_Selected;
    sort = req.query.sort;


    if (Brand_Selected != "" && type_Selected == "") {
        mysql.query(`SELECT * from products 
    where brand LIKE '%${Brand_Selected}%' 
    
    ORDER BY ${sort}
`, (err, result) => {
            if (err) {
                console.log("errorrrrrr");
            } {

                res.json(result);

            }
        }

        )
    }

    else if (Brand_Selected == "" && type_Selected != "") {
        mysql.query(`SELECT * from products 
    where product_type LIKE '%${type_Selected}%' 
    
    ORDER BY ${sort}
    `, (err, result) => {
            if (err) {
                console.log("errorrrrrr");
            } {

                res.json(result);

            }
        }
        )
    }


    else {
        mysql.query(`SELECT * from products 
    
    
    ORDER BY ${sort}
`, (err, result) => {
            if (err) {
                console.log("errorrrrrr");
            } {

                res.json(result);

            }
        }
        )
    }
})









/********************************************** */


router.get("/idObj", (req, res) => {
    var idBrand;
    var idType;
    var idColor;
    var url_id = req.query.url_id;

    var promise1 = new Promise((resolve, reject) => {
        mysql.query(`select brand from products where id= ${url_id}`, (err, brand_result) => {
            if (err) {
                console.log("brand fetching error");
                reject(err);
            }
            else {


                idBrand = brand_result[0].brand;
                resolve(brand_result);


            }


        })


    })
    promise1.then((brand_result) => {
        var promise2 = new Promise((resolve, reject) => {
            mysql.query(`select product_type from products where id= ${url_id}`, (err, type_result) => {
                if (err) {
                    reject(err);
                }
                else {
                    idType = type_result[0].product_type;
                    resolve(type_result);
                }

            })
        })

        promise2.then((type_result) => {
            var promise3 = new Promise((resolve, reject) => {
                mysql.query(`select available_colors from products where id= ${url_id}`, (err, color_result) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        idColor = color_result[0].available_colors;
                        resolve(color_result);
                    }

                })

            })

            promise3.then((color_result) => {
                mysql.query(`select * from products where 
        brand= "${idBrand}" OR product_type= "${idType}" OR available_colors= "${idColor}"`, (err, total_result) => {
                    if (err) {
                        reject(err);
                    }
                    else {

                        res.json(total_result);

                    }

                })

            })
        })
    })


});



//*****************************Login Routs************************* *//

router.get("/mid_login", (req, res) => {
    res.sendFile(__dirname + "/login_as.html");
})
router.get("/admin_login", (req, res) => {
    res.sendFile(__dirname + "/admin.html");
})
router.get("/user_login", (req, res) => {
    res.sendFile(__dirname + "/userLogin.html");
})

router.post("/signin_req", (req, res) => {
    var user_Id;
    var user_Pass;
    user_Id = req.query.userId;
    user_Pass = req.query.userPass;
    mysql.query(`select phone, password from registered_user_info
            where phone="${user_Id}" and password="${user_Pass}"
        `, (err, result) => {


        if (result == "") {
            res.json("If Not Wrong Password Register First!!");

        }
        else {

            res.json(result[0].phone);


        }
    })
})


router.post("/register_req", (req, res) => {

    var passed;
    user_Id = req.query.userId;
    user_Pass = req.query.userPass;
    var count=0;
    
    for(var i=0;i<user_Pass.length;i++){
        console.log(!user_Pass.charCodeAt(i)>=48 && !user_Pass.charCodeAt(i)<=57);
        if(!user_Pass.charCodeAt(i)>=48 && !user_Pass.charCodeAt(i)<=57){
           
        }
        else{
            count++;
        }
    }
        if(count==0){
            res.json("err");
        }
    
    if (user_Id.toString().split("").length != 11) {
        passed = false;
        res.json("err");

    }
    if (user_Pass.toString().split("").length < 7) {
        passed = false;
        res.json("err");
    }


    var element = user_Pass.toString().split("");
    var arr = element.filter(
        x => {
            if (65 <= x.charCodeAt(0) && x.charCodeAt(0) <= 90)
                return x;
        }
    )
   
    if (arr.length < 1) {
        passed = false;
        res.json("err");

    }
    if (user_Pass == user_Id) {
        passed = false;
        res.json("err");

    }
    arr = user_Id.toString().split("").filter(
        x => {
            if (48 <= x.charCodeAt(0) && x.charCodeAt(0) <= 57)
                return x;
        }
    )
    if (arr.length != 11) {
        console.log(arr);
        passed = false;
        res.json("err");

    }
    


    if (passed != false) {
        mysql.query(`Insert into registered_user_info (phone, password,picture)
            values ("${user_Id}","${user_Pass}","${fs.readFileSync(path.join(__dirname, `userpic.jpg`)).toString("base64")}")
        `, ((err, result) => {
            if (err) {
                console.log("registration error");


                res.json("registration error (Maybe the number is already in use!!)");


            }
            else {

                res.json(user_Id);


            }



        }))

    }







})






router.post("/admin_req", (req, res) => {
    var admin_Id;
    var admin_Pass;
    admin_Id = req.query.adminId;
    admin_Pass = req.query.adminPass;
    mysql.query(`select admin_phone, admin_password from admin_info
            where admin_phone="${admin_Id}" and admin_password="${admin_Pass}"
        `, ((err, result) => {
        if (result == "") {
            res.json("wrong phone or password!!");
        }
        else {
            res.json({ "id": `${result[0].admin_phone}`, "pass": `${result[0].admin_password}` });


        }
    }))

})


router.get("/cart", (req, res) => {
    res.sendFile(__dirname + "/cartDesign.html");
})

router.post("/info_cart", (req, res) => {

    var cartID = req.query.cart_id;
    console.log(cartID);
    mysql.query(`select id, image, name, price, brand, product_type, available_colors from products where id= "${cartID}"`, (err, result) => {

        res.json(result);
    })




})


//////********************************/// */
router.get("/your_profile", (req, res) => {
    res.sendFile(__dirname + "/contact.html")
})





/************************profile*************** */


router.post("/profile_Info", (req, res) => {
    var userINFO = req.body;

    if (userINFO.userName != "") {
        mysql.query(`UPDATE registered_user_info
       
       SET name= "${userINFO.userName}"
       where phone= "${userINFO.varified_Phone}"`)
    }
    if (userINFO.userEmail != "") {
        mysql.query(`UPDATE registered_user_info
       SET email= "${userINFO.userEmail}"
       where phone= "${userINFO.varified_Phone}"`)
    }
    if (userINFO.user_address != "") {
        mysql.query(`UPDATE registered_user_info
       SET address= "${userINFO.user_address}"
       where phone= "${userINFO.varified_Phone}"`)
    }
    if (userINFO.user_city != "") {
        mysql.query(`UPDATE registered_user_info
       SET city= "${userINFO.user_city}"
       where phone= "${userINFO.varified_Phone}"`)
    }
    if (userINFO.user_postal != "") {
        mysql.query(`UPDATE registered_user_info
       SET postal_code= "${userINFO.user_postal}"
       where phone= "${userINFO.varified_Phone}"`)
    }
    if (userINFO.user_other_phone != "") {
        mysql.query(`UPDATE registered_user_info
       SET additional_phone= "${userINFO.user_other_phone}"
       where phone= "${userINFO.varified_Phone}"`)
    }
    if (userINFO.user_password != "") {
        mysql.query(`UPDATE registered_user_info
       SET password= "${userINFO.user_password}"
       where phone= "${userINFO.varified_Phone}"`)
    }
    if (userINFO.user_image != "") {
        var file = fs.readFileSync(path.join(__dirname, `${userINFO.user_image}`)).toString("base64");
        mysql.query(`UPDATE registered_user_info
            SET picture= "${file}"
       where phone= "${userINFO.varified_Phone}"`)
    }





})

router.post("/provideUserInfo", (req, res) => {
    var user__id = req.query.userID;
    mysql.query(`SELECT * from registered_user_info
            where phone= "${user__id}"
        `, (err, result) => {
        res.json(result);
    })

})



//////////////////////////////////admin update//////////////////////////

router.get("/admin_update", (req, res) => {
    res.sendFile(__dirname + "/admin_update.html")
})
router.get("/update", (req, res) => {
    res.sendFile(__dirname + "/update.html")
})

router.post("/product_update", (req, res) => {
    var obj = req.body;

    if (obj.product_name != "") {
        mysql.query(`UPDATE products
       SET name= "${obj.product_name}"
       where id= "${obj.product_id}"`)
    }
    if (obj.product_type != "") {
        mysql.query(`UPDATE products
       SET product_type= "${obj.product_type}"
       where id= "${obj.product_id}"`)
    }
    if (obj.price != "") {
        mysql.query(`UPDATE products
       SET price= "${obj.price}"
       where id= "${obj.product_id}"`)
    }
    if (obj.category != "") {
        mysql.query(`UPDATE products
       SET category= "${obj.category}"
       where id= "${obj.product_id}"`)
    }
    if (obj.warranty != "") {
        mysql.query(`UPDATE products
       SET warranty= "${obj.warranty}"
       where id= "${obj.product_id}"`)
    }
    if (obj.discount != "") {
        mysql.query(`UPDATE products
       SET discount= "${obj.discount}"
       where id= "${obj.product_id}"`)
    }
    if (obj.brand != "") {
        mysql.query(`UPDATE products
       SET brand= "${obj.brand}"
       where id= "${obj.product_id}"`)
    }
    if (obj.quantity != "") {
        mysql.query(`UPDATE products
       SET quantity= "${obj.quantity}"
       where id= "${obj.product_id}"`)
    }
    if (obj.size != "") {
        mysql.query(`UPDATE products
       SET size= "${obj.size}"
       where id= "${obj.product_id}"`)
    }
    if (obj.weight != "") {
        mysql.query(`UPDATE products
            
       SET weight= "${obj.weight}"
       where id= "${obj.product_id}"`)
    }
    if (obj.color != "") {
        mysql.query(`UPDATE products
       SET available_colors= "${obj.color}"
       where id= "${obj.product_id}"`)
    }
    if (obj.rating != "") {
        mysql.query(`UPDATE products
       SET rating= "${obj.rating}"
       where id= "${obj.product_id}"`)
    }

    if (obj.Certi != "") {
        var file2 = fs.readFileSync(path.join(__dirname, `${obj.Certi}`)).toString("base64");

        mysql.query(`UPDATE products
       SET certification= "${file2}"
       where id= "${obj.product_id}"`)

        mysql.query(`UPDATE products
       SET certification_file_name= "${obj.Certi}"
       where id= "${obj.product_id}"`)
    }
    if (obj.description != "") {
        mysql.query(`UPDATE products
       SET description= "${obj.description}"
       where id= "${obj.product_id}"`)
    }
    if (obj.user_image != "") {
        var file = fs.readFileSync(path.join(__dirname, `${obj.user_image}`)).toString("base64");
        mysql.query(`UPDATE products
            SET image= "${file}"
       where id= "${obj.product_id}"`)
    }
    if (obj.Image2 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="2"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image2}`)).toString("base64")}" 
            where img_no="2"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image2}`)).toString("base64")}","2")
            `)

            }



        })
    }

    if (obj.Image3 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="3"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image3}`)).toString("base64")}" 
            where img_no="2"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image3}`)).toString("base64")}","3")
            `)

            }



        })
    }
    if (obj.Image4 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="4"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image4}`)).toString("base64")}" 
            where img_no="4"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image4}`)).toString("base64")}","4")
            `)

            }



        })
    }
    if (obj.Image5 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="5"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image5}`)).toString("base64")}" 
            where img_no="5"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image5}`)).toString("base64")}","5")
            `)

            }



        })
    }
    if (obj.Image6 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="6"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image6}`)).toString("base64")}" 
            where img_no="6"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image6}`)).toString("base64")}","6")
            `)

            }



        })
    }

    if (obj.Image7 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="7"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image7}`)).toString("base64")}" 
            where img_no="7"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image7}`)).toString("base64")}","7")
            `)

            }



        })
    }
    if (obj.Image8 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="8"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image8}`)).toString("base64")}" 
            where img_no="8"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image8}`)).toString("base64")}","8")
            `)

            }



        })
    }
    if (obj.Image9 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="9"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image9}`)).toString("base64")}" 
            where img_no="9"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image9}`)).toString("base64")}","9")
            `)

            }



        })
    }
    if (obj.Image10 != "") {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`select Count(*) as c from other_images where id="${obj.product_id}" and img_no="10"`, (err, result) => {

                resolve(result[0].c);
            })
        })
        promise.then((data) => {

            if (data != 0) {
                mysql.query(`Update other_images 
            set image="${fs.readFileSync(path.join(__dirname, `${obj.Image10}`)).toString("base64")}" 
            where img_no="10"
      
            `)
            }
            else {
                mysql.query(`INSERT INTO other_images (id,image,img_no)
                values(${obj.product_id},"${fs.readFileSync(path.join(__dirname, `${obj.Image10}`)).toString("base64")}","10")
            `)

            }



        })
    }

})
router.post("/productIDforUpdate", (req, res) => {
    var id = req.query.pid;
    mysql.query(`select * from products where id= "${id}"`, (err, result) => {

        res.json(result);
    })



});



///******************COMMENT SECTION ******************** */

router.post("/commentFetch", (req, res) => {
    var pid = req.query.p_id;
    mysql.query(`SELECT * from comments inner join registered_user_info on comments.commenter_id= registered_user_info.phone where comments.product_id = "${pid}"`, ((err, result) => {
        res.json(result);

    }))
})
router.post("/replyFetch", (req, res) => {
    var cid = req.query.c_id;
    mysql.query(`SELECT * from replies inner join registered_user_info on replies.replier_id = registered_user_info.phone where comment_id = "${cid}"`, ((err, result) => {
        res.json(result);

    }))
})

router.post("/insert_to_comment_table", (req, res) => {
    var userID = req.query.userID;
    var writing = req.query.writing;
    var time = req.query.time.replace("GMT ", "GMT+");
    var pid = req.query.pid;
    var commentImage = req.query.commentImage;

    console.log("--->"+commentImage);

    var promise = new Promise((resolve, reject) => {
        mysql.query(`SELECT * from registered_user_info
        where phone= "${userID}"
    `, (err, result) => {
            if (err) {


                console.log(err);



            }
            else {

                resolve(result);

            }

        })



    })

    promise.then((userInfo) => {
        if(commentImage!=""){
            
            mysql.query(`INSERT INTO comments ( commenter_id, commenter_name, commenter_image, comment_time, comment_text, product_id, attachment)
            
            values ("${userInfo[0].phone}", "${userInfo[0].name}", "${userInfo[0].picture}", ${time}, "${writing}", "${pid}", "${fs.readFileSync(path.join(__dirname, `${commentImage}`)).toString("base64")}")
        `, ((err, result) => {
            if (err) {
                console.log(err);
            }
            else
            res.json(result);
    }))

}
else{
    
    mysql.query(`INSERT INTO comments ( commenter_id, commenter_name, commenter_image, comment_time, comment_text, product_id)

            values ("${userInfo[0].phone}", "${userInfo[0].name}", "${userInfo[0].picture}", ${time}, "${writing}", "${pid}")
        `, ((err, result) => {
            if (err) {
                console.log(err);
            }
            else
                res.json(result);
        }))

        }
       


    })





})
router.post("/insert_to_reply_table", (req, res) => {

    var userID = req.query.userID;
    var writing = req.query.writing;
    var time = req.query.time.replace("GMT ", "GMT+");
    var pid = req.query.pid;
    var cid = req.query.cid;
    var replytImage = req.query.replytImage;


    



    var promise = new Promise((resolve, reject) => {
        mysql.query(`SELECT * from registered_user_info
        where phone= "${userID}"
    `, (err, result) => {
            if (err) {

                console.log(err);


            }
            else {

                resolve(result);

            }
        })



    })

    promise.then((userInfo) => {
        if(replytImage !=""){
            mysql.query(`INSERT INTO replies ( replier_id, replier_name, replier_image, reply_time, reply, product_id, comment_id, attachment)
    
            values ("${userInfo[0].phone}", "${userInfo[0].name}", "${userInfo[0].picture}", "${time}", "${writing}", "${pid}", "${cid}", "${fs.readFileSync(path.join(__dirname, `${replytImage}`)).toString("base64")}")
        `, ((err, result) => {
            if(err)
                console.log(err);
            res.json(result);
        }))

        }
        else{
            mysql.query(`INSERT INTO replies ( replier_id, replier_name, replier_image, reply_time, reply, product_id, comment_id)
    
            values ("${userInfo[0].phone}", "${userInfo[0].name}", "${userInfo[0].picture}", "${time}", "${writing}", "${pid}", "${cid}")
        `, ((err, result) => {
            if(err)
                console.log(err);
            res.json(result);
        }))

        }

       



    })





})


///*********************ask question************ */
router.get("/ask_question", (req, res) => {
    res.sendFile(__dirname + "/ask.html")
})
router.post("/Question_rout", (req, res) => {
    var userID = req.query.userID;
    var question = req.query.question;
    var time = req.query.time.replace("GMT ", "GMT+");
    var subject = req.query.subject;




    var promise = new Promise((resolve, reject) => {
        mysql.query(`SELECT * from registered_user_info
        where phone= "${userID}"
    `, (err, result) => {
            if (err) {

                console.log(err);
                res.json("An Error Occurred!!");

            }
            else {

                resolve(result);

            }
        })



    })

    promise.then((userInfo) => {

        mysql.query(`INSERT INTO questions ( user_name, user_phone, subject, q_time, user_image, question)

            values ("${userInfo[0].name}", "${userInfo[0].phone}", "${subject}", "${time}", "${userInfo[0].picture}", "${question}")
        `, ((err, result) => {
            if (err) {
                res.json("An Error Occurred!!");
            }
            else {
                res.json("Question Sent Successfully!!");

            }
        }))


    })





})


/***********************admin panel********* */
router.get("/admin_panel", (req, res) => {
    var id = req.query.adminID;
    var adminPass = req.query.adminPass;
    mysql.query("select * from admin_info", ((err, result) => {

        if (id == result[0].admin_phone && adminPass == result[0].admin_password)
            res.sendFile(__dirname + "/admin_panel.html")
    }))
})



///*****************delete product************* */
router.post("/delete_product", ((req, res) => {
    var productId = req.query.productID;

    mysql.query(`DELETE FROM products
    where id="${productId}"
    `, ((err, result) => {
        if (err) {
            res.json("Error Occurred");
        }
        else
            res.json(productId);
    }))
}))

///////////////********add product************* */
router.get("/add_product", ((req, res) => {
    res.sendFile(__dirname + "/add_product.html");
}))


router.post("/push_product", (req, res) => {

    var form_data = req.body;
    console.log(form_data);

    var promise = new Promise((resolve, reject) => {
        mysql.query(`SHOW TABLE STATUS LIKE 'products'`, (err, result) => {
            /////////////
            if (err) {
                console.log(err)
                res.json("error");
            }
            else {
               
                resolve(result[0].Auto_increment)
            }
        })


    })
    promise.then((nextID) => {



     
        var promise= new Promise((resolve,reject)=>{
            mysql.query(`INSERT INTO products (
                name,
                product_type,
                price,
                category,
                discount,
                warranty,
                brand,
                quantity,
                size,
                weight,
                available_colors,
                rating,
                image,
                description
    
                )
            values (
            "${form_data.product_name}",
            "${form_data.product_type}",
            "${form_data.price}",
            "${form_data.category}",
             "${form_data.discount}",
            "${form_data.warranty}",
            "${form_data.brand}",
            "${form_data.quantity}",
            "${form_data.size}",
            "${form_data.weight}",
            "${form_data.color}",
            "${form_data.rating}",
            "${fs.readFileSync(path.join(__dirname, `${form_data.Main}`)).toString("base64")}",
            "${form_data.description}"
            )
            `, ((err, result) => {
    

                if (err) {
                    console.log("-------->"+"err1");
                    console.log(err);
                    res.json("error");
                }
                else{
                    resolve("");
                }
    
    
    
            }))

        })
       promise.then((data)=>{
        console.log(form_data.Certi);
        if (form_data.Certi != "") {
            mysql.query(`Update products 
                set certification= "${fs.readFileSync(path.join(__dirname, `${form_data.Certi}`)).toString("base64")}",
             
                certification_file_name="${form_data.Certi}}" where id="${nextID}"
       


            
            `, ((err, result) => {


                if (err) {
                    console.log(err);
                    res.json("error");
                }


            }))

        }


        if (form_data.Image2 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image2}`)).toString("base64")}","2")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }
        if (form_data.Image3 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image3}`)).toString("base64")}","3")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }
        if (form_data.Image4 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image4}`)).toString("base64")}","4")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }
        if (form_data.Image5 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image5}`)).toString("base64")}","5")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }
        if (form_data.Image6 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image6}`)).toString("base64")}","6")
                `, (err, result) => {
                if (err) {
                    console.log(err);

                    res.json("error--6");

                }
            })


        
        }
        if (form_data.Image7 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image7}`)).toString("base64")}","7")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }

        if (form_data.Image8 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image8}`)).toString("base64")}","8")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }
        if (form_data.Image9 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image9}`)).toString("base64")}","9")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }
        if (form_data.Image10 != "") {
            mysql.query(`INSERT INTO other_images (id,image,img_no)
                    values(${nextID},"${fs.readFileSync(path.join(__dirname, `${form_data.Image10}`)).toString("base64")}","10")
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json("error");
                }
            })
        }

       })
       
       

    })




})


router.get("/user_list", (req, res) => {
    res.sendFile(__dirname + "/admin_user_control.html");
})
router.post("/bring_registered_users", (req, res) => {

    mysql.query(`SELECT * FROM registered_user_info
    order by creation_time desc
    `, ((err, result) => {

        res.json(result);
    }))
})


router.post("/bring_questions", (req, res) => {
    var c = req.query.aa;
    mysql.query(`SELECT questions.*,registered_user_info.name FROM questions left join registered_user_info on questions.user_phone= registered_user_info.phone
    order by questions.creation_time desc
    `, ((err, result) => {

        res.json(result);
    }))
})



//**************block users */
router.post("/block_user", ((req, res) => {
    var user_id = req.query.user_id;

    mysql.query(`
        UPDATE registered_user_info
        SET block_status = "BLOCKED"
        where phone = "${user_id}"
    `, ((err, result) => {
        if (err) {
            console.log(err);
        }
        else {


            // console.log("blocked");

        }


    }))
}))
router.post("/unblock_user", ((req, res) => {
    var user_id = req.query.user_id;
    mysql.query(`
    UPDATE registered_user_info
        SET block_status = "NOT_BLOCKED"
        where phone = "${user_id}"
    `, ((err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            console.log("unblocked");



        }


    }))
}))
router.post("/block_unblock", (req, res) => {
    var user_id = req.query.user_id;
    mysql.query(`SELECT block_status from registered_user_info where phone= "${user_id}"`, ((err, result) => {
        res.json(result);
    }))
})

//*****************admin question review */
router.get("/admin_Q&A_review", (req, res) => {
    res.sendFile(__dirname + "/admin_q&a_review.html");
})




//**************************admin answers******** */
router.get("/admin_answer", (req, res) => {



    res.sendFile(__dirname + "/admin_answer.html");
})
router.post("/fetch_question&subject", (req, res) => {

    var qid = req.query.qid;

    mysql.query(`SELECT * from questions where q_id="${qid}"`, ((err, result) => {

        res.json(result);

    }))
})


router.post("/post_admin_s_answer", ((req, res) => {
    var ans = req.query.ans;
    var qid = req.query.qid;
    var time = req.query.time.replace("GMT ", "GMT+");
    mysql.query(`UPDATE questions SET answer="${ans}", reply_status="replied", r_time=${time} WHERE q_id= ${qid}`, ((err, result) => {
        if (err)
            console.log(err);
        else {
            res.json("Your Reply is Updated");
        }
    }))
}))


//****************admin view comments *******/
router.get("/admin_view_comments", (req, res) => {

    res.sendFile(__dirname + "/admin_view_comments.html");
})
router.post("/fetchAllcommentsAndReplies", (req, res) => {

    mysql.query(`SELECT cr.commenter_name, cr.commenter_image, cr.comment_time, p.name ,
      cr.comment_text, cr.product_id, cr.commenter_id, registered_user_info.block_status,cr.creation_time, cr.admin_view
      FROM ((SELECT commenter_name, commenter_id, commenter_image, comment_time, comment_text, product_id, 
      creation_time, admin_view FROM comments) UNION (SELECT replier_name, replier_id, replier_image, 
      reply_time, reply, product_id, creation_time, admin_view FROM replies)) 
      AS cr JOIN products AS p ON cr.product_id = p.id LEFT JOIN registered_user_info on cr.commenter_id= registered_user_info.phone
      order by creation_time desc;
    `, ((err, result) => {
        if (err)
            console.log(err);


        res.json(result);


    }))
})
//****************admin view purchase *******/
router.get("/admin_view_purchases", (req, res) => {

    res.sendFile(__dirname + "/admin_view_purchases.html");
})



//*******************slide *************** */
router.post("/Add_to_slide", ((req, res) => {
    var pid = req.query.productID;
    var promise = new Promise((resolve, reject) => {
        mysql.query(`select COUNT(*) from products where slide_inclusion="YES";`, ((err, result) => {
            resolve(result);
        }))

    })
    promise.then((data) => {

        if (data[0]['COUNT(*)'] < 10) {
            mysql.query(`UPDATE  products
        SET slide_inclusion= "YES" where id=${pid}
    `, ((err, result) => {
                if (err) {

                    console.log(err);
                }
                else
                    res.json(pid);
            }))

        }
        else {
            console.log("out of bound");
            res.json("out of bound");
        }


    })

}))




router.post("/remove_from_slide", ((req, res) => {
    var pid = req.query.productID;

    mysql.query(`UPDATE  products
        SET slide_inclusion= "NO" where id=${pid}
    `, ((err, result) => {


        res.json(pid);
    }))
}))






router.get("/slide_data_fetch", ((req, res) => {
    mysql.query(`SELECT * from products where slide_inclusion= "YES"`, ((err, result) => {
        res.json(result);
    }))
}))



router.post("/rating_rout", ((req, res) => {
    var uid = req.query.uid;
    var pid = req.query.pid;
    var rate = req.query.rate;
    var time = req.query.time.replace("GMT ", "GMT+");

    var promise = new Promise((resolve, reject) => {
        mysql.query(`SELECT * from rating where rater_id="${uid}" and product_id="${pid}" `, ((err, result) => {
            if (err)
                console.log(err);
            else {


                resolve(result);

            }

        }))

    })
    promise.then((data) => {




        if (data == "") {

            mysql.query(`INSERT INTO rating (rater_id,product_id,rate,time)
        values("${uid}","${pid}","${rate}","${time}") `, ((result, err) => {
                if (err)
                    console.log(err);

                res.json(result);
            }))


        }
        else {
            console.log(uid);
            mysql.query(`UPDATE rating
            SET rate=${rate} ,time="${time}" where rater_id="${uid}" and product_id="${pid}" `, ((result, err) => {
                if (err)
                    console.log(err);
                res.json(result);

            }))


        }





    })



}))

router.post(`/fetch_past_rating`, ((req, res) => {
    var uid = req.query.uid;
    var pid = req.query.pid;
    // var rate= req.query.rate;
    mysql.query(`SELECT * from rating where rater_id="${uid}" and product_id="${pid}" `, ((err, result) => {
        if (err)
            console.log(err);
        else {

            res.json(result);

        }

    }))

}))
router.post(`/fetch_average_rating`, ((req, res) => {

    var pid = req.query.pid;


    mysql.query(`SELECT SUM(rate)/count(rate) as average_rate , count(*) as votes FROM rating where product_id="${pid}"  `, ((err, result) => {
        if (err)
            console.log(err);
        else {
            res.json(result);

        }

    }))

}))




router.post(`/fetch_other_images`, ((req, res) => {
    id = req.query.pid;
    mysql.query(`SELECT * from other_images where id= "${id}"`, ((err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            res.json(result);
        }
    }))
}))



//***********purchase admin view */
router.post(`/fetch_purchase_req`, ((req, res) => {

    mysql.query(`SELECT purchase_requests.*, registered_user_info.name, registered_user_info.phone, registered_user_info.picture  FROM purchase_requests INNER JOIN registered_user_info WHERE purchase_requests.phone=registered_user_info.phone
    order by purchase_requests.creation_time desc
    `, ((err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            res.json(result);
        }
    }))
}))





//***********purchase history info*/
router.post(`/pushPaymentReq`, ((req, res) => {
    var item_count = req.query.item_count.split(",");
    var cart_ids = req.query.cart_ids;






    var money = req.query.money;
    var client = req.query.client;
    var time = req.query.time.replace("GMT ", "GMT+");



    var promise = new Promise((resolve, reject) => {
        mysql.query(`SELECT name, product_type from products where id IN (${cart_ids})`, ((err, result) => {


            resolve(result);


        }))

    })




    promise.then((data) => {
        var promise = new Promise((resolve, reject) => {
            mysql.query(`SELECT name from registered_user_info where phone="${client}"`, ((err, result) => {



                var Data = [data, result[0].name];
                resolve(Data)


            }))



        })
        promise.then((data) => {

            var str = "";


            for (var i = 0; i < data[0].length; i++) {
                str = str + `${data[0][i].name} (${data[0][i].product_type})    ${item_count[i]} piece(s)/ `



            }

            mysql.query(`INSERT INTO purchase_requests
            (phone,client_name,product_list,purchase_date_time,transaction_amount)
            values("${client}","${data[1]}", "${str}","${time}","${money}")
            `, ((err, result) => {


                if (err)
                    console.log(err);
            }))


        })

    })





}))



////////////////////////***admin rating view******** */

router.get("/admin_rating_view", (req, res) => {

    res.sendFile(__dirname + "/admin_rating_view.html");
})

router.post("/bring_rating_info", (req, res) => {

    mysql.query(`SELECT rating.*, a.phone, a.name, a.picture, products.name as p_name, products.product_type
    FROM rating
    JOIN registered_user_info a ON rating.rater_id = a.phone
    JOIN products ON rating.product_id = products.id
    order by rating.creation_time desc
    `, ((err, result) => {

        res.json(result);
    }))
})



///////////////////////************admin panel notifications*********** */

router.post("/fetch_not_viewed_notification_num", (req, res) => {
    var table = req.query.table;
    mysql.query(`SELECT count(*) as count from ${table} where admin_view="Not_Viewed"`, (err, result) => {



        res.json(result[0].count);
    })
})



router.post("/resetTo_admin_viewed_all", (req, res) => {


    var table = req.query.table;
    mysql.query(`UPDATE ${table} SET admin_view="Viewed"`, (err, result) => {
        if (err)
            console.log(err);
    })
})
router.post("/resetTo_user_viewed_all", (req, res) => {

    var uid = req.query.uid;
    var table = req.query.table;
    mysql.query(`UPDATE ${table} SET view_status= "Viewed" where to_=${uid}`, (err, result) => {
        if (err)
            console.log(err);
    })
})



/////////////////////********push notification to user*************** */
router.post("/push_notification_to_users", (req, res) => {
    var to = req.query.to;
    var subject = req.query.subject;
    var message = req.query.message;
    var title = req.query.title;
    var time = req.query.time.replace("GMT ", "GMT+");
    var tracker = req.query.tracker;





    mysql.query(`INSERT INTO user_notification (to_,from_,message_,subject_,time_,view_status,notification_tracker)
    values(${to},"admin",${message},"${title}:${subject}",${time},"Not_Viewed","${tracker}")
    `, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json("sent");
        }

    })
})
router.post("/push_notification_to_purchase_table", (req, res) => {

    var subject = req.query.subject;
    var message = req.query.message;


    mysql.query(`update purchase_requests
        set status=${message} where transaction_id=${subject}
    `, (err, result) => {
        if (err)
            console.log(err);

    })
})



router.post("/comments_notification", (req, res) => {
    var cid = req.query.cid;
    var commenter_id = req.query.commenter_id;
    var reply = req.query.reply;
    var time = req.query.time.replace("GMT ", "GMT+");
    var tracker = req.query.tracker;


    var promise = new Promise((resolve, reject) => {

        mysql.query(`select commenter_id from comments where comment_id=${cid}`, (err, result) => {
            resolve(result);
        })
    })

    promise.then((data) => {

        var promise2 = new Promise((resolve, reject) => {

            mysql.query(`SELECT DISTINCT replier_id FROM comments LEFT JOIN replies on comments.comment_id = replies.comment_id where replies.comment_id=${cid} and replies.replier_id!="${commenter_id}"`, (err, result) => {

                //    console.log(data);
                //    console.log(result);
                var Data = [data, result];
                resolve(Data);

            })




        })
        promise2.then((Data) => {
            var str = "";
            for (var i = 0; i < Data[1].length; i++) {
                str = str + Data[1][i].replier_id + ",";


            }
            str = str + Data[0][0].commenter_id;
            var arr = str.split(",");

            for (var i = 0; i < arr.length - 1; i++) {

                mysql.query(`INSERT INTO user_notification (to_, from_, message_, subject_, time_, view_status, notification_tracker)
                    
                    )
                values ("${arr[i]}","${commenter_id}",${reply},"Replied to the comment you replied on",${time},"Not_Viewed",${tracker})
                `, (err, result) => {
                    if (err) {
                        console.log(err);
                    }

                })
                


            }
            if (`${arr[arr.length - 1]}` != `${commenter_id}`) {
                mysql.query(`INSERT INTO user_notification (to_, from_, message_, subject_, time_, view_status, notification_tracker)
                values ("${arr[arr.length - 1]}","${commenter_id}",${reply},"Replied to your comment",${time},"Not_Viewed","${tracker}")
                `, (err, result) => {
                    if (err) {
                        console.log(err);
                    }

                })


            }


        })



    })


})


router.get("/user_view_notification", (req, res) => {
    res.sendFile(__dirname + "/user_view_notification.html")
})


router.post("/fetch_all_notifications", (req, res) => {
    var uid = req.query.uid;

    mysql.query(`SELECT * FROM user_notification LEFT JOIN registered_user_info on user_notification.from_=registered_user_info.phone where user_notification.to_=${uid}
    order by  user_notification.creation_time desc
    `, (err, result) => {


        if (err)
            console.log(err);

        res.json(result);
    })
})


/////////////////////*******fetch_added_all_imageSecondary*****/////////// */
router.post(`/fetch_added_all_imageSecondary`, (req, res) => {
    var pid = req.query.pid;

    mysql.query(`Select * from other_images where id="${pid}"`, (err, result) => {
        res.json(result);
    })
})
router.post(`/fetch_added_all_imagePrimary`, (req, res) => {
    var pid = req.query.pid;

    mysql.query(`Select image from products where id="${pid}"`, (err, result) => {
        res.json(result);
    })
})




///////////////******************product list **********/
router.get(`/openSlip`, (req, res) => {

    res.sendFile(__dirname + "/product_list.html")
})
router.post(`/fetch_purchase_data`, (req, res) => {
    var purID = req.query.purID;
    mysql.query(`Select * from purchase_requests where transaction_id=${purID}`, (err, result) => {
        res.json(result);

    })
})

///////////////******************user notification **********/
router.post(`/fetch_notify_num`, (req, res) => {
    var uid = req.query.uid;

    mysql.query(`Select count(*) as c from user_notification where to_="${uid}" and view_status="Not_Viewed"`, (err, result) => {
        res.json(result);

    })
})

//////////////********drop down data fetch********* */
router.post(`/all_types_fetch`, (req, res) => {


    mysql.query(`SELECT DISTINCT product_type from products`, (err, result) => {
        res.json(result);

    })
})
router.post(`/all_brands_fetch`, (req, res) => {


    mysql.query(`SELECT DISTINCT brand from products`, (err, result) => {
        res.json(result);

    })
})


////////////////*******insert from rating table to product table (rating)//////// */
router.post(`/insert_rating_to_product_table`, (req, res) => {
    var id = req.query.pid;
    var rate = req.query.rate;


    mysql.query(`UPDATE products 
    SET rating=${rate} where id=${id}
    `, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);

    })
})
router.post(`/fetch_past_rating_all`, ((req, res) => {

    var pid = req.query.pid;
    // var rate= req.query.rate;
    mysql.query(`SELECT * from rating where product_id="${pid}" `, ((err, result) => {
        if (err)
            console.log(err);
        else {

            res.json(result);

        }

    }))

}))

////////////*********deleting effects//////////// */

router.post(`/deleting_effects`, (req, res) => {
    console.log("aaapp");
    var pid = req.query.pid;
    mysql.query(`DELETE from products where id=${pid}`, (err, result) => {
        if (err)
            console.log(err);
    })
    mysql.query(`DELETE from rating where product_id=${pid}`, (err, result) => {
        if (err)
            console.log(err);
    })
    mysql.query(`DELETE from comments where product_id=${pid}`, (err, result) => {
        if (err)
            console.log(err);
    })
    mysql.query(`DELETE from replies where product_id=${pid}`, (err, result) => {
        if (err)
            console.log(err);
    })
    mysql.query(`DELETE from other_images where id=${pid}`, (err, result) => {
        if (err)
            console.log(err);


    })
    mysql.query(`Update user_notification set notification_tracker="unavailable" where notification_tracker=${pid};`, (err, result) => {
        if (err)
            console.log(err);
    })


})


router.post(`/checkIf_blocked`, (req, res) => {
    uid = req.query.uid;
    mysql.query(`select block_status from registered_user_info where phone="${uid}"`, (err, result) => {
        if (err) {
            res.json("error");
            console.log(err);
        }
        else {


            if (result.length === 0) {
                res.json("not logged in")
            }
            else
                res.json(result[0].block_status);
        }
    })
})
module.exports = router;



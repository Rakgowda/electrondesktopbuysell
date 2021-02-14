const { ipcMain } = require('electron');
const path = require("path");
// const { Model } = require('objection');
var moment = require('moment');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, "../../src/db/data.db"),
    },
  });

  
  async function createSchema() {
    if (await knex.schema.hasTable('ItemBuy')) {
      return;
    }
  
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('ItemBuy', table => {
      table.increments('id').primary();
      table.string('itemName');
      table.integer('quantity');
      table.decimal('price');
      table.date('date');
      table.string('gst');
      
      
    });
  }

  async function createSellSchema() {
    if (await knex.schema.hasTable('ItemSell')) {
      return;
    }
  
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('ItemSell', table => {
      table.increments('id').primary();
      table.string('item');
      table.date('date');
      table.string('CustomerName');
      table.string('Cddress');
      table.string('Cphone');
      table.string('Invoice');
    
      
    });
  }

  async function createBuySchema() {
    if (await knex.schema.hasTable('ItemBuyDetail')) {
      return;
    }
  
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('ItemBuyDetail', table => {
      table.increments('id').primary();
      table.string('item');
      table.date('date');
      table.string('CustomerName');
      table.string('Cddress');
      table.string('Cphone');
      table.string('Invoice');
 
    
      
    });
  }

  async function createfromaddress() {
    if (await knex.schema.hasTable('Fromaddress')) {
      return;
    }
  
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('Fromaddress', table => {
      table.increments('id').primary();
      table.date('date');
      table.string('CustomerName');
      table.string('Cddress');
      table.string('Cpin');
      table.string('Cphone');
     
    
      
    });
  }



ipcMain.on('itemAdding', (event, item) => {
    const sql = item.item;
    var d = moment().format("YYYY-MM-DD").toString();

    createBuySchema().then(r=>{
      let ss = JSON.stringify(sql)
      knex('ItemBuyDetail').insert({date:d, item: ss,CustomerName:item["CustomerName"],Cddress:item["Cddress"],Cphone:item["Cphone"],Invoice:item["Invoice"]}).then(r=>{
    createSchema().then(r=>{
      for (let key in sql) {
          
        let name = sql[key]["itemname"]
         console.log(name)
          knex('ItemBuy').select("quantity").where({itemName:name}).then(r=>{
            if(r.length==0)
            {
          
              knex('ItemBuy').insert({date:d, itemName: name,gst:parseInt(sql[key]["gst"]),quantity:parseInt(sql[key]["quantity"]),price: parseFloat(sql[key]["price"])}).then(r=>{
                console.log("user added")
            }).catch(e=>console.log(e))
            }
            else{

              var quan = parseInt(sql[key]["quantity"])+parseInt(r[0]["quantity"]);
              knex('ItemBuy').update({date:d,quantity:quan,gst:parseInt(sql[key]["gst"]),price: parseFloat(sql[key]["price"])}).where({itemName:name}).then(r=>{
                console.log("user updated")
            }).catch(e=>console.log(e))
            }
          }).catch(e=>console.log(e))
        }

        event.reply("insetDetail","item is added successfully")
      
      
  }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
    }).catch(e=>{

    })


    // let sqlinsert = "insert into ItemBuy values ('"+sql[0]+"',"+sql[1]+","+sql[2]+")";
        
    //         console.log(sqlinsert)
            
    //         database.all(sqlinsert, (err, rows) => {
        
    //             if(err)
    //             {
    //                 console.log(err)
    //                 event.reply("errorInsert",err)
        
    //             }
    //             else {
    //                 console.log("rows inserted")
        
    //                 event.reply("insetDetail","success added");
    //             }
    //         });
        
        
    
    
            
    
    console.log("here")
});



ipcMain.on('selectItem', (event, item) => {

  const tabelName = item;
  createSellSchema().then(r=>{
    knex(tabelName).select("*").then(r=>{
      console.log(r)
      event.reply("fetchsuccessfully",r)
    }).catch(e=>{
      console.log(e)
    })
  }).catch(e=>{
    
  })
});
ipcMain.on('fromaddress', (event, item) => {
  var d = moment().format("YYYY-MM-DD").toString();
  createfromaddress().then(r=>{
    knex("Fromaddress").select("*").then(r=>{
      console.log("number of select "+r)
      if(r.length>=1)
      {
        console.log("if")
        knex("Fromaddress").update({"date":d,"CustomerName":item.CustomerName,"Cddress":item.CustomerAdd,"Cpin":item.CPin,"Cphone":item.CPhone}).where({id:1}).then(r=>{
          event.reply("fromadressfetchsuccessfully",r)
        }).catch(e=>{
          event.reply("fromadresserrorInsert",e)
        })
      }
      else{
        console.log("else")
        knex("Fromaddress").insert({"date":d,"CustomerName":item.CustomerName,"Cddress":item.CustomerAdd,"Cpin":item.CPin,"Cphone":item.CPhone}).then(r=>{
          event.reply("fromadressfetchsuccessfully",r)
        }).catch(e=>{
          event.reply("fromadresserrorInsert",e)
        })
      }
      
    }).catch(e=>{
      event.reply("fromadresserrorInsert",e)
    })
  }).catch(e=>{
    event.reply("fromadresserrorInsert",e)
  })
});

ipcMain.on('selectfromaddress', (event, item) => {
 
  createfromaddress().then(r=>{
    knex("Fromaddress").select("*").then(r=>{
      console.log(r)
      event.reply("fromadressfetchsuccessfully",r)
    }).catch(e=>{
      console.log(e)
    })
  }).catch(e=>{
    
  }).catch(e=>{
    event.reply("fromadresserrorInsert",e)
  })
});

ipcMain.on('selectItemDate', (event, item) => {

  const tabelName = item.data;
  createSellSchema().then(r=>{
    knex(tabelName).select("*").where('date','>=',item.from).where('date','<=',item.to).then(r=>{
      console.log(r)
      event.reply("fetchsuccessfully",r)
    }).catch(e=>{
      console.log(e)
    })
  }).catch(e=>{
    
  })
});


ipcMain.on('sellItem', (event, item) => {
  console.log("*****************************************************************************************")
  const sql = item;
  console.log(sql.item)
  var d = moment().format("YYYY-MM-DD").toString();
  for (var i = 0; i < sql.item.length; i++) {
    var j = 0;
    let s = sql.item[i];
    console.log(s)
    createSchema().then(r=>{
      knex('ItemBuy').select("quantity").where({itemName:s["item"]}).then(r=>{
        if(r.length>0)
        {
          var quan = parseInt(r[0]["quantity"]) - parseInt(s["quantity"]);
          if(quan<0)
          {
            console.log(quan)
           
            event.reply("sellerrorInsert",s["item"] + " quantity is more than the expected")

          }
          else{
            j=j+1;
            console.log("j = "+j)
            if(j==sql.item.length)
            {
                   console.log("inside")
    for (var i = 0; i < sql.item.length; i++) {
      let s = sql.item[i];
      var rrr = 1;
      console.log("insied val")
      createSchema().then(r=>{
        knex('ItemBuy').select("quantity").where({itemName:s["item"]}).then(r=>{
          if(r.length>0)
          {
            var quan = parseInt(r[0]["quantity"]) - parseInt(s["quantity"]);
            if(quan<0)
            {
              return event.reply("sellerrorInsert",s["item"] + " quantity is more than the expected")
  
            }else{
              knex('ItemBuy').update({quantity:quan}).where({itemName:s["item"]}).then(r=>{
                console.log("user updated")
                if(rrr == sql.item.length)
                {
                  createSellSchema().then(r=>{
                    let ss = JSON.stringify(sql.item)
                    knex('ItemSell').insert({date:d, item: ss,CustomerName:item["CustomerName"],Cddress:item["Cddress"],Cphone:item["Cphone"],Invoice:item["Invoice"]}).then(r=>{
                      console.log("ItemSell added")
                      return event.reply("sellfetchsuccessfully","Successfully Sold the Item")
                
                  }).catch(e=>{
                    event.reply("sellerrorInsert","Error occurred while updating value in Sell Item")
                  })
                  }).catch(e=>{
                    event.reply("sellerrorInsert","Error occurred while creating Buy Item")
                  })
                }
                rrr++;

              
            }).catch(e=>{
             
              return event.reply("sellerrorInsert","Error occurred while updating value in Buy Item")
            })
            }
          }
        })
        
    
    }).catch(e=>console.log(e))
      }
 

            }
            

          }
        }
      })
    })

  }

  
  });

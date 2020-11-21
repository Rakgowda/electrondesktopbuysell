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
      table.string('date')
      
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
      table.string('itemName');
      table.integer('quantity');
      table.decimal('price');
      table.string('date');
      table.string('CustomerName');
      table.string('Cddress');
      table.string('Cphone');
    
      
    });
  }

ipcMain.on('itemAdding', (event, item) => {
    const sql = item;
    var d = moment().format("DD-MM-YYYY").toString();

    createSchema().then(r=>{
        for (var key of Object.keys(sql)) {
            

            knex('ItemBuy').select("quantity").where({itemName:sql[key]["itemname"]}).then(r=>{
              if(r.length==0)
              {
                knex('ItemBuy').insert({date:d, itemName: sql[key]["itemname"],quantity:parseInt(sql[key]["quantity"]),price: parseFloat(sql[key]["price"])}).then(r=>{
                  console.log("user added")
              }).catch(e=>console.log(e))
              }
              else{
                var quan = parseInt(sql[key]["quantity"])+parseInt(r[0]["quantity"]);
                knex('ItemBuy').update({date:d,quantity:quan,price: parseFloat(sql[key]["price"])}).where({itemName:sql[key]["itemname"]}).then(r=>{
                  console.log("user updated")
              }).catch(e=>console.log(e))
              }
            }).catch(e=>console.log(e))
          }

          event.reply("insetDetail","item is added successfully")
        
        
    }).catch(e=>console.log(e))

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
  knex(tabelName).select("*").then(r=>{
    console.log(r)
    event.reply("fetchsuccessfully",r)
  }).catch(e=>{
    console.log(e)
  })
});


ipcMain.on('sellItem', (event, item) => {
  const sql = item;
  var d = moment().format("DD-MM-YYYY").toString();
  createSchema().then(r=>{
   
        knex('ItemBuy').select("quantity").where({itemName:item["itemName"]}).then(r=>{
          if(r.length>0)
          {
            var quan = parseInt(r[0]["quantity"]) - parseInt(item["quantity"]);
            if(quan<0)
            {
              event.reply("sellerrorInsert","Quantity is more than the expected")

            }
            else{
              knex('ItemBuy').update({quantity:quan}).where({itemName:item["itemName"]}).then(r=>{
                console.log("user updated")
                createSellSchema().then(r=>{
                  knex('ItemSell').insert({date:d, itemName: item["itemName"],quantity:parseInt(item["quantity"]),price: parseFloat(item["price"]),CustomerName:item["CustomerName"],Cddress:item["Cddress"],Cphone:item["Cphone"]}).then(r=>{
                    console.log("ItemSell added")
                    event.reply("sellfetchsuccessfully","Successfully Sold the Item")

                }).catch(e=>{
                  event.reply("sellerrorInsert","Error occurred while updating value in Sell Item")
                })
                }).catch(e=>{
                  event.reply("sellerrorInsert","Error occurred while creating Buy Item")
                })
            }).catch(e=>{
              event.reply("sellerrorInsert","Error occurred while updating value in Buy Item")
            })
            }
            
          }
          
        }).catch(e=>console.log(e))
      

  
    
    
}).catch(e=>console.log(e))
});

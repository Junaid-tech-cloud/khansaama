const {mongoose, ObjectID} = require('../app/config/');
const {Order} = require('../models/order');
const {Chef} = require('../models/chef');
const {Customer} = require ('../models/customer.js');

module.exports = {

    placeOrder: async (req, res, next) => {
        var newOrder;
        let {itemsOrdered, orderedBy, createdBy, orderDate, bill, status} = req.body;
        let createdByFiltered = [];
        let chefNames = [];
        let customerName = "";
        await Customer.findById(orderedBy)
            .then((customer) => {
                customerName = customer.name;
            });

     
       for(var i =0; i<createdBy.length; i++) {
        if(createdByFiltered.indexOf(createdBy[i]) == -1){
            createdByFiltered.push(createdBy[i]);
            await Chef.findById(createdByFiltered[i])
                .then((chef) => {
                    chefNames.push(chef.name);
                }).catch((err) => {

                });
        }
       }

        newOrder = new Order ({
            itemsOrdered,
            orderedBy,
            customerName,
            createdBy: createdByFiltered,
            chefNames,
            orderDate,
            bill,
            status
        });

        await newOrder.save().then((order) => {
            res.status(200).send(order);
        }).catch((err) => {
            res.status(200).send(err)
        });
          return next();
        
    },

    getIncomplete : async (req, res, next) => {
        var ongoingOrders;
        
        if(req.body.role === "chef") {
            ongoingOrders = await Order.find({"itemsOrdered.itemSeller": req.body.id, status: 0});
        res.status(200).send({orders: ongoingOrders});
        } else if (req.body.role === "customer") {
        
            ongoingOrders = await Order.find({orderedBy: req.body.id, status: 0});

            
            res.status(200).send({orders: ongoingOrders});
        }
    },

    getAll: async (req, res, next) => {
        var allOrders;

        if(req.body.role === "chef") {
            allOrders = await Order.find({createdBy: req.body.id});
        res.status(200).send({orders: allOrders});
        } else if (req.body.role === "customer") {
        
            allOrders = await Order.find({orderedBy: req.body.id});

            
            res.status(200).send({orders: allOrders});
        }

    },

    getById: async (req,res,next) => {
        Order.findById(req.params.id).then((order) => {
            res.send(order);
        });
    }
};
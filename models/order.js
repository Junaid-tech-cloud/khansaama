const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const date = new Date();
var dd = date.getDate();
var mm = date.getMonth();
var yy = date.getFullYear();
var hh = date.getHours();
var mn = date.getMinutes();
//creates an order schema
var orderSchema = new Schema ({

    itemsOrdered: [{

        
        itemId:
            {
                type: Schema.ObjectId,
                ref: "Food",
                required: true
            },
        itemName: {
                type: String,
                required: true
        },
        itemQuantity: {
                type: Number,
                required: true
            },
        itemSeller: {
            type: Schema.ObjectId,
            ref: "Chef",
            required: true
        },
        itemSellerName: {
            type: String
        },
        itemTotalPrice: {
            type: Number,
            require: true
        }
        
    } ],
    orderedBy: {
        type: Schema.ObjectId,
        ref: "Customer",
        required: true
    },

    customerName: {
        type: String
    },

    createdBy: {
        type: [Schema.ObjectId],
        ref: "Chef",
        required: true
    },

    chefNames: {
        type: [String]
    },

    orderDate: {
        type: String,
        default: dd + "-" + mm + "-" + yy + "-" + hh + ":" + mn
    },

    status: {
        type: Boolean,
        default: false
    },
    bill: {
        type: Number,
        required: true,
        default: 0.00
    }

});

//Creates ths order model
var Order = mongoose.model("Order", orderSchema);

//exports the model
module.exports = {Order};
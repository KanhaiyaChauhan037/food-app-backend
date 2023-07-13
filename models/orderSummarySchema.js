const mongoose = require('mongoose');

const orderSummarySchema = new mongoose.Schema({
     orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
          required: true,
     },
     dishes: [
          {
               dishId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Menu',
                    required: true,
               },
               dishName: {
                    type: String,
                    required: true,
               },
               dishDescription: {
                    type: String,
                    required: true,
               },
               quantity: {
                    type: Number,
                    required: true,
               },
               price: {
                    type: Number,
                    required: true,
               },
          },
     ],
     total: {
          type: Number,
          required: true,
     },
     deliveryTime: {
          type: String,
          required: true,
     },
});

const OrderSummary = mongoose.model('OrderSummary', orderSummarySchema);

module.exports = OrderSummary;

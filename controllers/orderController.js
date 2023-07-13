const Order = require('../models/orderModel');
const Menu = require("../models/menuModel");
const OrderSummary = require('../models/orderSummarySchema');


// Controller function to place an order

// const placeOrder = async (req, res) => {
//      try {
//           const { dishes, total, deliveryTime } = req.body;

//           const orderItems = await Promise.all(
//                dishes.map(async (dish) => {
//                     const { dishId, quantity } = dish;
//                     const menuDish = await Menu.findById(dishId);
//                     if (!menuDish) {
//                          throw new Error(`Dish with ID ${dishId} not found`);
//                     }
//                     return {
//                          dish: menuDish,
//                          quantity,
//                     };
//                })
//           );

//           const order = await Order.create({ dishes: orderItems, total, deliveryTime });

//           const orderSummary = {
//                orderId: order._id,
//                dishes: orderItems.map((item) => ({
//                     dishName: item.dish.name,
//                     quantity: item.quantity,
//                     price: item.dish.price,
//                })),
//                total: order.total,
//                deliveryTime: order.deliveryTime,
//           };

//           res.status(201).json(orderSummary);
//      } catch (error) {
//           res.status(500).json({ message: 'Error placing order', error: error.message });
//      }
// };


// const placeOrder = async (req, res) => {
//      try {
//           const { dishes, total, deliveryTime } = req.body;

//           const orderItems = await Promise.all(
//                dishes.map(async (dish) => {
//                     const { dishId, quantity } = dish;
//                     const menuDish = await Menu.findById(dishId);
//                     if (!menuDish) {
//                          throw new Error(`Dish with ID ${dishId} not found`);
//                     }
//                     return {
//                          dish: menuDish,
//                          quantity,
//                     };
//                })
//           );

//           const order = await Order.create({ dishes: orderItems, total, deliveryTime });

//           const orderSummary = {
//                orderId: order._id,
//                dishes: orderItems.map((item) => ({
//                     dishId: item.dish._id,
//                     name: item.dish.name,
//                     description: item.dish.description,
//                     price: item.dish.price,
//                     quantity: item.quantity,
//                })),
//                total: order.total,
//                deliveryTime: order.deliveryTime,
//           };
          
//           res.status(201).json(orderSummary);
//      } catch (error) {
//           res.status(500).json({ message: 'Error placing order', error: error.message });
//      }
// };


const placeOrder = async (req, res) => {
     try {
          const { dishes, total, deliveryTime } = req.body;

          const orderItems = await Promise.all(
               dishes.map(async (dish) => {
                    const { dishId, quantity } = dish;
                    const menuDish = await Menu.findById(dishId);
                    if (!menuDish) {
                         throw new Error(`Dish with ID ${dishId} not found`);
                    }
                    return {
                         dish: menuDish,
                         quantity,
                    };
               })
          );

          const order = await Order.create({ dishes: orderItems, total, deliveryTime });

          const orderSummary = {
               orderId: order._id,
               dishes: orderItems.map((item) => ({
                    dishId: item.dish._id,
                    dishName: item.dish.name,
                    dishDescription: item.dish.description,
                    quantity: item.quantity,
                    price: item.dish.price,
               })),
               total: order.total,
               deliveryTime: order.deliveryTime,
          };

          const savedOrderSummary = await OrderSummary.create(orderSummary);

          res.status(201).json(savedOrderSummary);
     } catch (error) {
          res.status(500).json({ message: 'Error placing order', error: error.message });
     }
};

// Controller function to retrieve an order by ID
const getOrder = async (req, res) => {
     try {
          const { orderId } = req.params;
          const order = await Order.findById(orderId);
          if (!order) {
               return res.status(404).json({ message: 'Order not found' });
          }
          res.json(order);
     } catch (error) {
          res.status(500).json({ message: 'Error retrieving order', error });
     }
};

const getAllOrderSummaries = async (req, res) => {
     try {
          const orderSummaries = await OrderSummary.find();
          res.json(orderSummaries);
     } catch (error) {
          res.status(500).json({ message: 'Error retrieving order summaries', error: error.message });
     }
};

module.exports = {
     placeOrder,
     getOrder,
     getAllOrderSummaries,
};





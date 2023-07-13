const Menu = require('../models/menuModel');

// Controller function to retrieve the menu
const getMenu = async (req, res) => {
     try {
          const menu = await Menu.find();
          res.json(menu);
     } catch (error) {
          res.status(500).json({ message: 'Error retrieving menu', error });
     }
};

module.exports = {
     getMenu,
};

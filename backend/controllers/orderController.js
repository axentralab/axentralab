const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total, paymentMethod = 'stripe' } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
      });
    }

    if (!total || typeof total !== 'number' || total <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order total',
      });
    }

    // Ensure all items have required fields
    const validItems = items.every(item => 
      item.serviceTitle && item.plan && item.price && typeof item.price === 'number'
    );

    if (!validItems) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item format. Each item must have serviceTitle, plan, and price',
      });
    }

    const order = await Order.create({
      ...req.body,
      user: req.user._id,
      paymentMethod,
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt').populate('items.service', 'title');
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.service', 'title');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin only
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt').populate('user', 'name email');
    res.json({ success: true, data: orders, count: orders.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

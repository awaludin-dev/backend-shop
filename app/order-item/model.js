const { Schema, model } = require('mongoose');

const orderItemSchema = Schema({
    name: {
        type: String,
        minLength: [5, 'Panjang nama makanan minimal 5 karakter'],
        required: [true, 'name must be filled']
    },
    price: {
        type: Number,
        required: [true, 'Harga item harus diisi']
    },
    qty: {
        type: Number,
        required: [true, 'Kuantitas harus diisi'],
        min: [1, 'Kuantitas minimal 1']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    Order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = model('OrderItem', orderItemSchema);
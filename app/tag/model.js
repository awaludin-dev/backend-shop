const { Schema, model } = require('mongoose');

const tagSchema = Schema({
    name: {
        type: String,
        minLength: [3, 'Panjang nama tag minimal 3 karakter'],
        maxLength: [20, 'Panjang nama tag maksimal 3 karakter'],
        required: [true, 'Nama kategori harus diisi']
    }
})

module.exports = model('Tag', tagSchema);
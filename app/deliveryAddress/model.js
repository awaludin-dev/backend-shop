const { Schema, model } = require('mongoose');

const deliveryAddressSchema = Schema({
    nama: {
        type: String,
        required: [true, 'Nama alamt harus diisi'],
        maxLength: [255, 'Panjang maksimal nama alamat adalah 255 karakter']
    },
    kelurahan: {
        type: String,
        required: [true, 'Kelurahan harus diisi'],
        maxLength: [255, 'Panjang maksimal kelurahan adalah 255 karakter']
    },
    kecamatan: {
        type: String,
        required: [true, 'Kecamatan harus diisi'],
        maxLength: [255, 'Panjang maksimal kecamatan adalah 255 karakter']
    },
    kabupaten: {
        type: String,
        required: [true, 'Kabupaten harus diisi'],
        maxLength: [255, 'Panjang maksimal kabupaten adalah 255 karakter']
    },
    provinsi: {
        type: String,
        required: [true, 'Provinsi harus diisi'],
        maxLength: [255, 'Panjang maksimal provinsi adalah 255 karakter']
    },
    detail: {
        type: String,
        required: [true, 'Detail alamat harus diisi'],
        maxLength: [255, 'Panjang maksimal detail alamat adalah 255 karakter']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

module.exports = model('DeliveryAddress', deliveryAddressSchema);
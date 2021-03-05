const mongoose = require('mongoose')


const samplesSchema = new mongoose.Schema(
    {
		date: String,
		heartStatus: Number,
		pulse: Number,
		hasECG: Boolean,
		anomaly: Boolean,
		user: Number,
	},
)

const Samples = mongoose.model('Sample', samplesSchema)
module.exports = Samples
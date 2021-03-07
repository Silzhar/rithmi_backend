const mongoose = require('mongoose')

const samplesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    date: { type: String },
    heartStatus: { type: Number },
    pulse: { type: Number },
    hasECG: { type: Boolean },
    anomaly: { type: Boolean },
    user: { type: Number },
  },
  {
    timestamps: true,
  }
)

const Samples = mongoose.model('Sample', samplesSchema)
module.exports = Samples

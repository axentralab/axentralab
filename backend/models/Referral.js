const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,
  },
  referralLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'activated', 'completed'],
    default: 'pending',
  },
  commissionPercentage: {
    type: Number,
    default: 15, // 15% commission
  },
  tier: {
    type: String,
    enum: ['bronze', 'silver', 'gold', 'vip_elite'],
    default: 'bronze',
  },
  tierName: {
    type: String,
    default: 'Bronze Partner',
  },
  bountyAmount: {
    type: Number,
    default: 0, // $200 for Gold/Elite high-ticket clients
  },
  isHighTicket: {
    type: Boolean,
    default: false, // True if order value >= $1000
  },
  commissionAmount: {
    type: Number,
    default: 0,
  },
  projectValue: {
    type: Number,
    default: 0,
  },
  orderValue: {
    type: Number,
    default: 0,
  },
  refereeEmail: {
    type: String,
    required: true,
  },
  activatedAt: {
    type: Date,
    default: null,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Compound index for referrer and referee
referralSchema.index({ referrer: 1, referee: 1 });
referralSchema.index({ referralCode: 1 });
referralSchema.index({ status: 1 });

module.exports = mongoose.model('Referral', referralSchema);

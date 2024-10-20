const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['email', 'sms', 'push'], required: true },
    status: { type: String, enum: ['read', 'unread'], default: 'unread' },
    date: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Notification', NotificationSchema);
  
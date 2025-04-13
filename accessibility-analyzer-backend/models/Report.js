import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    url: { 
        type: String,
        required: true
    },
    score: { 
        type: Number, 
        required: true 
    },
    audits: { 
        type: Object, 
        required: true 
    },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;

const mongoose=require('mongoose')

const leaveSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      userName: { 
        type: String, 
        required: true 
      },
    
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    appliedAt: { type: Date, default: Date.now },

    
},
    {timestamps:true}
    

);

module.exports=mongoose.model("Leave",leaveSchema)
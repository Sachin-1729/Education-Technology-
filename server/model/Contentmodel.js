const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
   
    planId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership',
        required: true
    },
    Content_title:{
        type: String,
        required: true
    },
    Content_description:{
        type: String,
        required: true
    },
    videos:[
        {
            url: {type: String ,
                required: true
            },
           
        }
    ],
    documents:[
        {
            url: {type: String ,
                required: true
            },
          
        }
    ]

} , { timestamps: true });


// Export the model
const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
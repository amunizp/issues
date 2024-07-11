const mongoose = require("mongoose"); 

const issueSchema = new mongoose.Schema({
    courtName: {type:String, require: true, trim:true},
    courtNumber: {type:Number, require:false},
    locations:[{type:String, enum:["window", "door", "floor", "celing", "wall", "other"]}],
    category:[{type:String, enum:["damp", "paint", "crack", "broken", "other"]}],
    img:{type:String, require:false},
    description:{type:String, require:true},
    reporter: {type:String},
    assignTo:[{type:String, enum:["painter", "joiner", "carpenter", "builder", "electrician", "plumber", "roofer","handyperson", "gardener", "committee","advisoryGroup", "other"  ]}],
    update:[{ type: mongoose.Types.ObjectId, require: false, ref: 'updateIssues'}]
}, {
    timestamps:true, 
});

const Issue = mongoose.model("Issue", issueSchema, "Issue");
module.exports = Issue; 
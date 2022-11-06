const mongoose =require('mongoose')


const ArticleSchema = new mongoose.Schema({
    title:{
        type : String,
        required: [true, "Please include a title to your article"],
        unique : [true, "title already exists, please try another title"],
        lowercase : true

    },

    description :{type : String },

    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }, 
    content : {
        type: String,
        required: [true, " No content added"]
    }, 
    tags : {
        type : String,
        default: "Others",
        lowercase : true 
    },
    state :{
        type : String,
        enum : ["draft", "published"],
        default : "draft",
        lowercase : true
    },
    read_count : {
        type : Number,
        default :0
    },
    reading_time: {
        type: String
    }

}, {  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }}
  )

const ArticleModel  = mongoose.model('Article', ArticleSchema);
module.exports = ArticleModel;


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = require('./users'); // needed?

var QuoteSchema = new Schema ({
    quote: String,
    likes: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt:{type: Date, default: Date.now()},
    udpatedAt:{type: Date, default: Date.now()}
}, 
// {timestamps:true}
    { usePushEach: true}
)

mongoose.model('Quote', QuoteSchema);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var quote = require('./quote'); 

var UserSchema = new Schema ({
    name: String,
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
}, 
{timestamps:true, usePushEach: true}
)

mongoose.model('User', UserSchema);


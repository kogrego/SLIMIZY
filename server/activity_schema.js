var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    activitySchema,
    ActivitySchema;

ActivitySchema = new schema({
    name: String,
    MET: Number
}, {collection: 'activities'});

activitySchema = mongoose.model('activitySchema', ActivitySchema);

module.exports = activitySchema;
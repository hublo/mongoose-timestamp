/*!
 * Mongoose Timestamps Plugin
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * Original work Copyright(c) 2012 Brian Noguchi
 * MIT Licensed
 */

var BinaryParser = require('bson').BinaryParser;

function timestampsPlugin(schema, options) {
  schema.add({
    updatedAt: Date,
    createdAt: Date
  });
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.updatedAt = this.createdAt = schema.path('_id') ? this._id.getTimestamp() : new Date;
    } else {
      this.updatedAt = new Date;
    }
    next();
  });
}

module.exports = timestampsPlugin;
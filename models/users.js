const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamp');


/*
send, deferral, hard_bounce, soft_bounce, open, click, spam, unsub, reject
 */
const UserSchema = {
    name: String,
    password: String
}

const User = new Schema(UserSchema);

User.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

function _createQuery(options) {
    const query = options.filter ? this.find(options.filter) : this.find({});
    query.sort(options.sort);
    query.skip(options.skip || 0);
    query.limit(options.limit || 0);
    query.select(options.selection);
    query.lean(options.hasOwnProperty('lean') ? options.lean : true);
    return query;
}

User.statics.add = function (element) {
    return new Promise((resolve, reject) => {
        this.create(element, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data._id);
        })
    });
};

User.statics.getAll = function (options) {
    return new Promise((resolve, reject) => {
        const query = _createQuery.call(this, options);
        query.exec((err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        })
    });
};
User.statics.get = function (_id) {
    return new Promise((resolve, reject) => {
        this.find({
            _id
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data[0]);
        })
    });
};

User.statics.edit = function (_id, element) {
    return new Promise((resolve, reject) => {
        this.update({
            _id
        }, element, {
            upsert: true
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            console.log(data);
            resolve(data._id);
        })
    });
}

User.statics.delete = function (_id) {
    return new Promise((resolve, reject) => {
        this.remove({
            _id
        }, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    });
}

module.exports = require('mongoose').model('User', User);
/* eslint-disable no-console */
import passport from 'passport';

module.exports = (app, model) => {
    app.post('/path/to/api/endpoint', (req, res) => {
        var datatablesQuery = require('datatables-query'),
            params = req.body,
            query = datatablesQuery(Model);

        query.run(params).then(function (data) {
            res.json(data);
        }, function (err) {
            res.status(500).json(err);
        })
    })
}
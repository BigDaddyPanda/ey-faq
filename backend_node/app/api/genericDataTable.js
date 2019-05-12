module.exports = (app, dbModel,path) => app.post(`/${path}`, function (req, res) {

    let options = {
        attributes: ['title', 'content'],
        page: 1, // Default 1
        paginate: 25, // Default 25
        order: [
            ['title', 'DESC']
        ]
    };
    if (req.body) {
        let {
            attributes,
            page,
            paginate,
            order
        } = req.body;
        attributes= JSON.parse(attributes)
        order= JSON.parse(order)
        // console.log("ez",attributes, page, paginate, order);

        options = {
            attributes,
            page,
            paginate,
            order
        }
    }

    dbModel.paginate(options).then(
        q => {
            const {
                docs,
                pages,
                total
            } = q;
            // console.log(q.page);

            res.json({
                docs,
                pages,
                total
            })
            console.log(req.protocol + '://' + req.get('host') + req.originalUrl);

        }
    )

})
export const asds = (x) => {
    if (x == "asc") return "ASC"
    if (x == "des") return "DESC"
    return x
}
module.exports = (app, dbModel, path) => app.get(`/${path}/`, function (req, res) {

    let options = {
        attributes: ['id'],
        page: 1, // Default 1
        paginate: 10, // Default 25
        order: [
            ['id', 'ASC']
        ]
    };
    if (req.query) {
        for (const key in req.query) {

            if (req.query.hasOwnProperty(key)) {
                const element = req.query[key];
                switch (key) {
                    case 'attributes':
                        options[key] = element.split(',');
                        break;
                    case 'order':
                        options[key] = [element.split(',')];
                        break;
                    case 'sort':
                        options['order'] = [element.split('|').map(e => asds(e))];
                        break;
                    case 'page':
                        options[key] = Number(element);
                        break;
                    case 'paginate':
                        options[key] = Number(element);
                        break;
                    default:
                        options[key] = (element)
                        break;
                }
            }
        }
        console.log(options)
    }

    dbModel.paginate(options).then(
        q => {
            let {
                docs,
                pages,
                total
            } = q;
            if (options.filter) {
                docs = docs.filter(e => (e.designation.indexOf(options.filter) > -1))
            }
            // // console.log(q.page);

            let data_resp = {
                "total": total,
                "per_page": options.paginate,
                "current_page": options.page,
                "last_page": pages,
                "next_page_url": options.page == pages ? null : req.protocol + '://' + req.get('host') + `/${path}?sort=${options.order[0].join(',')}&filter=d&per_page=${options.paginate}&page=${options.page+1}`,
                "prev_page_url": options.page == 1 ? null : req.protocol + '://' + req.get('host') + `/${path}?sort=${options.order[0].join(',')}&filter=d&per_page=${options.paginate}&page=${options.page-1}`,
                "from": options.paginate * (options.page - 1) + 1,
                "to": options.page * options.paginate,
                "data": docs
            }
            res.json(data_resp)
            // console.log(req.protocol + '://' + req.get('host') + /${path}/);

        }
    )

})
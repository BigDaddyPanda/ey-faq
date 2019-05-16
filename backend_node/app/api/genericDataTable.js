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
                        options['order'] = [element.split(/[|,]/).map(e => asds(e))];
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
            // assuming we will ask for "id","title" 
            if (options.attributes.length > 1 && options.filter && options.filter != '')
                docs = docs.filter(e => (e[options.attributes[1]].indexOf(options.filter) > -1));
            if (options.service_id)
                docs = docs.filter(e => (e.dataValues.id == options.service_id));
            // console.log(
            //     // e.serviceId,options.service_id,
            //     docs.map(e => ([e.dataValues.id,e.serviceId,options.service_id] ))
            // );
            // console.log(options.service_id == 2);

            // let fin_doc = [], vis_id = [];
            // if (options.filter && options.filter != '') {
            //     options.attributes.forEach(att => {
            //         if (!["number", "boolean"].includes(typeof (att))) {
            //             var x = docs.filter(e => (e[att].indexOf(options.filter) > -1));
            //             x.forEach(d => {
            //                 if (vis_id.indexOf(d.id) == -1) {
            //                     vis_id.push(d.id);
            //                     fin_doc.push(d);
            //                 }
            //             })
            //         }

            //     });
            // }
            // else {
            //     fin_doc = docs;
            // }
            // // console.log(q.page);

            let data_resp = {
                "total": total,
                "per_page": Math.min(total, options.paginate),
                "current_page": options.page,
                "last_page": pages,
                "next_page_url": options.page == pages ? null : req.protocol + '://' + req.get('host') + `/${path}?sort=${options.order[0].join(',')}&filter=d&per_page=${options.paginate}&page=${options.page + 1}`,
                "prev_page_url": options.page == 1 ? null : req.protocol + '://' + req.get('host') + `/${path}?sort=${options.order[0].join(',')}&filter=d&per_page=${options.paginate}&page=${options.page - 1}`,
                "from": options.paginate * (options.page - 1) + 1,
                "to": options.page * options.paginate,
                "data": docs
            }
            res.json(data_resp)
            // console.log(req.protocol + '://' + req.get('host') + /${path}/);

        }
    )

})
function (doc, req) {
    var ddoc = this;
    var fs = require('lib/flatstache'),
        md = require('lib/markdown');
    provides("html", function () {
        var db_url = '/' + req.info.db_name,
            app_url = fs.to_html("{{{db_url}}}/{{{id}}}", {db_url:db_url, id:ddoc._id});
        
        doc || (doc = {content:''});
        return fs.to_html(ddoc.templates.rendered, {
            db_url:db_url, app_url:app_url, id: doc._id,
            summary: doc.content.slice(0,255), content: md.toHTML(doc.content)
        });
    });
}

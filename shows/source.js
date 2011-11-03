function (doc, req) {
    var ddoc = this;
    var fs = require('lib/flatstache');
    provides("html", function () {
        var db_url = '/' + req.info.db_name,
            app_url = fs.to_html("{{{db_url}}}/{{{id}}}", {db_url:db_url, id:ddoc._id});
        
        doc || (doc = {creating:true, content:''});
        return fs.to_html(ddoc.templates.source, {
            db_url:db_url, app_url:app_url, id: doc._id,
            summary: (doc.creating) ? "(new)" : doc.content.slice(0,255), content: doc.content
        });
    });
}

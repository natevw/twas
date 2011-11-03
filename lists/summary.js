function (head, req) {
    var ddoc = this;
    var fs = require('lib/flatstache');
    provides("html", function () {
        var app_url = fs.to_html("/{{{db}}}/{{{id}}}", {db:req.info.db_name, id:ddoc._id});
        var row, notes = "", template = "<li><a href='{{app_url}}/_show/rendered/{{id}}'>{{ intro }}</a></li>";
        while (row = getRow()) {
            notes += fs.to_html(template, {app_url:app_url, id:row.id, intro:row.value});
        }
        return fs.to_html(ddoc.templates.summary, {app_url:app_url, notes:notes});
    });
}

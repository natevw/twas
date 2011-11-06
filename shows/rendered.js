function (doc, req) {
    var ddoc = this;
    var fs = require('lib/flatstache'),
        md = require('lib/markdown');
    provides("html", function () {
        var db_url = '/' + req.info.db_name,
            app_url = fs.to_html("{{{db_url}}}/{{{id}}}", {db_url:db_url, id:ddoc._id});
        
        doc || (doc = {content:''});
        
        var contentTree = md.toHTMLTree(doc.content);
        function convertRelative(node) {
            var attributes, children;
            if (!Array.isArray(node)) return;   // text node, skip
            if (typeof node[1] == "object" && !Array.isArray(node[1])) {
                attributes = node[1];
                children = node.slice(2);
            } else {
                attributes = {};
                children = node.slice(1);
            }
            Object.keys(attributes).forEach(function (key) {
                if (key == 'href' || key == 'src') {
                    var link = attributes[key];
                    if (link.indexOf("./") == 0) {
                        link = db_url + '/' + doc._id + '/' + link.slice(2);
                    }
                    attributes[key] = link;
                }
            });
            children.forEach(convertRelative);
        }
        convertRelative(contentTree);
        
        return fs.to_html(ddoc.templates.rendered, {
            db_url:db_url, app_url:app_url, id: doc._id,
            summary: doc.content.slice(0,255), content: md.renderJsonML(contentTree)
        });
    });
}

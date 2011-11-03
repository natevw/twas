function (doc, req) {
    var ddoc = this;
    var fs = require('lib/flatstache');
    if (!doc) {
        doc = {'com.stemstorage.note':true};
        if (req.id) doc._id = req.id;
        else doc._id = 'note-' + req.uuid;
    } else if (!doc['com.stemstorage.note']) {
        throw Error("Not a note.");
    }
    
    doc.last_modified = new Date().toISOString();
    doc.content = req.form.content;
    
    var appURL = '/' + req.info.db_name + '/' + ddoc._id,
        noteURL = appURL + '/_show/rendered/' + doc._id;
    return [doc, { 
        headers: {'Location': noteURL}, code: 303,
        body: fs.to_html(ddoc.templates.update_source, {noteURL:noteURL})
    }];
}

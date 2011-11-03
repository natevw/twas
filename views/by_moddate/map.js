function (doc) {
    if (doc['com.stemstorage.note']) emit(doc.last_modified, doc.content.split('\n')[0].slice(0,255));
}
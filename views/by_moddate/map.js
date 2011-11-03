function (doc) {
    if (doc['com.stemstorage.note']) emit(doc.last_modified, doc.content.slice(0,255));
}
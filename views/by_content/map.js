function (doc) {
    if (doc['com.stemstorage.note']) emit(doc.content.replace(/\W*(\w+)\W*/g, '$1 ').slice(0,255), doc.content.slice(0,255));
}
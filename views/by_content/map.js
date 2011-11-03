function (doc) {
    if (doc['com.stemstorage.note']) emit(doc.content.replace(/\W*(\w+)\W*/g, '$1 ').slice(0,255), doc.content.split('\n')[0].slice(0,255));
}
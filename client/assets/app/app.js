var templates = [
  {
    label: 'searchResult',
    path: 'app/search/',
    name: 'result.html',
    models: [
      {
        path: 'app/search/',
        name: 'result.js'
      }
    ]
  },
  {
    label: 'listingDetail',
    path: 'app/listing/',
    name: 'detail.html',
    models: [
      {
        path: 'app/listing/',
        name: 'detail.js'
      }
    ]
  }
]

$(function() {
  templastore.load(templates);
})
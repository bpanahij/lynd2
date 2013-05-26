/**
 * Templastore an organized external template loader
 */
(function() {

  var root = this
  var api = {}
  /**
   * Provide access to necessary functionality beyond this context,
   * only when we are in a browser environment. Otherwise (i.e. testing
   * these need to be mocked out)
   */
  if (typeof window !== 'undefined')
  {
    api._ = window._
    api.$ = window.$
  }
  /**
   * Provide both browser and server (node)
   * for Node.js (mainly for unit testing) module.exports : exportability,
   * for the browser add api as global object via a string identifier,
   */
  if (typeof exports !== 'undefined')
  {
    if (typeof module !== 'undefined' && module.exports)
    {
      exports = module.exports = api
    }
    exports = api;
    api._ = require('underscore')
    api.$ = require('cheerio')
  }
  else
  {
    root.templastore = api;
  }
  /**
   * Provide a list of {label: xxxx, path: xxxx, name: xxxx} objects
   * one for each templates.
   * @param list
   */
  api.load = function(list) {
    var loadedTemplates = []
    ko.utils.arrayForEach(list, function(file) {
      $.get("assets/" + file.path + file.name, function(template) {
        $("body").append("<script id=\"" + file.label + "\" type=\"text/html\">" + template + "<\/script>")
        loadedTemplates.push(file.label)
      })
      ko.utils.arrayForEach(file.models, function(model) {
        var loadedModels = []
        $.get("assets/" + model.path + model.name, function(script) {
          $("body").append("<script type=\"text/javascript\">" + script + "<\/script>")
          loadedModels.push(model)
        })
      })
    })
  }
}).call(this)
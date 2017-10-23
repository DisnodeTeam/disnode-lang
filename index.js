const fs = require('fs');
const logger = require("disnode-logger");
class Lang {
  constructor() {
    logger.Success("Lang","Start","New Lang instance created!")
  }
  getPack(lang, pack){
    try {
      logger.Info("Lang","getPack","Attempt to get pack: " + lang + "/" + pack);
      return require("./lang/" + lang + "/" + pack);
    } catch (e) {
      logger.Error("Lang","getPack","Error when getting pack: " + lang + "/" + pack + "  ::  " + e);
    }
  }
  getSupportedLanguages(cb){
    fs.readdir("./lang", function(err, files) {
      var dirs = [];
      for (var index = 0; index < files.length; ++index) {
        var file = files[index];
        if (file[0] !== '.') {
          var filePath = "./lang/" + file;
          fs.stat(filePath, function(err, stat) {
            if (stat.isDirectory()) {
              dirs.push(this.file);
            }
            if (files.length === (this.index + 1)) {
              return cb(dirs);
            }
          }.bind({index: index, file: file}));
        }
      }
    });

  }
}
module.exports = Lang;

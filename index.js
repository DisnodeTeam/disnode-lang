const fs = require('fs');
const logger = require("disnode-logger");
class Lang {
  constructor(dir) {
    this.dir = dir;
    logger.Success("Lang","Start","New Lang instance created!")
  }
  getPack(lang, pack){
    try {
      return require(this.dir + "/lang/" + lang + "/" + pack);
    } catch (e) {
      logger.Error("Lang","getPack","Error when getting pack: " + lang + "/" + pack + "  ::  " + e);
    }finally {
      delete require.cache[require.resolve(this.dir + "/lang/" + lang + "/" + pack)];
    }
  }
  getSupportedLanguages(cb){
    var self = this;
    var FileDir = self.dir;
    fs.readdir(FileDir + "/lang", function(err, files) {
      var dirs = [];
      for (var index = 0; index < files.length; ++index) {
        var file = files[index];
        if (file[0] !== '.') {
          var filePath = FileDir + "/lang/" + file;
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

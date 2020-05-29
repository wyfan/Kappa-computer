/* global postMessageAPI, XLSX */

var appMethods = {
  onFileInputChange (event) {
    //console.log(1);
    if (!window.FileReader) {
      return false // Browser is not compatible
    }

    //this.processOutputWait = true
    //var reader = new FileReader()
    
    this.selectFileNameList = []
    let allowTypes = [
      'image/jpeg'
    ]
    
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i]
      let type = file.type
      let filename = file.name
      
      //console.log(type)
      if (allowTypes.indexOf(type) === -1) {
        continue
      }
      
      this.selectFileNameList.push(filename)
    }
  },
  parseClassName (filename) {
    for (let i = 0; i < this.separationList.length; i++) {
      let separation = this.separationList[i]

      let pos = filename.indexOf(separation)
      if (pos === -1) {
        continue
      }

      return filename.slice(0, pos).trim()
    }
  },
  downloadARFF () {
    var blob = new Blob([this.arffOutput], {type: "text/plain;charset=utf-8"});
    saveAs(blob, this.downloadFilename + '.arff', true);
  }
}
var appWatch = {
  selectFileNameList () {
    
    let maxLength = 3
    let shortNames = []
    this.classList.forEach(name => {
      //console.log(name, this.unknownClassName)
      if (name === this.unknownClassName) {
        return false
      }
      
      if (name.length > maxLength) {
        name = name.slice(0, maxLength)
      }
      
      if (shortNames.indexOf(name) === -1) {
        return shortNames.push(name)
      }
    })
    
    // 過濾掉重複的
    
    this.filename = 'images-' + shortNames.join('_') + '-' + (new Date()).mmddhhmm()
    this.filenamePlaceholder = this.filename
  }
}
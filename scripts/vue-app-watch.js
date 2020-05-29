var appWatch = {
  selectFileNameList () {
    
    let maxLength = 3
    let shortNames = this.classList.map(name => {
      if (name.length > maxLength) {
        name = name.slice(0, maxLength)
      }
      return name
    })
    
    this.filename = 'images-' + shortNames.join('_') + '-' + (new Date()).mmddhhmm()
    this.filenamePlaceholder = this.filename

  }
}
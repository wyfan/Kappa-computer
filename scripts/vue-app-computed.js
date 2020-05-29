var appComputed = {
  classList () {
    return this.classCount.map(item => item.className)
  },
  downloadFilename () {
    if (this.filename && this.filename.length > 0) {
      return this.filename
    }
    else {
      return this.filenamePlaceholder
    }
  },
  arffOutput() {
   
    let data = this.selectFileNameList.map(filename => {
      let className = this.parseClassName(filename)
      
      if (!className) {
        return ''
      }
      
      return [
        filename,
        className
      ].join(',')
    })
    data = data.join('\n')
    
    return `@relation ${this.downloadFilename}.arff

@attribute filename string
@attribute class {${this.classList.join(',')}}

@data
${data}`
  },
  classCount() {
    //let output = []
    
    if (this.selectFileNameList.length === 0) {
      return []
    } 
    
    let classList = {}
    //console.log(this.selectFileNameList)
    this.selectFileNameList.forEach(filename => {
      //console.log(filename)
      let className = this.parseClassName(filename)
      
      if (!className) {
        return false
      }
      
      if (!classList[className]) {
        classList[className] = 0
      }
      classList[className]++
    })
    
    let classNames = Object.keys(classList)
    
    
    return classNames.map(key => {
      return {
        className: key,
        count: classList[key]
      }
    })
  }
}
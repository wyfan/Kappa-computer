var appComputed = {
  classList () {
    return this.classCount.map(item => item.className)
            .filter(name => (name !== this.downloadUnknownClassName))
  },
  downloadUnknownClassName () {
    if (this.unknownClassName && this.unknownClassName.length > 0) {
      return this.unknownClassName
    }
    return 'unknown'
  },
  downloadFilename () {
    if (this.filename && this.filename.length > 0) {
      return this.filename
    }
    else {
      return this.filenamePlaceholder
    }
  },
  arffTrainOutput() {
   
    let data = this.selectFileNameList.map(filename => {
      let className = this.parseClassName(filename)
      
      if (!className || className === this.downloadUnknownClassName) {
        return false
      }
      
      return [
        filename,
        className
      ].join(',')
    }).filter(line => (line !== false))
    data = data.join('\n')
    
    return `@relation ${this.downloadFilename}-train.arff

@attribute filename string
@attribute class {${this.classList.join(',')}}

@data
${data}`
  },
  arffUnknownOutput() {
   
    let data = this.selectFileNameList.map(filename => {
      let className = this.parseClassName(filename)
      
      if (!className || className !== this.downloadUnknownClassName) {
        return false
      }
      
      return [
        filename,
        '?'
      ].join(',')
    }).filter(line => (line !== false))
    data = data.join('\n')
    
    return `@relation ${this.downloadFilename}-unknown.arff

@attribute filename string
@attribute class {${this.classList.join(',')}}

@data
${data}`
  },
  hasUnknownClassName () {
    for (let i = 0; i < this.selectFileNameList.length; i++) {
      let filename = this.selectFileNameList[i]
      let className = this.parseClassName(filename)
      
      if (className === this.downloadUnknownClassName) {
        return true
      }
    }
    return false
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
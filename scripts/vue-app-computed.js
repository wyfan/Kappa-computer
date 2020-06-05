var appComputed = {
  codeArray () {
    let codes = this.codeList
    codes = codes.replace(/\n/g, ' ')
    codes = codes.replace(/\t/g, ' ')
    codes = codes.replace(/,/g, ' ')
    codes = codes.replace(/;/g, ' ')

    return codes.split(' ')
  },
  formatedCodes () {
    let codes = this.codes
    let participants = [] //S1, S2,S3

    return codes.map((code, coderIndex) => {
      //get Header ex: C1, C2, C3
      let header = code.code
      if (header.indexOf('\n') > -1) {
        header = header.slice(0, header.indexOf('\n'))
      }

      header = this.rowToArray(header)
      if (this.skipFirst === true) {
        header = header.slice(1)
      }

      let output = []
        code.code.split('\n').forEach((row, i) => {

        if (i === 0 && this.skipFirst === true) {
          //skip first row [C1, C2, C3]
          return
        }
        //from second row start
        let participant = null
        let cols = this.rowToArray(row)
        if (this.skipFirst === true) {
          participant = cols[0]
          if (participants.indexOf(participant) === -1) {
            participants.push(participant)
          }
          cols = cols.slice(1) //cos is no first row & first column data
        }

        let colsObject = this.buildEmptyCodeObject()

        cols.forEach((c, i) => {

          let codeName = header[i]
          let codeValue = c
          colsObject[codeName] = codeValue
        })
        output.push({
          participant,
          codes: colsObject
        })
      })
      console.log(output)
      return output
    })
    /*
    let result = codes.map((code) => {

      //code = code.code.trim()
      code = code.code
      while (code.indexOf("  ") > -1) {
        code = code.replace(/  /g, ' ')
      }

      return code.split('\n').map((row) => {
        return this.rowToArray(row)
      })
    })
    var newCode
    if (this.skipFirst === true) {

      newCode = this.removeFirst(result)

    }
    else {
      newCode = result
      console.log("false")
    }
    return newCode
    */
  },
  compare2Code () {
    let codes = this.formatedCodes
    let base = codes.slice(0,1)
    let compared = codes.slice(1)

    base[0].map((row, key)=>{
      let base_p = row.participant
      let base_c = row.codes
      console.log("base_c = "+base_c)
      let r
      //find same participant in compared
      compared[0].map((row, index) => {
        if (row.participant === base_p) {
            r = index
        }
      })
      //let index = getIndex(p, compared[0])
      console.log(r)

    })

  },

  firstRow () {
    if (!this.codes[0]) {
      return []
    }

    let i = 0
    let code
    code = this.codes[i].code
    while (code.indexOf('\n') === -1) {
      i++
      if (!this.codes[i]) {
        return []
      }
      code = this.codes[i].code
    }

    let firstLine = code.slice(0, code.indexOf('\n'))
    return this.rowToArray(firstLine)
  },
  firstColumn () {
    if (!this.codes[0]) {
      return []
    }

    let i = 0
    let code
    code = this.codes[i].code
    while (code.indexOf('\n') === -1) {
      i++
      if (!this.codes[i]) {
        return []
      }
      code = this.codes[i].code
    }

    return code.split('\n').map((row) => {
      let splitor = this.parseSplitor(row)
      return row.slice(0, row.indexOf(splitor)).trim()
    })
  },
  calcKappaResult () {
    return []
  },
  diffResult () {
    return []
  },
}

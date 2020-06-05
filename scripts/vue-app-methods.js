/* global postMessageAPI, XLSX */

var appMethods = {
 calcKappa(event){
   console.log(this.formatedCodes)
   console.log(this.compare2Code)
   return

 },
 parseSplitor (line) {
   let splitor = '\t'
   if (line.indexOf(splitor) === -1) {
     splitor = ' '
   }
   if (line.indexOf(splitor) === -1) {
     splitor = ','
   }
   if (line.indexOf(splitor) === -1) {
     splitor = ';'
   }
   return splitor
 },
 rowToArray (row) {
   let splitor = this.parseSplitor(row)

   return row.split(splitor).map((column, i) => {
     column = column.trim()

     // 1 2 3 4
     // t f e
     if (isNaN(column)) {
       return column
     }
     else {
       if (typeof(column) === 'string') {
       return column
     }
       return Number(column)
     }
   })
 },
 buildEmptyCodeObject () {
   let colsObject = {}
   this.codeArray.forEach(code => {
     colsObject[code] = null
   })
   return colsObject
 },
 removeFirst(code){
   console.log(code)
   let rmfirstrow = code

   for(let i in rmfirstrow){
     rmfirstrow[i].map((value, index)=>{
       rmfirstrow[i][index].shift()
       return rmfirstrow[i][index]
     })
     rmfirstrow[i].splice(0,1)
   }
   console.log(rmfirstrow)
    //console.log(rmfirstrow)

   return rmfirstrow
 }

}

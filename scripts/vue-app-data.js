const appData = {
  codeList: 'C1 C2 C3 C4 C5',
  //participants: [],
  inputStyle: 'sheet', // 'codes'
  codes: [{
    'code': `	C1	C2	C3
S1	v		v
S4	v
S3		v `
  }, {
    'code': `	C2	C1	C3
S3	v
S2	v
S1		v	v`
  }],
  skipFirst: true
}

/**
C1 C3 C1
C1
C3
*/

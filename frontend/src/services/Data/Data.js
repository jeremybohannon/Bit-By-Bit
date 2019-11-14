class Data {
  constructor() {
    this.data = this.generateYear()
  }

  getData () {
    return this.data
  }

  generateYear () {
    return {
      Jan: new Array(31).fill(2),
      Feb: new Array(28).fill(2),
      March: new Array(31).fill(2),
      April: new Array(30).fill(2),
      May: new Array(31).fill(2),
      June: new Array(30).fill(2),
      July: new Array(31).fill(2),
      August: new Array(31).fill(2),
      September: new Array(30).fill(2),
      October: new Array(31).fill(2),
      November: new Array(30).fill(2),
      December: new Array(31).fill(2)
    }
  }
}

export default Data
class Data {
  constructor() {
    this.data = this.generateYear()
  }

  getData () {
    return this.data
  }

  generateYear () {
    const date = new Date()
    const currentYear = date.getFullYear()
    const maxNumDays = 31
    let year = []

    for(let i = 0; i < 12; i++) {
      const numOfDays = (new Date(currentYear, i+1, 0).getDate())
      year[i] = new Array(numOfDays)
      
      for(let j = 0; j < maxNumDays; j++) {
        year[i][j] = {
          date: j < numOfDays ? new Date(currentYear, i, j+1).toString() : null,
          mood: -1,
          emotions: [],
          notes: ""
        }
      }
    }
    return {[date.getFullYear()]: year}
  }
}

module.exports = Data
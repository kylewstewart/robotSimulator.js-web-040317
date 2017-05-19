'use strict'

// function Robot () {
//
//
  // Robot.prototype.orient = function(direction){
  //   var directions = ['north', 'east', 'south', 'west'];
  //   if(!(directions.includes(direction)))throw new Error('Invalid Robot Bearing');
  //   this.bearing = direction
  //   this.coordinates = [0,0]
//
//   }
//
//   Robot.prototype.turnRight(){
//     if (this.bearing === 'north'){
//       this.bearing = 'east'
//     }
//
//   }
//
//   function turnLeft(){
//
//   }
// }


class Robot {
  constructor(coordinates) {
    this.bearing = 'north'
    this.coordinates = [0,0]
  }

  orient(direction){
    var directions = ['north', 'east', 'south', 'west'];
    if(!(directions.includes(direction)))throw new Error('Invalid Robot Bearing');
    this.bearing = direction
  }

  turnRight() {
    switch (this.bearing) {
      case 'north':
        this.orient('east')
        break;
      case 'east':
        this.orient('south')
        break;
      case 'south':
        this.orient('west')
        break;
      case 'west':
        this.orient('north')
        break;
    }
  }

  turnLeft() {
    switch (this.bearing) {
      case 'north':
        this.orient('west')
        break;
      case 'west':
        this.orient('south')
        break;
      case 'south':
        this.orient('east')
        break;
      case 'east':
        this.orient('north')
        break;
    }
  }

  at(x, y) {
    this.coordinates = [x, y]
  }

  advance() {
    let x = this.coordinates[0]
    let y = this.coordinates[1]

    switch (this.bearing) {
      case 'north':
        this.at(x, y + 1)
        break
      case 'east':
        this.at(x + 1, y)
        break
      case 'south':
        this.at(x, y - 1)
        break
      case 'west':
        this.at(x - 1, y)
        break
    }
  }

  instructions(string) {
    return string.split('').reduce(function (instructions, instruction) {
      switch (instruction) {
        case "L":
          return [...instructions, ...['turnLeft']]
          break
        case "R":
          return [...instructions, ...['turnRight']]
          break
        case "A":
          return [...instructions, ...['advance']]
          break
      }
    }, [])
  }

  evaluate(string){
    this.instructions(string).forEach(function (instruction) {
      this[instruction]()
    }, this)
  }

  place(hash){
    this.at(hash.x, hash.y)
    this.orient(hash.direction)
  }

}

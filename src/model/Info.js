export default function(){
  this.score = 0
  this.xp = 5

  this.setScore = score => {
    this.score = score
  }

  this.setXP = xp => {
    this.xp = xp
  }

  return this;
}
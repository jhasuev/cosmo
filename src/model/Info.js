export default function(){
  this.score = 0
  this.record = localStorage.record || 0
  this.xp = 5

  this.setScore = score => {
    this.score = score
     if (this.record < score) {
       localStorage.record = this.record = score
     }
  }

  this.setXP = xp => {
    this.xp = xp
  }

  return this;
}
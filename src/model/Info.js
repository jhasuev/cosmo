export default function(){
  this.score = 0
  this.record = localStorage.record || 0
  this.xpOrigin = 5
  this.xp = this.xpOrigin

  this.setScore = score => {
    this.score = score
    if (this.record < score) {
      localStorage.record = this.record = score
    }
  }

  this.setXP = xp => {
    this.xp = xp
  }

  this.reset = () => {
    this.score = 0
    this.xp = this.xpOrigin
  }

  return this;
}
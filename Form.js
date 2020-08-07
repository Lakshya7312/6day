class Form {
    constructor() {
        this.inputOP = select('#name');
        this.buttonOP = select('#butt');
    }

    hide() {
      this.inputOP.hide();
      this.buttonOP.hide();
    }

    display(){
    this.inputOP.position(windowWidth/2-78, windowHeight/2-100);
    this.buttonOP.position(windowWidth/2+10, windowHeight/2);

    this.buttonOP.mousePressed(()=>{
       gameState = 1;
       this.inputOP.hide();
       this.buttonOP.hide();
    })
  }
}
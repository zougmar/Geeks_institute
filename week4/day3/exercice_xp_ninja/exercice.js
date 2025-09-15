
class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();



class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    super(); // call parent first
    console.log("I'm pink. 🌸");
  }
}

const pet1 = new Flamingo();


// when we call console.log() before super(), 'this' is not yet initialized, leading to a ReferenceError.

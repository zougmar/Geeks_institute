//Create a class named Video
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time; // in seconds
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

// Create a method called watch()
const video1 = new Video("JavaScript Basics", "Omar", 300);
video1.watch(); 


const video2 = new Video("React Tutorial", "Sarah", 600);
video2.watch(); 

// Instantiate a new Video instance and call the watch() method.

const videosData = [
  { title: "HTML Intro", uploader: "Alice", time: 200 },
  { title: "CSS Grid", uploader: "Bob", time: 350 },
  { title: "Node.js Basics", uploader: "Charlie", time: 400 },
  { title: "Express.js Tutorial", uploader: "Dana", time: 500 },
  { title: "MongoDB Crash Course", uploader: "Eve", time: 450 }
];


//Instantiate a second Video instance with different values.

const videos = [];

for (let data of videosData) {
  const video = new Video(data.title, data.uploader, data.time);
  videos.push(video);
}

// Call watch() on each video
videos.forEach(video => video.watch());

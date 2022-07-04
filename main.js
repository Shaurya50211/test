NoseX = 0;
NoseY = 0;

RightWrist = 0;
LeftWrist = 0;
Difference = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(100, 175);

    canvas = createCanvas(550, 450);
    canvas.position(800, 200);

    poseNet = ml5.poseNet(video, modelDone);
    poseNet.on("pose", gotPoses);
}

function modelDone() {
    console.log("PoseNet is initialized! 🎉");
}

function draw() {
    background('#808080');

    fill('#FFFF00');
    noStroke();
    square(NoseX, NoseY, Difference);

    document.getElementById("box-hw").innerHTML = "The Length and Width of the square is " + Difference + "px"
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;
        console.log("Nose Y value is " + NoseY + "." + " Nose X value is " + NoseX + ".");

        RightWrist = results[0].pose.rightWrist.x;
        LeftWrist = results[0].pose.leftWrist.x;
        Difference = floor(LeftWrist - RightWrist);
    }
}
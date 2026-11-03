let bodyColorPicker
let eyeColorPicker
let leftEyeSizeSlider
let rightEyeSizeSlider
let mouthColorPicker
let fangSizeSlider
let limbColorPicker
let limbLengthSlider
let spikeColorPicker
let spikeCountSlider
let spikeSizeSlider

function setup() {
  createCanvas(440, 440);

  createP("BODY")
  createElement('label', 'body color')
  bodyColorPicker = createColorPicker("#ff00ff")

  createP("EYES")
  createElement('label', 'eye color')
  eyeColorPicker = createColorPicker("#29ac22")
  createElement('label', 'left eye size')
  leftEyeSizeSlider = createSlider(15, 45, 55)
  createElement('label', 'right eye size')
  rightEyeSizeSlider = createSlider(15, 45, 55)

  createP("MOUTH")
  createElement('label', 'mouth color')
  mouthColorPicker = createColorPicker("#000000")
  createElement('label', 'fang size')
  fangSizeSlider = createSlider(10, 60, 30)

  createP("ARMS & LEGS")
  createElement('label', 'arm & leg color')
  limbColorPicker = createColorPicker("#ffaa00")
  createElement('label', 'limb length')
  limbLengthSlider = createSlider(50, 140, 100)

  createP("SPIKES")
  createElement('label', 'spike color')
  spikeColorPicker = createColorPicker("#ffaa00")
  createElement('label', '# of spikes')
  spikeCountSlider = createSlider(0, 5, 1)
  createElement('label', 'spike size')
  spikeSizeSlider = createSlider(20, 80, 60)

  jpgButton = createButton("export JPG")
  jpgButton.mousePressed(function(){
    saveCanvas("myCanvas", "jpg")
  })
}

function draw() {
  background(240);
  drawLimbs()
  drawBody()
  drawEyes()
  drawMouth()
  drawSpikes()
}

function drawLimbs() {
    fill(limbColorPicker.value())
    const limbLength = limbLengthSlider.value()

    //legs
    rect(width/2 - 50, height/2 + 50, 10, limbLength)
    rect(width/2 + 35, height/2 + 50, 10, limbLength)
    ellipse(width/2 - 45, height/2 + 50 + limbLength, 30, 20)
    ellipse(width/2 + 40, height/2 + 50 + limbLength, 30, 20)

    //arms
    const leftArmX = width/2 - limbLength - 65
    const rightArmX = width/2 + 65
    rect(leftArmX, height/2 - 20, limbLength, 10)
    rect(rightArmX, height/2 - 20, limbLength, 10)
    ellipse(leftArmX, height/2 - 15, 20, 30)
    ellipse(rightArmX + limbLength, height/2 - 15, 20, 30)
}

function drawBody() {
    fill(bodyColorPicker.value())
    circle(width/2, height/2 - 20, 180)
    noStroke()
}

function drawSpikes() {
    fill(spikeColorPicker.value())
    noStroke()

    const centerX = width / 2
    const centerY = height / 2 - 25
    const spikeSize = spikeSizeSlider.value()
    const spikeScale = spikeSize / 30
    const visibleSpikeCount = spikeCountSlider.value()
    const topSpikeAngles = [-2.25, -1.97, -HALF_PI, -1.17, -0.89, -0.61]
    const baseRadius = 78
    const tipRadius = baseRadius + 27 * spikeScale
    const halfBase = 10 * spikeScale

    for (let i = 0; i < visibleSpikeCount; i++) {
        const angle = topSpikeAngles[i]
        const tangentX = -sin(angle)
        const tangentY = cos(angle)
        const radialX = cos(angle)
        const radialY = sin(angle)

        triangle(
            centerX + radialX * baseRadius + tangentX * halfBase,
            centerY + radialY * baseRadius + tangentY * halfBase,
            centerX + radialX * baseRadius - tangentX * halfBase,
            centerY + radialY * baseRadius - tangentY * halfBase,
            centerX + radialX * tipRadius,
            centerY + radialY * tipRadius
        )
    }
}

function drawEyes() {
    fill("white")
    circle(width/2 - 35, height/2 - 40, 60)
    circle(width/2 + 35, height/2 - 40, 60)
    noStroke()
    fill(eyeColorPicker.value())
    circle(width/2 - 28, height/2 - 38, leftEyeSizeSlider.value())
    circle(width/2 + 32, height/2 - 42, rightEyeSizeSlider.value())
}

function drawMouth() {
    fill(mouthColorPicker.value())
    arc(width/2, height/2 + 5, 80, 75, 0, PI)

    fill("white")
    const mouthCenterX = width / 2
    const mouthTopY = height / 2 + 5
    const fangSize = fangSizeSlider.value()
    const fangScale = fangSize / 20
    const halfWidth = 5 * fangScale
    const fangHeight = 15 * fangScale

    triangle(mouthCenterX - 10 - halfWidth, mouthTopY,
             mouthCenterX - 10, mouthTopY + fangHeight,
             mouthCenterX - 10 + halfWidth, mouthTopY)
    triangle(mouthCenterX + 10 - halfWidth, mouthTopY,
             mouthCenterX + 10, mouthTopY + fangHeight,
             mouthCenterX + 10 + halfWidth, mouthTopY)
}

import DeviceDetector from "https://cdn.skypack.dev/device-detector-js@2.2.10";
// Usage: testSupport({client?: string, os?: string}[])
// Client and os are regular expressions.
// See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// legal values for client and os
testSupport([
    { client: 'Chrome' },
]);
function testSupport(supportedDevices) {
    const deviceDetector = new DeviceDetector();
    const detectedDevice = deviceDetector.parse(navigator.userAgent);
    let isSupported = false;
    for (const device of supportedDevices) {
        if (device.client !== undefined) {
            const re = new RegExp(`^${device.client}$`);
            if (!re.test(detectedDevice.client.name)) {
                continue;
            }
        }
        if (device.os !== undefined) {
            const re = new RegExp(`^${device.os}$`);
            if (!re.test(detectedDevice.os.name)) {
                continue;
            }
        }
        isSupported = true;
        break;
    }
    if (!isSupported) {
        alert(`This demo, running on ${detectedDevice.client.name}/${detectedDevice.os.name}, ` +
            `is not well supported at this time, continue at your own risk.`);
    }
}



const MIDIOutputs = [],
        MIDIInputs = [];
  
  // Handle incoming MIDI messages
  const handleMIDIMessage = (event) => {
    // data = event.data;
    // do more interesting things here!
    // console.log(data);
  }
 
  // Cycle through connected controllers and attach incoming MIDI message listener
  const onMIDIInit = (MIDIAcessObject) => {
    // iterate through all the outputs and store in an array
    for (let output of MIDIAcessObject.outputs.values()) {
      console.log(`Found output: ${output.name}`)
      MIDIOutputs.push(output);      
    }
    // iterate through all the inputs and store them in an array
    for (let input of MIDIAcessObject.inputs.values()) {
      console.log(`Found input: ${input.name}`)
      MIDIInputs.push(input);
      // attach an event listener for incoming MIDI messages
      input.onmidimessage = handleMIDIMessage;
    }
  }
  
  // In case things fail...
//  onMIDIFail= function(){
//    console.log("Could not load MIDI");
//  }
  
  // Request access from the browser
  navigator.requestMIDIAccess({}).then( onMIDIInit);

  /* 
  When the button is clicked send a MIDI C3 "noteOn" mesage to channel 1 on the first MIDI device stored in our MIDIControllers array
  */
  //document.querySelector('#sendMIDIMessage').addEventListener('click', (e) => {
  //  MIDIOutputs[0].send([144, 63, 127]);
 // });
 // document.querySelector('#sendMIDIMessageb').addEventListener('click', (e) => {
 //   MIDIOutputs[0].send([144, 69, 127]);
 // });

























const controls = window;
const mpHolistic = window;
const drawingUtils = window;
const config = { locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@` +
            `${mpHolistic.VERSION}/${file}`;
    } };
// Our input frames will come from here.
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new controls.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};
function removeElements(landmarks, elements) {
    for (const element of elements) {
        delete landmarks[element];
    }
}
function removeLandmarks(results) {
    if (results.poseLandmarks) {
        removeElements(results.poseLandmarks, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 17, 18, 19, 20, 21, 22]);
    }
}
function connect(ctx, connectors) {
    const canvas = ctx.canvas;
    for (const connector of connectors) {
        const from = connector[0];
        const to = connector[1];
        if (from && to) {
            if (from.visibility && to.visibility &&
                (from.visibility < 0.1 || to.visibility < 0.1)) {
                continue;
            }
            ctx.beginPath();
            ctx.moveTo(from.x * canvas.width, from.y * canvas.height);
            ctx.lineTo(to.x * canvas.width, to.y * canvas.height);
            ctx.stroke();
        }
    }
}
let activeEffect = 'mask';
function onResults(results) {
    // Hide the spinner.
    document.body.classList.add('loaded');
    // Remove landmarks we don't want to draw.
    removeLandmarks(results);
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results.segmentationMask) {
        canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);
        // Only overwrite existing pixels.
        if (activeEffect === 'mask' || activeEffect === 'both') {
            canvasCtx.globalCompositeOperation = 'source-in';
            // This can be a color or a texture or whatever...
            canvasCtx.fillStyle = '#00FF007F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        }
        else {
            canvasCtx.globalCompositeOperation = 'source-out';
            canvasCtx.fillStyle = '#0000FF7F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        }
        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.globalCompositeOperation = 'source-over';
    }
    else {
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    }
    // Connect elbows to hands. Do this first so that the other graphics will draw
    // on top of these marks.
    canvasCtx.lineWidth = 5;





/*
if (results.faceLandmarks) {
var nose = Math.min(Math.max((results.faceLandmarks[34].x), 0), 1);
var nosescaled = (nose * 127);
MIDIOutputs[0].send([176, 5, nosescaled]);

var nosey = Math.min(Math.max((results.faceLandmarks[34].y), 0), 1);
var noseyscaled = (nosey * 127);
MIDIOutputs[0].send([176, 6, noseyscaled]);

}

*/


    if (results.poseLandmarks) {

// console.log (results.poseLandmarks);
//console.log(results.faceLandmarks[58].y);
//var nose = Math.min(Math.max((results.faceLandmarks[34].x), 0), 1);
//var nosescaled = (nose * 127);
//MIDIOutputs[0].send([176, 3, nosescaled]);
var shoulderlefty = Math.min(Math.max((results.poseLandmarks[15].x), 0), 1);
var shoulderleftyscaled = (shoulderlefty * 127);
MIDIOutputs[0].send([176, 1, shoulderleftyscaled]);

var shoulderrighty = Math.min(Math.max((results.poseLandmarks[15].y), 0), 1);
var shoulderrightyscaled = (shoulderrighty * 127);
MIDIOutputs[0].send([176, 2, shoulderrightyscaled]);

var rhandx = Math.min(Math.max((results.poseLandmarks[15].z), 0), 0.9);
var rhandxscaled = (rhandx * 127);
MIDIOutputs[0].send([176, 3, rhandxscaled]);

var rhandy = Math.min(Math.max((results.poseLandmarks[16].x), 0), 0.9);
var rhandyscaled = (rhandy * 127);
MIDIOutputs[0].send([176, 4, rhandyscaled]);

var nose = Math.min(Math.max((results.poseLandmarks[16].y), 0), 1);
var nosescaled = (nose * 127);
MIDIOutputs[0].send([176, 5, nosescaled]);

var lhandx = Math.min(Math.max((results.poseLandmarks[16].z), 0), 0.9);
var lhandxscaled = (lhandx * 127);
MIDIOutputs[0].send([176, 6, lhandxscaled]);







 //   canvasCtx.strokeStyle = 'white';
//            connect(canvasCtx, [[
                    // results.poseLandmarks[mpHolistic.POSE_LANDMARKS.LEFT_ANKLE],
 //                   results.poseLandmarks[29],
			 //results.poseLandmarks[mpHolistic.POSE_LANDMARKS.RIGHT_ANKLE],

 //                   results.poseLandmarks[30]
 //               ]]);
        













        if (results.rightHandLandmarks) {
//var rhandx = Math.min(Math.max((results.rightHandLandmarks[0].x), 0), 0.9);
//var rhandxscaled = (rhandx * 127);
//MIDIOutputs[0].send([176, 1, rhandxscaled]);

//var rhandy = Math.min(Math.max((results.rightHandLandmarks[0].y), 0), 0.9);
//var rhandyscaled = (rhandy * 127);
//MIDIOutputs[0].send([176, 2, rhandyscaled]);



 //           canvasCtx.strokeStyle = 'white';
  //          connect(canvasCtx, [[
  //                  results.poseLandmarks[mpHolistic.POSE_LANDMARKS.RIGHT_ELBOW],
   //                 results.rightHandLandmarks[0]
   //             ]]);
        }

//console.clear();

        if (results.leftHandLandmarks) {



	// console.log(results.leftHandLandmarks[0].x);
//var lhandx = Math.min(Math.max((results.leftHandLandmarks[0].x), 0), 0.9);
//var lhandxscaled = (lhandx * 127);
//MIDIOutputs[0].send([176, 13, lhandxscaled]);

//var lhandy = Math.min(Math.max((results.leftHandLandmarks[0].y), 0), 0.9);
//var lhandyscaled = (lhandy * 127);
//MIDIOutputs[0].send([176, 14, lhandyscaled]);

/*
var handz = Math.min(Math.max((results.leftHandLandmarks[0].z), 0), 0.9);
var handzscaled = (handz * 1000000);
var uphandzscaled = (handzscaled *100);
var midihandzscaled = Math.min(Math.max((uphandzscaled), 0), 127);
//console.log(handzscaled);
//MIDIOutputs[0].send([176, 3, midihandzscaled]);
//MIDIOutputs[0].send([176, 4, midihandzscaled]);

*/



  //          canvasCtx.strokeStyle = 'green';
  //          connect(canvasCtx, [[
  //                  results.poseLandmarks[mpHolistic.POSE_LANDMARKS.LEFT_ELBOW],
   //                 results.leftHandLandmarks[0]
    //            ]]);
        }
   }

/*




    // Pose...
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, mpHolistic.POSE_CONNECTIONS, { color: 'white' });
    drawingUtils.drawLandmarks(canvasCtx, Object.values(mpHolistic.POSE_LANDMARKS_LEFT)
        .map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)' });
    drawingUtils.drawLandmarks(canvasCtx, Object.values(mpHolistic.POSE_LANDMARKS_RIGHT)
        .map(index => results.poseLandmarks[index]), { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' });
    // Hands...
    drawingUtils.drawConnectors(canvasCtx, results.rightHandLandmarks, mpHolistic.HAND_CONNECTIONS, { color: 'white' });
    drawingUtils.drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: 'white',
        fillColor: 'rgb(0,217,231)',
        lineWidth: 2,
        radius: (data) => {
            return drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1);
        }
    });
    drawingUtils.drawConnectors(canvasCtx, results.leftHandLandmarks, mpHolistic.HAND_CONNECTIONS, { color: 'white' });
    drawingUtils.drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: 'white',
        fillColor: 'rgb(255,138,0)',
        lineWidth: 2,
        radius: (data) => {
            return drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1);
        }
    });



/*
    // Face...
    drawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 });
    drawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_RIGHT_EYE, { color: 'rgb(0,217,231)' });
    drawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_RIGHT_EYEBROW, { color: 'rgb(0,217,231)' });
    drawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_LEFT_EYE, { color: 'rgb(255,138,0)' });
    drawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_LEFT_EYEBROW, { color: 'rgb(255,138,0)' });
    drawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_FACE_OVAL, { color: '#E0E0E0', lineWidth: 5 });
    drawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, mpHolistic.FACEMESH_LIPS, { color: '#E0E0E0', lineWidth: 5 });
*/
    canvasCtx.restore();
}
const holistic = new mpHolistic.Holistic(config);
holistic.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls
    .ControlPanel(controlsElement, {
    selfieMode: true,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    effect: 'background',
})
    .add([
    new controls.StaticText({ title: 'Kilshaw SGFP' }),
    fpsControl,
    new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new controls.SourcePicker({
        onSourceChanged: () => {
            // Resets because the pose gives better results when reset between
            // source changes.
            holistic.reset();
        },
        onFrame: async (input, size) => {
            const aspect = size.height / size.width;
            let width, height;
            if (window.innerWidth > window.innerHeight) {
                height = window.innerHeight;
                width = height / aspect;
            }
            else {
                width = window.innerWidth;
                height = width * aspect;
            }
            canvasElement.width = width;
            canvasElement.height = height;
            await holistic.send({ image: input });
        },
    }),
    new controls.Slider({
        title: 'Model Complexity',
        field: 'modelComplexity',
        discrete: ['Lite', 'Full', 'Heavy'],
    }),
    new controls.Toggle({ title: 'Smooth Landmarks', field: 'smoothLandmarks' }),
    new controls.Toggle({ title: 'Enable Segmentation', field: 'enableSegmentation' }),
    new controls.Toggle({ title: 'Smooth Segmentation', field: 'smoothSegmentation' }),
    new controls.Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new controls.Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new controls.Slider({
        title: 'Effect',
        field: 'effect',
        discrete: { 'background': 'Background', 'mask': 'Foreground' },
    }),
])
    .on(x => {
    const options = x;
    videoElement.classList.toggle('selfie', options.selfieMode);
    activeEffect = x['effect'];
    holistic.setOptions(options);
});


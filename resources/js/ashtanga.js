const video5 = document.getElementsByClassName('input_video5')[0];
const out5 = document.getElementsByClassName('output5')[0];
const controlsElement5 = document.getElementsByClassName('control5')[0];
const canvasCtx5 = out5.getContext('2d');

var fun = true;
var storeImg = true;
var maxresults = [];
var imageresults = [];
var apiresponse = [];
var apiresponse1 = [];
var apiresponse2 = [];
var frameNum = [];
var images = [];
var images1 = [];
var images2 = [];
var visible = false;
var final = [];
var yogacount = 0;
var keypoints = [];

video5.setAttribute('autoplay', '');
video5.setAttribute('muted', '');
video5.setAttribute('playsinline', '');
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
            video5.srcObject = s;
            // console.log(s);
        }).catch((err) => {
            alert("please allow camera permission...");
        });
};

const fpsControl = new FPS();

const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};

function zColor(data) {
    const z = clamp(data.from.z + 0.5, 0, 0.5);
    return `rgba(0, 255,127, 0)`;
    /* return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;*/
}

const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    }
});
pose.setOptions({
    modelComplexity: 2,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
pose.onResults(onResultsPose);

const camera = new Camera(video5, {
    onFrame: async() => {
        await pose.send({ image: video5 });
    },
    width: 480,
    height: 480
});
camera.start();

new ControlPanel(controlsElement5, {
        selfieMode: true,
        upperBodyOnly: false,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    })
    .add([
        new StaticText({ title: 'MediaPipe Pose' }),
        fpsControl,
        new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
        new Toggle({ title: 'Upper-body Only', field: 'upperBodyOnly' }),
        new Toggle({ title: 'Smooth Landmarks', field: 'smoothLandmarks' }),
        new Slider({
            title: 'Min Detection Confidence',
            field: 'minDetectionConfidence',
            range: [0, 1],
            step: 0.01
        }),
        new Slider({
            title: 'Min Tracking Confidence',
            field: 'minTrackingConfidence',
            range: [0, 1],
            step: 0.01
        }),
    ])
    .on(options => {
        video5.classList.toggle('selfie', options.selfieMode);
        pose.setOptions(options);
    });


function onResultsPose(results) {
    document.body.classList.add('loaded');
    fpsControl.tick();

    canvasCtx5.save();
    canvasCtx5.clearRect(0, 0, out5.width, out5.height);
    canvasCtx5.drawImage(
        results.image, 0, 0, out5.width, out5.height);
    // Get base64 data to send to server for upload 
    keypoints = [];
    if (results.poseLandmarks !== undefined) {

        if (storeImg == false) {
            var can = document.createElement("canvas");
            var ctx = can.getContext("2d");
            can.width = out5.width;
            can.height = out5.height;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, out5.width, out5.height);
            drawLandmarks(ctx, results.poseLandmarks, { color: '#00FF7F', lineWidth: 1 });
            drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#FFFFFF', lineWidth: 1 });

            // console.log(can.toDataURL());
            var imagebase64data1 = can.toDataURL();
        }


        var imagebase64data = out5.toDataURL();
        if (results.poseLandmarks[32].visibility > 0.90 && results.poseLandmarks[31].visibility > 0.90 && results.poseLandmarks[7].visibility > 0.90 && results.poseLandmarks[8].visibility > 0.90 && visible == false) {
            visible = true;
        }

        if (visible == true) {
            while (maxresults.length < 70) {
                for (i = 0; i < 33; i++) {
                    //if (i < 33) {
                    keypoints.push({
                        'x': results.poseLandmarks[i].x,
                        'y': results.poseLandmarks[i].y,
                        'Z': results.poseLandmarks[i].z,
                        'Visibility': results.poseLandmarks[i].visibility,
                    });
                    //}
                };

                const Frame = images.length;
                images.push(imagebase64data);
                images1.push(imagebase64data);
                images2.push(imagebase64data1);



                // if (images.length === 70) {
                //      images.shift();
                // };

                maxresults.push(keypoints);
                var data = [];
                keypoints = [];


                if (maxresults.length === 70) {
                    // var jsonkeypoints = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data })

                    var jsondata = {};
                    for (var i = 0; i < maxresults.length; i++) {
                        jsondata[`LAN${i}`] = maxresults[i];
                        data.push(`${i}`);
                    }
                    jsondata["Frame_Num"] = data;
                    jsondata["API"] = "ASHTA";
                    jsondata["SET"] = "";


                    var jsonkeypoints = JSON.stringify(jsondata);


                    fetch(url = "https://c01.sportcoach.app/post", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },

                            body: jsonkeypoints
                        })
                        .then(function(res) {
                            return res.json()
                        })
                        .then(ans => {
                            // var ans = datajson;
                            var out = parseInt(ans.accuracy);
                            out.toFixed(4)
                            getimage = images[ans.Frame_Num];
                            getimage2 = images2[ans.Frame_Num];
                            var pose = ans.Pose_Name;
                            maxresults.length = 0;
                            images.length = 0;
                            images2.length = 0;
                            // frameNum.splice(ans.Frame_Num, 1);
                            // var resp = ans.OverAll_Results.Best_Pose.Angles;
                            document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                            document.getElementById("data2").innerHTML = pose;
                            console.log(ans);
                            frameNum = [];

                            //images.shift();
                            // if (apiresponse.length === 0 && (pose !== "No Pose" || pose !== "NO POSE" || pose !== "no Pose" || pose !== " ")) {
                            if (apiresponse.length === 0 && (pose === "Pranamasan" || pose === "Utthana Hasthasana")) {
                                if (kKal <= 0.05) { kKal += 0.05 }
                                if (getimage !== undefined) {
                                    apiresponse.push({
                                        'PoseName': ans.Pose_Name,
                                        'Accuracy': out,
                                        'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                                        'Distance': ans.OverAll_Results.Best_Pose.Distance,
                                        'Images': (storeImg == true) ? getimage : getimage2,
                                        'SetNo': yogacount + 1

                                    })
                                    console.log(getimage);
                                    console.log(ans.Frame_Num);
                                    console.log(images);
                                }

                            } else {
                                console.log(pose);
                                if (apiresponse.length > 0 && (pose != "No Pose" || pose != "no Pose" || pose != "NO POSE" || pose != " ")) {

                                    if (apiresponse.length <= 5 && (pose === "Pranamasan" || pose === "Utthana Hasthasana" || pose === "Padahastanasana" || pose === "Bhujangasana" || pose === "Adho Mukha Svanasana" || pose === "Chaturanga Dandasana")) {
                                        var check = apiresponse.filter(x => x.PoseName === pose);
                                        var index = apiresponse.findIndex(x => x.PoseName === pose);

                                        if (check.length > 0 && getimage !== undefined) {
                                            if (check[0].Accuracy < out) {
                                                apiresponse.splice(index, 1);
                                                apiresponse.push({
                                                    'PoseName': pose,
                                                    'Accuracy': out,
                                                    'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                                                    'Distance': ans.OverAll_Results.Best_Pose.Distance,
                                                    'Images': (storeImg == true) ? getimage : getimage2,
                                                    'SetNo': yogacount + 1
                                                });
                                                console.log(getimage);
                                                console.log(ans.Frame_Num);
                                                console.log(images.length);
                                            }
                                        } else {
                                            if (getimage !== undefined) {
                                                apiresponse.push({
                                                    'PoseName': pose,
                                                    'Accuracy': out,
                                                    'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                                                    'Distance': ans.OverAll_Results.Best_Pose.Distance,
                                                    'Images': (storeImg == true) ? getimage : getimage2,
                                                    'SetNo': yogacount + 1
                                                });
                                                console.log(getimage);
                                                console.log(ans.Frame_Num);
                                                console.log(images.length);

                                            }
                                        };

                                    } else {
                                        if (apiresponse1.length <= 1) {
                                            if (pose === "Pranamasan" || pose === "Padahastanasana") {
                                                var check = apiresponse1.filter(x => x.PoseName === pose);
                                                var index = apiresponse1.findIndex(x => x.PoseName === pose);

                                                if (check.length > 0 && getimage !== undefined) {
                                                    if (check[0].Accuracy < out) {
                                                        apiresponse1.splice(index, 1);
                                                        apiresponse1.push({
                                                            'PoseName': pose,
                                                            'Accuracy': out,
                                                            'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                                                            'Distance': ans.OverAll_Results.Best_Pose.Distance,
                                                            'Images': (storeImg == true) ? getimage : getimage2,
                                                            'SetNo': yogacount + 1
                                                        });
                                                        console.log(getimage);
                                                        console.log(ans.Frame_Num);
                                                        console.log(images.length);
                                                    }
                                                } else {
                                                    if (getimage !== undefined) {
                                                        apiresponse1.push({
                                                            'PoseName': pose,
                                                            'Accuracy': out,
                                                            'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                                                            'Distance': ans.OverAll_Results.Best_Pose.Distance,
                                                            'Images': (storeImg == true) ? getimage : getimage2,
                                                            'SetNo': yogacount + 1
                                                        });
                                                        console.log(getimage);
                                                        console.log(ans.Frame_Num);
                                                        console.log(images.length);

                                                    }
                                                };
                                            }
                                        } else {
                                            if (pose === "Utkatanasana (Chair Pose)" || pose === "Padahastanasana" || pose === "warrior1" || pose === "Bhujangasana" || pose === "Adho Mukha Svanasana" || pose === "Chaturanga Dandasana") {
                                                var check = apiresponse2.filter(x => x.PoseName === pose);
                                                var index = apiresponse2.findIndex(x => x.PoseName === pose);

                                                if (check.length > 0 && getimage !== undefined) {
                                                    if (check[0].Accuracy < out) {
                                                        apiresponse2.splice(index, 1);
                                                        apiresponse2.push({
                                                            'PoseName': pose,
                                                            'Accuracy': out,
                                                            'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                                                            'Distance': ans.OverAll_Results.Best_Pose.Distance,
                                                            'Images': (storeImg == true) ? getimage : getimage2,
                                                            'SetNo': yogacount + 1
                                                        });
                                                        console.log(getimage);
                                                        console.log(ans.Frame_Num);
                                                        console.log(images.length);
                                                    }
                                                } else {
                                                    if (getimage !== undefined) {
                                                        apiresponse2.push({
                                                            'PoseName': pose,
                                                            'Accuracy': out,
                                                            'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                                                            'Distance': ans.OverAll_Results.Best_Pose.Distance,
                                                            'Images': (storeImg == true) ? getimage : getimage2,
                                                            'SetNo': yogacount + 1
                                                        });
                                                        console.log(getimage);
                                                        console.log(ans.Frame_Num);
                                                        console.log(images.length);

                                                    }
                                                };
                                            }
                                        }

                                    }

                                };
                            }



                            if (apiresponse.length > 0) {
                                console.log(apiresponse)
                            };
                            if (apiresponse1.length > 0) {
                                console.log(apiresponse1)
                            };
                            if (apiresponse2.length > 0) {
                                console.log(apiresponse2)
                            };
                            if (final.length > 0) {
                                console.log(final)
                            };
                            if (apiresponse.length == 6 && apiresponse1.length == 2 && apiresponse2.length == 6) {
                                final.push(apiresponse.concat(apiresponse1, apiresponse2));
                                yogacount++;
                                console.log(final);
                                apiresponse = [];
                                apiresponse1 = [];
                                apiresponse2 = [];
                            }
                        })
                        .catch(error => {
                            // maxresults.shift();
                            // enter your logic for when there is an error (ex. error toast)
                            console.log(error)
                        });
                };
            };

        }

        drawConnectors(
            canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
                color: (data) => {
                    const x0 = out5.width * data.from.x;
                    const y0 = out5.height * data.from.y;
                    const x1 = out5.width * data.to.x;
                    const y1 = out5.height * data.to.y;

                    //const z0 = clamp(data.from.z + 0.5, 0, 1);
                    //const z1 = clamp(data.to.z + 0.5, 0, 1);

                    const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
                    gradient.addColorStop(
                        1.0, `rgba(255, ${255}, ${255}, 0.7)`);
                    gradient.addColorStop(
                        1.0, `rgba(255, ${255}, ${255}, 0.7)`);
                    return gradient;
                    //gradient.addColorStop(
                    //    0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                    //gradient.addColorStop(
                    //    1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                    //return gradient;
                },
                lineWidth: 1
            });
        if (visible == true) {
            drawLandmarks(canvasCtx5, results.poseLandmarks, { color: '#00FF7F', lineWidth: 1 });
        } else {
            drawLandmarks(canvasCtx5, results.poseLandmarks, { color: '#FF0000', lineWidth: 1 });
        }

        canvasCtx5.restore();
    };
};
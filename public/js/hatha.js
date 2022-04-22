const video5 = document.getElementsByClassName('input_video5')[0];
const out5 = document.getElementsByClassName('output5')[0];
const controlsElement5 = document.getElementsByClassName('control5')[0];
const canvasCtx5 = out5.getContext('2d');
const data1 = document.getElementById("data1");
const data2 = document.getElementById("data2");
const end = document.getElementById("end");
const User = document.getElementById("user");
var useremail = document.getElementById('useremail');
var yogacount = 0;
var userSets = 108;
var storeImg = true;

var maxresults = [];
var imageresults = [];
var apiresponse = [];
var final = [];
var apiresponse1 = [];
var frameNum = [];
var images = [];
var images1 = [];
var images2 = [];
var visible = false;
var temp = true;


document.getElementById('Start').addEventListener('click', () => {
    var yoga = document.getElementById("yogacount");
    var strUser = yoga.options[yoga.selectedIndex].value;

    var yoga1 = document.getElementById("storeImg");
    var strUser1 = yoga1.options[yoga1.selectedIndex].value;
    if (strUser1 == "no") storeImg = false;
    console.log(storeImg);
    userSets = parseInt(strUser);
    document.getElementsByClassName('model-wrapper')[0].classList.add("close");
});


video5.setAttribute('autoplay', '');
video5.setAttribute('muted', '');
video5.setAttribute('playsinline', '');
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
            // console.log(s);
        }).catch((err) => {
            alert("please allow camera permission...");
        });
};

var countDown = new Date().getTime();
var kKal = 0;
var TotalSessionTime;
var x = setInterval(function() {
    if (kKal >= 0.05) {
        kKal += 0.05;
    }
    var now = new Date().getTime();
    var diff = now - countDown;
    // console.log(countDown);
    // console.log(now);
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    //document.getElementById("data3").innerHTML = `${hours}:${minutes}:${seconds}`;
    //document.getElementById("data4").innerHTML = `${kKal.toFixed(2)} Kkal`;
    TotalSessionTime = `${hours}:${minutes}:${seconds}`;

}, 1000);


const fpsControl = new FPS();

const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};

function zColor(data) {
    const z = clamp(data.from.z + 0.1, 0, 0.1);
    return `rgba(0, 0, 0, 0)`;
    /* return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;*/
}

const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    }
});
pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: false,
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
            while (maxresults.length < 70 && yogacount < userSets) {

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
                //     images.shift();
                //     images2.shift();
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
                    jsondata["API"] = "SUN";
                    jsondata["SET"] = "";

                    console.log(jsondata);
                    var jsonkeypoints = JSON.stringify(jsondata)

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
                            console.log(ans);
                            getimage = images[ans.Frame_Num];
                            getimage2 = images2[ans.Frame_Num];
                            var out = parseInt(ans.accuracy);
                            out.toFixed(4)

                            var pose = ans.Pose_Name;
                            maxresults.length = 0;
                            images.length = 0;
                            images2.length = 0;
                            document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                            document.getElementById("data2").innerHTML = pose;
                            console.log(ans.accuracy)


                            //apiresponse.push({
                            //    'PoseName': ans.Pose_Name,
                            //    'Accuracy': ans.accuracy
                            //})
                            //if (apiresponse.length === 0 && (pose !== "No Pose" || pose !== "no Pose" || pose !== " ")) {
                            if (apiresponse.length === 0 && (pose === "Pranamasan")) {
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
                                    console.log(getimage2);
                                    console.log(ans.Frame_Num);
                                }
                            } else {
                                if (apiresponse.length > 0 && (pose !== "No Pose" || pose !== "no Pose" || pose !== "NO POSE" || pose !== " ")) {

                                    if (apiresponse.length <= 7) {
                                        var check = apiresponse.filter(x => x.PoseName === pose);
                                        var index = apiresponse.findIndex(x => x.PoseName === pose);
                                        console.log("index number  " + " " + index);
                                        /*if (apiresponse[i].PoseName === pose) {*/
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
                                                })
                                                console.log(getimage);
                                                console.log(getimage2);
                                                console.log(ans.Frame_Num);
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
                                                })
                                                console.log(getimage);
                                                console.log(getimage2);
                                                console.log(ans.Frame_Num);
                                            }
                                        }
                                    } else {
                                        if (pose === "Ashva Sanchalanasana" || pose === "Padahastanasana" || pose === "Utthana Hasthasana" || pose === "Pranamasan") {
                                            var check = apiresponse1.filter(x => x.PoseName === pose);
                                            var index = apiresponse1.findIndex(x => x.PoseName === pose);
                                            console.log("index number  " + " " + index);
                                            /*if (apiresponse[i].PoseName === pose) {*/
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
                                                    })
                                                    console.log(getimage);
                                                    console.log(getimage2);
                                                    console.log(ans.Frame_Num);
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
                                                    })
                                                    console.log(getimage);
                                                    console.log(getimage2);
                                                    console.log(ans.Frame_Num);
                                                }
                                            }
                                        }
                                    }
                                    /*}*/

                                }
                            }

                            if (apiresponse.length > 0) {
                                console.log(apiresponse)
                            }
                            if (apiresponse1.length > 0) {
                                console.log(apiresponse1)
                            }
                            if (apiresponse.length == 8 && apiresponse1.length == 4) {

                                final.push(apiresponse.concat(apiresponse1));
                                console.log(final);
                                yogacount++;
                                apiresponse = [];
                                apiresponse1 = [];
                                document.getElementById("dynVideo").setAttribute("src", "https://www.youtube.com/embed/Sk6xLk8QL0I?autoplay=1&loop=1&showinfo=0&rel=0&enablejsapi=1%")
                                    /*$.post({
                                            url: '/hathayogadata',
                                            enctype: 'mutipart/form-data',
                                        }, { param: JSON.stringify(final), User: User.value, TotalSessionTime: TotalSessionTime, kKal: kKal.toFixed(2) },
                                        function(data) {
                                            if (data == 'received') {
                                                // console.log(data);
                                                alert("One round completed");
                                            }
                                        });*/

                            }
                            console.log(yogacount);



                            // console.log("Apiresponse length" + apiresponse)

                        })
                        .catch(error => {
                            maxresults.shift();
                            // enter your logic for when there is an error (ex. error toast)
                            console.log(error)
                        })
                };
            };
        }
        if (yogacount == userSets) {
            if (temp == true) {
                alert("Session Completed Please Click on End Session Button to Save Session Data...");
                temp = false;
            }
        }

        if (visible == true) {
            drawLandmarks(canvasCtx5, results.poseLandmarks, { color: '#00FF7F', lineWidth: 1 });
        } else {
            drawLandmarks(canvasCtx5, results.poseLandmarks, { color: '#FF0000', lineWidth: 1 });
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

        /* drawLandmarks(
             canvasCtx5,
             Object.values(POSE_LANDMARKS_LEFT)
             .map(index => results.poseLandmarks[index]), { color: zColor, fillColor: '#00FF7F', lineWidth: 4 });
         drawLandmarks(
             canvasCtx5,
             Object.values(POSE_LANDMARKS_RIGHT)
             .map(index => results.poseLandmarks[index]), { color: zColor, fillColor: '#00FF7F', lineWidth: 4 });
         drawLandmarks(
             canvasCtx5,
             Object.values(POSE_LANDMARKS_NEUTRAL)
             .map(index => results.poseLandmarks[index]), { color: zColor, fillColor: '#00FF7F', lineWidth: 4 });
             */
        canvasCtx5.restore();
    };
};




end.addEventListener('click', () => {
    if (final.length > 0) {
        var api = final;
    } else {
        final.push(apiresponse.concat(apiresponse1));
        var api = final;
    }
    $.post({
            url: '/hathayogadata',
            enctype: 'mutipart/form-data',
        }, { param: JSON.stringify(api), User: User.value, TotalSessionTime: TotalSessionTime, kKal: kKal.toFixed(2) },
        function(data) {
            if (data == 'received') {
                // console.log(data);
                alert("Data Saved");
                window.location.replace("https://sportcoach.app/");
            } else {
                alert("data not saved try one more time...");
            }
        });
    // window.location.replace("https://localhost:3000/");

});
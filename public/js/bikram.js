const video5 = document.getElementsByClassName('input_video5')[0];
const out5 = document.getElementsByClassName('output5')[0];
const controlsElement5 = document.getElementsByClassName('control5')[0];
const canvasCtx5 = out5.getContext('2d');
const data1 = document.getElementById("data1");
const data2 = document.getElementById("data2");
const end = document.getElementById("end");
const User = document.getElementById("user");
var fun = true;
var useremail = document.getElementById('useremail');
var detectCount = 0;
var first = false;
var yogacount = 0;
var storeImg = true;
var visible = false;
var temp = true;

var final = [];
var maxresults = [];
var imageresults = [];
var apiresponse = [];
var frameNum = [];
var images = [];
var images1 = [];
var images2 = [];

document.getElementById('Start').addEventListener('click', () => {
    var yoga1 = document.getElementById("storeImg");
    var strUser1 = yoga1.options[yoga1.selectedIndex].value;
    if (strUser1 == "no") storeImg = false;
    console.log(storeImg);
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
}


// session timing
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
    const z = clamp(data.from.z + 0.5, 0, 0.5);
    return `rgba(0, 255,127, 0)`;
    /* return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;*/
}
var sets = [true, false, false, false, false, false];
var datas = [{
        HALFMOON_BACKBEND: false,
        Awkward_Pose: false,
        HALFMOON_SIDEBEND_R: false,
        Padahastanasana: false
    }, {
        EaglePose_Garurasana_L: false,
        Standing_head_to_knee: false,
        Standing_Bow_Pose_Dandayamana_Dhanurasana_R: false,
        Balancing_Stick_Pose_Tuladandasana_R: false
    },
    {
        Separate_Leg_Head_to_Knee_Pose: false,
        Standing_Seprated_Leg: false,
        Triangle_Pose: false,

    },
    {
        Shavasana_Corpsepose: false,
        Toe_Stand_Pose_Padangustasana_L: false,
        tree: false,
        Wind_Removing_Pose_Pavanamuktasana_bothLegs: false,
    }, {
        Bhujangasana: false,
        Bow_Pose_Dhanurasana: false,
        Camel_Pose: false,
        Fixed_Firm_Pose: false,
        Full_Locust_Pose_Poorna_Salabhasana: false,
        Half_Tortois: false,
        Locust_Pose: false,
        Rabbbit_Pose: false,
    }, {
        Head_to_Knee_with_Stretching_Pose_Janushirasana_HeadtoLeftKnee: false,
        Spine_Twisting_Pose_Ardha_Matsyendrasana_TwistToLeft_: false,
        Blowing_in_Firm_Kapalbhati_in_Vajrasana: false
    }
];
// var weight = window.prompt("Enter Weight");



function onResultsPose(results) {
    if (document.body.classList.contains('loadingg')) {
        document.body.classList.remove('loadingg');
        document.getElementsByClassName('loading-an')[0].classList.remove('wait');
    }
    document.body.classList.add('loaded');
    fpsControl.tick();

    canvasCtx5.save();

    canvasCtx5.clearRect(0, 0, out5.width, out5.height);
    canvasCtx5.drawImage(
        results.image, 0, 0, out5.width, out5.height);
    keypoints = [];
    if (results.poseLandmarks !== undefined) {
        var imagebase64data = out5.toDataURL();

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

            while (maxresults.length < 5) {
                console.log(maxresults);
                for (i = 0; i < 33; i++) {
                    keypoints.push({
                        'x': results.poseLandmarks[i].x,
                        'y': results.poseLandmarks[i].y,
                        'Z': results.poseLandmarks[i].z,
                        'Visibility': results.poseLandmarks[i].visibility,
                    })

                }
                const Frame = images.length;
                images.push(imagebase64data);
                images1.push(imagebase64data);
                images2.push(imagebase64data1)


                // console.log(images.length);
                maxresults.push(keypoints)
                keypoints = [];
                var data = ["0", "1", "2", "3", "4"];
                console.log(maxresults.length)
                console.log(detectCount);
                console.log(datas);
                if (maxresults.length === 5) {
                    console.log(sets);
                    // fatch first set
                    if (sets[0] == true) {
                        sets[1] = true;
                        var jsonkeypoints = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data, "API": "BIKRAM", "SET": "SET_1" })
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
                                // document.getElementsByTagName('body')[0].classList.remove('load');
                                var out = parseInt(ans.accuracy);
                                out.toFixed(4);
                                var pose = ans.Pose_Name;
                                var getimage = images[ans.Frame_Num];
                                var getimage2 = images2[ans.Frame_Num];
                                console.log(ans);

                                maxresults.length = 0;
                                images.length = 0;
                                images2.length = 0;
                                document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                                document.getElementById("data2").innerHTML = pose;
                                /* if (apiresponse.length === 0 && (pose === "HALFMOON_SIDEBEND(R)")) {
                                    
                                    if (ans.Frame_Num !== undefined || ans.Frame_Num !== "") {
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
                                        }
                                    }

                                }*/
                                if (apiresponse.length > 0) {
                                    console.log(apiresponse)
                                }

                                if (pose == "HALFMOON_BACKBEND" || pose == "AwkwardPose" || pose == "HALFMOON_SIDEBEND(R)" || pose === "Padahastanasana") {
                                    if (pose == "HALFMOON_SIDEBEND(R)" && datas[0].HALFMOON_SIDEBEND_R == false) {
                                        if (kKal <= 0.05) { kKal += 0.05 }
                                        if (datas[0].HALFMOON_SIDEBEND_R == false && first == false) {
                                            detectCount = 0;
                                            first = true;
                                        }
                                        detectCount++;
                                        addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                        if (detectCount == 5) {
                                            datas[0].HALFMOON_SIDEBEND_R = true;
                                            bikramoneyogadata();
                                            detectCount = 0;
                                            first = false;
                                        }
                                        // datas[0].Awkward_Pose = true;
                                    } else if (pose == "HALFMOON_BACKBEND" && datas[0].HALFMOON_SIDEBEND_R == true && datas[0].HALFMOON_BACKBEND == false) {
                                        if (datas[0].HALFMOON_BACKBEND == false && first == false) {
                                            detectCount = 0;
                                            first = true;
                                        }
                                        detectCount++;
                                        addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                        if (detectCount == 5) {
                                            datas[0].HALFMOON_BACKBEND = true;
                                            bikramoneyogadata();
                                            detectCount = 0;
                                            first = false;
                                        }
                                    } else if (pose == "Padahastanasana" && datas[0].HALFMOON_BACKBEND == true && datas[0].Padahastanasana == false) {
                                        if (datas[0].Padahastanasana == false && first == false) {
                                            detectCount = 0;
                                            first = true;
                                        }
                                        detectCount++;
                                        addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                        if (detectCount == 5) {
                                            datas[0].Padahastanasana = true;
                                            bikramoneyogadata();
                                            detectCount = 0;
                                            first = false;
                                        }
                                    } else if (pose == "AwkwardPose" && datas[0].Padahastanasana == true && datas[0].Awkward_Pose == false) {
                                        if (datas[0].Awkward_Pose == false && first == false) {
                                            detectCount = 0;
                                            first = true;
                                        }
                                        detectCount++;
                                        addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                        if (detectCount == 5) {
                                            datas[0].Awkward_Pose = true;
                                            bikramoneyogadata();
                                            detectCount = 0;
                                            first = false;
                                        }
                                    }
                                }
                            })
                            .catch(error => {
                                maxresults.shift();
                                // enter your logic for when there is an error (ex. error toast)
                                console.log(error)
                            })
                    }
                    // end first fatch
                    // fatch second set
                    if (sets[1] == true) {
                        if (datas[0].HALFMOON_BACKBEND == true && datas[0].Awkward_Pose == true && datas[0].HALFMOON_SIDEBEND_R == true && datas[0].Padahastanasana == true) {
                            sets[0] = false;
                            sets[2] = true;
                            var jsonkeypoints1 = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data, "API": "BIKRAM", "SET": "SET_2" });
                            var jsonkeypoints2 = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data, "API": "BIKRAM", "SET": "STANDING_H2N" })
                            if (datas[1].EaglePose_Garurasana_L == true && datas[1].Standing_head_to_knee == false) {
                                fetch(url = "https://c01.sportcoach.app/post", {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },

                                        body: jsonkeypoints2
                                    })
                                    .then(function(res) {
                                        return res.json()
                                    })
                                    .then(ans => {
                                        var out = parseInt(ans.accuracy);
                                        out.toFixed(4);
                                        var pose = ans.Pose_Name;
                                        var getimage = images[ans.Frame_Num];
                                        var getimage2 = images2[ans.Frame_Num];

                                        console.log(ans);
                                        document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                                        document.getElementById("data2").innerHTML = pose;
                                        maxresults.length = 0;
                                        images.length = 0;
                                        images2.length = 0;

                                        if (pose == "Standing Head to Knee") {
                                            if (datas[1].Standing_head_to_knee == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[1].Standing_head_to_knee = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        }
                                    });


                            }

                            console.log("fatch second data set");
                            fetch(url = "https://c01.sportcoach.app/post", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },

                                    body: jsonkeypoints1
                                })
                                .then(function(res) {
                                    return res.json()
                                })
                                .then(ans => {
                                    var out = parseInt(ans.accuracy);
                                    out.toFixed(4);
                                    var pose = ans.Pose_Name;
                                    var getimage = images[ans.Frame_Num];
                                    var getimage2 = images2[ans.Frame_Num];

                                    console.log(ans);
                                    document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                                    document.getElementById("data2").innerHTML = pose;
                                    maxresults.length = 0;
                                    images.length = 0;
                                    images2.length = 0;


                                    if (pose == "EaglePose_Garurasana(L)" || pose == "Standing_Bow_Pose _Dandayamana-Dhanurasana(R)" || pose == "Balancing_Stick_Pose_Tuladandasana(R)" || pose == "Sranding Head to Knee") {
                                        if (pose == "EaglePose_Garurasana(L)" && datas[1].EaglePose_Garurasana_L == false) {
                                            if (datas[1].EaglePose_Garurasana_L == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[1].EaglePose_Garurasana_L = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                            // datas[1].Awkward_Pose = true;
                                        } else if (pose == "Standing_Bow_Pose _Dandayamana-Dhanurasana(R)" && datas[1].Standing_head_to_knee == true && datas[1].Standing_Bow_Pose_Dandayamana_Dhanurasana_R == false) {
                                            if (datas[1].Standing_Bow_Pose_Dandayamana_Dhanurasana_R == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[1].Standing_Bow_Pose_Dandayamana_Dhanurasana_R = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Balancing_Stick_Pose_Tuladandasana(R)" && datas[1].Standing_Bow_Pose_Dandayamana_Dhanurasana_R == true && datas[1].Balancing_Stick_Pose_Tuladandasana_R == false) {
                                            if (datas[1].Balancing_Stick_Pose_Tuladandasana_R == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[1].Balancing_Stick_Pose_Tuladandasana_R = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        }
                                    }
                                    if (apiresponse.length > 0) {
                                        console.log(apiresponse)
                                    }
                                }).catch(error => {
                                    maxresults.shift();
                                    // enter your logic for when there is an error (ex. error toast)
                                    console.log(error)
                                })
                        }
                    }
                    // end second fatch
                    // fetch third set
                    if (sets[2] == true) {
                        if (datas[1].EaglePose_Garurasana_L == true && datas[1].Standing_Bow_Pose_Dandayamana_Dhanurasana_R == true && datas[1].Balancing_Stick_Pose_Tuladandasana_R == true) {
                            var jsonkeypoints2 = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data, "API": "BIKRAM", "SET": "SET_3" })
                            sets[1] = false;
                            sets[3] = true;
                            console.log("fatch third dataset");
                            fetch(url = "https://c01.sportcoach.app/post", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },

                                    body: jsonkeypoints2
                                })
                                .then(function(res) {
                                    return res.json()
                                })
                                .then(ans => {
                                    var out = parseInt(ans.accuracy);
                                    out.toFixed(4);
                                    var pose = ans.Pose_Name;
                                    var getimage = images[ans.Frame_Num];
                                    var getimage2 = images2[ans.Frame_Num];
                                    console.log(ans);
                                    document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                                    document.getElementById("data2").innerHTML = pose;
                                    maxresults.length = 0;
                                    images.length = 0;
                                    images2.length = 0;

                                    if (pose == "Separate_Leg_Head_to_Knee_Pose" || pose == "Standing_Seprated_Leg" || pose == "Triangle Pose") {
                                        if (pose == "Separate_Leg_Head_to_Knee_Pose" && datas[2].Separate_Leg_Head_to_Knee_Pose == false) {
                                            if (datas[2].Separate_Leg_Head_to_Knee_Pose == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[2].Separate_Leg_Head_to_Knee_Pose = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                            // datas[2].Awkward_Pose = true;
                                        } else if (pose == "Standing_Seprated_Leg" && datas[2].Separate_Leg_Head_to_Knee_Pose == true && datas[2].Standing_Seprated_Leg == false) {
                                            if (datas[2].Standing_Seprated_Leg == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[2].Standing_Seprated_Leg = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Triangle Pose" && datas[2].Standing_Seprated_Leg == true && datas[2].Triangle_Pose == false) {
                                            if (datas[2].Triangle_Pose == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[2].Triangle_Pose = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        }
                                    }

                                    if (apiresponse.length > 0) {
                                        console.log(apiresponse)
                                    }
                                }).catch(error => {
                                    maxresults.shift();
                                    // enter your logic for when there is an error (ex. error toast)
                                    console.log(error)
                                })
                        }
                    }
                    // end third fatch
                    // fatch forth set
                    if (sets[3] == true) {
                        if (datas[2].Separate_Leg_Head_to_Knee_Pose == true && datas[2].Standing_Seprated_Leg == true && datas[2].Triangle_Pose == true) {
                            var jsonkeypoints3 = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data, "API": "BIKRAM", "SET": "SET_4" })
                            sets[2] = false;
                            sets[4] = true;
                            console.log("fatch forth dataset");
                            fetch(url = "https://c01.sportcoach.app/post", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },

                                    body: jsonkeypoints3
                                })
                                .then(function(res) {
                                    return res.json()
                                })
                                .then(ans => {
                                    var out = parseInt(ans.accuracy);
                                    out.toFixed(4)
                                    var pose = ans.Pose_Name;
                                    var getimage = images[ans.Frame_Num];
                                    var getimage2 = images2[ans.Frame_Num];
                                    console.log(ans);
                                    document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                                    document.getElementById("data2").innerHTML = pose;
                                    maxresults.length = 0;
                                    images.length = 0;
                                    images2.length = 0;

                                    if (pose == "Shavasana(Corpsepose)" || pose == "Toe_Stand_Pose_Padangustasana(L)" || pose == "tree" || pose == "Wind_Removing_Pose_Pavanamuktasana(bothLegs)") {
                                        if (pose == "Shavasana(Corpsepose)" && datas[3].Shavasana_Corpsepose == false) {
                                            if (datas[3].Shavasana_Corpsepose == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[3].Shavasana_Corpsepose = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                            // datas[3].Awkward_Pose = true;
                                        } else if (pose == "Toe_Stand_Pose_Padangustasana(L)" && datas[3].Shavasana_Corpsepose == true && datas[3].Toe_Stand_Pose_Padangustasana_L == false) {
                                            if (datas[3].Toe_Stand_Pose_Padangustasana_L == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[3].Toe_Stand_Pose_Padangustasana_L = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "tree" && datas[3].Toe_Stand_Pose_Padangustasana_L == true && datas[3].tree == false) {
                                            if (datas[3].tree == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[3].tree = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Wind_Removing_Pose_Pavanamuktasana(bothLegs)" && datas[3].tree == true && datas[3].Wind_Removing_Pose_Pavanamuktasana_bothLegs == false) {
                                            if (datas[3].Wind_Removing_Pose_Pavanamuktasana_bothLegs == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[3].Wind_Removing_Pose_Pavanamuktasana_bothLegs = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        }
                                    }
                                    if (apiresponse.length > 0) {
                                        console.log(apiresponse)
                                    }
                                }).catch(error => {
                                    maxresults.shift();
                                    // enter your logic for when there is an error (ex. error toast)
                                    console.log(error)
                                })
                        }
                    }
                    // end forth fatch
                    //fifth set fatch
                    if (sets[4] == true) {
                        if (datas[3].Shavasana_Corpsepose == true && datas[3].Toe_Stand_Pose_Padangustasana_L == true && datas[3].tree == true && datas[3].Wind_Removing_Pose_Pavanamuktasana_bothLegs == true) {
                            var jsonkeypoints4 = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data, "API": "BIKRAM", "SET": "SET_5" })
                            sets[3] = false;
                            sets[5] = true;
                            console.log("fatch fifth dataset");
                            fetch(url = "https://c01.sportcoach.app/post", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },

                                    body: jsonkeypoints4
                                })
                                .then(function(res) {
                                    return res.json()
                                })
                                .then(ans => {
                                    var out = parseInt(ans.accuracy);
                                    out.toFixed(4)
                                    var pose = ans.Pose_Name;
                                    console.log(ans);
                                    var getimage = images[ans.Frame_Num];
                                    var getimage2 = images2[ans.Frame_Num];

                                    document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                                    document.getElementById("data2").innerHTML = pose;

                                    maxresults.length = 0;
                                    images.length = 0;
                                    images2.length = 0;
                                    if (pose == "Bhujangasana" || pose == "Bow_Pose_Dhanurasana" || pose == "Camel Pose" || pose == "Fixed Firm Pose" || pose == "Full_Locust_Pose_Poorna-Salabhasana" || pose == "Half Tortois" || pose == "Locust  Pose" || pose == "Rabbbit Pose") {
                                        if (pose == "Bhujangasana" && datas[4].Bhujangasana == false) {
                                            if (datas[4].Bhujangasana == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Bhujangasana = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Bow_Pose_Dhanurasana" && datas[4].Bhujangasana == true && datas[4].Bow_Pose_Dhanurasana == false) {
                                            if (datas[4].Bow_Pose_Dhanurasana == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Bow_Pose_Dhanurasana = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Camel Pose" && datas[4].Bow_Pose_Dhanurasana == true && datas[4].Camel_Pose == false) {
                                            if (datas[4].Camel_Pose == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Camel_Pose = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Fixed Firm Pose" && datas[4].Camel_Pose == true && datas[4].Fixed_Firm_Pose == false) {
                                            if (datas[4].Fixed_Firm_Pose == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Fixed_Firm_Pose = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Full_Locust_Pose_Poorna-Salabhasana" && datas[4].Fixed_Firm_Pose == true && datas[4].Full_Locust_Pose_Poorna_Salabhasana == false) {
                                            if (datas[4].Full_Locust_Pose_Poorna_Salabhasana == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Full_Locust_Pose_Poorna_Salabhasana = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Half Tortois" && datas[4].Full_Locust_Pose_Poorna_Salabhasana == true && datas[4].Half_Tortois == false) {
                                            if (datas[4].Half_Tortois == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Half_Tortois = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Locust Pose" && datas[4].Half_Tortois == true && datas[4].Locust_Pose == false) {
                                            if (datas[4].Locust_Pose == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Locust_Pose = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Rabbbit Pose" && datas[4].Locust_Pose == true && datas[4].Rabbbit_Pose == false) {
                                            if (datas[4].Rabbbit_Pose == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[4].Rabbbit_Pose = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        }
                                    }
                                    if (apiresponse.length > 0) {
                                        console.log(apiresponse)
                                    }
                                }).catch(error => {
                                    maxresults.shift();
                                    // enter your logic for when there is an error (ex. error toast)
                                    console.log(error)
                                })
                        }
                    }
                    //end fifth set fatch
                    //six set fatch
                    if (sets[5] == true) {
                        if (datas[4].Bhujangasana == true && datas[4].Bow_Pose_Dhanurasana == true && datas[4].Camel_Pose == true && datas[4].Fixed_Firm_Pose == true && datas[4].Full_Locust_Pose_Poorna_Salabhasana == true && datas[4].Half_Tortois == true && datas[4].Locust_Pose == true && datas[4].Rabbbit_Pose == true) {
                            var jsonkeypoints5 = JSON.stringify({ "LAN1": maxresults[0], "LAN2": maxresults[1], "LAN3": maxresults[2], "LAN4": maxresults[3], "LAN5": maxresults[4], "Frame_Num": data, "API": "BIKRAM", "SET": "SET_6" })
                            sets[3] = false;
                            console.log("fatch sixth dataset");
                            fetch(url = "https://c01.sportcoach.app/post", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },

                                    body: jsonkeypoints5
                                })
                                .then(function(res) {
                                    return res.json()
                                })
                                .then(ans => {
                                    var out = parseInt(ans.accuracy);
                                    out.toFixed(4)
                                    var pose = ans.Pose_Name;
                                    var getimage = images[ans.Frame_Num];
                                    var getimage2 = images2[ans.Frame_Num];

                                    console.log(ans);
                                    maxresults.length = 0;
                                    images.length = 0;
                                    images2.length = 0;
                                    document.getElementById("data1").innerHTML = ans.accuracy.length === 0 ? 0 : out.toFixed(2);
                                    document.getElementById("data2").innerHTML = pose;

                                    if (pose == "Head_to_Knee_with_Stretching_Pose _Janushirasana(HeadtoLeftKnee)" || pose == "Spine_Twisting_Pose_Ardha-Matsyendrasana(TwistToLeft)" || pose == "Blowing_in_Firm_Kapalbhati_in_Vajrasana") {
                                        if (pose == "Head_to_Knee_with_Stretching_Pose _Janushirasana(HeadtoLeftKnee)" && datas[5].Head_to_Knee_with_Stretching_Pose_Janushirasana_HeadtoLeftKnee == false) {
                                            if (datas[5].Head_to_Knee_with_Stretching_Pose_Janushirasana_HeadtoLeftKnee == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[5].Head_to_Knee_with_Stretching_Pose_Janushirasana_HeadtoLeftKnee = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                            // datas[0].Awkward_Pose = true;
                                        } else if (pose == "Spine_Twisting_Pose_Ardha-Matsyendrasana(TwistToLeft)" && datas[5].Head_to_Knee_with_Stretching_Pose_Janushirasana_HeadtoLeftKnee == true && datas[5].Spine_Twisting_Pose_Ardha_Matsyendrasana_TwistToLeft_ == false) {
                                            if (datas[5].Spine_Twisting_Pose_Ardha_Matsyendrasana_TwistToLeft_ == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[5].Spine_Twisting_Pose_Ardha_Matsyendrasana_TwistToLeft_ = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        } else if (pose == "Blowing_in_Firm_Kapalbhati_in_Vajrasana" && datas[5].Spine_Twisting_Pose_Ardha_Matsyendrasana_TwistToLeft_ == true && datas[5].Blowing_in_Firm_Kapalbhati_in_Vajrasana == false) {
                                            if (datas[5].Blowing_in_Firm_Kapalbhati_in_Vajrasana == false && first == false) {
                                                detectCount = 0;
                                                first = true;
                                            }
                                            detectCount++;
                                            addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose);
                                            if (detectCount == 5) {
                                                datas[5].Blowing_in_Firm_Kapalbhati_in_Vajrasana = true;
                                                bikramoneyogadata();
                                                detectCount = 0;
                                                first = false;
                                            }
                                        }
                                    }
                                    addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose)
                                    if (apiresponse.length > 0) {
                                        console.log(apiresponse)
                                    }
                                }).catch(error => {
                                    maxresults.shift();
                                    // enter your logic for when there is an error (ex. error toast)
                                    console.log(error)
                                })
                        }
                    }
                }
            }
        }
        if (apiresponse.length == 25) {
            final.push(apiresponse);
            console.log(final);
            yogacount++;
            apiresponse = [];
            apiresponse1 = [];
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
        canvasCtx5.restore();
    }
}

function addPoseDetail(apiresponse, pose, getimage, getimage2, ans, out, pose) {
    if (apiresponse.length >= 0 && (pose !== "No Pose" || pose !== "no Pose" || pose !== " ")) {
        var check = apiresponse.filter(x => x.PoseName === pose);
        var index = apiresponse.findIndex(x => x.PoseName === pose);

        if (check.length > 0 && (getimage !== undefined || getimage2 !== undefined)) {
            if (check[0].Accuracy < out) {
                apiresponse.splice(index, 1);
                apiresponse.push({
                    'PoseName': pose,
                    'Accuracy': out,
                    'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                    'Distance': ans.OverAll_Results.Best_Pose.Distance,
                    'Images': (storeImg == true) ? getimage : getimage2,
                    'SetNo': yogacount + 1,
                })
                console.log(getimage);
            }
        } else {
            if (getimage !== undefined || getimage2 !== undefined) {
                apiresponse.push({
                    'PoseName': pose,
                    'Accuracy': out,
                    'BestPose': ans.OverAll_Results.Best_Pose.Angles,
                    'Distance': ans.OverAll_Results.Best_Pose.Distance,
                    'Images': (storeImg == true) ? getimage : getimage2,
                    'SetNo': yogacount + 1
                })
                console.log(getimage);
            }
        }
    }
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

end.addEventListener('click', () => {
    if (final.length > 0) {
        var api = final;
    } else {
        final.push(apiresponse);
        var api = final;
    }
    $.post({
            url: '/bikramyogadata',
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
});

function bikramoneyogadata() {
    if (final.length > 0) {
        var api = final;
    } else {
        final.push(apiresponse);
        var api = final;
    }
    final = [];
    apiresponse = [];
    $.post({
            url: '/bikramoneyogadata',
            enctype: 'mutipart/form-data',
        }, { param: JSON.stringify(api), User: User.value, TotalSessionTime: TotalSessionTime, kKal: kKal.toFixed(2) },
        function(data) {
            if (data == 'received') {
                console.log(data);

            }
        });
}
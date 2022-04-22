const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bikramRoutes = express.Router();
const bikramData = require('../app/model/bikram');
var moment = require('moment');
let newSet = true;

bikramRoutes.post('/bikramoneyogadata', async(req, res) => {
    var data = req.body.param;
    var email = req.body.User;
    var TotalSessionTime = req.body.TotalSessionTime;
    var kKal = req.body.kKal;
    var insertDate = moment().format('"YYYY-MM-DD"');
    var jsondata = JSON.parse(data);
    var sn = await bikramData.find({ $and: [{ insertDateTime: insertDate }, { email: email }] }, { SessionNo: true, _id: false }).sort({ SessionNo: -1 }).limit(1);
    console.log(sn);
    console.log(newSet);
    if (sn[0] == undefined && newSet == true) {
        var newsn = 1;
        newSet = false;
    } else {
        if (newSet == true) {
            var newsn = sn[0].SessionNo + 1;
            newSet = false;
        } else {
            var newsn = sn[0].SessionNo;
        }
    }

    for (var j = 0; j < jsondata.length; j++) {
        for (var i = 0; i < jsondata[j].length; i++) {
            var { PoseName, Accuracy, BestPose, Distance, Images, SetNo } = jsondata[j][i];


            var L_face_hip_ankle1 = BestPose.Ground_Truth.L_face_hip_ankle;
            var L_hip_knee_ankle1 = BestPose.Ground_Truth.L_hip_knee_ankle;
            var L_index_hip_ankle1 = BestPose.Ground_Truth.L_index_hip_ankle;
            var L_index_shoulder_ankle1 = BestPose.Ground_Truth.L_index_shoulder_ankle;
            var L_shoulder_elbow_wrist1 = BestPose.Ground_Truth.L_shoulder_elbow_wrist;
            var L_shoulder_hip_ankle1 = BestPose.Ground_Truth.L_shoulder_hip_ankle;
            var L_shoulder_hip_knee1 = BestPose.Ground_Truth.L_shoulder_hip_knee;
            var R_face_hip_ankle1 = BestPose.Ground_Truth.R_face_hip_ankle;
            var R_hip_knee_ankle1 = BestPose.Ground_Truth.R_hip_knee_ankle;
            var R_index_hip_ankle1 = BestPose.Ground_Truth.R_index_hip_ankle;
            var R_index_shoulder_ankle1 = BestPose.Ground_Truth.R_index_shoulder_ankle;
            var R_shoulder_elbow_wrist1 = BestPose.Ground_Truth.R_shoulder_elbow_wrist;
            var R_shoulder_hip_ankle1 = BestPose.Ground_Truth.R_shoulder_hip_ankle;
            var R_shoulder_hip_knee1 = BestPose.Ground_Truth.R_shoulder_hip_knee;
            // jointalignment wrror
            var L_face_hip_ankle2 = BestPose.Joint_Alignment_Error.L_face_hip_ankle;
            var L_hip_knee_ankle2 = BestPose.Joint_Alignment_Error.L_hip_knee_ankle;
            var L_index_hip_ankle2 = BestPose.Joint_Alignment_Error.L_index_hip_ankle;
            var L_index_shoulder_ankle2 = BestPose.Joint_Alignment_Error.L_index_shoulder_ankle;
            var L_shoulder_elbow_wrist2 = BestPose.Joint_Alignment_Error.L_shoulder_elbow_wrist;
            var L_shoulder_hip_ankle2 = BestPose.Joint_Alignment_Error.L_shoulder_hip_ankle;
            var L_shoulder_hip_knee2 = BestPose.Joint_Alignment_Error.L_shoulder_hip_knee;
            var R_face_hip_ankle2 = BestPose.Joint_Alignment_Error.R_face_hip_ankle;
            var R_hip_knee_ankle2 = BestPose.Joint_Alignment_Error.R_hip_knee_ankle;
            var R_index_hip_ankle2 = BestPose.Joint_Alignment_Error.R_index_hip_ankle;
            var R_index_shoulder_ankle2 = BestPose.Joint_Alignment_Error.R_index_shoulder_ankle;
            var R_shoulder_elbow_wrist2 = BestPose.Joint_Alignment_Error.R_shoulder_elbow_wrist;
            var R_shoulder_hip_ankle2 = BestPose.Joint_Alignment_Error.R_shoulder_hip_ankle;
            var R_shoulder_hip_knee2 = BestPose.Joint_Alignment_Error.R_shoulder_hip_knee;
            // distance alignment error
            var L_ear_ankle3 = Distance.Distance_Alignment_Error.L_ear_ankle;
            var L_ear_hip3 = Distance.Distance_Alignment_Error.L_ear_hip;
            var L_ear_knee3 = Distance.Distance_Alignment_Error.L_ear_knee;
            var L_ear_shoulder3 = Distance.Distance_Alignment_Error.L_ear_shoulder;
            var L_ear_wrist3 = Distance.Distance_Alignment_Error.L_ear_wrist;
            var L_finger_hip3 = Distance.Distance_Alignment_Error.L_finger_hip;
            var L_hip_ankle3 = Distance.Distance_Alignment_Error.L_hip_ankle;
            var L_shoulder_ankle3 = Distance.Distance_Alignment_Error.L_shoulder_ankle;
            var L_shoulder_hip3 = Distance.Distance_Alignment_Error.L_shoulder_hip;
            var L_shoulder_knee3 = Distance.Distance_Alignment_Error.L_shoulder_knee;
            var R_ear_ankle3 = Distance.Distance_Alignment_Error.R_ear_ankle;
            var R_ear_hip3 = Distance.Distance_Alignment_Error.R_ear_hip;
            var R_ear_knee3 = Distance.Distance_Alignment_Error.R_ear_knee;
            var R_ear_shoulder3 = Distance.Distance_Alignment_Error.R_ear_shoulder;
            var R_ear_wrist3 = Distance.Distance_Alignment_Error.R_ear_wrist;
            var R_finger_hip3 = Distance.Distance_Alignment_Error.R_finger_hip;
            var R_hip_ankle3 = Distance.Distance_Alignment_Error.R_hip_ankle;
            var R_shoulder_ankle3 = Distance.Distance_Alignment_Error.R_shoulder_ankle;
            var R_shoulder_hip3 = Distance.Distance_Alignment_Error.R_shoulder_hip;
            var R_shoulder_knee3 = Distance.Distance_Alignment_Error.R_shoulder_knee;

            // mos
            var L_ear_ankle4 = Distance.Musculoskeletal.L_ear_ankle
            var L_ear_hip4 = Distance.Musculoskeletal.L_ear_hip;
            var L_ear_knee4 = Distance.Musculoskeletal.L_ear_knee;
            var L_ear_shoulder4 = Distance.Musculoskeletal.L_ear_shoulder;
            var L_ear_wrist4 = Distance.Musculoskeletal.L_ear_wrist;
            var L_finger_hip4 = Distance.Musculoskeletal.L_finger_hip;
            var L_hip_ankle4 = Distance.Musculoskeletal.L_hip_ankle;
            var L_shoulder_ankle4 = Distance.Musculoskeletal.L_shoulder_ankle;
            var L_shoulder_hip4 = Distance.Musculoskeletal.L_shoulder_hip;
            var L_shoulder_knee4 = Distance.Musculoskeletal.L_shoulder_knee;
            var R_ear_ankle4 = Distance.Musculoskeletal.R_ear_ankle;
            var R_ear_hip4 = Distance.Musculoskeletal.R_ear_hip;
            var R_ear_knee4 = Distance.Musculoskeletal.R_ear_knee;
            var R_ear_shoulder4 = Distance.Musculoskeletal.R_ear_shoulder;
            var R_ear_wrist4 = Distance.Musculoskeletal.R_ear_wrist;
            var R_finger_hip4 = Distance.Musculoskeletal.R_finger_hip;
            var R_hip_ankle4 = Distance.Musculoskeletal.R_hip_ankle;
            var R_shoulder_ankle4 = Distance.Musculoskeletal.R_shoulder_ankle;
            var R_shoulder_hip4 = Distance.Musculoskeletal.R_shoulder_hip;
            var R_shoulder_knee4 = Distance.Musculoskeletal.R_shoulder_knee;



            var datatosave = {
                email,
                insertDateTime: insertDate,
                PoseName,
                Accuracy,
                Images,
                SetNo,
                SessionNo: newsn,
                SessionTime: TotalSessionTime,
                Kalorie: kKal,
                hathayoga: {
                    L_face_hip_ankle: L_face_hip_ankle1,
                    L_hip_knee_ankle: L_hip_knee_ankle1,
                    L_index_hip_ankle: L_index_hip_ankle1,
                    L_index_shoulder_ankle: L_index_shoulder_ankle1,
                    L_shoulder_elbow_wrist: L_shoulder_elbow_wrist1,
                    L_shoulder_hip_ankle: L_shoulder_hip_ankle1,
                    L_shoulder_hip_knee: L_shoulder_hip_knee1,
                    R_face_hip_ankle: R_face_hip_ankle1,
                    R_hip_knee_ankle: R_hip_knee_ankle1,
                    R_index_hip_ankle: R_index_hip_ankle1,
                    R_index_shoulder_ankle: R_index_shoulder_ankle1,
                    R_shoulder_elbow_wrist: R_shoulder_elbow_wrist1,
                    R_shoulder_hip_ankle: R_shoulder_hip_ankle1,
                    R_shoulder_hip_knee: R_shoulder_hip_knee1,
                },
                distancealignmenterror: {
                    L_ear_ankle: L_ear_ankle3,
                    L_ear_hip: L_ear_hip3,
                    L_ear_knee: L_ear_knee3,
                    L_ear_shoulder: L_ear_shoulder3,
                    L_ear_wrist: L_ear_wrist3,
                    L_finger_hip: L_finger_hip3,
                    L_hip_ankle: L_hip_ankle3,
                    L_shoulder_ankle: L_shoulder_ankle3,
                    L_shoulder_hip: L_shoulder_hip3,
                    L_shoulder_knee: L_shoulder_knee3,
                    R_ear_ankle: R_ear_ankle3,
                    R_ear_hip: R_ear_hip3,
                    R_ear_knee: R_ear_knee3,
                    R_ear_shoulder: R_ear_shoulder3,
                    R_ear_wrist: R_ear_wrist3,
                    R_finger_hip: R_finger_hip3,
                    R_hip_ankle: R_hip_ankle3,
                    R_shoulder_ankle: R_shoulder_ankle3,
                    R_shoulder_hip: R_shoulder_hip3,
                    R_shoulder_knee: R_shoulder_knee3,
                },
                jointalignmenterror: {
                    L_face_hip_ankle: L_face_hip_ankle2,
                    L_hip_knee_ankle: L_hip_knee_ankle2,
                    L_index_hip_ankle: L_index_hip_ankle2,
                    L_index_shoulder_ankle: L_index_shoulder_ankle2,
                    L_shoulder_elbow_wrist: L_shoulder_elbow_wrist2,
                    L_shoulder_hip_ankle: L_shoulder_hip_ankle2,
                    L_shoulder_hip_knee: L_shoulder_hip_knee2,
                    R_face_hip_ankle: R_face_hip_ankle2,
                    R_hip_knee_ankle: R_hip_knee_ankle2,
                    R_index_hip_ankle: R_index_hip_ankle2,
                    R_index_shoulder_ankle: R_index_shoulder_ankle2,
                    R_shoulder_elbow_wrist: R_shoulder_elbow_wrist2,
                    R_shoulder_hip_ankle: R_shoulder_hip_ankle2,
                    R_shoulder_hip_knee: R_shoulder_hip_knee2,
                },
                musculoskeletals: {
                    L_ear_ankle: L_ear_ankle4,
                    L_ear_hip: L_ear_hip4,
                    L_ear_knee: L_ear_knee4,
                    L_ear_shoulder: L_ear_shoulder4,
                    L_ear_wrist: L_ear_wrist4,
                    L_finger_hip: L_finger_hip4,
                    L_hip_ankle: L_hip_ankle4,
                    L_shoulder_ankle: L_shoulder_ankle4,
                    L_shoulder_hip: L_shoulder_hip4,
                    L_shoulder_knee: L_shoulder_knee4,
                    R_ear_ankle: R_ear_ankle4,
                    R_ear_hip: R_ear_hip4,
                    R_ear_knee: R_ear_knee4,
                    R_ear_shoulder: R_ear_shoulder4,
                    R_ear_wrist: R_ear_wrist4,
                    R_finger_hip: R_finger_hip4,
                    R_hip_ankle: R_hip_ankle4,
                    R_shoulder_ankle: R_shoulder_ankle4,
                    R_shoulder_hip: R_shoulder_hip4,
                    R_shoulder_knee: R_shoulder_knee4,
                }
            };
            bikramData(datatosave).save((err, data) => {
                if (err) throw err;
            });
        }
    }
    res.send("received");
});

bikramRoutes.post('/bikramyogadata', async(req, res) => {
    var data = req.body.param;
    var email = req.body.User;
    var TotalSessionTime = req.body.TotalSessionTime;
    var kKal = req.body.kKal;
    var insertDate = moment().format('"YYYY-MM-DD"');
    var jsondata = JSON.parse(data);
    var sn = await bikramData.find({ $and: [{ insertDateTime: insertDate }, { email: email }] }, { SessionNo: true, _id: false }).sort({ SessionNo: -1 }).limit(1);
    console.log(sn);
    console.log(newSet);
    if (sn[0] == undefined && newSet == true) {
        var newsn = 1;
    } else {
        if (newSet == false) {
            var newsn = sn[0].SessionNo;
            newSet = true;
        } else {
            var newsn = sn[0].SessionNo + 1;
        }
    }

    for (var j = 0; j < jsondata.length; j++) {
        for (var i = 0; i < jsondata[j].length; i++) {
            var { PoseName, Accuracy, BestPose, Distance, Images, SetNo } = jsondata[j][i];


            var L_face_hip_ankle1 = BestPose.Ground_Truth.L_face_hip_ankle;
            var L_hip_knee_ankle1 = BestPose.Ground_Truth.L_hip_knee_ankle;
            var L_index_hip_ankle1 = BestPose.Ground_Truth.L_index_hip_ankle;
            var L_index_shoulder_ankle1 = BestPose.Ground_Truth.L_index_shoulder_ankle;
            var L_shoulder_elbow_wrist1 = BestPose.Ground_Truth.L_shoulder_elbow_wrist;
            var L_shoulder_hip_ankle1 = BestPose.Ground_Truth.L_shoulder_hip_ankle;
            var L_shoulder_hip_knee1 = BestPose.Ground_Truth.L_shoulder_hip_knee;
            var R_face_hip_ankle1 = BestPose.Ground_Truth.R_face_hip_ankle;
            var R_hip_knee_ankle1 = BestPose.Ground_Truth.R_hip_knee_ankle;
            var R_index_hip_ankle1 = BestPose.Ground_Truth.R_index_hip_ankle;
            var R_index_shoulder_ankle1 = BestPose.Ground_Truth.R_index_shoulder_ankle;
            var R_shoulder_elbow_wrist1 = BestPose.Ground_Truth.R_shoulder_elbow_wrist;
            var R_shoulder_hip_ankle1 = BestPose.Ground_Truth.R_shoulder_hip_ankle;
            var R_shoulder_hip_knee1 = BestPose.Ground_Truth.R_shoulder_hip_knee;
            // jointalignment wrror
            var L_face_hip_ankle2 = BestPose.Joint_Alignment_Error.L_face_hip_ankle;
            var L_hip_knee_ankle2 = BestPose.Joint_Alignment_Error.L_hip_knee_ankle;
            var L_index_hip_ankle2 = BestPose.Joint_Alignment_Error.L_index_hip_ankle;
            var L_index_shoulder_ankle2 = BestPose.Joint_Alignment_Error.L_index_shoulder_ankle;
            var L_shoulder_elbow_wrist2 = BestPose.Joint_Alignment_Error.L_shoulder_elbow_wrist;
            var L_shoulder_hip_ankle2 = BestPose.Joint_Alignment_Error.L_shoulder_hip_ankle;
            var L_shoulder_hip_knee2 = BestPose.Joint_Alignment_Error.L_shoulder_hip_knee;
            var R_face_hip_ankle2 = BestPose.Joint_Alignment_Error.R_face_hip_ankle;
            var R_hip_knee_ankle2 = BestPose.Joint_Alignment_Error.R_hip_knee_ankle;
            var R_index_hip_ankle2 = BestPose.Joint_Alignment_Error.R_index_hip_ankle;
            var R_index_shoulder_ankle2 = BestPose.Joint_Alignment_Error.R_index_shoulder_ankle;
            var R_shoulder_elbow_wrist2 = BestPose.Joint_Alignment_Error.R_shoulder_elbow_wrist;
            var R_shoulder_hip_ankle2 = BestPose.Joint_Alignment_Error.R_shoulder_hip_ankle;
            var R_shoulder_hip_knee2 = BestPose.Joint_Alignment_Error.R_shoulder_hip_knee;
            // distance alignment error
            var L_ear_ankle3 = Distance.Distance_Alignment_Error.L_ear_ankle;
            var L_ear_hip3 = Distance.Distance_Alignment_Error.L_ear_hip;
            var L_ear_knee3 = Distance.Distance_Alignment_Error.L_ear_knee;
            var L_ear_shoulder3 = Distance.Distance_Alignment_Error.L_ear_shoulder;
            var L_ear_wrist3 = Distance.Distance_Alignment_Error.L_ear_wrist;
            var L_finger_hip3 = Distance.Distance_Alignment_Error.L_finger_hip;
            var L_hip_ankle3 = Distance.Distance_Alignment_Error.L_hip_ankle;
            var L_shoulder_ankle3 = Distance.Distance_Alignment_Error.L_shoulder_ankle;
            var L_shoulder_hip3 = Distance.Distance_Alignment_Error.L_shoulder_hip;
            var L_shoulder_knee3 = Distance.Distance_Alignment_Error.L_shoulder_knee;
            var R_ear_ankle3 = Distance.Distance_Alignment_Error.R_ear_ankle;
            var R_ear_hip3 = Distance.Distance_Alignment_Error.R_ear_hip;
            var R_ear_knee3 = Distance.Distance_Alignment_Error.R_ear_knee;
            var R_ear_shoulder3 = Distance.Distance_Alignment_Error.R_ear_shoulder;
            var R_ear_wrist3 = Distance.Distance_Alignment_Error.R_ear_wrist;
            var R_finger_hip3 = Distance.Distance_Alignment_Error.R_finger_hip;
            var R_hip_ankle3 = Distance.Distance_Alignment_Error.R_hip_ankle;
            var R_shoulder_ankle3 = Distance.Distance_Alignment_Error.R_shoulder_ankle;
            var R_shoulder_hip3 = Distance.Distance_Alignment_Error.R_shoulder_hip;
            var R_shoulder_knee3 = Distance.Distance_Alignment_Error.R_shoulder_knee;

            // mos
            var L_ear_ankle4 = Distance.Musculoskeletal.L_ear_ankle
            var L_ear_hip4 = Distance.Musculoskeletal.L_ear_hip;
            var L_ear_knee4 = Distance.Musculoskeletal.L_ear_knee;
            var L_ear_shoulder4 = Distance.Musculoskeletal.L_ear_shoulder;
            var L_ear_wrist4 = Distance.Musculoskeletal.L_ear_wrist;
            var L_finger_hip4 = Distance.Musculoskeletal.L_finger_hip;
            var L_hip_ankle4 = Distance.Musculoskeletal.L_hip_ankle;
            var L_shoulder_ankle4 = Distance.Musculoskeletal.L_shoulder_ankle;
            var L_shoulder_hip4 = Distance.Musculoskeletal.L_shoulder_hip;
            var L_shoulder_knee4 = Distance.Musculoskeletal.L_shoulder_knee;
            var R_ear_ankle4 = Distance.Musculoskeletal.R_ear_ankle;
            var R_ear_hip4 = Distance.Musculoskeletal.R_ear_hip;
            var R_ear_knee4 = Distance.Musculoskeletal.R_ear_knee;
            var R_ear_shoulder4 = Distance.Musculoskeletal.R_ear_shoulder;
            var R_ear_wrist4 = Distance.Musculoskeletal.R_ear_wrist;
            var R_finger_hip4 = Distance.Musculoskeletal.R_finger_hip;
            var R_hip_ankle4 = Distance.Musculoskeletal.R_hip_ankle;
            var R_shoulder_ankle4 = Distance.Musculoskeletal.R_shoulder_ankle;
            var R_shoulder_hip4 = Distance.Musculoskeletal.R_shoulder_hip;
            var R_shoulder_knee4 = Distance.Musculoskeletal.R_shoulder_knee;



            var datatosave = {
                email,
                insertDateTime: insertDate,
                PoseName,
                Accuracy,
                Images,
                SetNo,
                SessionNo: newsn,
                SessionTime: TotalSessionTime,
                Kalorie: kKal,
                hathayoga: {
                    L_face_hip_ankle: L_face_hip_ankle1,
                    L_hip_knee_ankle: L_hip_knee_ankle1,
                    L_index_hip_ankle: L_index_hip_ankle1,
                    L_index_shoulder_ankle: L_index_shoulder_ankle1,
                    L_shoulder_elbow_wrist: L_shoulder_elbow_wrist1,
                    L_shoulder_hip_ankle: L_shoulder_hip_ankle1,
                    L_shoulder_hip_knee: L_shoulder_hip_knee1,
                    R_face_hip_ankle: R_face_hip_ankle1,
                    R_hip_knee_ankle: R_hip_knee_ankle1,
                    R_index_hip_ankle: R_index_hip_ankle1,
                    R_index_shoulder_ankle: R_index_shoulder_ankle1,
                    R_shoulder_elbow_wrist: R_shoulder_elbow_wrist1,
                    R_shoulder_hip_ankle: R_shoulder_hip_ankle1,
                    R_shoulder_hip_knee: R_shoulder_hip_knee1,
                },
                distancealignmenterror: {
                    L_ear_ankle: L_ear_ankle3,
                    L_ear_hip: L_ear_hip3,
                    L_ear_knee: L_ear_knee3,
                    L_ear_shoulder: L_ear_shoulder3,
                    L_ear_wrist: L_ear_wrist3,
                    L_finger_hip: L_finger_hip3,
                    L_hip_ankle: L_hip_ankle3,
                    L_shoulder_ankle: L_shoulder_ankle3,
                    L_shoulder_hip: L_shoulder_hip3,
                    L_shoulder_knee: L_shoulder_knee3,
                    R_ear_ankle: R_ear_ankle3,
                    R_ear_hip: R_ear_hip3,
                    R_ear_knee: R_ear_knee3,
                    R_ear_shoulder: R_ear_shoulder3,
                    R_ear_wrist: R_ear_wrist3,
                    R_finger_hip: R_finger_hip3,
                    R_hip_ankle: R_hip_ankle3,
                    R_shoulder_ankle: R_shoulder_ankle3,
                    R_shoulder_hip: R_shoulder_hip3,
                    R_shoulder_knee: R_shoulder_knee3,
                },
                jointalignmenterror: {
                    L_face_hip_ankle: L_face_hip_ankle2,
                    L_hip_knee_ankle: L_hip_knee_ankle2,
                    L_index_hip_ankle: L_index_hip_ankle2,
                    L_index_shoulder_ankle: L_index_shoulder_ankle2,
                    L_shoulder_elbow_wrist: L_shoulder_elbow_wrist2,
                    L_shoulder_hip_ankle: L_shoulder_hip_ankle2,
                    L_shoulder_hip_knee: L_shoulder_hip_knee2,
                    R_face_hip_ankle: R_face_hip_ankle2,
                    R_hip_knee_ankle: R_hip_knee_ankle2,
                    R_index_hip_ankle: R_index_hip_ankle2,
                    R_index_shoulder_ankle: R_index_shoulder_ankle2,
                    R_shoulder_elbow_wrist: R_shoulder_elbow_wrist2,
                    R_shoulder_hip_ankle: R_shoulder_hip_ankle2,
                    R_shoulder_hip_knee: R_shoulder_hip_knee2,
                },
                musculoskeletals: {
                    L_ear_ankle: L_ear_ankle4,
                    L_ear_hip: L_ear_hip4,
                    L_ear_knee: L_ear_knee4,
                    L_ear_shoulder: L_ear_shoulder4,
                    L_ear_wrist: L_ear_wrist4,
                    L_finger_hip: L_finger_hip4,
                    L_hip_ankle: L_hip_ankle4,
                    L_shoulder_ankle: L_shoulder_ankle4,
                    L_shoulder_hip: L_shoulder_hip4,
                    L_shoulder_knee: L_shoulder_knee4,
                    R_ear_ankle: R_ear_ankle4,
                    R_ear_hip: R_ear_hip4,
                    R_ear_knee: R_ear_knee4,
                    R_ear_shoulder: R_ear_shoulder4,
                    R_ear_wrist: R_ear_wrist4,
                    R_finger_hip: R_finger_hip4,
                    R_hip_ankle: R_hip_ankle4,
                    R_shoulder_ankle: R_shoulder_ankle4,
                    R_shoulder_hip: R_shoulder_hip4,
                    R_shoulder_knee: R_shoulder_knee4,
                }
            };
            bikramData(datatosave).save((err, data) => {
                if (err) throw err;
            });
        }
    }
    res.send("received");
});

bikramRoutes.get('/bikramyogadata', async(req, res) => {
    var date = req.query.date;
    var email = req.query.email.replace(/["]+/g, '');
    console.log(email.replace(/["]+/g, ''));
    // var date1 = moment().format('"YYYY-MM-DD"');
    bikramData.find({ $and: [{ insertDateTime: date }, { email: email }] }, { SessionNo: true, _id: false }, (err, data) => {
        if (err) throw err;
        if (!data) {
            res.send("Data not found");
        }
        if (data) {
            res.send(data);
        }
    });

});
bikramRoutes.get('/bikramsessiondata', async(req, res) => {
    var date = req.query.date;
    var email = req.query.email.replace(/["]+/g, '');
    var SetNo = parseInt(req.query.SetNo);
    var SessionNo = parseInt(req.query.SessionNo);

    bikramData.find({ $and: [{ insertDateTime: date }, { email: email }, { SetNo: SetNo }, { SessionNo: SessionNo }] }, (err, data) => {
        if (err) throw err;
        if (!data) {
            res.send("Data not found");
        }
        if (data) {
            res.send(data);
        }
    });

});
bikramRoutes.get('/bikramsetdata', async(req, res) => {
    var date = req.query.date;
    var email = req.query.email.replace(/["]+/g, '');
    var SessionNo = parseInt(req.query.SessionNo);
    // var SetNo = parseInt(req.query.SetNo);
    bikramData.find({ $and: [{ insertDateTime: date }, { email: email }, { SessionNo: SessionNo }] }, { SessionNo: true, SetNo: true, _id: false }, (err, data) => {
        if (err) throw err;
        if (!data) {
            res.send("Data not found");
        }
        if (data) {
            res.send(data);
        }
    });

});
bikramRoutes.get('/bikramposedata', async(req, res) => {
    var _id = req.query._id;

    bikramData.find({ _id }, (err, data) => {
        if (err) throw err;
        if (!data) {
            res.send("Data not found");
        }
        if (data) {
            res.send(data);
        }
    });

});
module.exports = bikramRoutes;
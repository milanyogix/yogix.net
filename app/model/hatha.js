const mongoose = require("mongoose");

const HathaSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    insertDateTime: {
        type: String,
        required: true,
    },
    PoseName: {
        type: String,
        required: true,
    },
    Accuracy: {
        type: String,
        required: true,
    },
    SetNo: {
        type: Number,
        required: true
    },
    SessionNo: {
        type: Number,
        require: true,
        default: 0
    },
    Kalorie: {
        type: String,
    },
    SessionTime: {
        type: String,
        required: true
    },
    Images: {
        type: String,
        required: true,
    },
    hathayoga: {
        L_hip_knee_ankle: {
            type: String
        },
        R_hip_knee_ankle: {
            type: String
        },
        L_shoulder_elbow_wrist: {
            type: String
        },
        R_shoulder_elbow_wrist: {
            type: String
        },
        L_shoulder_hip_ankle: {
            type: String
        },
        R_shoulder_hip_ankle: {
            type: String
        },
        L_index_shoulder_ankle: {
            type: String
        },
        R_index_shoulder_ankle: {
            type: String
        },
        L_shoulder_hip_knee: {
            type: String
        },
        R_shoulder_hip_knee: {
            type: String
        },
        L_face_hip_ankle: {
            type: String
        },
        R_face_hip_ankle: {
            type: String
        },
        L_index_hip_ankle: {
            type: String
        },
        R_index_hip_ankle: {
            type: String
        },
    },
    distancealignmenterror: {
        L_ear_ankle: {
            type: String
        },
        L_ear_hip: {
            type: String
        },
        L_ear_knee: {
            type: String
        },
        L_ear_shoulder: {
            type: String
        },
        L_ear_wrist: {
            type: String
        },
        L_finger_hip: {
            type: String
        },
        L_hip_ankle: {
            type: String
        },
        L_shoulder_ankle: {
            type: String
        },
        L_shoulder_knee: {
            type: String
        },
        R_ear_ankle: {
            type: String
        },
        R_ear_hip: {
            type: String
        },
        R_ear_knee: {
            type: String
        },
        R_ear_shoulder: {
            type: String
        },
        R_ear_wrist: {
            type: String
        },
        R_finger_hip: {
            type: String
        },
        R_hip_ankle: {
            type: String
        },
        R_shoulder_ankle: {
            type: String
        },
        R_shoulder_knee: {
            type: String
        },

    },
    jointalignmenterror: {
        L_hip_knee_ankle: {
            type: String
        },
        R_hip_knee_ankle: {
            type: String
        },
        L_shoulder_elbow_wrist: {
            type: String
        },
        R_shoulder_elbow_wrist: {
            type: String
        },
        L_shoulder_hip_ankle: {
            type: String
        },
        R_shoulder_hip_ankle: {
            type: String
        },
        L_index_shoulder_ankle: {
            type: String
        },
        R_index_shoulder_ankle: {
            type: String
        },
        L_shoulder_hip_knee: {
            type: String
        },
        R_shoulder_hip_knee: {
            type: String
        },
        L_face_hip_ankle: {
            type: String
        },
        R_face_hip_ankle: {
            type: String
        },
        L_index_hip_ankle: {
            type: String
        },
        R_index_hip_ankle: {
            type: String
        },
    },
    musculoskeletals: {
        L_ear_ankle: {
            type: String
        },
        L_ear_hip: {
            type: String
        },
        L_ear_knee: {
            type: String
        },
        L_ear_shoulder: {
            type: String
        },
        L_ear_wrist: {
            type: String
        },
        L_finger_hip: {
            type: String
        },
        L_hip_ankle: {
            type: String
        },
        L_shoulder_ankle: {
            type: String
        },

        L_shoulder_knee: {
            type: String
        },
        R_ear_ankle: {
            type: String
        },
        R_ear_hip: {
            type: String
        },
        R_ear_knee: {
            type: String
        },
        R_ear_shoulder: {
            type: String
        },
        R_ear_wrist: {
            type: String
        },
        R_finger_hip: {
            type: String
        },
        R_hip_ankle: {
            type: String
        },
        R_shoulder_ankle: {
            type: String
        },
        R_shoulder_knee: {
            type: String
        },
    }
});


const hathaYoga = new mongoose.model("hathaYoga", HathaSchema);

module.exports = hathaYoga;
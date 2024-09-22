"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DONATE_TYPE = exports.RELATION_APPLICANT_TYPE = exports.PATIENT_TYPE = void 0;
var PATIENT_TYPE;
(function (PATIENT_TYPE) {
    PATIENT_TYPE["Accident"] = "Accident";
    PATIENT_TYPE["Thalassemia"] = "Thalassemia";
    PATIENT_TYPE["Pregnant"] = "Pregnant";
    PATIENT_TYPE["Operation"] = "Operation";
})(PATIENT_TYPE || (exports.PATIENT_TYPE = PATIENT_TYPE = {}));
var RELATION_APPLICANT_TYPE;
(function (RELATION_APPLICANT_TYPE) {
    RELATION_APPLICANT_TYPE["Me"] = "Me";
    RELATION_APPLICANT_TYPE["Father"] = "Father";
    RELATION_APPLICANT_TYPE["Mother"] = "Mother";
    RELATION_APPLICANT_TYPE["Brother"] = "Brother";
    RELATION_APPLICANT_TYPE["Sister"] = "Sister";
    RELATION_APPLICANT_TYPE["Son"] = "Son";
    RELATION_APPLICANT_TYPE["Other"] = "Other";
})(RELATION_APPLICANT_TYPE || (exports.RELATION_APPLICANT_TYPE = RELATION_APPLICANT_TYPE = {}));
var DONATE_TYPE;
(function (DONATE_TYPE) {
    DONATE_TYPE["Blood"] = "Blood";
    DONATE_TYPE["Fund"] = "Fund";
})(DONATE_TYPE || (exports.DONATE_TYPE = DONATE_TYPE = {}));

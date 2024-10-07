const express = require("express");
const router = express.Router();
const PatientController = require('../Controllers/patient');

// Define the POST route
router.post('/post', PatientController.PostPatient);
router.get('/get/:id', PatientController.getPatientById);
router.get('/getStatus/:statusFind',PatientController.getPatientByStatus);
router.put('/:id',PatientController.updatePatient);
router.get('/:id/testDetail',PatientController.getpatientTestDetails);
router.delete('/:id',PatientController.deletePatient);


module.exports = router;
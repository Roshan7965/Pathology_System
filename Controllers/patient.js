const patient = require("../Modals/patientModals");
const test= require("../Modals/testModals");

// Add a new patient
exports.PostPatient = async (req, res) => {
  try {
    const body = req.body;

    const newPatient = await patient.create(body);
    if (newPatient) {
      return res.status(200).json({
        data: newPatient,
        message: "Patient added successfully",
      });
    } else {
      return res.status(404).json({
        error: "Technical issue",
        message: "Patient data was not added",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      status: "Fail",
      message: "Technical fault",
    });
  }
};

// Get a patient by ID
exports.getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundPatient = await patient.findById(id);

    if (foundPatient) {
      res.status(200).json({
        data: foundPatient,
        message: "Patient retrieved successfully",
      });
    } else {
      res.status(404).json({
        message: "Patient not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: "Fail",
      message: "Technical fault",
    });
  }
};

exports.getPatientByStatus = async (req, res) => {
  const { statusFind } = req.params;
  console.log(statusFind);
  try {
    const isdata = await patient.find({ status: statusFind });
    res.status(200).json({
      message: "fetch successfully",
      data: isdata,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: "Fail",
      message: "Technical fault",
    });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const updatePatient = await patient.updateOne({ _id: id }, body);

    if (updatePatient) {
      res.status(200).json({
        message: "updated Successfully",
        data: updatePatient,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: "Fail",
      message: "Technical fault",
    });
  }
};

exports.getpatientTestDetails= async (req, res) => {
  try {
    const {id}=req.params;
    const isPatientData= await patient.findById(id);
    // console.log(isPatientData);
    if(isPatientData){
      console.log("first");
      const isTestDetails=await test.find(isPatientData.selectedTest);
      // console.log(isTestDetails);
      res.status(200).json({
        message:" get patient data successfully ",
        patient:isPatientData,
        test:isTestDetails,

      })
    }else{
      res.status(404).json({
        message:"patient data is not found",
        status:"fail",
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: "Fail",
      message: "Technical fault",
    });
  }
};

exports.deletePatient=async(req,res)=>{
  try{
    const {id}=req.params;
    
    const deletedPatient= await patient.deleteOne({_id:id});
    
    if(deletedPatient.deletedCount>0){
      res.status(200).json({
        message:"patient deleted successfully",
        status:"success",
        deletedUser:deletedPatient,
      })
    }else{
      res.status(404).json({
        message:"patient is not found",
        status:"fail",
      })
    }

  }catch (err) {
    res.status(500).json({
      error: err.message,
      status: "Fail",
      message: "Technical fault",
    });
  }
}
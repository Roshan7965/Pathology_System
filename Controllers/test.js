const test = require("../Modals/testModals.js");
const { param } = require("../Routes/testRoutes.js");

exports.testPost = async (req, res) => {
  try {
    const body = req.body;
    const isDataExit = await test.findOne({ name: body.name });
    if (isDataExit) {
      res.status(202).json({
        status: "successful",
        message: "test is already Exit",
      });
    } else {
      const dataEnter = await test.create(body);
      res.status(200).json({
        message: "Added Successfully",
        status: "success",
        data: dataEnter,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: "fail",
      message: "Technical fault in testPost function",
    });
  }
};

exports.testGet = async (req, res) => {
  try {
    const testData = await test.find({});
    if (testData) {
      res.status(200).json({
        message: "Test are available",
        status: "success",
        data: testData,
      });
    } else {
      res.status(202).json({
        message: "NO Test are available",
        status: "fail",
        data: {},
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error,
      status: "fail",
      message: "Technical fault",
    });
  }
};

exports.testById = async (req, res) => {
  console.log("first");
  const { id } = req.params;

  try {
    const findId = await test.findById(id);

    if (findId) {
      res.status(200).json({
        message: "test is Found",
        status: "Success",
        data: findId,
      });
    } else {
      res.status(202).json({
        message: "test is not found",
        status: "fail",
        data: {},
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error,
      status: "fail",
      message: "Technical fault",
    });
  }
};

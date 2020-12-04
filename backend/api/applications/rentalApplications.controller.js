const {
  getRentalApplications,
  updateStatus,
  getMyApplications
} = require("./rentalApplications.service");
module.exports = {
  getRentalApplications: (req, res) => {
    console.log("in rentalApplications controller");
    params = req.params;
    getRentalApplications(params, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getRentalApplications: (req, res) => {
    console.log("in rentalApplications controller");
    params = req.params;
    getRentalApplications(params, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateStatus: (req, res) => {
    console.log("in rentalApplications updateStatus");
    body = req.body;
    updateStatus(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};

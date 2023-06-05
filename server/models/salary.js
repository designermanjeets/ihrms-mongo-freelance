const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

const auditSchema = mongoose.Schema({
  created_at: Date,
  created_by: String,
  modified_at: Date,
  modified_by: String,
});

const salaryStructureSchema = new Schema({
  eCode: { type: String, immutable: true },
  username:{ type: String },
  salaryStructure:{ type: String },
  salaryStructureId:{ type: mongoose.Schema.Types.ObjectId, default: null },
  effectiveDate: { type: Date, required: true, immutable: true },
  month: { type: Schema.Types.Mixed },
  departmentId: { type: mongoose.Schema.Types.ObjectId, default: null },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Departments', default: null },
  paystructure: { type: String },
  payHeads:  [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    value: Number,
    payhead_type: String,
    calculationType: String,
  }],
  CTC: { type: Number },
  GROSS: { type: Number },
  Overtime: { type: Number },
  securityDeposit: [
    {
      currCTC: { type: Number },
      currGROSS: { type: Number },
      payHead: { type: mongoose.Schema.Types.ObjectId, ref: 'PayHeads' },
      payHeadID: { type: mongoose.Schema.Types.ObjectId },
      securityAmount: { type: Number },
      pendingAmount: { type: Number },
      monthStart: { type: Date },
      EMITenure: { type: Number },
      currentEMI: { type: Number },
    }
  ],
  audit: auditSchema,
  tenantid: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenants', required: true },
}, { collection: 'Salary' }, {timestamps: true});


module.exports = mongoose.model('Salary', salaryStructureSchema);

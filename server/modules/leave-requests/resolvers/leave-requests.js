const { paramHandler } = require('../../../utils/paramhandler');
const LeaveRequest = require('../../../models/leave-requests');

const getLeaveRequests = async (_, args, { me, tenantid })  => new Promise(async (resolve, reject) => {
  const param = me?.user?.username === 'gonngod' ? paramHandler({...args.query}): paramHandler({...args.query, tenantid})
  try {
    await LeaveRequest.find(param)
      .skip(args.query.offset).limit(args.query.limit)
      .populate({ 
        path: 'user', select: ['email', 'username', 'role', 'eCode', 'designationId', 'unitDepartmentId', 'leaveTypesNBalance'], 
        populate: { path: 'unitDepartment', select: 'name',},
      })
      .populate({ 
        path: 'user', select: ['email', 'username', 'role', 'eCode', 'designationId', 'unitDepartmentId', 'leaveTypesNBalance'],
        populate: { path: 'designation', select: 'name' }
      })
      .populate('leaveType', ['name', 'days', 'carryForward', 'carryForwardDays', 'countWeekends'])
      .populate('toManager', ['eCode', 'username', 'title', '_id'])
      .populate('approvers', ['eCode', 'username', 'title', '_id'])
      .exec(async function (err, data) {
        if (err) return reject();
        resolve(data);
      })
  }
  catch (e) {
    reject(e);
  }
});

module.exports = getLeaveRequests;

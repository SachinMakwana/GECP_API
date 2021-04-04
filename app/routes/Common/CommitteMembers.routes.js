module.exports = (app) => {

  const CommitteeMember = require('../../controllers/Common/CommitteeMembers.controller');

  app.post("/committeeMember", CommitteeMember.create);

  app.get("/committeeMember", CommitteeMember.findAll);

  app.get("/committeeMemberById", CommitteeMember.findById);

  app.put("/committeeMember", CommitteeMember.updateById);

  app.delete("/committeeMember", CommitteeMember.deleteById);
};

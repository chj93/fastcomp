const models = require("../../models");

exports.get_contacts = (_, res) => {
  models.Contacts.findAll({}).then((contacts) => {
    res.render("admin/contacts.html", { contacts: contacts });
  });
};

exports.get_contacts_write = (_, res) => {
  res.render("admin/write.html");
};

exports.post_contacts_write = (req, res) => {
  models.Contacts.create(req.body).then(() => {
    res.rediract("/admin/contacts");
  });
};

exports.get_contacts_detail = (req, res) => {
  models.findByPk(req.params.id).then((contact) => {
    res.render("admin/detail.html", { contact });
  });
};

exports.get_contacts_edit = (req, res) => {
  models.Products.findByPk(req.params.id).then((contact) => {
    res.render("admin/write.html", { contact: contact });
  });
};

exports.post_contacts_edit = (req, res) => {
  models.Products.update(
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    },
    {
      where: { id: req.params.id }
    }
  ).then(() => {
    res.redirect("/admin/contacts/write", req.params.id);
  });
};

exports.get_contacts_delete = (req, res) => {
  models.Contact.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect("/admin/contacts");
  });
};

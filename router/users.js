const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("users/show");
});
router.get("/:id", (req, res) => {
  const userID = req.params.id;
  res.render("users/single", { userID });
});
router.get("/new", (req, res) => {
  res.render("users/new", { user: "ahmed" });
});

module.exports = router;

 const router = require('express').Router();
 const usersRepo = require('../repositories/users')

 /* GET users listing. */
router.get('/', async function(req, res, next) {
   res.send(await usersRepo.getAllUsers());
});

router.get('/:id', async function(req, res, next) {
  res.send(await usersRepo.getUser(req.params.id));
});

router.post('/', async function(req, res, next) {
  let user = {}
  user.username = req.body.username
  user.email = req.body.email
  user.password = req.body.password
  user.role = req.body.role
  await usersRepo.addUser(user);
  res.redirect("/");
});

router.put('/', async function(req, res, next) {
  let user = {}
  user.username = req.body.username
  user.email = req.body.email
  user.role = req.body.role
  res.send(await usersRepo.updateUser(user));
});

router.delete('/', async function(req, res, next){
  let user= req.body.id
  console.log(user)
  await usersRepo.deleteUser(user);
  res.redirect("/");
})

module.exports = router;

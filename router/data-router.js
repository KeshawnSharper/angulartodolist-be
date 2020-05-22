const express = require('express');

const data = require('./data-model')

const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const multer = require("multer")

// router.use(cors({ origin: "*" }));
// router.use(bodyParser.json());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, "public")
//   },
//   filename: function (req, file, cb) {
//       const parts = file.mimetype.split("/");
//       cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
//   }
// })

// const upload = multer({storage});


// router.post("/file", upload.single("file"), (req, res) => {
//   // res.sendFile(`uploads/${req.file.filename}`);
//   console.log("/file")
// })

router.post('/register', (req, res) => {
  let user = req.body
  let hash = bcrypt.hashSync(user.password,13)
  user.online = false
  user.password = hash 
  data.register(user)
  .then(project => {
    res.status(201).json(project)
   })
.catch(err => {
res.status(500).json({ message: 'Failed to get schemes' })
})

})


router.post('/login', (req, res) => {
  let body = req.body
  data.login(body)
  .first()
  .then(user => {
    const payload = {
      userid:user.id,
      username:user.first_name
    }
    const options = {
      expiresIn:"1d"
    }
    const token = jwt.sign(payload,"secret",options)
    if (user && bcrypt.compareSync(body.password,user.password))
    {res.status(201).json({ id:user.id,email:user.email,token:token})}
   else {
     res.status(404).json({message:`invalid creditinials`})
   }
  })
  .catch(err => {
    res.status(500).json({ message: err })
    console.log(err)
  });
});


router.get('/users', (req, res) => {
  data.getUsers()
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.get('/users/:id', (req, res) => {
  data.todo(req.params.id)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.post('/todo', (req, res) => {
  data.add_Todo(req.body)
.then(data => {
  res.status(201).json(data[0]);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.delete('/:id', (req, res) => {
  data.delete_Todo(Number(req.params.id))
.then(data => {
  res.status(201).json(req.params.id);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})


module.exports = router
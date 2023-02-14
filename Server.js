const express = require('express');
const app = express();
const portNumber = process.env.PORT || 3005;
const Sequelize = require('sequelize');
const { User, Image } = require('./models');
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const cors = require('cors');
// const router = express.Router();
const stripe = require("./routes/stripe");

require("dotenv").config();

// const stripe = require("stripe")('sk_test_51MUzWnIjSsW1EbdCOC8QhKvLXATlB3o9ntw3FvRVzQxhnH7gcNf9LvOtAeROgIDCZjvnNkzR3tB8vJsPzF8HSLqi00y08kMoUS');
// const stripe = Stripe("pk_test_51MUzWnIjSsW1EbdChzqmbIkmXuTVmYifBCay1MHo1uEK2FsoL3C29V17Mizvi9qNNq9b9tJ8hlxaySYYYehCPR1c000Jc7bwyr")
// const charge = await stripe.charges.retrieve(
//     'ch_3MUzWqIjSsW1EbdC1CvDXBDh',
//     {
//       apiKey: 'pk_test_51MUzWnIjSsW1EbdChzqmbIkmXuTVmYifBCay1MHo1uEK2FsoL3C29V17Mizvi9qNNq9b9tJ8hlxaySYYYehCPR1c000Jc7bwyr'
//     }
// );
app.use("/api/stripe", stripe);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 259200000
        }
    })
)
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

function checkAuth(req, res, next){
    if(req.session.user || req.session.admin){
        next();
    } else if(req.path == "/"){
        next();
    } else {
        res.json({msg: "This email or password does not exist!"})
    }
}

// const YOUR_DOMAIN = 'http://localhost:3000';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// app.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'T-shirt',
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:4242/success',
//       cancel_url: 'http://localhost:4242/cancel',
//     });
  
//     res.redirect(303, session.url);
//   });

// app.listen(3000, () => console.log('Running on port 3000'));

app.listen(portNumber, function(req, res){
    console.log(`Listening on port http://localhost:${portNumber}`)
})

app.get("/", async function(req, res){
    res.redirect("/api/signup")
})

app.post("/create-checkout-session", async function(req, res){
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        line_items: [
          {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
        ],
        mode: 'payment',
      });
      res.json({session})
})

app.get("/api/portal", checkAuth, (req,res) => {
    res.json({ msg: "Hello users!"})
});

app.post("/api/portal/addimage", async function(req, res){
    console.log("We are adding an image");
    const { title, description, imageName} = req.body;
    console.log(req.body);
    console.log( imageName );
    let results = await Image.create({
        title: title,
        description: description,
        imageName: imageName,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.json({results})
})

app.get("/api/portal/allimages", async function(req,res){
    console.log("We are viewing all images");
    let results = await Image.findAll();
    res.json({results})
})

app.post('/api/portal/editimage/:id', async function(req, res){
    console.log("We are hitting edit user PHOTO")
    const { id } = req.params;
    const { originalname } = req.body;
    console.log(req.body);
    console.log( originalname );
    let results = await Image.update({
        imageName: originalname,
        updatedAt: new Date()
    },{
        where:{
            id,
        },
        returning: true,
        plain: true 
    })
    res.json({results});
});

// router.post('/api/portal/image', upload.single('originalname'), async (req, res) => {
//     console.log(req.file)
//     try {
//     // const { id } = req.params;
//      const project = await Image.create({
//       title: req.body.title,
//       description: req.body.description,
//       userId: req.body.userId,
//        //add the lines below
//       imageType: req.file.mimetype,
//       imageName: req.file.originalname,
//       imageData: req.file.buffer, 
//        //add the lines above
//      });
//       return res.status(201).json({ project });
//      } catch (error) {
//       return res.status(500).json({ error: error.message });
//      }
//     });


app.post("/api/signup", async function(req, res){
    const { firstname, lastname, email, username, password, height, weight, age, selection } = req.body;
    console.log(req.body);
    let theHashedPassword = await bcrypt.hash(password, 10)
    let results = await User.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        userName: username,
        password: theHashedPassword,
        height: height,
        weight: weight,
        age: age,
        mealPlan: selection,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.json({results});
})

app.post("/api/login/verification", async function(req, res){
    const { email, password } = req.body;
    console.log(req.body);
    let theUserInfo = await User.findOne({
        where: {
            email: email
        }
    });
    let theResult = await bcrypt.compare(password, theUserInfo.password);
    if(theResult){
        // req.session.user = theUserInfo;
        res.json({theUserInfo})
    }
})

app.get("/api/users", async function(req, res){
    let results = await User.findAll();
    res.json({results});
})

app.get("/api/user/:id", checkAuth, async function(req, res){
    const { id } = req.params;
    let role;
    let sessionId;
    if(req.session.user){
        sessionId = req.session.user.id;
        role = "user";
    }
    else if(res.session.admin){
        sessionId = req.session.admin.id;
        role = "admin";
    }
    let results = await User.findByPk(id);
    res.json({results, sessionId});
})

app.post("/api/portal/edit/:id", checkAuth, async function(req, res){
    const { id } = req.params;
    const { firstname, lastname, email, username, password, height, weight, age, selection } = req.body;
    console.log(req.body);
    let results = await User.update({
        firstName: firstname,
        lastName: lastname,
        email: email,
        userName: username,
        password: password,
        height: height,
        weight: weight,
        age: age,
        mealPlan: selection,
        updatedAt: new Date()
    },{
        where: {
            id
        }
    })
    res.json({results});
})

// app.post('/api/portal/image', upload.single('originalname'), async (req, res) => {
//     console.log(req.file)
//     try {
//     // const { id } = req.params;
//      const project = await Image.create({
//       title: req.body.title,
//       description: req.body.description,
//       userId: req.body.userId,
//        //add the lines below
//       imageType: req.file.mimetype,
//       imageName: req.file.originalname,
//       imageData: req.file.buffer, 
//        //add the lines above
//      });
//       return res.status(201).json({ project });
//      } catch (error) {
//       return res.status(500).json({ error: error.message });
//      }
//     });

// app.get('/api/portal/images', async (req, res) => {
//         try {
//         // const { id } = req.params;
//          const projects = await Image.findAll({
//          include: [
//           {
//            model: User,
//            as: "createdBy",
//            },
//           ],
//          })
//        .then(projects => {
//         projects.map(project => {
//            let projectImage = project.imageData.toString('base64')
//            project['imageData'] = projectImage
//           });
//          return projects;
//         })
//         .then(projects => {
//         return res.status(200).json({projects: projects})
//        })
//        } catch (error) {
//         return res.status(500).send(error.mesage);
//        }
//        });

app.get("/api/portal/images/delete/:id", async function(req, res){
    const { id } = req.params;
    let results = await Image.destroy({
        where: {
            id
        }
    })
    res.json({results});
})


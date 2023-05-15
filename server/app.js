//basics
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");
//login
const passport = require("passport");
const local = require("passport-local");
const crypto = require("crypto");
const session = require("express-session");
const isLoggedIn = require("./middleware/index").isLoggedIn;

//models
const User = require("./model/User");
const Pet = require("./model/Pet");

//environment settings
const PORT = process.env.PORT || 1234;

/* ----------------app basic settings---------------- */
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));

/* ----------------database---------------- */
mongoose
  .connect(
    "mongodb+srv://marcuscch12:d4qYmfY9FZiBiUue@cluster0.84ovamv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
    // Pet.updateMany(
    //   {},
    //   {
    //     $set: {
    //       "histogram.$[]": {
    //         successSession: 0,
    //         failedSession: 0,
    //       },
    //     },
    //   },
    //   { multi: true, upsert: true }
    // ).then(() => {
    //   console.log("updated histogram");
    // });
    // console.log("finished");
  });

/*create default pets*/
const petList = ["fire bird", "pig", "hamster"];
async function createPet(pet) {
  const createdPet = await Pet.create({
    type: pet,
  });
  console.log(`created pet ${createdPet}`);
  return createdPet;
}
async function createPets() {
  let petsData = [];
  for (let i = 0; i < petList.length; i++) {
    const pet = await createPet(petList[i]);
    petsData.push(pet);
  }
  return petsData;
}

/* DANGER: do not uncomment below as it is database cleaning after each testings*/
// User.deleteMany({ username: { $regex: ".*test.*" } }).then((users) => {
//   console.log("deleted testing users", users);
// });

// User.deleteMany({})
//   .then(() => {
//     console.log("deleted all users");
//   })
//   .catch((err) => {
//     console.log(`error deleting users: ${err}`);
//   });
// Pet.deleteMany({})
//   .then(() => {
//     console.log("deleted all pets");
//   })
//   .catch((err) => {
//     console.log(`error deleting pets: ${err}`);
//   });

/* ----------------login and register---------------- */
var sess = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
};
// if(app.get('env') === "production"){
//   app.set('trust proxy', 1);
//   if(sess != null)
//     sess.cookie.secure = true;
// }
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new local(function (username, password, done) {
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { error: "User not found" });
        }
        if (user.password != password) {
          console.log("unauthorized session", {
            error: "Check your username or password",
          });
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.get("/loginStatus", (req, res) => {
  if (!req.user) {
    return res.json({ loggedIn: false });
  }
  return res.json({ loggedIn: true, username: req.user.username });
});

app.post("/register", async (req, res) => {
  // console.log(`user created: ${req.body}`);
  //TODO: add error handling (if pets creation is not success, how to handle user creation?)
  //TODO: similarly, handle the error
  let createdUser;
  try {
    User.findOne({ username: req.body.username }).then(async (user) => {
      console.log("register found user:", user);
      if (!user) {
        console.log("there is no user with the same username");
        const petsData = await createPets();
        console.log(`petsData: ${petsData}`);
        //there is no user with the same username
        createdUser = await User.create({
          username: req.body.username,
          password: req.body.password,
          sessionNumber: 0,
          favouritePet: null,
          petsData: petsData,
        });
        console.log("createdUser @try of register route", createdUser);
        if (createdUser) {
          //update pets reference to user
          for (let i = 0; i < petsData.length; i++) {
            const updatedPet = await Pet.updateOne(
              { _id: petsData[i]._id },
              { $set: { user: createdUser } }
            );
            console.log(`updated pet: ${updatedPet}`);
          }
          req.login(createdUser, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "User registered" });
          });
        }
      } else {
        console.log("error: user already exists");

        // return res.redirect("/");
        return res.json({ error: "User already exists" });
      }
    });
  } catch (error) {
    console.log(`error creating user: ${error}`);
  }
});

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     failureMessage: "Invalid username or password",
//   }),
//   (req, res) => {
//     if (!req.user) {
//       console.log("undefined user");
//       return res.json({ error: "Unauthorized" });
//     }
//     const date = new Date();
//     console.log(`User ID:${req.user._id} logged in at ${date}`);
//     res.redirect("/");
//   }
// );

app.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    // console.log("hi");
    if (err) {
      // console.log("error", err);
      return next(err);
    }
    if (!user) {
      // console.log("error, user not found");
      return res.json({ error: "Unauthorized login" });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log(loginErr);
      }
      return res.json({ success: "Login success" });
    });
  })(req, res, next);
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      res.json({ logoutStatus: true });
    } else {
      console.log("logged out");
      res.json({ logoutStatus: true });
    }
  });
});

/* -------- api routes ---------- */
app.get("/info", isLoggedIn, (req, res) => {
  User.findOne({ username: req.user.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/info/:petIdx", isLoggedIn, async (req, res) => {
  const foundPet = await Pet.findOne({
    user: req.user._id,
    type: petList[req.params.petIdx],
  });
  // console.log(foundPet);
  res.json(foundPet);
});

app.get("/getEvolutionStage/:petIdx", isLoggedIn, async (req, res) => {
  const foundPet = await Pet.findOne({
    user: req.user._id,
    type: petList[req.params.petIdx],
  });
  console.log(foundPet);
  res.json({ evolutionStage: foundPet.evolutionStage });
});

//update session data
const timeOptions = [15, 30, 45]; //just for reference
const evolutionStagesXp = [100, 500, 1000, 2000]; //need 100 minutes to evolve to stage 1, 200 minutes to evolve from stage 1 to 2

const checkEvolutionStage = async (pet) => {
  let updatedPet = pet;
  console.log("@checkEvolutionStage function");
  console.log(
    pet.totalSuccessfulSession,
    evolutionStagesXp[pet.evolutionStage]
  );
  if (pet.totalSuccessfulSession > evolutionStagesXp[pet.evolutionStage]) {
    updatedPet = await Pet.findOneAndUpdate(
      { _id: pet._id },
      { $inc: { evolutionStage: 1 } }
    );
    console.log("pet evolved: ", updatedPet);
  } else {
    console.log("pet not evolved");
  }
};
const updateHistogram = async (pet, sessionPeriod, success) => {
  let currentPet = pet;
  if (success) {
    ++currentPet.histogram[sessionPeriod / 15 - 1].successSession;
  } else {
    ++currentPet.histogram[sessionPeriod / 15 - 1].failedSession;
  }
  // console.log(
  //   `@updatehistogram functi0on, current pet's histogram: ${
  //     currentPet.histogram[sessionPeriod / 15 - 1]
  //   }`
  // );
  let updatedPet = await Pet.findByIdAndUpdate(
    { _id: pet._id },
    { histogram: currentPet.histogram }
  );
  // console.log(`updated histogram of pet: ${updatedPet}`);
};
app.post("/updateSessionData", isLoggedIn, async (req, res) => {
  console.log("@ updateSessionData route");
  const { sessionStatus, sessionPeriod, petIdx } = req.body;
  // console.log(sessionPeriod);
  let pet;
  if (sessionStatus == true) {
    //increment success sessions
    // console.log("increment success sessions");
    pet = await Pet.findOneAndUpdate(
      { user: req.user._id, type: petList[petIdx] },
      {
        $inc: {
          totalFocusSession: sessionPeriod,
          totalSuccessfulSession: sessionPeriod,
        },
      }
    ).then((pet) => {
      updateHistogram(pet, sessionPeriod, true);
      checkEvolutionStage(pet);
      console.log(pet);
    });
    console.log(pet);
  } else {
    //increment failed sessions
    // console.log("increment failed sessions");
    pet = await Pet.findOneAndUpdate(
      { user: req.user._id, type: petList[petIdx] },
      {
        $inc: {
          totalFocusSession: sessionPeriod,
          totalFailedSession: sessionPeriod,
        },
      }
    );
    updateHistogram(pet, sessionPeriod, false);
  }
});
/* --------- hosting --------*/
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

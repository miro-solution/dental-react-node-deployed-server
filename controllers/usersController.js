const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//function to verify token
async function verifyToken(token) {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    //second verification of token
    if (
      payload.aud !== process.env.CLIENT_ID ||
      (payload.iss !== 'accounts.google.com' && payload.iss !== 'https://accounts.google.com')
    ) {
      throw 'Token is not from client or issued by Google';
    }

    return payload;
  } catch (err) {
    console.error(err);
  }
}

const userRegister = async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send('Alle Eingaben sind erforderlich.');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('Benutzer existiert bereits. Bitte loggen Sie sich ein.');
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      fullName: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      subscriber: false,
      meetings: { meetingName: '60 minute meeting', duration: 60 },
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });
    // save user token
    user.access_token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

//Handle User Google Sign-in
const userLogin = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send('Alle Eingaben sind erforderlich');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });

      // save user token
      user.access_token = token;

      // user
      res.status(201).json(user);
    }
    res.status(400).send('Ungültige Anmeldeinformationen');
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ _id: sub });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const getUserByUrl = async (req, res) => {
  const userUrl = req.params.url;

  try {
    const user = await User.findOne({ url: userUrl });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const isUnique = (req, res) => {
  User.findOne({ url: req.query.url })
    .then((user) => {
      if (!user) {
        res.status(200).json({ isUnique: true });
      } else {
        res.status(200).json({ isUnique: false });
      }
    })
    .catch((err) => res.status(500).send('Server Error:' + err));
};

const updateUser = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ _id: sub });
    user.url = req.body.url;
    user.availability.hours = req.body.hours;
    user.timezone = req.body.timeZone;
    user.availability.days = req.body.days;

    await user.save();

    res.status(200).send('User profile updated');
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const updateMeetings = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ _id: sub });
    user.meetings.push(req.body);
    await user.save();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

module.exports = { userRegister, userLogin, getUser, getUserByUrl, isUnique, updateUser, updateMeetings };

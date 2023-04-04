const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = process.env;
const User = require('../models/User');
const sendEmail = require('../config/sendEmail');
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
const emailVerify = async (req, res) => {
  const verificationCode = Math.floor(Math.random() * 9000) + 1000;
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = jwt.sign({ user_id: user._id, verificationCode: verificationCode }, process.env.TOKEN_KEY, {
      expiresIn: '10min',
    });
    const tokenById = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: '10min',
    });
    const templateId = '113dacd4daa21b23d8b21b8b7ee56287';
    user.verificationCode = token;
    await user.save();
    console.log(verificationCode);

    await sendEmail.sendEmailUsingSendPulse(
      [{ name: user.name, email: user.email }],
      // [{ name: 'yuanmai', email: 'yuanmai212@gmail.com' }],
      'Email Verification Code',
      verificationCode,
      templateId,
    );
    res.status(200).json({ doc: { success: true, token: tokenById } });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};
const checkVerificationCode = async (req, res) => {
  console.log(req.user);
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const decoded = jwt.verify(user.verificationCode, config.TOKEN_KEY);
    console.log(decoded.verificationCode, req.body.code);
    if (parseInt(decoded.verificationCode) === parseInt(req.body.code)) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).send('Ungültige Anmeldeinformationen');
    }
  } catch (err) {
    res.status(400).send('Ungültige Anmeldeinformationen');
  }
};
const resetPassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = encryptedPassword;
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).send('Ungültige Anmeldeinformationen');
  }
};
const userRegister = async (req, res) => {
  try {
    // Get user input
    const { name, email, password, phone } = req.body;
    console.log(req.body);

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
      phone: parseInt(phone),
      password: encryptedPassword,
      subscriber: false,
      role: 'user',
      meetings: [{ meetingName: '60min meeting', duration: 60 }],
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
    } else {
      res.status(400).send('Ungültige Anmeldeinformationen');
    }
  } catch (err) {
    res.status(400).send('Ungültige Anmeldeinformationen');
  }
};
const readUsers = async (req, res) => {
  try {
    const users = await User.find({}, { fullName: 1, _id: 1, phone: 1 });
    // const result = user.populate('meetings.meetingName');
    // console.log(user);
    res.status(200).json({ docs: users });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
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

const AfterUpdateProfile = async (req, res) => {
  const sub = req.params.id;
  try {
    const user = await User.findOne({ _id: sub });
    user.email = req.body.email;
    user.timeZone = req.body.timezone;
    user.fullName = req.body.fullName;
    if (req.body.password !== '') {
      encryptedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = encryptedPassword;
    }

    user.availability.days = req.body.availability.days;
    user.availability.hours = req.body.availability.hours;
    user.phone = parseInt(req.body.phone);
    await user.save();
    const newUser = await User.findOne({ _id: sub });

    res.status(200).json({ doc: newUser });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const createMeetings = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ _id: sub });
    // const isOnly = user.meetings.filter((meeting) => meeting.meetingName == req.body.meetingName);
    // if (isOnly.length === 0) {
    user.meetings.push(req.body);
    await user.save();
    newUser = await User.findOne({ _id: sub });
    res.status(200).json({ docs: newUser.meetings });
    // } else res.status(400).send('Meeting Duplicate');
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
const deleteMeetings = async (req, res) => {
  const sub = req.query.user;
  const deletedId = req.query.id;
  console.log(sub, deletedId);
  try {
    const user = await User.findOne({ _id: sub });
    user.meetings = user.meetings.filter((meeting) => meeting._id != deletedId);

    // user={...user,user.meetings:meetings}
    await user.save();
    const deletedUser = await User.findOne({ _id: sub });
    res.status(200).json({ docs: deletedUser.meetings });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const updateMeetings = async (req, res) => {
  const sub = req.query.user;
  const id = req.query.id;
  const user = await User.findOne({ _id: sub });

  const isOnly = user.meetings.filter((meeting) => meeting.meetingName == req.body.meetingName);
  try {
    if (isOnly.length === 0) {
      user.meetings = user.meetings.map((meeting) =>
        meeting._id == id
          ? { _id: meeting._id, meetingName: req.body.meetingName, duration: req.body.duration }
          : meeting,
      );

      await user.save();
      const updatedUser = await User.findOne({ _id: sub });
      res.status(200).json({ docs: updatedUser.meetings });
    } else if (isOnly.length === 1) {
    } else {
      res.status(403).send('Meeting Duplicate');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUser,
  readUsers,
  getUserByUrl,
  isUnique,
  updateUser,
  createMeetings,
  updateMeetings,
  deleteMeetings,
  AfterUpdateProfile,
  emailVerify,
  resetPassword,
  checkVerificationCode,
};

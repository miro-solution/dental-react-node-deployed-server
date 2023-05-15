const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const config = process.env;
const User = require('../models/User');
const Dentist = require('../models/Dentist');
const SendEmail = require('../config/sendEmail');
const dialogflow = require('@google-cloud/dialogflow');

// const accountSid = 'ACc725307a31d6beec20ddd74c5131c2f5';
// const authToken = '87321d0b8519aa0a192849b254624ff6';
// const client = require('twilio')(accountSid, authToken);

const emailVerify = async (req, res) => {
  const verificationCode = Math.floor(Math.random() * 90000) + 10000;
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

    await SendEmail.sendEmailUsingSendPulse(
      [{ name: user.name, email: user.email }],
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
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const decoded = jwt.verify(user.verificationCode, config.TOKEN_KEY);
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

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send('Alle Eingaben sind erforderlich.');
    }

    // const oldUser = await User.findOne({ email: email });

    // if (oldUser) {
    //   return res.status(409).send('Benutzer existiert bereits. Bitte loggen Sie sich ein.');
    // }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      fullName: name,
      email: email.toLowerCase(),
      phone: phone,
      password: encryptedPassword,
      subscriber: false,
      avatarUrl: gravatar.url(email, { s: '200', r: 'pg', d: 'mp' }),
      role: 'user',
      url: `https://dentoconnect/Zahnarztpraxis_Dr.${name.charAt(0).toUpperCase() + name.slice(1)}/`,
      // meetings: [{ meetingName: '60min meeting', duration: 60 }],
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });
    // save user token
    user.access_token = token;
    await Dentist.create({
      name: name,
      email: email.toLowerCase(),
      phoneNumber: phone,
      role: 'doctor',
      userId: user._id,
      avatarURL: gravatar.url(email, { s: '200', r: 'pg', d: 'mp' }),
    });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(409).send('Benutzer existiert bereits. Bitte loggen Sie sich ein.');
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
    res.status(400).send(err);
  }
};

const getUser = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ _id: sub }).populate('meetings.dentist');
    res.status(200).json(user);
  } catch (err) {
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

    res.status(200).json(user);
  } catch (err) {
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
    // if (req.body.password !== '') {
    //   encryptedPassword = await bcrypt.hash(req.body.password, 10);
    //   user.password = encryptedPassword;
    // }
    user.avatarUrl = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mp' });
    user.availability.days = req.body.availability.days;
    user.availability.hours = req.body.availability.hours;
    user.phone = req.body.phone;
    user.addressStreet = req.body.addressStreet;
    user.addressNumber = req.body.addressNumber;
    user.addressPostalCode = req.body.addressPostalCode;
    user.addressCity = req.body.addressCity;
    user.about_me = req.body.about_me;

    await user.save();

    const newUser = await User.findOne({ _id: sub });
    const dentist = await Dentist.findOne({ userId: sub });
    dentist.name = req.body.fullName;
    dentist.email = req.body.email;
    dentist.phoneNumber = req.body.phone;
    dentist.avatarURL = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mp' });
    dentist.save();

    res.status(200).json({ doc: newUser });
  } catch (err) {
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
    res.status(400).send(err);
  }
};
const deleteMeetings = async (req, res) => {
  const sub = req.query.user;
  const deletedId = req.query.id;
  try {
    const user = await User.findOne({ _id: sub });
    user.meetings = user.meetings.filter((meeting) => meeting._id != deletedId);

    // user={...user,user.meetings:meetings}
    await user.save();
    const deletedUser = await User.findOne({ _id: sub });
    res.status(200).json({ docs: deletedUser.meetings });
  } catch (err) {
    res.status(400).send(err);
  }
};
const updateMeetings = async (req, res) => {
  const sub = req.query.user;
  const id = req.query.id;
  try {
    const user = await User.findOne({ _id: sub });
    const meetingIndex = user.meetings.findIndex((meeting) => meeting._id == id);
    user.meetings[meetingIndex] = req.body;
    // const newUser = await User.findByIdAndUpdate({ _id: sub }, req.body, { new: true });
    await user.save();
    const newUser = await User.findOne({ _id: sub });
    res.status(200).json({ doc: newUser });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getDentists = async (req, res) => {
  const sub = req.params.sub;
  try {
    const dentists = await Dentist.find({ userId: sub });
    // const primaryDentist = await User.findOne({ _id: sub });
    // // console.log(primaryDentist);
    // dentists.unshift({ name: primaryDentist.fullName, _id: primaryDentist._id, email: primaryDentist.email });
    // console.log(dentists);
    res.status(200).json({ docs: dentists });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const updateDentist = async (req, res) => {
  const _id = req.params._id;
  try {
    const dentist = await Dentist.findOne({ _id: _id });
    dentist.name = req.body.name;
    dentist.email = req.body.email;
    dentist.phoneNumber = req.body.phoneNumber;
    dentist.userId = req.body.userId;
    dentist.avatarURL = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mp' });
    // dentist = req.body;
    await dentist.save();
    const savedDentist = await Dentist.findOne({ _id: _id });
    res.status(200).json({ doc: savedDentist });
  } catch (err) {
    res.status(404).send(err);
  }
};
const deleteDentist = async (req, res) => {
  const _id = req.params._id;
  try {
    const dentist = Dentist.findOne({ _id: _id });
    await dentist.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).send(err);
  }
};

const addDentist = async (req, res) => {
  const user = User.findOne({ _id: req.user.id });
  try {
    // client.messages
    //   .create({
    //     body: `Doctor ${user.fullName} has registered and invited you as his dentist.!`,
    //     from: '+18337687780',
    //     to: '+491798291251',
    //   })
    //   .then((message) => res.send(`SMS sent with ID: ${message.sid}`))
    //   .catch((error) => res.send(`Error sending SMS: ${error.message}`));
    const newDentist = new Dentist({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      userId: req.body.userId,
      avatarURL: gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mp' }),
    });
    await newDentist.save();
    res.status(200).json({ doc: newDentist });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const getItentListFromDialogFlow = async (req, res) => {
  try {
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: './google_creds.json',
    });
    const projectAgentPath = intentsClient.projectAgentPath(process.env.DIALOGFLOW_PROJECT_ID);

    const request = {
      parent: projectAgentPath,
    };

    const [response] = await intentsClient.listIntents(request);

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};
const getAllAppointmentsTypes = (req, res) => {};
module.exports = {
  getUser,
  isUnique,
  userLogin,
  readUsers,
  addDentist,
  updateUser,
  emailVerify,
  getDentists,
  userRegister,
  getUserByUrl,
  resetPassword,
  updateDentist,
  deleteDentist,
  createMeetings,
  updateMeetings,
  deleteMeetings,
  AfterUpdateProfile,
  checkVerificationCode,
  getItentListFromDialogFlow,
  getAllAppointmentsTypes,
};

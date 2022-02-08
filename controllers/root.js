const User = require('../models/user');
const { verifyHmacSignature } = require('../utils/utils');

exports.index = async (req, res, next) => {
  const { hmac, subdomain, tgid, timestamp } = req.query;

  if (!verifyHmacSignature(hmac, subdomain, tgid, timestamp)) {
    res.send(`<h1>Invalid HMAC</h1>`);
  }

  try {
    const user = await User.findOne({ subdomain }).orFail(
      new Error('User not found')
    );

    if (user) {
      res.render('root/index', { subdomain, userId: user._id });
    } else {
      res.send(`<h1>User not found.</h1>`);
    }
  } catch (err) {
    console.error(err);
  }
};

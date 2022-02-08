const axios = require('axios');

const User = require('../models/user');

require('dotenv').config();

const { codeChallenge } = require('../utils/utils');

exports.index = (req, res, next) => {
  const { subdomain } = req.query;
  const callbackUrl = `${process.env.APP_URL}/install/callback`;
  const authorizeUrl = `${process.env.PROTOCOL}://${subdomain}.${
    process.env.ENVIRONMENT
  }/oauth2/authorize?client_id=${
    process.env.CLIENT_ID
  }&response_type=code&redirect_uri=${callbackUrl}&code_challenge=${codeChallenge(
    codeVerifier
  )}&code_challenge_method=S256`;
  res.redirect(authorizeUrl);
};

exports.callback = async (req, res, next) => {
  const { code, subdomain } = req.query;
  const tokenUrl = `${process.env.PROTOCOL}://${subdomain}.${process.env.ENVIRONMENT}/oauth2/token`;
  const options = {
    grant_type: 'authorization_code',
    code_verifier: codeVerifier,
    code,
  };
  const authParams = {
    auth: {
      username: process.env.CLIENT_ID,
    },
  };

  try {
    const token = await axios.post(tokenUrl, options, authParams);
    const { access_token: accessToken, gid } = token.data;
    let user = await User.findOne({ subdomain });

    if (!user) {
      user = await User.create({ subdomain, gid, accessToken });
    }

    const appSubviewUrl = `${process.env.PROTOCOL}://${subdomain}.${process.env.ENVIRONMENT}/manage/apps/${process.env.SLUG}#embedded-app`;

    if (user) {
      res.redirect(appSubviewUrl);
    } else {
      res.send(`<h1>User not found.</h1>`);
    }
  } catch (err) {
    console.error(err);
  }
};

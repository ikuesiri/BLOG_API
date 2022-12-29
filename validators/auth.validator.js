const { required } = require('joi')
const Joi = require('joi')
const joiErrorFormatter = require('../utils/errorFormatter')

const registerSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .lowercase()
    .max(30)
    .min(2)
    .required(),

  last_name: Joi.string()
    .trim()
    .lowercase()
    .max(30)
    .min(2)
    .required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
    .required(),

  password: Joi.string()
    .required()
    .required()
    .min(6),

})
const userValidator = async (req, res, next) => {
  const payload = req.body
  const validationResult = await registerSchema.validate(payload, {
    abortEarly: false
    // "abortEarly : false" -> reports all the errors and not just the first error
  })
  const { error } = validationResult
  if (error) {
    // return res.send(joiErrorFormatter(error))

    return res.status(406).send(
      // message: validationResult.error
      // this function helps to format joi error message into a simple to read message
      joiErrorFormatter(error)
    )
  }
  next()
}

module.exports = userValidator

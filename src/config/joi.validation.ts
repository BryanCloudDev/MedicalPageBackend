import * as Joi from 'joi'

export const JoiValidationSchema = Joi.object({
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_BUCKET_NAME: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  DB_HOSTNAME: Joi.string().default('localhost'),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PORT: Joi.number().default(3000),
  ENTITIES_LIMIT: Joi.number().default(10),
  ENTITIES_SKIP: Joi.number().default(0)
})

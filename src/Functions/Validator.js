import Joi from "joi";
const authScheme = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  bio: Joi.string().max(300),
  userName: Joi.string().min(1).max(30),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
    .messages({
      "string.pattern.base": `Must contain letter number and special character`,
    }),
});

const postSchema = Joi.object({
  title: Joi.string().max(150).required(),
  shortDescription: Joi.string().max(200),
  description: Joi.string().max(1000),
  tags: Joi.string().max(300),
});

export { authScheme, postSchema };

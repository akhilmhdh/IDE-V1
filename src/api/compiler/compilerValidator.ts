import Joi from 'joi';

const submit = Joi.object({
    script: Joi.string().base64().max(100000).required(),
    lang: Joi.string().valid('c', 'c++', 'python3', 'javascript').required(),
    input: Joi.string().base64().max(1000)
});

export default {
    submit
};

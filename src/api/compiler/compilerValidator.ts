import Joi from 'joi';

const submit = Joi.object({
    script: Joi.string().max(100000).required(),
    lang: Joi.string().valid('c', 'c++', 'python3', 'javascript').required(),
    input: Joi.string().max(1000)
});

export default {
    submit
};

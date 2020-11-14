import Joi from 'joi'

const submit = Joi.object({
    script:Joi.string().max(100000),
    lang: Joi.string().valid('cpp','python','javascript'),
    inputs: Joi.string().max(1000)
});

export default {
    submit
}
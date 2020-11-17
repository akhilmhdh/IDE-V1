import { it, describe } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';

import app from '../../index';
import codeTemplate from '../../codeTemplates';
import { base64Encode } from '../../utils/base64';

const request = supertest(app);
const cppScript = base64Encode(codeTemplate.cpp.standard);

describe('Compiler router test', function () {
    it('POST /code/compile', function (done) {
        this.timeout(10000);
        return request.get('/').expect(200);
    });
});

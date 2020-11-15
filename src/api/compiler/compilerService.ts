import { base64Decode } from '../../utils/base64';
import randomToken from '../../utils/randomToken';
import CodeRunner from './codeRunner';
import { SubmissionDetails } from './compiler.inheritance';

const submit = async ({ lang, input = ' ', script }: SubmissionDetails) => {
    const fileid = randomToken(3);
    const fileName = `test-${fileid}`;
    const codeRunnerInstance = new CodeRunner(fileName, lang);

    const base64DecodedScript = base64Decode(script);
    const base64DecodedInput = base64Decode(input);

    return await codeRunnerInstance.runCodeRunner(
        base64DecodedScript,
        base64DecodedInput
    );
};

export default {
    submit
};

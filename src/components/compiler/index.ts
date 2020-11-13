import { spawn } from 'child_process';
import path from 'path';
import { Router } from 'express';

const router = Router();

router.get('/compile', (req, res) => {
    const child = spawn(
        'g++',
        ['-o hello', path.join(__dirname, 'hello.cpp'), '&&', './hello'],
        { shell: true }
    );
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    res.send({ hello: 'world' });
});

export default router;

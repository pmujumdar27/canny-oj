const { exec } = require('child_process');

function execute_command(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            else {
                let status = {
                    stdout: stdout,
                    stderr: stderr
                }
                resolve(status);
            }
        })
    })
};

module.exports = execute_command;
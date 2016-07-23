const http = require('http');
const async = require('async');

const hostname = '127.0.0.1';
const port = 80;

var exec = require('child_process').exec;
var cmd = 'gcc sample-program.c -o program && ./program < input.txt';
var cmdParameters = 'gcc sample-program2.c -o program && ./program 2 3';


const server = http.createServer((req, res) => {
  var tasks = [];
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');

  tasks.push(function (callback) {
    exec(cmdParameters, function(error, stdout, stderr) {
      if (!error) {
        console.log(stdout);
      } else {
        console.log(error);
        console.log("Sorry, no point for this test!");
      }
      callback();
    });
  });

  tasks.push(function (callback) {
    exec(cmd, function(error, stdout, stderr) {
      if (!error) {
        console.log(stdout);
      } else {
        console.log(error);
        console.log("Sorry, no point for this test!");
      }
      callback();
    });
  });

  async.series(tasks, function _allDone(err) {
      console.log(err);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

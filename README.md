# nyx-logger

- Nyx Logger is a simple logger for Node.js, designed to facilitate the logging of console messages with severity levels such as information, warning and error. This module uses colors to make log messages more legible and includes timestamps for easy tracking of events.

- https://www.npmjs.com/package/nyx-logger

# Features
- Log levels: Log messages with different levels of severity (info, warning, error).
- Colors: Use colors to distinguish log levels in the console.
- Timestamp: Each log message is preceded by a timestamp for easy tracking.

# Installation
To install Nyx Logger, use npm (Node Package Manager). Run the following command in your terminal:

Copy the code
npm install nyx-logger
How to use
Here's how to use Nyx Logger in your project:

```js
// Import the module
const log = require('nyx-logger');

//Set file path
logfile.set_log_file("../your/path/log.txt");

// Log an information message
log(“info”, 'This is an information message.');

// Log a sucess message
log(“done”, 'This is a sucess message.');

// Log a warning message
log(“warn”, 'This is a warning message.');

// Log an error message
log(“err”, 'This is an error message.');

// Log a developer message
log(“dev”, 'This is a developer message.');
```
# Contributions
Contributions are welcome! If you'd like to improve the module, don't hesitate to submit a pull request.

License
This project is licensed under the MIT license. See the LICENSE file for more information.

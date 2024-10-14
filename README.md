# nyx-logger

Nyx Logger is a simple logger for Node.js, designed to facilitate the logging of console messages with severity levels such as information, warning and error. This module uses colors to make log messages more legible and includes timestamps for easy tracking of events.

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
const { log, logfile } = require('nyx-logger');

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

//Ascii Text
log("asci", `                             
    /|    / / \\    / / \\ / / 
   //|   / /   \\  / /   \  /  
  // |  / /     \\/ /    / /   
 //  | / /       / /    / /\\  
//   |/ /       / /    / /  \\ 

`, "cyan"); //Color is only for ascii text
```

# Custom Log:
Customizable Tag:

- Each log is associated with a tag (e.g., [INFO], [ERROR], [DEBUG]), indicating the type of message.
- The tag text can be colored for better readability.
- Option to color only the text within the tag, or the brackets around it as well.

# Flexible Coloring:

- tagColor: Defines the color of the tag text (e.g., red, green, blue).
- colorBrackets: Controls whether the brackets [ ] around the tag should be colored or not. If true, the entire tag [INFO] is colored. If false, only the word inside the tag is - colored, leaving the brackets neutral.

# Timestamp Management:

- Logs can include a timestamp to show the exact date and time the log was generated.
- Customization options:
- Display the time, date, or both.
- Timestamp format follows HH:mm:ss:SSS YYYY-MM-DD.

# Elapsed Time Between Logs:

- Option to display the elapsed time between consecutive logs.
- Useful for performance monitoring and analyzing delays.

# Log File Storage:

Each log is not only printed to the console but also saved to a text file for long-term tracking and review.

# Available Parameters:
- tag: The name of the tag displayed with the log (default: 'LOG').
- message: The log message text.
- tagColor: The color of the text inside the tag (e.g., red, green, blue, etc.).
- colorBrackets: A boolean (true/false) that specifies whether the brackets [ ] around the tag should be colored.
- includeTimestamp: Whether or not to include a timestamp in the log.
- includeDate: Whether to include the date in the timestamp.
- includeTime: Whether to include the time in the timestamp.
- showElapsedTime: Whether to display the elapsed time between logs.
- lastLogTime: Used to calculate the elapsed time between logs (pass this value from a previous log for accurate timing).

# Examples

```js
customLog('INFO', 'System startup...', 'green', true, true, true, true);
```

or 

```js
customLog({
    tag: 'INFO',
    message: 'System startup...',
    tagColor: 'green',
    colorBrackets: true,
    includeTimestamp: true,
    includeDate: true,
    includeTime: true
});
```

# Contributions
Contributions are welcome! If you'd like to improve the module, don't hesitate to submit a pull request.

License
This project is licensed under the MIT license. See the LICENSE file for more information.

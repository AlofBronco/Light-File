const { log } = require('console');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const invalidCharacters = /[<>:"/\\|?*\x00-\x1f]/;
const reserverNames = [
  'CON',
  'PRN',
  'AUX',
  'NUL',
  'COM1',
  'COM2',
  'COM3',
  'COM4',
  'COM5',
  'COM6',
  'COM7',
  'COM8',
  'COM9',
  'LTP1',
  'LTP2',
  'LTP3',
  'LTP4',
  'LTP5',
  'LTP6',
  'LTP7',
  'LTP8',
  'LTP9',
];

// GREETING
rl.output.write("type 'help' for help: ");

// CREATING A FILE
rl.on('line', (input) => {
  if (input == 'create') {
    rl.question('want to create a file? ', (answer) => {
      if (answer == 'yes' || answer == 'y') {
        rl.question('whats the name of the file? ', (fileName) => {
          rl.question('whats the file extension? ', (extension) => {
            try {
              if (invalidCharacters.test(fileName) || reserverNames.includes(fileName.toUpperCase())) {
                console.log('Error creating file: Invalid file name');
                return;
              }
              fs.writeFileSync(`./${fileName}.${extension}`, '');
            } catch (err) {
              console.log('Error creating file: ', err);
            }
          });
        });
      } else if (answer == 'no' || answer == 'n') {
        return;
      } else {
        console.log('Not valid answer. Please enter "yes" or "no"');
        return;
      }
    });
  }
});

// WRITING DATA
rl.on('line', (input) => {
  if (input == 'write') {
    rl.question('what is the file name? ', (fileName) => {
      rl.question('what do you wand to write? ', (data) => {
        try {
          fs.appendFileSync(`./${fileName}`, data);
          console.log('data written successfully');
        } catch {
          console.error('Error writing file:', err);
        }
      });
    });
  }
});

// READING DATA
rl.on('line', (input) => {
  if (input == 'read') {
    rl.question('whats the file name? ', (fileName) => {
      try {
        const data = fs.readFileSync(`./${fileName}`);
        console.log(`File data: 
          ${data}`);
      } catch (err) {
        console.error('Error retrieving data: ', err);
      }
    });
  }
});

// DELETING DATA
rl.on('line', (input) => {
  if (input == 'delete') {
    rl.question('what file to delete? ', (fileName) => {
      try {
        rl.question(`is this correct: Delete file "${fileName}" `, (answer) => {
          if (answer == 'yes' || answer == 'y') {
            fs.unlinkSync(`./${fileName}`);
            console.log('file deleted successfully');
          } else if (answer == 'no' || answer == 'n') {
            console.log('Returning...');
          }
        });
      } catch (err) {
        console.error('Error deleting file: ', err);
      }
    });
  }
});

// EXITING
rl.on('line', (input) => {
  if (input == 'exit') {
    console.log('Exiting...');
    rl.close();
  }
});

// HELP
rl.on('line', (input) => {
  if (input == 'help') {
    console.log(
      `
    create - create file
    write - write text to file
    read - read the file text
    delete - delete the file
    exit - exit this app
    help - see this message
      `
    );
  }
});

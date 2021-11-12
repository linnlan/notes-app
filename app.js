const chalk = require('chalk');
const yargs = require('yargs');
const { loadNotes, listNotes } = require('./notes.js');
const notes = require('./notes.js');

yargs.version('1.1.0');

// console.log(notes.getNotes());

yargs.command({
    command : 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title,argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'title of note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'listing the notes',
    handler: () => {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'reading the notes',
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        // console.log('Reading the notes!');
        notes.readNote(argv.title);
    }
});

yargs.parse();
// console.log(yargs.argv);



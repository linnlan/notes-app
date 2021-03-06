const fs = require('fs');
const chalk = require('chalk');
const { title } = require('process');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title,body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote)
    {
        notes.push({
            title: title,
            body: body
        });
        saveNote(notes);
        console.log(chalk.green.inverse('New note added'));
    }
    else
    {
        console.log(chalk.red.inverse('Note title taken'));
    }
}

const saveNote = (notes)=> {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = ()=> {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e)
    {
        return [];
    }
}

const removeNote = (title)=>{
    const notes = loadNotes();
    
    const removeTitle = notes.filter((note)=> note.title !== title);

    if(notes.length === removeTitle.length)
        console.log(chalk.red.inverse('No such note is present'));
    else
    {

        saveNote(removeTitle);
        console.log(chalk.green.inverse(title + " removed"));
    }
} 

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse(getNotes()));
    notes.forEach((note)=> console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note)=>note.title===title);
    if(note)
    {
        console.log(chalk.italic(note.title));
        console.log(note.body);
    }
    else
    {
        console.log(chalk.red.inverse('No note found'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
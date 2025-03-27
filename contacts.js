const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.resolve(__dirname, "./db/contacts.json");




async function readDB() {
    
    try {
        const dbRaw = await fs.readFile(contactsPath, "utf8");
        const db = JSON.parse(dbRaw);
        return db;

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    };
};

async function writeDB(db) {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, -2))
}




async function listContacts() {
    const db = await readDB();
    return db;
}


async function getContactById(contactId) {
    const db = await readDB();
    const contact = db.find(
        (contact) => contact.id == contactId
    );
    return contact || null;
}


async function removeContact(contactId) {
    const db = await readDB();
    const updateDB = db.filter(todo => todo.id !== contactId);

    if (index === -1) return null;

    const [removedContact] = db.splice(index, 1);
    await writeDB(db);
    return removedContact;
}


async function addContact(name, email, phone) {
  
    const id = nanoid(4);
    const contact = { id, name, email, phone };
    const db = await readDB();
    db.push(contact);
    await writeDB(db);
    return contact;

}

module.exports = {
    addContact,
    removeContact,
    listContacts,
    getContactById
};
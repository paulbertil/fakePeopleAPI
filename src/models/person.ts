import mongoose from 'mongoose';

// To use for typescript type checking
interface PersonInterface {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
}

// attach build method to person model interface
interface PersonModelInterface extends mongoose.Model<PersonDoc> {
    buildPerson(attr: PersonInterface): any;
}

// specify Person Document (instead of any)
interface PersonDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
}

// Person Schema
const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    }
})

// attach built function on person schema that implements the interface
personSchema.statics.buildPerson = (attr: PersonInterface) => {
    return new Person(attr);
}

// Create Person Model with the interface
const Person = mongoose.model<PersonDoc, PersonModelInterface>('Person', personSchema);

export { Person }
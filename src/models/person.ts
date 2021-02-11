import mongoose from 'mongoose';
import { PersonInterface, PersonModelInterface, PersonDoc } from '../interfaces/Person'


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
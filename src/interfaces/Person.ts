import mongoose from 'mongoose';
// To use for typescript type checking
export interface PersonInterface {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
}

// attach build method to person model interface
export interface PersonModelInterface extends mongoose.Model<PersonDoc> {
    buildPerson(attr: PersonInterface): any;
}

// specify Person Document (instead of any)
export interface PersonDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
}
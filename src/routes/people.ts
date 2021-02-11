import express, { Router, Request, Response } from 'express'
import { Person } from '../models/person'
import { PersonDoc, PersonInterface } from '../interfaces/Person'

const router: Router = express.Router()


/**
 * Get all people
 */
router.get('/api/people', async (req, res) => {

    try {
        // query database
        const people = await Person.find();
        // return results in json
        res.status(200).json({
            status: 'success',
            results: people.length,
            data: { people }
        })
    } catch (err) {
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }
})

/**
 * Get person by id
 */
router.get('/api/people/:id', async (req, res) => {

    try {
        const person = await Person.findById(req.params.id)
        // return query results
        res.status(200).json({
            status: 'success',
            data: { person }
        })

    } catch (err) {
        res.status(404).json({
            status: 'error',
            message: err.message
        })
    }
})

/**
 * Add new person
 */
router.post('/api/people', async (req: Request, res: Response) => {
    const { firstName, lastName, gender, age } = req.body;

    const newPerson = Person.buildPerson({
        firstName,
        lastName,
        gender,
        age
    })

    try {
        let result = await newPerson.save()

        res.status(201).json({
            status: 'success',
            data: { result }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })

    }
})

/**
 * Update person by id
 */
router.put('/api/people/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        // fetch person to update
        const personUpdate: PersonInterface = req.body;

        const existingPerson: (PersonDoc | null) = await Person.findById(id)

        // if person exists in db
        if (existingPerson) {
            try {
                const updatedPerson = await Person.findByIdAndUpdate(id, personUpdate)
                return res.status(200).json({
                    status: 'success',
                    data: { personUpdate }
                })
            } catch (err) {
                return res.status(400).json({
                    status: 'error',
                    message: err.message
                })
            }
        }

    } catch (err) {
        return res.status(404).json({
            status: 'error',
            message: err.message
        })
    }


})


/**
 * Delete person by id
 */
router.delete('/api/people/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        //
        const deletedPerson = await Person.findByIdAndRemove(id)
        return res.status(201).json({
            status: 'success',
            data: { deletedPerson }
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
})


export { router as peopleRouter }
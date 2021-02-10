import express, { Router, Request, Response } from 'express'
import { Person } from '../models/person'

const router: Router = express.Router()

router.get('/api/people', (req, res) => {
    res.send([1, 2, 3])
})

router.get('/api/people/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/api/people', async (req: Request, res: Response) => {
    const { firstName, lastName, gender, age } = req.body;

    const newPerson = Person.buildPerson({
        firstName,
        lastName,
        gender,
        age
    })

    await newPerson.save()
    return res.status(201).send(newPerson)
})


export { router as peopleRouter }
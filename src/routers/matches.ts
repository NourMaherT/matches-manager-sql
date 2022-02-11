import {getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {Match} from "../entity/Match";
import {validate} from "class-validator"; 
import {auth} from '../middleware/auth';
import {admin} from '../middleware/admin';
import {async} from '../middleware/async';
 

const router = express.Router();

router.get("/", auth, async(async function(req: Request, res: Response) {
    const matches = await getRepository(Match).find({ order: { date: 'DESC' } });
    res.status(200).send(matches);
}));

router.get("/:id", auth, async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ where: {id: req.params.id} });
    if(!match) return res.status(404).send('There is no match with the given id.');

    res.status(200).send(match);
}));


router.post("/", [auth, admin], async(async function(req: Request, res: Response) {
    let match = new Match();
    match.team1 = req.body.team1;
    match.team2 = req.body.team2;
    match.date = req.body.date;
    
    const errors = await validate(match);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    
    match = await getRepository(Match).save(match);
    res.status(200).send(match);
    
}));

router.put("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    let match = await getRepository(Match).findOne({ where: {id: req.params.id} });
    if(!match) return res.status(404).send('There is no match with the given id.');

    match.team1 = req.body.team1;
    match.team2 = req.body.team2;
    match.date = req.body.date;

    const errors = await validate(match);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    

    await getRepository(Match).save(match);
    res.status(200).send(match);
}));

router.delete("/", [auth, admin], async(async function(req: Request, res: Response) {
    const matches = await getRepository(Match).find();

    await getRepository(Match).remove(matches);
    res.status(200).send(matches);

}));

router.delete("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ where: {id: req.params.id} });
    if(!match) return res.status(404).send('There is no match with the given id.');

    await getRepository(Match).remove(match);
    res.status(200).send(match);

}));


export { router as matchRouter }
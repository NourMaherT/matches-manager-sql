import {getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {Position, positions} from "../entity/Position";
import {validate} from "class-validator"; 
import {auth} from '../middleware/auth';
import {admin} from '../middleware/admin';
import {async} from '../middleware/async';
 

const router = express.Router();

router.get("/", auth, async(async function(req: Request, res: Response) {
    const positions = await getRepository(Position).find();
    res.status(200).send(positions);
}));

router.get("/:id", auth, async(async function(req: Request, res: Response) {
    const position = await getRepository(Position).findOne({ where: {id: req.params.id} });
    if(!position) return res.status(404).send('There is no position with the given id.');

    res.status(200).send(position);
}));


router.post("/", [auth, admin], async(async function(req: Request, res: Response) {
    if (!Object.values(positions).includes(req.body.name)) return res.status(400).send(`Insert A real position!`);

    let position = await getRepository(Position).findOne({ name: req.body.name });
    if(position) return res.status(400).send('Position is alresdy existed!');    

    position = new Position();
    position.name = req.body.name;
    
    const errors = await validate(position);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    
    position = await getRepository(Position).save(position);
    res.status(200).send(position);
    
}));

router.put("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    let position = await getRepository(Position).findOne({ where: {id: req.params.id} });
    if(!position) return res.status(404).send('There is no position with the given id.');

    position.name = req.body.name;

    const errors = await validate(position);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    

    await getRepository(Position).save(position);
    res.status(200).send(position);
}));

router.delete("/", [auth, admin], async(async function(req: Request, res: Response) {
    const positions = await getRepository(Position).find();

    await getRepository(Position).remove(positions);
    res.status(200).send(positions);

}));

router.delete("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    const position = await getRepository(Position).findOne({ where: {id: req.params.id} });
    if(!position) return res.status(404).send('There is no Position with the given id.');

    await getRepository(Position).remove(position);
    res.status(200).send(position);

}));


export { router as positionRouter }
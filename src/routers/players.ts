import {getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {Player} from "../entity/Player";
import {Position} from "../entity/Position";
import {validate} from "class-validator"; 
import {auth} from '../middleware/auth';
import {admin} from '../middleware/admin';
import {async} from '../middleware/async';
 

const router = express.Router();

router.get("/", auth, async(async function(req: Request, res: Response) {
    const players = await getRepository(Player).find({ relations: ["position"] });
    res.status(200).send(players);
}));

router.get("/:id", auth, async(async function(req: Request, res: Response) {
    const player = await getRepository(Player).findOne({ where: {id: req.params.id} });
    if(!player) return res.status(404).send('There is no player with the given id.');

    res.status(200).send(player);
}));

router.post("/", [auth, admin], async(async function(req: Request, res: Response) {
    const position = await getRepository(Position).findOne({ id: req.body.positionId });
    if(!position) return res.status(404).send('Position is not available!');

    // Avoid Duplication
    const oldPlayer = await getRepository(Player).findOne({ where:{
        name: req.body.name,
        position: {id: req.body.positionId}
    }});
    if(oldPlayer) return res.status(400).send('Duplication Error.');

    let player = new Player();
    player.name = req.body.name;
    player.position = position;

    const errors = await validate(player);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
     
    await getRepository(Player).save(player);
    res.status(200).send(player);
}));

router.put("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    let player = await getRepository(Player).findOne({ where: {id: req.params.id} });
    if(!player) return res.status(404).send('There is no player with the given id.');

    const position = await getRepository(Position).findOne({ name: req.body.position });
    if(!position) return res.status(404).send('Position is not available!');

    player.name = req.body.name;
    player.position = position;

    await getRepository(Player).save(player);
    res.status(200).send(player);
}));

router.delete("/", [auth, admin], async(async function(req: Request, res: Response) {
    const players = await getRepository(Player).find();

    await getRepository(Player).remove(players);
    res.status(200).send(players);

}));

router.delete("/:id", async function(req: Request, res: Response) {
    const player = await getRepository(Player).findOne({ where: {id: req.params.id} });
    if(!player) return res.status(404).send('There is no player with the given id.');

    await getRepository(Player).remove(player);
    res.status(200).send(player);

});


export { router as playerRouter }
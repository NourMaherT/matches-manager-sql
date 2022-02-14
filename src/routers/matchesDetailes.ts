import {getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {Player} from "../entity/Player";
import {Position} from "../entity/Position";
import {Match} from "../entity/Match";
import {MatchDetail} from "../entity/MatchDetail";
import {validate} from "class-validator"; 
import {auth} from '../middleware/auth';
import {admin} from '../middleware/admin';
import {async} from '../middleware/async';
 

const router = express.Router();

router.get("/", auth, async(async function(req: Request, res: Response) {
    const records = await getRepository(MatchDetail).find({ relations: ['player', 'position', 'match'] });
    res.status(200).send(records);
}));

// Get Players participated in a particuler match
router.get("/match/:matchId", auth, async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ where: {id: req.params.matchId} });
    if(!match) return res.status(404).send('There is no match with the given id.');
    
    const records = await getRepository(MatchDetail).find({
                                                                where: {
                                                                    match: {
                                                                        id: match.id
                                                                    }
                                                                },
                                                                relations: ['player', 'position', 'match']
                                                            });
    let players = records.map(record => {
            return record.player.name;
    });
    let uniquePlayers = [...new Set(players)]
    res.status(200).send(uniquePlayers);

}));

// Get Matches a particuler player participated in
router.get("/player/:playerId", auth, async(async function(req: Request, res: Response) {
    const player = await getRepository(Player).findOne({ where: {id: req.params.playerId} });
    if(!player) return res.status(404).send('There is no player with the given id.');
    
    const records = await getRepository(MatchDetail).find({ 
                                                            where: {
                                                                player: {
                                                                    id: player.id
                                                                }
                                                            },
                                                            relations: ['player', 'position', 'match'] 
                                                        });
    const matches = records.map(record => {
            return record.match;
    });
    const ids = [...new Set(matches.map(v => v.id))];
    let uniqueMatches = [];
    ids.forEach(async function(id) {
        const temp = await getRepository(Match).findOne({ where: {id: id} });
        console.log(temp);
        uniqueMatches.push(temp);
    });
    setTimeout(() => {
        res.status(200).send(uniqueMatches);
    }, 1000);

}));

// Get one player Positions in a particuler match 
router.get("/position/:matchId/:playerId", auth, async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ where: {id: req.params.matchId} });
    if(!match) return res.status(404).send('There is no match with the given id.');

    const player = await getRepository(Player).findOne({ where: {id: req.params.playerId} });
    if(!player) return res.status(404).send('There is no player with the given id.');
    
    const records = await getRepository(MatchDetail).find({ 
                                                            where: { match: {id: match.id}, player: {id: player.id} },
                                                            relations: ['player', 'position', 'match'] 
                                                        });
    const matches = records.map(record => {
        return {
            position: record.position.name,
            changeTime: record.changeTime
        }
    });
    res.status(200).send(matches);

}));


router.post("/", [auth, admin], async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ id: req.body.matchId });
    if(!match) return res.status(404).send('Match is not existed!');    

    const player = await getRepository(Player).findOne({ where: {id: req.body.playerId} , relations: ['position']});
    if(!player) return res.status(404).send('Player is not existed!');   

    let position = player.position;
    if(req.body.positionId) {
        position = await getRepository(Position).findOne({ id: req.body.positionId });
        if(!player) return res.status(404).send('Position is not existed!');    
    }
    
    // Avoid Duplication
    const oldRecord = await getRepository(MatchDetail).findOne({ where:{
        match: {id: req.body.matchId},
        player: {id: req.body.playerId},
        position: {id: req.body.positionId},
        changeTime: req.body.changeTime
    }});
    if(oldRecord) return res.status(400).send('Duplication Error.');

    let record = new MatchDetail();
    record.match = match;
    record.player = player;
    record.position = position;
    record.changeTime = req.body.changeTime;
    
    const errors = await validate(record);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    
    record = await getRepository(MatchDetail).save(record);
    res.status(200).send(record);
    
}));

router.put("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    let record = await getRepository(MatchDetail).findOne({ 
                                                            where: {id: req.params.id}, 
                                                            relations: ['match', 'player', 'position'] 
                                                        });
    if(!record) return res.status(404).send('There is no record with the given id.');

    let match = record.match;
    if(req.body.matchId) {
        match = await getRepository(Match).findOne({ id: req.body.matchId });
        if(!match) return res.status(404).send('Match is not existed!'); 
    }   

    let player = record.player;
    if(req.body.playerId) {
        player = await getRepository(Player).findOne({ where: {id: req.body.playerId} , relations: ['position']});
        if(!player) return res.status(404).send('Player is not existed!');    
    }

    let position = record.position;
    if(req.body.positionId) {
        position = await getRepository(Position).findOne({ id: req.body.positionId });
        if(!player) return res.status(404).send('Position is not existed!');    
    }

    let changeTime = record.changeTime;
    if(req.body.changeTime) {
        changeTime = req.body.changeTime;
    }

    record.match = match;
    record.player = player;
    record.position = position;
    record.changeTime = changeTime;

    const errors = await validate(record);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    

    await getRepository(MatchDetail).save(record);
    res.status(200).send(record);
}));

router.delete("/", [auth, admin], async(async function(req: Request, res: Response) {
    const records = await getRepository(MatchDetail).find();

    await getRepository(MatchDetail).remove(records);
    res.status(200).send(records);

}));

router.delete("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    const record = await getRepository(MatchDetail).findOne({ where: {id: req.params.id} });
    if(!record) return res.status(404).send('There is no record with the given id.');

    await getRepository(MatchDetail).remove(record);
    res.status(200).send(record);

}));


export { router as matchDetailRouter }
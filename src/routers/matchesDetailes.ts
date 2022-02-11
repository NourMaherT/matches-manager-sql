import {getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {Player} from "../entity/Player";
import {Position} from "../entity/Position";
import {Match} from "../entity/Match";
import {MatchDetailes} from "../entity/MatchDetailes";
import {validate} from "class-validator"; 
import {auth} from '../middleware/auth';
import {admin} from '../middleware/admin';
import {async} from '../middleware/async';
 

const router = express.Router();

router.get("/", auth, async(async function(req: Request, res: Response) {
    const matchDetailes = await getRepository(MatchDetailes).find({ relations: ['player', 'position', 'match'] });
    res.status(200).send(matchDetailes);
}));

// Get Players participated in a particuler match
router.get("/match/:matchId", auth, async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ where: {id: req.params.matchId} });
    if(!match) return res.status(404).send('There is no match with the given id.');
    
    const matchesDetailes = await getRepository(MatchDetailes).find({
                                                                where: {
                                                                    match: {
                                                                        id: match.id
                                                                    }
                                                                },
                                                                relations: ['player', 'position', 'match']
                                                            });
    let players = matchesDetailes.map(record => {
        // if(record.match.id === match.id) 
            return record.player.name;
    });
    res.status(200).send(players);

}));

// Get Matches a particuler player participated in
router.get("/player/:playerId", auth, async(async function(req: Request, res: Response) {
    const player = await getRepository(Player).findOne({ where: {id: req.params.playerId} });
    if(!player) return res.status(404).send('There is no player with the given id.');
    
    const matchesDetailes = await getRepository(MatchDetailes).find({ 
                                                                where: {
                                                                    player: {
                                                                        id: player.id
                                                                    }
                                                                },
                                                                relations: ['player', 'position', 'match'] 
                                                            });
    const matches = matchesDetailes.map(record => {
        // if(record.player.id === player.id) 
            return record.match;
    });
    res.status(200).send(matches);

}));

// Get one player Positions in a particuler match 
router.get("/position/:matchId/:playerId", auth, async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ where: {id: req.params.matchId} });
    if(!match) return res.status(404).send('There is no match with the given id.');

    const player = await getRepository(Player).findOne({ where: {id: req.params.playerId} });
    if(!player) return res.status(404).send('There is no player with the given id.');
    
    const matchesDetailes = await getRepository(MatchDetailes).find({ 
                                                                where: { match: {id: match.id}, player: {id: player.id} },
                                                                relations: ['player', 'position', 'match'] 
                                                            });
    const matches = matchesDetailes.map(record => {
        return {
            position: record.position.name,
            changeTime: record.changeTime
        }
    });
    res.status(200).send(matches);

}));


router.post("/", [auth, admin], async(async function(req: Request, res: Response) {
    const match = await getRepository(Match).findOne({ id: req.body.matchId })
    if(!match) return res.status(404).send('Match is not existed!');    

    const player = await getRepository(Player).findOne({ where: {id: req.body.playerId} , relations: ['position']})
    if(!player) return res.status(404).send('Player is not existed!');    

    let position = player.position;
    if(req.body.positionId) {
        position = await getRepository(Position).findOne({ id: req.body.positionId })
        if(!player) return res.status(404).send('Position is not existed!');    
    }

    let matchDetailes = new MatchDetailes();
    matchDetailes.match = match;
    matchDetailes.player = player;
    matchDetailes.position = position;
    matchDetailes.changeTime = req.body.changeTime;
    
    const errors = await validate(matchDetailes);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    
    matchDetailes = await getRepository(MatchDetailes).save(matchDetailes);
    res.status(200).send(matchDetailes);
    
}));

router.put("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    let matchDetailes = await getRepository(MatchDetailes).findOne({ 
                                                            where: {id: req.params.id}, 
                                                            relations: ['match', 'player', 'position'] 
                                                        });
    if(!matchDetailes) return res.status(404).send('There is no record with the given id.');

    let match = matchDetailes.match;
    if(req.body.matchId) {
        match = await getRepository(Match).findOne({ id: req.body.matchId })
        if(!match) return res.status(404).send('Match is not existed!'); 
    }   

    let player = matchDetailes.player;
    if(req.body.playerId) {
        player = await getRepository(Player).findOne({ where: {id: req.body.playerId} , relations: ['position']})
        if(!player) return res.status(404).send('Player is not existed!');    
    }

    let position = matchDetailes.position;
    if(req.body.positionId) {
        position = await getRepository(Position).findOne({ id: req.body.positionId })
        if(!player) return res.status(404).send('Position is not existed!');    
    }

    let changeTime = matchDetailes.changeTime;
    if(req.body.changeTime) {
        changeTime = req.body.changeTime;
    }

    matchDetailes.match = match;
    matchDetailes.player = player;
    matchDetailes.position = position;
    matchDetailes.changeTime = changeTime;

    const errors = await validate(matchDetailes);
    if (errors.length > 0) return res.status(400).send(`Bad Input! ${errors}`);
    

    await getRepository(MatchDetailes).save(matchDetailes);
    res.status(200).send(matchDetailes);
}));

router.delete("/", [auth, admin], async(async function(req: Request, res: Response) {
    const matchDetailes = await getRepository(MatchDetailes).find();

    await getRepository(MatchDetailes).remove(matchDetailes);
    res.status(200).send(matchDetailes);

}));

router.delete("/:id", [auth, admin], async(async function(req: Request, res: Response) {
    const matchDetailes = await getRepository(MatchDetailes).findOne({ where: {id: req.params.id} });
    if(!matchDetailes) return res.status(404).send('There is no record with the given id.');

    await getRepository(MatchDetailes).remove(matchDetailes);
    res.status(200).send(matchDetailes);

}));


export { router as mdRouter }
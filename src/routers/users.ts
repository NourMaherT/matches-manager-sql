import {getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from "class-validator"; 
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {auth} from '../middleware/auth'
import {admin} from '../middleware/admin'
 

const router = express.Router();
// router.use(express.json());
// const userRepository = getRepository(User)

// router.get("/", async function(req: Request, res: Response) {
//     const users = await getRepository(User).find();
//     res.status(200).send(users);
// });

// router.get("/:id", async function(req: Request, res: Response) {
//     const user = await getRepository(User).findOne({ where: {id: req.params.id}});
//     if(!user) return res.status(404).send('There is no user with the given id.');

//     res.status(200).send(user);
// });

router.get('/me', auth, async (req, res) => {
    const user = await getRepository(User).findOne({ where: {id: req.userId}});
    res.send(user);
});

router.post("/register",[auth, admin], async function(req: Request, res: Response) {
    let user = await getRepository(User).findOne({ username: req.body.username })
    if(user) return res.status(400).send('User is alresdy existed!');

    user = new User();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.username = req.body.username;
    user.isAdmin = req.body.isAdmin;
    
    const errors = await validate(user);
    if (errors.length > 0) return res.status(400).send(errors);
     
    await getRepository(User).save(user);
    res.status(200).send(_.pick(user, ['id', 'username']));
});

router.post("/login", async function(req: Request, res: Response) {
    const user = await getRepository(User).findOne({ username: req.body.username })
    if(!user) return res.status(404).send('Invalid username or password.');
    
    const valid = await bcrypt.compare(req.body.password, user.password);
    if(!valid) return res.status(400).send('Invalid email or password.');
     
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, '1234')
    
    await getRepository(User).save(user);
    res.status(200).send(token);
    

});

// router.put("/:id", async function(req: Request, res: Response) {
//     let user = await getRepository(User).findOne({ where: {id: req.params.id}});
//     if(!user) return res.status(404).send('There is no user with the given id.');

//     user.username = req.body.username;
//     user.password = req.body.password;
//     user.isAdmin = req.body.isAdmin;

//     // user = await getRepository(User).update();
//     await getRepository(User).save(user);
//     res.status(200).send(user);
// });

// router.delete("/", async function(req: Request, res: Response) {
//     const users = await getRepository(User).find();

//     await getRepository(User).remove(users);
//     res.status(200).send(users);

// });

// router.delete("/:id", async function(req: Request, res: Response) {
//     const user = await getRepository(User).findOne({ where: {id: req.params.id}});
//     if(!user) return res.status(404).send('There is no user with the given id.');

//     await getRepository(User).remove(user);
//     res.status(200).send(user);

// });





export { router as userRouter }
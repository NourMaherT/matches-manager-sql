import {Request, Response} from "express";

export function error(req: Request, res: Response) {
    // console.log(error.message);
    res.status(500).send('Somthing Failed...');
}
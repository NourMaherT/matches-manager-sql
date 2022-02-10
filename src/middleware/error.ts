import {Request, Response} from "express";

export function errors(error: Error, req: Request, res: Response) {
    console.log(error.message);
    res.status(500).send('Somthing Failed.');
}
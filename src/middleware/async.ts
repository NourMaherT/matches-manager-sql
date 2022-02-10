import {Request, Response, NextFunction} from "express";

export function async(handler) {
    return(async (req: Request, res: Response, next: NextFunction) => {
        try{
            await handler(req, res);
        }
        catch(ex) {
            res.status(500).send(`Somthing Failed ${ex.message}`);
            // return next(ex);
        }
    });
}
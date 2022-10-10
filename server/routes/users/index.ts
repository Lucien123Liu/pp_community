import express from 'express';
import {Request, Response, NextFunction} from 'express';

const router = express.Router();

router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
    res.send('test---------');
});
module.exports = router;
import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const file = (process.env.videos || 'public/uploads/') + req.query.id;
    if (!fs.existsSync(file)) return res.status(404).send('Not found');
    const stream = fs.createReadStream(file);
    stream.on('error', () => {
        res.status(404).end();
    });
    stream.pipe(res);
};

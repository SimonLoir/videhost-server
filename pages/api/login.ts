import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import { ApiRequest } from '../../next-env';

export default withSession(async (req: ApiRequest, res: NextApiResponse) => {
    req.session.set('user', { id: 'test' });
    await req.session.save();
    res.status(200).json(req.session.get('user'));
});

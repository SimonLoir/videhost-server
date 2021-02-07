import { NextApiRequest, NextApiResponse } from 'next';
import withSession from '../../lib/session';
import { ApiRequest } from '../../next-env';

export default withSession(async (req: ApiRequest, res: NextApiResponse) => {
    res.status(200).json(req.session.get('user'));
});

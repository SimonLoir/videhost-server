/// <reference types="next" />
/// <reference types="next/types/global" />

import { NextApiResponse } from 'next';

declare interface ApiRequest extends NextApiRequest {
    session: any;
}

import PlayerPageHeader from '../../components/player/Header';
import Player from '../../components/player/Player';
import { site_name } from '../../config/config';
import withSession from '../../lib/session';
import style from '../../styles/Video.module.scss';

export default function videoPlayerPage({ user }) {
    return (
        <>
            <PlayerPageHeader>
                <h1>{site_name}</h1>
            </PlayerPageHeader>
            <div className={style.content}></div>
        </>
    );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    // Get the user's session based on the request
    const user = req.session.get('user');

    if (!user)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    return {
        props: { user },
    };
});

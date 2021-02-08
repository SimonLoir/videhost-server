import PlayerPageHeader from '../../components/player/Header';
import Player from '../../components/player/Player';
import { site_name } from '../../config/config';
import withSession from '../../lib/session';
import style from '../../styles/Video.module.scss';
import Link from 'next/link';
import Chat from '../../components/chat/ChatRoom';

export default function videoPlayerPage({ user }) {
    return (
        <div className={style.playerPage}>
            <PlayerPageHeader>
                <h1>{site_name}</h1>
                <nav>
                    <Link href='/videos'>Vidéos</Link>
                    <Link href='/account'>Mon compte</Link>
                </nav>
            </PlayerPageHeader>
            <div className={style.whiteWrapper}>
                <div className={style.content}>
                    <div>
                        <div className={style.videoContainer}>
                            <div className={style.videoWrapper}>
                                <Player></Player>
                            </div>
                        </div>
                        <h2>Titre de la vidéo</h2>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Minima quas quidem corporis quibusdam totam
                            distinctio, libero officiis consequatur, ipsa
                            numquam rerum soluta, sunt neque modi. Architecto
                            accusamus ad debitis quia. Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Sunt nihil iusto,
                            labore magni quasi distinctio, saepe quidem sed
                            sapiente, provident voluptate asperiores expedita
                            nesciunt dolore id officia recusandae quaerat ipsam!
                        </p>
                    </div>
                    <div>
                        <Chat></Chat>
                    </div>
                </div>
            </div>
            <footer className={style.footer}>
                <span>Powered by</span> <br />
                <img src='/logo.svg'></img>
            </footer>
        </div>
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

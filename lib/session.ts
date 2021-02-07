// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
    return withIronSession(handler, {
        password:
            process.env.SECRET_COOKIE_PASSWORD ||
            `v#HnmmrrgqUMM&ymyCYD6+m=yu3cQdkKs?t7Y+CD5Sd$k@?6c-z7j=u?A9rXHKvytjC%zXe=qv9_kBnVsadaG%q+8z$pyK8w8-x=+3^Y*YP6^U28qLJ!&nFZbXx7E_&#`,
        cookieName: 'videhost/session',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production' ? true : false,
        },
    });
}

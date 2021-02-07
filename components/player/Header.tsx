import style from '../../styles/Video.module.scss';

export default function PlayerPageHeader({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className={style.header}>{children}</div>;
}

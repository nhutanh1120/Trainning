import { HeartIcon } from '~/components/Icons';
import ButtonIcon from './ButtonIcon';

const data = [
    {
        icon: <HeartIcon width="2.4rem" height="2.4rem" />,
        count: '12.6M',
    },
    {
        icon: <HeartIcon width="2.4rem" height="2.4rem" />,
        count: '12.6M',
    },
    {
        icon: <HeartIcon width="2.4rem" height="2.4rem" />,
        count: '12.6M',
    },
    {
        icon: <HeartIcon width="2.4rem" height="2.4rem" />,
        count: '12.6M',
    },
];
function ActionBar() {
    return (
        <section className="wrapper">
            {data.map((item, index) => (
                <ButtonIcon key={index} icon={item.icon} count={item.count} />
            ))}
        </section>
    );
}

export default ActionBar;

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import ButtonIcon from './ButtonAction';

function ActionBar() {
    const [showShare, setShowShare] = useState(false);

    return (
        <section className="wrapper">
            <ButtonIcon type="img" src="https://files.fullstack.edu.vn/f8-tiktok/users/6767/6669bebac4812.jpg" />
            <ButtonIcon type="icon" icon={<FontAwesomeIcon icon={faHeart} />} count="12M" />
            <ButtonIcon type="icon" icon={<FontAwesomeIcon icon={faCommentDots} />} to="/video/" count="12M" />
            <ButtonIcon type="icon" icon={<FontAwesomeIcon icon={faBookmark} />} count="12M" />

            <HeadlessTippy
                visible={showShare}
                onClickOutside={() => setShowShare(false)}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        sdsdasdasdas
                    </div>
                )}
            >
                <ButtonIcon
                    type="icon"
                    icon={<FontAwesomeIcon icon={faShare} />}
                    count="12M"
                    onClick={() => setShowShare((prev) => !prev)}
                />
            </HeadlessTippy>
        </section>
    );
}

export default ActionBar;

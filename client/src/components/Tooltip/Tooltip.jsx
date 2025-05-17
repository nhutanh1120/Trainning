import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useFloating, offset, flip, shift, useHover, useInteractions } from '@floating-ui/react';
import { safePolygon } from '@floating-ui/react-dom-interactions';

import styles from './Tooltip.module.scss';

const cx = classNames.bind(styles);

function Tooltip({
    children,
    content,
    visible,
    interactive = false,
    placement = 'top',
    delay = [0, 0],
    offsetX = 0,
    offsetY = 0,
    onHide = () => {},
    onClickOutside = () => {},
}) {
    const isControlled = visible !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const open = isControlled ? visible : uncontrolledOpen;

    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: isControlled ? undefined : setUncontrolledOpen,
        middleware: [offset({ mainAxis: offsetY, crossAxis: offsetX }), flip(), shift()],
        placement,
    });

    const hover = useHover(context, {
        delay: { open: delay[0], close: delay[1] },
        move: false,
        handleClose: interactive ? safePolygon() : undefined,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    // Detect click outside
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e) => {
            if (refs.reference.current?.contains(e.target) || refs.floating.current?.contains(e.target)) {
                return;
            }
            if (!isControlled) setUncontrolledOpen(false);
            onClickOutside();
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, isControlled, onClickOutside, refs]);

    // Gọi onHide khi tooltip đóng
    useEffect(() => {
        if (!open) {
            onHide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const renderContent = () => {
        if (typeof content === 'function') {
            return content();
        }
        if (typeof content === 'string') {
            return <div className={cx('tooltip-box')}>{content}</div>;
        }
        return content;
    };

    return (
        <Fragment>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </div>
            {open && (
                <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 9999 }} {...getFloatingProps()}>
                    {renderContent()}
                </div>
            )}
        </Fragment>
    );
}

export default Tooltip;

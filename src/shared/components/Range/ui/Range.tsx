import { FC, MouseEventHandler, memo, useState, useRef, useEffect, useCallback } from 'react'
import Rectangle from 'shared/assets/icons/reactangle.svg?react'
// import cn from 'classnames'
import s from './Range.module.scss'

interface RangeProps {
    className?: string
}

type TRangeLine = number | undefined

const debounce = (f: () => void, ms = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(f())
        }, ms)
    })
}

export const Range: FC<RangeProps> = memo(() => {
    const rangeLineRef = useRef<HTMLDivElement>(null)
    const rangeFillLineRef = useRef<HTMLDivElement>(null)
    const rangeContainerRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)

    const thumbCenter = (thumbRef.current?.clientHeight as number) / 2

    const [rangeLineWidth, setRangeLineWidth] = useState<TRangeLine>(0)
    const [rangeFillLineWidth, setRangeFillLineWidth] = useState<TRangeLine>(0)

    // Получаем начало range контейнера относительно страницы
    const [rangeContainerPosition, setRangeContainerPosition] = useState<TRangeLine>(0)
    const [circlePosition, setCirclePosition] = useState(0)
    const [mousePositionX, setMousePositionX] = useState(0)

    const getMousePosition = useCallback(
        async (e: MouseEvent) => {
            await debounce(() => setMousePositionX(() => e.clientX - rangeContainerPosition!), 20)
        },
        [rangeContainerPosition]
    )

    const onMouseDown = () => {
        thumbRef.current?.addEventListener('mousemove', getMousePosition)
    }

    const onMouseUp = () => {
        thumbRef.current?.removeEventListener('mousemove', getMousePosition)
    }

    useEffect(() => {
        const clientX = rangeContainerRef.current?.getBoundingClientRect().x
        setRangeContainerPosition(clientX)
    }, [])

    useEffect(() => {
        console.log('mousePositionX', mousePositionX)
    }, [mousePositionX])

    useEffect(() => {
        setRangeLineWidth(rangeLineRef.current?.offsetWidth)
        setRangeFillLineWidth(rangeFillLineRef.current?.offsetWidth)
    }, [])

    return (
        <div
            ref={rangeContainerRef}
            className={s['range-container']}
        >
            <div className={s['range-wrapper']}>
                <div
                    ref={rangeLineRef}
                    className={s['range-line']}
                ></div>
                <div
                    ref={rangeFillLineRef}
                    className={s['range-line--fill']}
                >
                    <div
                        ref={thumbRef}
                        onMouseUp={onMouseUp}
                        onMouseDown={onMouseDown}
                        className={s['range-circle']}
                        style={{
                            left: mousePositionX - thumbCenter + 'px',
                        }}
                    >
                        <Rectangle className={s.rectangle} />
                        <Rectangle className={s.rectangle} />
                    </div>
                </div>
            </div>
            <div className={s['range-number-line']}>
                <div className={s['range-number__item']}>200</div>
                <div className={s['range-number__item']}>350</div>
                <div className={s['range-number__item']}>600</div>
                <div className={s['range-number__item']}>650</div>
            </div>
        </div>
    )
})

Range.displayName = 'Range'

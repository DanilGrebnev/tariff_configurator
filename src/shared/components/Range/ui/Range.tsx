import {
    FC,
    MouseEventHandler,
    memo,
    useMemo,
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react'
import Rectangle from 'shared/assets/icons/reactangle.svg?react'
import { debounce } from 'shared/lib/debounce'
import cn from 'classnames'
import s from './Range.module.scss'

interface RangeProps {
    className?: string
}

type TRangeLine = number | undefined

export const Range: FC<RangeProps> = memo(() => {
    const rangeLineRef = useRef<HTMLDivElement>(null)
    const rangeFillLineRef = useRef<HTMLDivElement>(null)
    const rangeContainerRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)

    const [rangeContainerWidth, setRangeContainerWidth] = useState<TRangeLine>(0)

    // Получаем начало range контейнера относительно страницы
    const [rangeContainerStartPosition, setRangeContainerStartPosition] = useState<TRangeLine>(0)

    // Изменяем состояние для того, чтобы повесить класс active
    // на thumb и изменить тип курсора на grabbing
    const [isMoveThumb, setIsMoveThumb] = useState(false)

    //Считываем позицию курсора мыши
    const [cursorPositionX, setCursorPositionX] = useState(0)

    const changeThumbPosition = useCallback(
        ({ clientX }: MouseEvent) => {
            // Позиция thumb высчитывается, как разница координаты курсора мыши по X
            // и координата начала контейнера range.
            const cursorPosition = clientX

            // Высчитываем начало позици range контейнера
            const rangeContainerPositionStart = rangeContainerStartPosition!

            //Высчитываем конец позиции range контейнера
            const rangeContainerPositionEnd =
                rangeContainerPositionStart + rangeContainerRef.current!.clientWidth

            // Если курсор выходит за границы range контейнера - перестаем
            // двигать thumb
            if (cursorPosition < rangeContainerPositionStart) return
            if (cursorPosition > rangeContainerPositionEnd) return

            const thumbPosition = cursorPosition - rangeContainerPositionStart
            setCursorPositionX(thumbPosition)
        },
        [rangeContainerStartPosition]
    )

    /**
     * Удаление обработчика события с thumb
     */
    const removeEventListenerFromThumb = () => {
        thumbRef.current?.removeEventListener('mousemove', changeThumbPosition)
        setIsMoveThumb(false)
    }

    /**
     * Вешает обработчик события на thumb при нажатии на него
     */
    const onMouseDown = () => {
        thumbRef.current?.addEventListener('mousemove', changeThumbPosition)
        setIsMoveThumb(true)
    }

    /**
     * Удаляет обработчик события с thumb, если левая
     * кнопка мыши будет отпущена
     */
    const onMouseUp = () => {
        removeEventListenerFromThumb()
    }

    /**
     * Удаляет обработчик события с thumb, если мышка выходит
     * за его границы
     */
    const onMouseOut = () => {
        removeEventListenerFromThumb()
    }

    useEffect(() => {
        // Узнаем, на каком расстоянии от левого края экрана находится range
        const rangeContainer = rangeContainerRef.current
        const clientX = rangeContainer?.getBoundingClientRect().x
        setRangeContainerStartPosition(clientX)
        // Устанавливаем длинну контейнера
        setRangeContainerWidth(rangeContainer?.clientWidth)
    }, [])

    const rangeFillLineWidthPX = cursorPositionX + 'px'

    const thumbCenter = (thumbRef.current?.clientHeight as number) / 2
    const thumbXPositionPX = cursorPositionX - thumbCenter + 'px'

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
                    style={{ width: rangeFillLineWidthPX }}
                >
                    <div
                        ref={thumbRef}
                        onMouseUp={onMouseUp}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseOut}
                        className={cn(s['range-thumb'], { [s.active]: isMoveThumb })}
                        style={{
                            left: thumbXPositionPX,
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

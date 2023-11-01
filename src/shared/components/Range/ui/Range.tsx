import { FC, memo, useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import Rectangle from 'shared/assets/icons/reactangle.svg?react'
import cn from 'classnames'
import s from './Range.module.scss'
import { Title } from '../../Title'

interface RangeProps {
    className?: string
    values: number[]
    test?: boolean
    rangeTitle?: string
    onChange: (value: number) => void
    fillTrackColor?: string
    thumbColor?: string
}

type TRangeLine = number | undefined
type TRangeZones = Record<string, number>

export const Range: FC<RangeProps> = memo((props) => {
    const { values, test, onChange, rangeTitle, fillTrackColor, thumbColor } = props

    const rangeLineRef = useRef<HTMLDivElement>(null)
    const rangeFillLineRef = useRef<HTMLDivElement>(null)
    const rangeContainerRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)

    /* Получаем начало range контейнера относительно страницы */
    const [rangeContainerStartPosition, setRangeContainerStartPosition] = useState<TRangeLine>(0)

    /** Изменяем состояние для того, чтобы повесить класс active
     * на thumb и изменить тип курсора на grabbing
     */
    const [isMoveThumb, setIsMoveThumb] = useState(false)

    /* Считываем позицию курсора мыши по координате x */
    const [cursorPositionX, setCursorPositionX] = useState(0)

    /**
     * Хранит пары key/value, где key - thumb значение,
     * а value - диапазон в пикселях, которые присущи данному
     * значению
     */
    const [rangeZones, setRangeZones] = useState<TRangeZones>({})

    /* Значение thumb */
    const [value, setValue] = useState<number>(values[0])

    /* Функция рассчитывает позицию thumb */
    const changeThumbPosition = useCallback(
        ({ clientX }: MouseEvent) => {
            /* Позиция thumb высчитывается, как разница координаты курсора мыши по X 
            и координата начала контейнера range. */
            const cursorPosition = clientX

            /* Высчитываем начало позици range контейнера */
            const rangeContainerPositionStart = rangeContainerStartPosition!

            /* Высчитываем конец позиции range контейнера */
            const rangeContainerPositionEnd =
                rangeContainerPositionStart + rangeContainerRef.current!.clientWidth

            /* Если курсор выходит за границы range контейнера - перестаем
             двигать thumb */
            if (cursorPosition < rangeContainerPositionStart) return
            if (cursorPosition > rangeContainerPositionEnd) return

            const thumbPosition = cursorPosition - rangeContainerPositionStart
            setCursorPositionX(thumbPosition)
        },
        [rangeContainerStartPosition]
    )

    const onClick = (e: MouseEvent) => {
        changeThumbPosition(e)
    }

    /* Удаление обработчика события с thumb */
    const removeEventListenerFromThumb = () => {
        thumbRef.current?.removeEventListener('mousemove', changeThumbPosition)
        setIsMoveThumb(false)
    }

    /* Вешает обработчик события на thumb при нажатии на него */
    const onMouseDown = () => {
        thumbRef.current?.addEventListener('mousemove', changeThumbPosition)
        setIsMoveThumb(true)
    }

    /* Удаляет обработчик события с thumb, если левая кнопка мыши будет отпущена */
    const onMouseUp = () => {
        removeEventListenerFromThumb()
    }

    /* Удаляет обработчик события с thumb, если курсор выходит за его границы */
    const onMouseOut = () => {
        removeEventListenerFromThumb()
    }

    /* Функция высчитывает площадь зон значений в пикселях. */
    const calculateRangeZones = useCallback(
        (rangeContainerWidth: number) => {
            const amountValues = values.length
            const zoneWidth = rangeContainerWidth / amountValues
            // переменная o - хранит значения расчёта range зон
            const o: TRangeZones = {}

            for (let i = 0; i < values.length; i++) {
                const key = values[i]
                const prevKey = values[i - 1]

                if (!i) {
                    o[key] = zoneWidth
                    continue
                }

                o[key] = o[prevKey] + zoneWidth
            }

            setRangeZones(o)
        },
        [values]
    )

    useLayoutEffect(() => {
        // Узнаем, на каком расстоянии от левого края экрана находится range
        const rangeContainer = rangeContainerRef.current
        const rangeContainerStartCoordinateX = rangeContainer?.getBoundingClientRect().x
        setRangeContainerStartPosition(rangeContainerStartCoordinateX)
        // Получаем длинну range контейнера
        calculateRangeZones(rangeContainer!.clientWidth)
    }, [calculateRangeZones])

    /* Установка первоначального состояния в store */
    useEffect(() => {
        if (!values) return
        onChange(values[0])
    }, [values, onChange])

    /* Функция считает значение относительно положения thumb */
    const calculateThumbValues = () => {
        const a = Object.entries(rangeZones)
        for (let i = 0; i < a.length; i++) {
            const [zoneName, zoneCoordinateEnd] = a[i]
            /**  Если курсор по координате x находится
            ближе к левому краю экрана, чем заканчивается
            зона значения, тогда считается, текущая зона
            */
            if (cursorPositionX <= zoneCoordinateEnd) {
                setValue(+zoneName)
                break
            }
        }
    }

    useEffect(() => {
        onChange(value)
    }, [value, onChange])

    useEffect(() => {
        calculateThumbValues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursorPositionX])

    // Тестирование
    useEffect(() => {
        if (test) {
            console.log('value:', value)
        }
    }, [value, test])

    useEffect(() => {
        if (test) {
            console.log('range zone', rangeZones)
        }
    }, [rangeZones, test])

    const thumbCenter = (thumbRef.current?.clientHeight as number) / 2
    const rangeFillLineWidthPX = cursorPositionX + 'px'
    const thumbPositionPX = cursorPositionX - thumbCenter + 'px'

    return (
        <div
            ref={rangeContainerRef}
            className={s['range-container']}
        >
            {rangeTitle && <Title className={s['range-title']}>{rangeTitle}</Title>}
            <div className={s['range-wrapper']}>
                <div
                    ref={rangeLineRef}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={(e: any) => onClick(e)}
                    className={s['range-line']}
                ></div>
                <div
                    ref={rangeFillLineRef}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={(e: any) => onClick(e)}
                    className={s['range-line--fill']}
                    style={{ width: rangeFillLineWidthPX, background: fillTrackColor }}
                >
                    <div
                        ref={thumbRef}
                        onMouseUp={onMouseUp}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseOut}
                        className={cn(s['range-thumb'], { [s.active]: isMoveThumb })}
                        style={{
                            left: thumbPositionPX,
                            background: thumbColor,
                        }}
                    >
                        <Rectangle className={s.rectangle} />
                        {test && (
                            <>
                                <div className={s.testLine}></div>
                                <div className={s.testCursorValue}>{cursorPositionX}px</div>
                                <div className={s.testValues}>{value}value</div>
                            </>
                        )}

                        <Rectangle className={s.rectangle} />
                    </div>
                </div>
            </div>
            <div className={s['range-number-line']}>
                {values?.map((value, i) => {
                    return (
                        <div
                            key={i}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={(e: any) => onClick(e)}
                            className={cn(s['range-number__item'], { [s.test]: test })}
                        >
                            {value}
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

Range.displayName = 'Range'

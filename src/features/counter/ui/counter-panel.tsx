import {
  decrement,
  increment,
  incrementByAmount,
  selectCounterValue,
} from '../model/counter-slice'
import { useAppDispatch, useAppSelector } from '../../../app/store/store-hooks'
import './counter-panel.css'

export function CounterPanel() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectCounterValue)

  return (
    <section className="counter-panel">
      <p className="counter-panel__label">Redux toolkit metric</p>
      <p className="counter-panel__value">{value}</p>
      <div className="counter-panel__actions">
        <button
          type="button"
          onClick={() => dispatch(decrement())}
          className="counter-panel__button counter-panel__button--ghost"
        >
          -1
        </button>
        <button
          type="button"
          onClick={() => dispatch(increment())}
          className="counter-panel__button counter-panel__button--light"
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => dispatch(incrementByAmount(5))}
          className="counter-panel__button counter-panel__button--ghost"
        >
          +5
        </button>
      </div>
    </section>
  )
}

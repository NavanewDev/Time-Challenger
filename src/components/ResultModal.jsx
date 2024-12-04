import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({onReset, targetTime, remainingTime}, ref) {

    const fixedTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((remainingTime / (targetTime * 1000)) * 100);
    const resultStatus = remainingTime <= 0;

    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
        
    })

    return createPortal(<dialog ref={dialog} className="result-modal" onClose={onReset}>
        {resultStatus && <h2>You Lost</h2>}
        {!resultStatus && <h2>Your Score: {score}</h2>}
        <p>The Target Time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{fixedTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
        document.getElementById('root')
    )
})

export default ResultModal;
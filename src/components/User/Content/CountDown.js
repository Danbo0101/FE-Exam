import { useEffect, useState } from "react";



const CountDown = (props) => {

    const { toTimeUp, count, setCount, isSubmitQuiz } = props;

    useEffect(() => {
        if (count === 0) {
            toTimeUp();
            return;
        }
        const timer = setInterval(() => {
            if (!isSubmitQuiz) {
                setCount(count - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [count, isSubmitQuiz]);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    return (
        <div className="countdown">
            {toHHMMSS(count)}
        </div>
    )
}

export default CountDown;
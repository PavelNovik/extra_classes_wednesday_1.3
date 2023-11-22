import React, {FC, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeIsWaitingDoneAC, changeProgressAC} from "./state/circularStatic-reducer";

interface ICircularProgressWithLabel {
    value: number
}

const CircularProgressWithLabel: React.FC<ICircularProgressWithLabel> = (props) => {

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props}/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

interface ICircularStatic {
    isWaiting: boolean
    //interval milliseconds
    timeInterval: number
    id: string
}

//TASK
//Use redux instead local state

export const CircularStatic: FC<ICircularStatic> = (props) => {
    // const [progress, setProgress] = useState(0);
    const id = props.id
    const progres = useSelector<AppRootStateType, number>(state => state.circularStatic[id] ? state.circularStatic[id].progress : 0)
    // const [isWaitingDone, setIsWaitingDone] = useState(true);
    const isWaitingDon = useSelector<AppRootStateType, boolean>(state => state.circularStatic[id] ? state.circularStatic[id].isWaitingDone : true)

    const dispatch = useDispatch()
    const changeProgres = (value: number) => {
        dispatch(changeProgressAC(id, value))
    }
    React.useEffect(() => {
        let timer: ReturnType<typeof setInterval>
        if (props.isWaiting && isWaitingDon) {
            timer = setInterval(() => {
                const newProg = () => {
                    console.log(progres)
                    if (progres === 100) {
                        clearInterval(timer)
                        // setIsWaitingDone(false)
                        dispatch(changeIsWaitingDoneAC(id, false))
                    }
                    console.log(progres)
                    return progres >= 100 ? 0 : progres + 10
                }
                changeProgres(newProg())
                // setProgress((prevProgress) => {
                //     if (prevProgress === 100) {
                //         clearInterval(timer)
                //         setIsWaitingDone(false)
                //     }
                //     return prevProgress >= 100 ? 0 : prevProgress + 10
                // });
            }, props.timeInterval);
        } else {
            // setProgress(0)
            changeProgres(0)
        }
        return () => {
            if (progres >= 90) changeProgres(0)
            // dispatch(changeProgressAC(id,0))
            clearInterval(timer);
        };
    }, [props.isWaiting, dispatch]);

    return <CircularProgressWithLabel value={progres}/>;
}





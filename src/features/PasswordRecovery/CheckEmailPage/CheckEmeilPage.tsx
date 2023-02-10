import React from "react";
import { Box, Button, Card, CircularProgress, SvgIcon } from "@mui/material";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { useAppSelector } from "../../../app-hooks/hooks";
import { Navigate } from "react-router-dom";
import s from "./check-email.module.scss";
import { PATH } from "../../../enums/enum-route";

export const CheckEmailPage = () => {
    const email = useAppSelector(state => state.passRecover.email)
    const sendMessageStatus = useAppSelector(state => state.passRecover.sendMessageStatus)


    if (sendMessageStatus === 'sending') {
        return <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color='inherit'/>
        </div>
    } else if (sendMessageStatus === 'notSend') {
        return <Navigate to={'/login'}/>
    }
    return <Box
        sx={{
            width: 413,
        }}>
        <Card variant={"outlined"}>
            <div className={s.cardWrap}>
                <h2>Check Email</h2>
                <SvgIcon
                    component={ForwardToInboxOutlinedIcon}
                    inheritViewBox
                    sx={{fontSize: 75}}
                />
                <p style={{color: "gray", fontWeight: 'lighter', textAlign: 'center'}}>
                    We’ve sent an Email with instructions to {email}
                </p>
                <Button href={PATH.LOGIN} variant="outlined" color="inherit" size={"small"} type={'submit'}>
                    Back to login
                </Button>
            </div>
        </Card>
    </Box>
}
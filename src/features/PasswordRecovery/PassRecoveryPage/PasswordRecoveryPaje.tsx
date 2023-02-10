import React from "react";
import { Box, Button, Card, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app-hooks/hooks";
import { sendInstructionForNewPass } from "../../../store/reducers/password-recovery-reducer";
import s from "./pass-recovery.module.scss";
import { PATH } from "../../../enums/enum-route";

export const PasswordRecoveryPage = React.memo(() => {
    const sendMessage = useAppSelector(state => state.passRecover.sendMessage)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            dispatch(sendInstructionForNewPass(values.email))
            //alert(JSON.stringify(values))
        }
    })

    if (sendMessage) return <Navigate to={PATH.CHECK_EMAIL}/>
    return (
            <Box
                sx={{
                    width: 413,
                }}>
                <Card variant={"outlined"}>
                    <form onSubmit={formik.handleSubmit} className={s.cardWrap}>
                                <h2>Forgot your password?</h2>
                                <TextField
                                    name='email'
                                    label='Email'
                                    type='email'
                                    variant='standard'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <p style={{color: "gray", fontWeight: 'lighter', textAlign: 'center'}}>Enter your email
                                    address and we will send you further instructions</p>
                                <Button variant="outlined" color="inherit" size={"small"} type={'submit'}>Send
                                    Instructions</Button>
                                <p style={{color: "gray"}}>Did you remember your password?</p>
                                <Button href={PATH.LOGIN} size={"small"}>Try logging in</Button>
                    </form>
                </Card>
            </Box>
    );
})

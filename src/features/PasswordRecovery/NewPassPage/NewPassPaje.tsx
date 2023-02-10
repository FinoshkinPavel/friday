import React from 'react';
import {Box, Button, Card} from "@mui/material";
import {useFormik} from "formik";
import s from './new-pass.module.scss'
import {CustomInputPass} from "../../../common/CustomInputPass/CustomInputPass";
import {validationSchemaNewPassword} from "../../../utils/validate-utils";

export const NewPassPage = React.memo(() => {

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: validationSchemaNewPassword,
        onSubmit: values => {
            alert(JSON.stringify(values))
        }
    })

    return (
            <Box
                sx={{
                    width: 413,
                }}>
                <Card variant={"outlined"}>
                    <form onSubmit={formik.handleSubmit} className={s.cardWrap}>
                        <h1>Create new password</h1>
                        <CustomInputPass
                        name={'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        touched={formik.touched}
                        errorText={formik.errors.password}
                        />
                        <p style={{color: "gray", fontWeight: 'lighter', textAlign: 'center'}}>
                            Create new password and we will send you further instructions to email
                        </p>
                        <Button variant="outlined" color="inherit" size={"small"} type={'submit'}>Create new
                            password
                        </Button>
                    </form>
                </Card>
            </Box>
    );
})

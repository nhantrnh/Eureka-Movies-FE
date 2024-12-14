import React from 'react'
import useStyles from './Footer.style.js'

export default function Footer() {
    const classes = useStyles();

    return <>
        <div className={classes.container}>
            Developed By Eureka Movie
        </div>
    </>
}

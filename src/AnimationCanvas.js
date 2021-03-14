import { Paper } from "@material-ui/core";
import React, { Component } from "react";

export default class AnimationCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };

        console.log(this.props.theme);
    }

    render() {
        return (
            <Paper
                style={{
                    padding: this.props.theme.spacing(2),
                    margin: this.props.theme.spacing(1),
                }}
                height="100%"
                elevation={3}
            >
                <h1>{this.props.result}</h1>
            </Paper>
        );
    }
}
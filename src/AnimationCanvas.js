import { Paper } from "@material-ui/core";
import React, { Component } from "react";

export default class AnimationCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };
    }

    render() {
        return (
            <Paper style={{ padding: 10, margin: 30 }} elevation={3}>
                <h1>{this.props.result}</h1>
            </Paper>
        );
    }
}

import { Paper } from "@material-ui/core";
import React, { Component } from "react";

export default class PseudocodeCanvas extends Component {
    render() {
        return (
            <Paper
                style={{
                    padding: this.props.theme.spacing(2),
                    margin: this.props.theme.spacing(1),
                }}
                elevation={3}
                // variant="outlined"
            >
                <pre>
                    <code>{this.props.code}</code>
                </pre>
            </Paper>
        );
    }
}

import { Divider, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";

export default class StepDescriptionCanvas extends Component {
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
                <Typography variant="h6">
                    Step: {this.props.stepIndex + 1} of{" "}
                    {this.props.stepArray.length}
                </Typography>
                <Divider
                    style={{
                        marginTop: this.props.theme.spacing(1),
                        marginBottom: this.props.theme.spacing(1),
                    }}
                ></Divider>
                <Typography>
                    {this.props.stepArray[this.props.stepIndex].description}
                </Typography>
            </Paper>
        );
    }
}

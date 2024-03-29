import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
} from "@material-ui/core";
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
                <div>
                    {this.props.code.code.split("\n").map((line, i) => (
                        <pre
                            key={line + i}
                            className={
                                this.props.lines.includes(i)
                                    ? "code-highlight"
                                    : "code"
                            }
                        >
                            {line}
                        </pre>
                    ))}
                </div>

                <Divider></Divider>
                {/* <Typography style={{ marginTop: "1em" }}>Legend</Typography> */}
                <List>
                    {this.props.code.legend.map((key, i) => (
                        <ListItem key={i + "codeline"}>
                            <ListItemIcon
                                style={{
                                    fontFamily: "monospace",
                                }}
                            >
                                {key.name}
                            </ListItemIcon>
                            <ListItemText>{key.description}</ListItemText>
                            <ListItemSecondaryAction className="variable-value">
                                {key.value}
                            </ListItemSecondaryAction>
                            {/* {key.name + " " + key.description} */}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }
}

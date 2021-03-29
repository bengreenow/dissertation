import { List, ListItem, Typography } from "@material-ui/core";
import React, { Component } from "react";

export default class References extends Component {
    render() {
        return (
            <div className="App" style={{ maxWidth: "1080px", margin: "auto" }}>
                <Typography variant="h1">References</Typography>
                <List>
                    <ListItem>test</ListItem>
                </List>
            </div>
        );
    }
}

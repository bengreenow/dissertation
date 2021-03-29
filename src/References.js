import {
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import React, { Component } from "react";

export default class References extends Component {
    constructor(props) {
        super(props);
        this.refereces = [
            {
                link:
                    "https://www.researchgate.net/figure/A-running-leopard-animation-with-15-frames-Top-row-original-mesh-with-4876-faces_fig4_330139533",
                desc:
                    "Animated mesh simplification based on motion features in visual sensor networks",
                dateAccessed: "March 29, 2021",
                title: "Animation Image",
            },
            {
                dateAccessed: "March 29, 2021",
                title: `"Learning any algorithm can be overwhelming"`,
                desc:
                    "Edmonds, J., How to Think about Algorithms. 2008, Cambridge: Cambridge University Press.",
            },
        ];
    }

    render() {
        return (
            <div className="App" style={{ maxWidth: "1080px", margin: "auto" }}>
                <Typography variant="h1">References</Typography>
                <Paper
                    elevation={3}
                    style={{ paddingBottom: "5px", paddingTop: "5px" }}
                >
                    <List>
                        {this.refereces.map((ref) => (
                            <ListItem>
                                <ListItemText
                                    // primary={ref.desc}
                                    secondary={
                                        (ref.extra ? ref.extra + " | " : "") +
                                        "Accessed " +
                                        ref.dateAccessed
                                    }
                                >
                                    <h3 style={{ margin: "0" }}>{ref.title}</h3>
                                    {ref.desc}
                                </ListItemText>
                                {ref.link ? (
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            href={ref.link}
                                            target="_blank"
                                        >
                                            <LinkIcon></LinkIcon>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                ) : (
                                    ""
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </div>
        );
    }
}

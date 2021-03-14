import { Paper } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { Component } from "react";
import Character from "./Character";

const OFFSET_SCALE = 10;

export default class AnimationCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };

        console.log(this.props.stepArray, "canvas");
    }

    render() {
        return (
            <Paper
                style={{
                    padding: this.props.theme.spacing(2),
                    margin: this.props.theme.spacing(1),
                    overflow: "hidden",
                }}
                height="100%"
                elevation={3}
            >
                <div>
                    {console.log(
                        this.props.stepArray[this.props.stepIndex],
                        "steparray"
                    )}
                    {this.props.stepArray[this.props.stepIndex].haystack.map(
                        (char, i) => {
                            // value = {char="x" highlight=false}
                            return (
                                <Character
                                    value={char.char}
                                    highlight={char.highlight}
                                    className="haystack"
                                ></Character>
                            );
                        }
                    )}
                </div>
                <motion.div
                    animate={{
                        x:
                            this.props.stepArray[this.props.stepIndex]
                                .needleOffset * OFFSET_SCALE,
                    }}
                >
                    {this.props.stepArray[this.props.stepIndex].needle.map(
                        (char, i) => {
                            // value = {char="x" highlight=false}
                            return (
                                <Character
                                    className="needle"
                                    value={char.char}
                                    highlight={char.highlight}
                                ></Character>
                            );
                        }
                    )}
                </motion.div>
            </Paper>
        );
    }
}

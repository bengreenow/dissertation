import { Paper } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { Component } from "react";
import Character from "./Character";
// TODO: May need to make the character array first, then mutate, instead of mapping every step

export default class AnimationCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };

        // console.log(this.props.stepArray, "canvas");
    }

    render() {
        return (
            <Paper
                style={{
                    padding: this.props.theme.spacing(2),
                    margin: this.props.theme.spacing(1),
                    overflow: "hidden",
                }}
                className={
                    this.props.stepArray[this.props.stepIndex].found
                        ? "found"
                        : "" ||
                          this.props.stepArray[this.props.stepIndex].notFound
                        ? "not-found"
                        : ""
                }
                height="100%"
                elevation={3}
            >
                <div style={{ width: "100%", marginBottom: "1em" }}>
                    {this.props.stepIndex + 1}/{this.props.stepArray.length}
                </div>
                <div>
                    {/* {console.log(
                        this.props.stepArray[this.props.stepIndex],
                        "steparray"
                    )} */}
                    {this.props.stepArray[this.props.stepIndex].haystack.map(
                        (char, i) => {
                            // value = {char="x" highlight=false}
                            return (
                                <Character
                                    value={char.char}
                                    key={i + char + "haystack"}
                                    highlight={char.highlight}
                                    correct={char.correct}
                                    incorrect={char.incorrect}
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
                                .needleOffset *
                                1.81 +
                            "em",
                    }}
                    transition={{
                        duration: 0.7,
                        type: "spring",
                    }}
                >
                    {this.props.stepArray[this.props.stepIndex].needle.map(
                        (char, i) => {
                            // value = {char="x" highlight=false}
                            return (
                                <Character
                                    className="needle"
                                    key={i + char + "needle"}
                                    value={char.char}
                                    highlight={char.highlight}
                                    correct={char.correct}
                                    incorrect={char.incorrect}
                                ></Character>
                            );
                        }
                    )}
                </motion.div>
            </Paper>
        );
    }
}

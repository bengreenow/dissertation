import { motion } from "framer-motion";
import React, { Component } from "react";

export default class Character extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        // console.log(this.props.highlight, "HIGHLIGHT");
        this.classes = this.props.className + " letter";
    }

    componentDidUpdate(oldProps) {
        // console.log(oldProps);
    }

    createStyles() {
        if (this.props.highlight) {
            return {
                color: "red",
                backgroundColor: "blue",
            };
        } else {
            return {
                color: "blue",
                backgroundColor: "white",
            };
        }
    }

    render() {
        return (
            <motion.span
                // animate={this.createStyles()}
                transition={{ ease: "easeInOut", duration: "10s" }}
                className={
                    // this.classes
                    this.props.highlight
                        ? `${this.classes} highlight`
                        : this.classes
                }
            >
                {this.props.value}
            </motion.span>
        );
    }
}

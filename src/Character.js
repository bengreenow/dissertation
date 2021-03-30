import { motion } from "framer-motion";
import React, { Component } from "react";

export default class Character extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        // console.log(this.props.highlight, "HIGHLIGHT");
        // this.updateClasses();
    }

    // componentDidUpdate(oldProps) {
    //     this.updateClasses();
    // }

    updateClasses() {
        this.classes = this.props.className + " letter";
        if (this.props.highlight) {
            this.classes += " highlight";
        }
        if (this.props.correct) {
            this.classes += " correct";
            console.log(this.props.correct);
        }
        if (this.props.incorrect) {
            this.classes += " incorrect";
        }
    }

    render() {
        console.log(this.classes);
        this.updateClasses();
        return (
            <motion.span
                // animate={this.createStyles()}
                transition={{ ease: "easeInOut", duration: "10s" }}
                className={this.classes}
            >
                {this.props.value}
            </motion.span>
        );
    }
}

import "./App.css";
import React from "react";
import { createMuiTheme, Grid } from "@material-ui/core";
import InputForm from "./InputForm";
import AnimationCanvas from "./AnimationCanvas";
import { naiveSearch } from "./algos/naive.js";
import PseudocodeCanvas from "./PseudocodeCanvas";
import Controls from "./Controls";
import StepDescriptionCanvas from "./StepDescriptionCanvas";

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
const BASE_DURATION = 500;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: 0,
            radioValue: "Naive Search",
            needleValue: "ABA",
            haystackValue: "ABBBABA",
            dropdownFields: [
                "Naive Search",
                // "Knuth-Morris-Pratt",
                // "Boyer-Moore",
            ],

            sliderValue: 1,
            code: "test",
            stepDuration: BASE_DURATION,
            stepIndex: 0,
            stepCurrent: 0,
            stepArray: naiveSearch("ABA", "ABBBABA"),
            isPlaying: false,
            notImplemented: false,
        };

        // used to map the name of each algorithm to their respective helper functions
        this.functionMap = {
            "Naive Search": naiveSearch,
            "Knuth-Morris-Pratt": () => "knphere",
            "Boyer-Moore": () => "boyerhere",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.onInterval = this.onInterval.bind(this);

        this.interval = undefined; // place to store interval object

        this.theme = createMuiTheme({
            spacing: 8,
            overrides: {
                MuiTextField: {
                    variant: "filled",
                },
                MuiFormControl: {
                    variant: "filled",
                },
            },
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // When stepduration changes, cancel current interval and create new one with new duration
        if (
            prevState.stepDuration !== this.state.stepDuration &&
            this.state.isPlaying
        ) {
            // new duration detected

            clearInterval(this.interval);
            this.interval = setInterval(
                this.onInterval,
                this.state.stepDuration
            );
        }

        if (prevState.isPlaying && !this.state.isPlaying) {
            // was playing, not anymore
            clearInterval(this.interval);
        } else if (!prevState.isPlaying && this.state.isPlaying) {
            // started playing
            this.interval = setInterval(
                this.onInterval,
                this.state.stepDuration
            );
        }
    }

    handlePlayPause() {
        this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying,
        }));
        console.log(this.interval);
    }

    handleControlChange(event) {
        switch (event) {
            case "next":
                console.log(this.nextStep());
                // console.log(event);
                break;
            case "prev":
                this.prevStep();
                break;
            case "reset":
                this.setState({ stepIndex: 0, isPlaying: false });
                break;
            default:
                console.log("this should not have happened", event);
                break;
        }
    }

    onInterval(i) {
        console.log("Interval done!", i);
        this.nextStep();

        if (this.state.stepIndex === this.state.stepArray.length - 1) {
            this.setState({
                isPlaying: false,
            });
            clearInterval(this.interval);
        }
    }

    nextStep() {
        this.setState((prevState) => ({
            stepIndex: Math.min(
                prevState.stepIndex + 1,
                prevState.stepArray.length - 1
            ),
        }));
    }

    prevStep() {
        this.setState((prevState) => ({
            stepIndex: Math.max(prevState.stepIndex - 1, 0),
        }));
    }

    handleSliderChange(event, newValue) {
        // console.log(this.state);
        this.setState((prev) => ({
            sliderValue: newValue,
            stepDuration: BASE_DURATION / newValue,
        }));
        console.log(this.state.stepDuration, newValue);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.needleValue.length > this.state.haystackValue.length) {
            // needle too long
            this.setState((prevState) => ({
                popover: true,
            }));
            return; // don't continue with submission
        } else {
            this.setState({ popover: false });
        }

        this.setState((prevState) => ({
            result: [this.state.haystackValue.search(this.state.needleValue)],
            stepIndex: 0,
        }));

        try {
            const s = this.functionMap[this.state.radioValue](
                // function call
                this.state.needleValue.toUpperCase(),
                this.state.haystackValue.toUpperCase()
            );
            this.setState((prevState) => ({
                stepArray: s,
                notImplemented: false,
            }));
        } catch {
            this.setState({
                notImplemented: true,
            });
        }
        // setInterval(this.nextStep, this.state.stepDuration);
        event.preventDefault();
    }

    handleChange(event) {
        // console.log(event.target.name + event.target.value);
        console.log(`name: ${event.target.name} value: ${event.target.value}`);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div className="App" style={{ maxWidth: "1080px", margin: "auto" }}>
                <InputForm
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    needleValue={this.state.needleValue}
                    haystackValue={this.state.haystackValue}
                    radioValue={this.state.radioValue}
                    dropdownFields={this.state.dropdownFields}
                    theme={this.theme}
                    alert={this.state.popover}
                />
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Controls
                            theme={this.theme}
                            onPlayPause={this.handlePlayPause}
                            isPlaying={this.state.isPlaying}
                            onControlChange={this.handleControlChange}
                            onSliderChange={this.handleSliderChange}
                            sliderValue={this.state.sliderValue}
                            progress={scale(
                                this.state.stepIndex,
                                0,
                                this.state.stepArray.length - 1,
                                0,
                                100
                            )}
                        ></Controls>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <AnimationCanvas
                            stepArray={this.state.stepArray}
                            stepIndex={this.state.stepIndex}
                            needle={this.state.needleValue.toUpperCase()}
                            haystack={this.state.haystackValue.toUpperCase()}
                            result={this.state.result}
                            theme={this.theme}
                            slider={this.state.sliderValue}
                        ></AnimationCanvas>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <PseudocodeCanvas
                            theme={this.theme}
                            code={
                                this.state.stepArray[this.state.stepIndex].code
                            }
                            lines={
                                this.state.stepArray[this.state.stepIndex]
                                    .codeLines
                            }
                        ></PseudocodeCanvas>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <StepDescriptionCanvas
                            stepArray={this.state.stepArray}
                            stepIndex={this.state.stepIndex}
                            theme={this.theme}
                        ></StepDescriptionCanvas>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;

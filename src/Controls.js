import {
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Slider,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import {
    NavigateBefore,
    NavigateNext,
    Pause,
    PlayArrow,
    Replay,
} from "@material-ui/icons";

export default class Controls extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handlePlayPause = this.props.onPlayPause.bind(this);
        this.handleSliderChange = this.props.onSliderChange.bind(this);
    }

    render() {
        return (
            <Paper
                style={{
                    padding: this.props.theme.spacing(2),
                    margin: this.props.theme.spacing(1),
                }}
                height="100%"
                elevation={3}
                variant="outlined"
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item zeroMinWidth>
                        <IconButton>
                            <NavigateBefore aria-label="previous step"></NavigateBefore>
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={this.handlePlayPause}
                        >
                            {this.props.isPlaying ? (
                                <Pause color="primary"></Pause>
                            ) : (
                                <PlayArrow color="primary"></PlayArrow>
                            )}
                        </IconButton>
                        <IconButton>
                            <NavigateNext aria-label="next step"></NavigateNext>
                        </IconButton>
                        <IconButton>
                            <Replay aria-label="next step"></Replay>
                        </IconButton>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        style={{
                            paddingLeft: this.props.theme.spacing(2),
                        }}
                    >
                        <Typography id="continuous-slider">
                            Speed {this.props.sliderValue}x
                        </Typography>
                        <Slider
                            step={0.05}
                            value={this.props.sliderValue}
                            min={0.1}
                            max={5}
                            onChange={this.handleSliderChange} // change to "onChange" to trade performance for responsiveness
                        ></Slider>
                    </Grid>
                </Grid>

                {/* <LinearProgress variant="determinate" value={10} /> */}
            </Paper>
        );
    }
}

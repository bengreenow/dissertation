import {
    Button,
    FormControl,
    Grid,
    Paper,
    TextField,
    InputLabel,
    Select,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { Component } from "react";

export default class InputForm extends Component {
    constructor(props) {
        super(props);
        // this.classes = useStyles();

        this.handleChange = this.props.onChange.bind(this);
        this.handleSubmit = this.props.onSubmit.bind(this);
        // console.log(this.props.dropdownFields);
        this.dropdownElements = this.props.dropdownFields.map((name, key) => (
            <option key={key} value={name}>
                {name}
            </option>
        ));
    }

    render() {
        // console.log(this.dropdownElements);

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
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3}>
                        {this.props.alert ? (
                            <Grid item xs={12}>
                                <Alert severity="error">
                                    The needle can't be longer that the
                                    haystack.
                                </Alert>
                            </Grid>
                        ) : (
                            ""
                        )}

                        <Grid item xs={12} sm={5}>
                            <FormControl fullWidth>
                                <TextField
                                    autoComplete="off"
                                    required
                                    name="needleValue"
                                    variant="outlined"
                                    label="Needle"
                                    value={this.props.needleValue.toUpperCase()}
                                    onChange={this.handleChange}
                                ></TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <FormControl fullWidth>
                                <TextField
                                    autoComplete="off"
                                    required
                                    name="haystackValue"
                                    variant="outlined"
                                    label="Haystack"
                                    value={this.props.haystackValue.toUpperCase()}
                                    onChange={this.handleChange}
                                ></TextField>
                            </FormControl>
                        </Grid>

                        <Grid item sm={9} xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Algorithm</InputLabel>
                                <Select
                                    native
                                    value={this.props.radioValue}
                                    name="radioValue"
                                    label="Algorithm"
                                    onChange={this.handleChange}
                                >
                                    {this.dropdownElements}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    color="primary"
                                    style={{ minHeight: "56px" }}
                                >
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

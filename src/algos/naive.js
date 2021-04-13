/*
Step Array Interface:
[
    {
        haystack:[
            {
                char:"A"
                highlight:false
            }
        ]
        needle:[
            {
                char:"A"
                highlight:false
        }
        ]
        needleOffset:"the index of the first character of the needle compared to the haystack"
        AABAA
          AB
             = offset of 2
},
    {}
]

the algorithm:

def search(pat, txt): 
    M = len(pat) 
    N = len(txt) 
  
    # A loop to slide pat[] one by one */
// for i in range(N - M + 1):
//     j = 0

//     # For current index i, check
//     # for pattern match */
//     while(j < M):
//         if (txt[i + j] != pat[j]):
//             break
//         j += 1

//     if (j == M):
//         print("Pattern found at index ", i)

// for each step for each char

function createStep(
    needle,
    haystack,
    needleOffset,
    needleHighlightArray,
    haystackHighlightArray,
    description = "No Description",
    codeLines = [0],
    extra = {},
    values = {}
) {
    console.log(codeLines, "codelines");
    let initialStep = {
        haystack: haystack.split("").map((char) => {
            return { char: char, highlight: false };
        }),
        needle: needle.split("").map((char, index) => {
            return { char: char, highlight: false };
        }),
        needleOffset: needleOffset,
        found: false,
        codeLines: codeLines,
        description: description,

        code: {
            code: `for i in range(N - M + 1):
    j = 0
    while(j < M):
        if (txt[i + j] != pat[j]):
            break
        j += 1
    if (j == M): 
        return i`,
            legend: [
                {
                    name: "j",
                    description: "Needle comparison pointer",
                    value: values.j,
                },
                {
                    name: "i",
                    description: "Needle offset pointer",
                    value: needleOffset,
                },
                {
                    name: "M",
                    description: "Length of the haystack",
                    value: haystack.length,
                },
                {
                    name: "N",
                    description: "length of the needle",
                    value: needle.length,
                },
                { name: "pat", description: "Needle", value: needle },
                { name: "txt", description: "Haystack", value: haystack },
            ],
        },
        ...extra,
    };
    editCharacterStates(
        initialStep.haystack,
        haystackHighlightArray,
        "highlight"
    );
    editCharacterStates(initialStep.needle, needleHighlightArray, "highlight");

    // // console.log(initialStep.codeLines);
    // if (haystackHighlightArray) {
    //     initialStep.haystack = initialStep.haystack.map((char, i) => {
    //         if (haystackHighlightArray.includes(i)) {
    //             return { ...char, highlight: true };
    //         } else {
    //             return char;
    //         }
    //     });
    // }
    // if (needleHighlightArray) {
    //     // console.log("if needlehighligharray");
    //     initialStep.needle = initialStep.needle.map((char, i) => {
    //         // console.log(needleHighlightArray);
    //         if (needleHighlightArray.includes(i)) {
    //             // console.log({ ...char, highlight: true });
    //             return { ...char, highlight: true };
    //         } else {
    //             return char;
    //         }
    //     });
    // }
    return initialStep;
}
function editCharacterStates(
    charArray, // the array of characters to change. [{char}, {char}]
    editArray, // the array of character indexes to edit [1,4]
    field, // the feild of the character object to change "highlight"
    value = true // value to change the feild to "true"
) {
    console.log(charArray);
    editArray.forEach((i) => {
        if (charArray[i]) {
            charArray[i][field] = value;
        } // char[1][highlight]
    });
    return charArray;
}

export function naiveSearch(needle, haystack) {
    let stepOutput = [];
    let M = needle.length;
    let N = haystack.length;

    for (let i = 0; i < N - M + 1; i++) {
        let j = 0;
        // runs through word

        let haystackCorrectArray = [];
        let highlightArray = [];
        stepOutput.push(
            createStep(
                needle,
                haystack,
                i,
                [j], // needle
                [i + j], // haystack
                "Moving the needle comparision pointer along to the next position in the haystack.",
                [],
                {},
                { j: j }
            )
        ); // comparison

        while (j < M) {
            if (haystack[i + j] !== needle[j]) {
                // runs when character NOT found. i.e "change needleoffset now if character found"
                // add step?
                let step = createStep(
                    needle,
                    haystack,
                    i,
                    [], // should still be highlight
                    [],
                    `The character ${haystack[i + j]} at position ${
                        i + j
                    } in the haystack doesn't match the character at position ${j} in the needle`,
                    [],
                    {},
                    { j: j }
                );
                step.haystack = editCharacterStates(
                    step.haystack,
                    [i + j],
                    "incorrect"
                );
                step.haystack = editCharacterStates(
                    step.haystack,
                    [...Array(i + j + 1).keys()].slice(i, i + j + 1),
                    "correct"
                );
                step.needle = editCharacterStates(
                    step.needle,
                    [j],
                    "incorrect"
                );
                console.log(step, "step incorrect");
                stepOutput.push(step);
                break;
            }
            let stepCorrect = createStep(
                needle,
                haystack,
                i,
                [], // on correct, should still be highlighted
                [],
                `The character ${haystack[i + j]} at position ${
                    i + j
                } in the haystack matches the character ${
                    needle[j]
                } at position ${j} in the needle`,
                [],
                {},
                { j: j }
            );
            stepCorrect.haystack = editCharacterStates(
                stepCorrect.haystack,
                [...Array(i + j + 1).keys()].slice(i, i + j + 1),
                "correct"
            );
            stepCorrect.needle = editCharacterStates(
                stepCorrect.needle,
                [j],
                "correct"
            );
            console.log(stepCorrect, "step incorrect");
            stepOutput.push(stepCorrect);
            j++; // char is correct, go to next in needle
            for (let n = 0; n < j; n++) {
                highlightArray = [j];
                haystackCorrectArray.push(j + i - 1);
                // console.log(highlightArray, "inside loop");
            }

            if (j === M) {
                // console.log("found at index" + i);
                stepOutput.push(
                    createStep(
                        needle,
                        haystack,
                        i,
                        highlightArray,
                        [],
                        `The amount of comparisons made in the needle (${j}) matches the length of the length of the needle (${M}), meaning all characters have been checked and match, thus, the index (${i}) is found`,
                        [6, 7],
                        {
                            found: true,
                        },
                        { j: j }
                    )
                );
                break;
            }
            let step = createStep(
                needle,
                haystack,
                i,
                highlightArray,
                [i + j],
                `Moving the needle's pointer along to compare the next characters, ${
                    haystack[i + j]
                } and ${needle[j]}`,
                [],
                {},
                { j: j }
            );
            step.needle = editCharacterStates(step.needle, [], "correct"); // TODO add correct highlighting
            // console.log(step, "step");
            step.haystack = editCharacterStates(
                step.haystack,
                haystackCorrectArray,
                "correct"
            );
            stepOutput.push(step);
        }
    }

    console.log(stepOutput, "STEPS");

    return stepOutput;
}

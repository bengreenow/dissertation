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
    extra = {}
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
        print("Pattern found at index ", i)`,
            legend: [
                { name: "M", description: "Length of the haystack" },
                { name: "N", description: "length of the needle" },
                { name: "pat", description: "needle" },
                { name: "txt", description: "haystack" },
            ],
        },
        ...extra,
    };
    editCharacterStates(
        initialStep.haystack,
        haystackHighlightArray,
        "highlight"
    );

    // console.log(initialStep.codeLines);
    if (haystackHighlightArray) {
        initialStep.haystack = initialStep.haystack.map((char, i) => {
            if (haystackHighlightArray.includes(i)) {
                return { ...char, highlight: true };
            } else {
                return char;
            }
        });
    }
    if (needleHighlightArray) {
        // console.log("if needlehighligharray");
        initialStep.needle = initialStep.needle.map((char, i) => {
            // console.log(needleHighlightArray);
            if (needleHighlightArray.includes(i)) {
                // console.log({ ...char, highlight: true });
                return { ...char, highlight: true };
            } else {
                return char;
            }
        });
    }
    return initialStep;
}
function editCharacterStates(
    charArray, // the array of characters to change. [{char}, {char}]
    editArray, // the array of character indexes to edit [1,4]
    field, // the feild of the character object to change "highlight"
    value = true // value to change the feild to "true"
) {
    // console.log("if needlehighligharray");
    // charArray.map((char, i) => {
    //     // console.log(needleHighlightArray);
    //     if (highlightArray.includes(i)) {
    //         // console.log({ ...char, highlight: true });
    //         return { ...char, highlight: true };
    //     } else {
    //         return char;
    //     }
    // });

    editArray.forEach((i) => {
        charArray[i][field] = value; // char[1][highlight]
        // console.log(charArray[i][field], field, "chararray");
    });
    // console.log(charArray);
    return charArray;
}

export function naiveSearch(needle, haystack) {
    let stepOutput = [];
    let M = needle.length;
    let N = haystack.length;

    for (let i = 0; i < N - M + 1; i++) {
        let j = 0;
        // runs through word

        let highlightArray = [];
        stepOutput.push(createStep(needle, haystack, i, [0], [i], "", [], {})); // comparison
        let step = createStep(needle, haystack, i, [0], [], "", [], {});
        step.haystack = editCharacterStates(
            step.haystack,
            [1, 2, 3],
            "incorrect"
        );
        console.log(step, "step incorrect");
        stepOutput.push(step);
        while (j < M) {
            if (haystack[i + j] !== needle[j]) {
                // runs when character NOT found. i.e "change needleoffset now if character found"
                // add step?
                break;
            }
            j++; // char is correct, go to next in needle
            highlightArray = [];
            for (let n = 1; n < j; n++) {
                highlightArray.push(n);
                // console.log(highlightArray, "inside loop");
            }
            let step = createStep(needle, haystack, i, highlightArray, []);
            step.needle = editCharacterStates(step.needle, [], "correct"); // TODO add correct highlighting
            // console.log(step, "step");
            stepOutput.push(step);
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
                    `The amount of comparisons made in the needle matches the length of the length of the needle, meaning all characters have been checked and match, thus, the index is found`,
                    [6, 7],
                    {
                        found: true,
                    }
                )
            );
            break;
        }
        // console.log(i);
    }

    console.log(stepOutput, "STEPS");

    return stepOutput;
}

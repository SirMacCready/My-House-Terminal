const idNames = [];
// Use jQuery to select all elements with an id attribute
$('[id]').each(function() {
    const idAttr = $(this).attr('id');

    // Split the id attribute by spaces to get individual id names
    const ids = idAttr.split(' ');

    // Add the individual id names to the idNames array
    idNames.push(...ids);
});

let initspeed = 50;

function textloading(id, speed) {
    try {
    return new Promise((resolve) => {
        $(`#${id}`).typewrite({
            'delay': speed, // Time in ms between each letter
            'extra_char': '|', // "cursor" character to append after each display
            'trim': true, // Trim the string to type (Default: false, does not trim)
            'callback': function () {
                resolve(); // Resolve the promise when text loading is complete
            }
        });
    });
} 
catch {
    console.log("error :" + error );
}  }

function loadWebsite() {
    
    try{
    let promiseChain = Promise.resolve();
    idNames.forEach(id => {
        textloading(id, initspeed);
    });
}
catch {
    console.log("error :" + error)
}}


loadWebsite();

export default loadWebsite;

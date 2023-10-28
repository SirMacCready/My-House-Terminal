const idNames = [];

// Use jQuery to select all elements with an id attribute
$('[id]').each(function () {
    idNames.push(...$(this).attr('id').split(' '));
});

const initspeed = 50;

function textloading(id, speed) {
    return new Promise((resolve, reject) => {
        try {
            $(`#${id}`).typewrite({
                'delay': speed,
                'extra_char': '|',
                'trim': true,
                'callback': resolve
            });
        } catch (error) {
            console.log("Error: " + error);
            reject(error);
        }
    });
}

async function loadWebsite() {
    try {
        await Promise.all(idNames.map(id => textloading(id, initspeed)));
    } catch (error) {
        console.log("Error: " + error);
    }
}

loadWebsite();

export default loadWebsite;

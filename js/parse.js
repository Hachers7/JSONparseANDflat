let json_flatted = [];
let json = [];

let doTasks = function() {
    $.getJSON('./json/data.json', function (file) {
        $.each(file, function (key, value) {
            json.push(value);
        });

        doFlat(json); //moves json object elements to level 1
        console.log(json_flatted); //flatted json object
        console.log(removeDuplicates(json)); //removes duplicates from flatted json object
        console.log(Object.filter(json)); //filtre not flatted json object by isActive
        console.log(Object.filter(json_flatted)); //filtre flatted json object by isActive
    });
};

function Flat(item)
{
    let json_item = {
        "guid": item["guid"],
        "isActive": item["isActive"],
        "children": []
    };

    json_flatted.push(json_item);

    let children = item['children'];

    $.each(children, function (child) {
        Flat(children[child]);
    });
}

function doFlat(obj)
{
    $.each(obj, function (key) {
        Flat(obj[key]);
    });
}

Object.filter = function(obj) {
    let result = {};

    doFlat(obj);

    for (let key in json_flatted) {
        if(json_flatted[key]['isActive'] )
        {
            result[key] = json_flatted[key];
        }
    }

    return result;
};

function removeDuplicates(obj) {
    let usedObjects = {};

    doFlat(obj);

    for (let i = json_flatted.length - 1;  i >= 0; i--) {
        let so = JSON.stringify(json_flatted[i]);

        if (usedObjects[so]) {
            json_flatted.splice(i, 1);

        } else {
            usedObjects[so] = true;
        }
    }

    return json_flatted;

}

module.exports = doTasks;
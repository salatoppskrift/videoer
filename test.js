const fs = require('node:fs');
// const { stringify } = require('node:querystring');

//const folderNmeStringOlde = './261020_20okt_fredag_map_og_reduce';

const pipe = (...functions) => arr => functions.reduce((accum, fn) => fn(accum), arr);

const map = fn => arr => arr.map(fn);
const flat = flating => arr => arr.flat(flating);

const mapOgFlat = fn => flating => arr => pipe(map(fn), flat(flating))(arr);

const pathifyFolderItems = arr => arr.map(entry => typeof entry === "string" ? entry : entry.entries.map(ent => entry.mappeNavn + "\\" + ent)).flat();

let i = 0;

const stringItems = getStringItems('.');

console.log(stringItems);


function getStringItems(folder) { // (string | { mappeNavn: string, entries: string[] }) []
    try {
        if (!fs.existsSync(folder)) {
            console.log("Folder " + `- "${folder}" -` + " doesnt exist!")
        }
        else {
            const filteredItems = fs.readdirSync(folder)
                .filter(stringEntry => {
                    if (Number(stringEntry.substring(0, 6)) >= 260101) return stringEntry;
                });

            const lala = map(stringEntry => {
                console.log({
                    somTall: Number(stringEntry.substring(0, 6)),
                    somString: stringEntry.substring(0, 6),
                    ob: {
                        i: stringEntry.includes(".mp4") ? i : ++i
                    }
                });
                if (stringEntry.includes('.mp4')) return stringEntry;
                const folderItem = { mappeNavn: stringEntry, entries: getStringItems(stringEntry) };
                return {
                    ...folderItem,
                    entries: folderItem.entries.filter(entry => {
                        const filetype = entry.substring(0, entry.lastIndexOf("."));
                        if (entry.lastIndexOf(".") !== -1 | filetype === ".mp4") return entry;
                    })
                };
                // return { mappeNavn: stringEntry, entries: fs.readdirSync(stringEntry) };
            })(filteredItems);

            //stringEntry.includes('.mp4') ? stringEntry : {mappeNavn: stringEntry, entries: fs.readdirSync(stringEntry)});
            return lala;
        }
    } catch (err) {
        console.error(err);
    }
}


function getStringItemsKort(folder) {
    if (!fs.existsSync(folder)) return;
    else {
        return map(stringEntry => {
            return (stringEntry.includes('.mp4')) ? stringEntry : {
                mappeNavn: stringEntry,
                entries: Array
                    .from(fs.readdirSync(stringEntry))
                    .map(entry => stringEntry + "\\" + entry)
            };
        })(fs.readdirSync(folder)
            .filter(stringEntry => {
                if (Number(stringEntry.substring(0, 6)) >= 260101) return stringEntry;
            }));
    }
}

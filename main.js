const vids = [
    `261016_fredag_16okt\\del 1 - repetisjon m funksjonell programmering (under 33 min).mp4`,
    `261026-30_uke8\\261027_27_okt_TIRSDAG__ OPPFØLGER HURRA (2 min).mp4`,
    `261002_2_okt_FREDAG_økt1.mp4`,
    `https://peertube.tv/w/cRFUMb9uo439nw5hu1kMZ4`,
    `https://peertube.tv/w/go5Hdx9KX1m7gzAh7wLCFD`
];
const vidPaths = vids
    .map(vid => vid.includes("https://") ? vid : vid.replace(/\\/g, "/")
        .split("/")
        .map(encodeURIComponent)
        .join("/"));

let slash = "\\".charCodeAt(0);
document.querySelector("#app").innerHTML
    = `<ul class="container">` + vids
        .map(vid => `<li>${vid}</li>`).join("")
    + `</ul>` +
    `<div id="videoID"></div>`;

document.querySelector(".container").querySelectorAll("li").forEach((liItem, i) => {
    liItem.addEventListener("click", () => {
        document.querySelector("#videoID").innerHTML = ``;

        if (vidPaths[i].includes(".mp4")) {
            const videoEl = document.createElement("video");

            videoEl.src = new URL(vidPaths[i], document.baseURI).href;
            videoEl.controls = true;
            videoEl.hidden = false;
            videoEl.style.width = "60%";
            videoEl.load();
            document.querySelector("#videoID").appendChild(videoEl);
            console.log(vids[i], "\n", videoEl.src);
        }

        document.querySelector("#videoID").innerHTML = `<a href=${vidPaths[i]}>${vidPaths[i]}</a>`;
    })
})
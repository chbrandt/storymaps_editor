const layers = {
  url: ""
}

const media = {
  url: "",
  type: ""
}

const chapter = {
    title: "",
    text: "",
    view: {
        lng: {
            min: -180,
            max: 180
        },
        lat: {
            min: -90,
            max: 90
        }
    },
    media: [],
    layers: []
};

const story = {
    title: "",
    intro: "",
    body: "",
    basemap: "",
    chapters: []
};

export {story, chapter};

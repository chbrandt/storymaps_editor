const layer = {
  type: undefined,
  url: undefined
}

const media = {
  type: undefined,
  path: undefined
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

export {story, chapter, media, layer};

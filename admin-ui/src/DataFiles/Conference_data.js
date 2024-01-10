export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 2,
        slidesToSlide: 1,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const conferenceData = [

    {
        id: 1,
        RoomNo: 1,
        imageurl: "./images/hall1.jpeg",
        presenterName: "John Doe",
        SessionName: "session_del",
        CurrentCapacity: 30,
        MaxCapacity: 50,
    },
    // {
    //     id: 2,
    //     RoomNo: 2,
    //     imageurl: "./images/hall2.jpeg",
    //     presenterName: "Raj Patel",
    //     SessionName: "Deep Dive into Rust Programming",
    //     CurrentCapacity: 12,
    //     MaxCapacity: 15,
    // },
    // {
    //     id: 3,
    //     RoomNo: 3,
    //     imageurl: "./images/hall3.jpeg",
    //     presenterName: "Kevin Lee",
    //     SessionName: "Agile Methodologies Explained",
    //     CurrentCapacity: 16,
    //     MaxCapacity: 20,
    // },
    // {
    //     id: 4,
    //     RoomNo: 4,
    //     imageurl: "./images/hall4.jpeg",
    //     presenterName: "Kevin Lee",
    //     SessionName: "Agile Methodologies Explained",
    //     CurrentCapacity: 25,
    //     MaxCapacity: 17,
    // },
    // {
    //     id: 5,
    //     RoomNo: 5,
    //     imageurl: "./images/hall5.jpeg",
    //     presenterName: "Raj Patel",
    //     SessionName: "Deep Dive into Rust Programming",
    //     CurrentCapacity: 30,
    //     MaxCapacity: 21,
    // },
];


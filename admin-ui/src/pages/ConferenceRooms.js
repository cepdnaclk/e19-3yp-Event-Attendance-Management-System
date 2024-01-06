import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SessionCards from "../components/SessionCards";
import { productData, responsive } from "./data";


export default function ConferenceRooms() {

    const product = productData.map((item) => (
        <SessionCards
            name={item.name}
            url={item.imageurl}
            price={item.price}
            description={item.description}
        />
    ));

    return (

        <div className="Appss">

            <Carousel showDots={true} responsive={responsive}>
                {product}
            </Carousel>
        </div>
    );
};



import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SessionCards from "../components/SessionCards";
import { productData, responsive } from "./data";


export default function ConferenceRooms() {

    const product = productData.map((item) => (
        <SessionCards
            Sname={item.Sname}
            url={item.imageurl}
            Pname={item.presenterName}
            duration={item.time}
        />
    ));

    return (
        <div>
            <div className=" cr1"> Conference Room 1</div>
            <div className="Appss">


                <Carousel showDots={true} responsive={responsive}>
                    {product}
                </Carousel>
            </div>
        </div>
    );
};



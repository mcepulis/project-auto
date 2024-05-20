import { useContext } from "react";
import { Cart } from "./Cart";
import { GlobalContext } from "../../context/GlobalContext";

export function PageAbout() {
    const { loginStatus } = useContext(GlobalContext);

    return (
        <section className="container">
            <div className="row">
                <h1 className="col-12">About us</h1>
                <div className="col-12">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, omnis modi unde nesciunt ipsam iste corrupti cumque. Id delectus vero tempore, inventore doloribus dolorem molestias numquam unde. Molestiae, ducimus saepe?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt deleniti dignissimos placeat totam. Facilis eum deleniti, enim veritatis labore perferendis delectus nam laudantium atque iste vero aliquam obcaecati illum provident.</p>
                </div>
            </div>
            {loginStatus && (
                <div className="row">
                    <div className="col-12">
                        <Cart />
                    </div>
                </div>
            )}
        </section>
    )
}
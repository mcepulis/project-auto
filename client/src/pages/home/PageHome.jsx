import { NewestCarsList } from "../../components/auto-list/NewestCarsList";
import { Hero } from "../../components/hero/Hero";

export function PageHome() {
    return (
        <main>
            <Hero />
            <NewestCarsList />
        </main>
    );
}
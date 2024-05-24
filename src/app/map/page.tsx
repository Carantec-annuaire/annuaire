import { getActivites, getPartenaires, getStructures } from "~/server/queries";
import MapComponent from "./_components/map";


const MapPage = async () => {

    const partenaires = (await getPartenaires()).map((partenaire) => ({
        ...partenaire
    }));
    const structures = (await getStructures()).map((structure) => ({
        ...structure
    }));
    const activites = (await getActivites()).map((activity) => ({
        ...activity
    }));


    return (
        <div className="p-4">
            <p className="text-1xl font-bold mb-4">Carte des structures, des partenaires et des activités</p>
            <MapComponent partenaires={partenaires} structures={structures} activities={activites} />
        </div>
    );
};

export default MapPage;

import MapComponent from "./_components/map";


const MapPage = () => {
    const addresses = [
        "433 rue du musée de la préhistoire - Pors carn, 29760 Penmarc'h, France",
        'Allée du chemin de fer, 29290 Saint-Renan, France',
        'Lac de Ty Colo 29290 Saint Renan, France',
        'Rue Saint-Ernel, 29800 Landerneau, France',
        null,
        'Quihanet, 22640 LANDEHEN, France',
        '3 rue du Butou, 29670 Locquénolé',
        '10 Rue Nominoë, 29000 Quimper, France',
        'Lieu dit croas hir, 29400 Plouneventer  , France',
        '19 Rue Saint-Jacques, 29200 Brest, France'
    ];

    return (
        <div className="p-4">
            <p className="text-1xl font-bold mb-4">Carte des structures, des partenaires et des activités</p>
            <MapComponent addresses={addresses} />
        </div>
    );
};

export default MapPage;

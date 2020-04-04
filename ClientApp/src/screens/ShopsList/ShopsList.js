import React from 'react';

import { Shop } from "../../components/Shop";

const shopExample = {
    name: 'Żabka',
    location: 'Rynek 16',
    logoImg: '/shopLogos/zabka.jpeg',
    description: 'Godziny otwarcia',
};

export const ShopsListScreen = () => (
    <div>
        <Shop { ...shopExample }/>
    </div>
);

export default ShopsListScreen;

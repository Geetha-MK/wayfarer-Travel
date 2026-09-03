// Curated destination dataset. Coordinates power weather + location-distance features.
// Images are fetched at runtime from Pexels/Unsplash — none are hardcoded here.

export const destinations = [
  {
    slug: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    lat: 35.0116,
    lon: 135.7681,
    tagline: 'Temples, machiya streets, and a thousand shades of maple.',
    description:
      "Japan's former imperial capital moves at the pace of a tea ceremony. Wooden machiya townhouses line narrow lanes between more than a thousand temples and shrines, and the Kamo River gives the whole city a place to slow down. Kyoto rewards walking: bamboo groves, quiet gardens, and district after district that each feel like their own small town.",
    bestTime: 'Late March to early May, and November',
    idealStay: '3–4 days',
    tags: ['temples', 'culture', 'food', 'gardens'],
    famousPlaces: [
      { name: 'Fushimi Inari Taisha', type: 'Shrine', note: 'Thousands of vermilion torii gates climbing the mountainside.' },
      { name: 'Arashiyama Bamboo Grove', type: 'Nature', note: 'A towering green corridor best seen at first light.' },
      { name: 'Kinkaku-ji', type: 'Temple', note: 'The gold-leafed pavilion mirrored in its still pond.' },
      { name: 'Gion District', type: 'Historic quarter', note: 'Lantern-lit streets where geiko and maiko still train.' },
      { name: 'Nishiki Market', type: 'Market', note: 'A narrow arcade of Kyoto\'s best small food stalls.' },
    ],
  },
  {
    slug: 'reykjavik-iceland',
    name: 'Reykjavik',
    country: 'Iceland',
    region: 'Europe',
    lat: 64.1466,
    lon: -21.9426,
    tagline: 'A small colourful capital on the edge of raw geology.',
    description:
      'Reykjavik is compact and walkable, but it is really the gateway to Iceland\'s volcanic interior — glaciers, geysers, and the Northern Lights all within a few hours\' drive. The city itself has a strong design and music scene packed into a harbor town of corrugated-metal houses.',
    bestTime: 'June to August for daylight, September to March for aurora',
    idealStay: '2 days in-city, plus a ring-road trip',
    tags: ['nature', 'aurora', 'geothermal', 'road trip'],
    famousPlaces: [
      { name: 'Hallgrímskirkja', type: 'Landmark', note: 'A concrete church shaped like basalt columns, with a city view from the tower.' },
      { name: 'Blue Lagoon', type: 'Geothermal spa', note: 'Milky-blue mineral water against black lava fields.' },
      { name: 'Golden Circle Route', type: 'Day trip', note: 'Geysir, Þingvellir rift valley, and Gullfoss waterfall in one loop.' },
      { name: 'Harpa Concert Hall', type: 'Architecture', note: 'A glass facade that catches the harbor light and the aurora.' },
      { name: 'Sky Lagoon', type: 'Geothermal spa', note: 'An infinity-edge pool looking straight out to the North Atlantic.' },
    ],
  },
  {
    slug: 'marrakech-morocco',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    lat: 31.6295,
    lon: -7.9811,
    tagline: 'A walled red city where the souks never quite go quiet.',
    description:
      'Inside Marrakech\'s medina walls, alleys twist between dye pits, spice stalls, and riads built around hidden courtyards. Djemaa el-Fna square shifts character completely between afternoon and midnight. Beyond the walls, the Atlas Mountains sit close enough for a day trip.',
    bestTime: 'March to May, and September to November',
    idealStay: '3 days',
    tags: ['markets', 'architecture', 'desert', 'food'],
    famousPlaces: [
      { name: 'Jemaa el-Fnaa', type: 'Square', note: 'Storytellers and food stalls by night, snake charmers by day.' },
      { name: 'Bahia Palace', type: 'Palace', note: 'Zellige tilework and carved cedar ceilings across a maze of courtyards.' },
      { name: 'Jardin Majorelle', type: 'Garden', note: 'Cobalt-blue walls and cacti collected by Yves Saint Laurent.' },
      { name: 'Medina Souks', type: 'Market', note: 'Leather, lanterns, and rugs sold the way they have been for centuries.' },
      { name: 'Koutoubia Mosque', type: 'Landmark', note: 'The city\'s tallest minaret and its clearest orientation point.' },
    ],
  },
  {
    slug: 'queenstown-new-zealand',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'Oceania',
    lat: -45.0312,
    lon: 168.6626,
    tagline: 'Mountains that fall straight into a lake, built for adventure.',
    description:
      'Queenstown sits on Lake Wakatipu under the jagged Remarkables range, and treats adrenaline as a local pastime — it claims the invention of commercial bungy jumping. Between adventure sports, the surrounding Otago region has some of the country\'s best short hikes and vineyards.',
    bestTime: 'December to February (summer) or June to August (ski season)',
    idealStay: '3–5 days',
    tags: ['adventure', 'mountains', 'lakes', 'hiking'],
    famousPlaces: [
      { name: 'Skyline Gondola', type: 'Viewpoint', note: 'A cable car straight up to a panoramic view of the lake and Remarkables.' },
      { name: 'Kawarau Gorge Bridge', type: 'Adventure', note: 'The original commercial bungy jump site, 43m above the river.' },
      { name: 'Milford Sound', type: 'Fiord', note: 'A day trip through Fiordland to cliffs and waterfalls dropping into the sea.' },
      { name: 'Lake Wakatipu Waterfront', type: 'Scenic walk', note: 'A flat lakeside path with the best low-effort view in town.' },
      { name: 'Arrowtown', type: 'Historic town', note: 'A former gold-rush settlement 20 minutes from the city centre.' },
    ],
  },
  {
    slug: 'lisbon-portugal',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    lat: 38.7223,
    lon: -9.1393,
    tagline: 'Seven hills, yellow trams, and the Atlantic at the end of every street.',
    description:
      'Lisbon is built on hills that end abruptly at the Tagus river, so every neighborhood has a miradouro — a viewpoint — worth the climb. Tiled facades, fado music drifting from Alfama\'s bars, and pastel de nata straight from the oven make it an easy city to fall for slowly.',
    bestTime: 'March to May, and September to October',
    idealStay: '3 days',
    tags: ['coastal', 'history', 'food', 'nightlife'],
    famousPlaces: [
      { name: 'Belém Tower', type: 'Landmark', note: 'A 16th-century fortress marking where explorers once set sail.' },
      { name: 'Alfama District', type: 'Historic quarter', note: 'The oldest part of the city, where fado was born.' },
      { name: 'Tram 28', type: 'Experience', note: 'A vintage yellow tram climbing through the steepest neighborhoods.' },
      { name: 'Jerónimos Monastery', type: 'Architecture', note: 'Manueline stonework funded by the Age of Discovery spice trade.' },
      { name: 'Miradouro da Senhora do Monte', type: 'Viewpoint', note: 'The widest rooftop view in the city, best at sunset.' },
    ],
  },
  {
    slug: 'cape-town-south-africa',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    lat: -33.9249,
    lon: 18.4241,
    tagline: 'A flat-topped mountain, two oceans, and a city between them.',
    description:
      'Table Mountain rises directly out of the city, giving Cape Town a backdrop few capitals can match. It is a place of contrasts — surf beaches, vineyard valleys, and the Cape Peninsula\'s wild coastline are all under an hour away from downtown.',
    bestTime: 'November to March',
    idealStay: '4–5 days',
    tags: ['mountains', 'coastal', 'wine', 'wildlife'],
    famousPlaces: [
      { name: 'Table Mountain', type: 'Natural landmark', note: 'A cableway to the flat summit, or a half-day hike up Platteklip Gorge.' },
      { name: 'Cape of Good Hope', type: 'Nature reserve', note: 'Where the peninsula narrows to cliffs, baboons, and ostriches.' },
      { name: 'Boulders Beach', type: 'Wildlife', note: 'A colony of African penguins nesting between the boulders.' },
      { name: 'V&A Waterfront', type: 'Harbour district', note: 'Restaurants and markets at the working harbour\'s edge.' },
      { name: 'Stellenbosch Winelands', type: 'Day trip', note: 'Cape Dutch architecture among the country\'s oldest vineyards.' },
    ],
  },
  {
    slug: 'oaxaca-mexico',
    name: 'Oaxaca',
    country: 'Mexico',
    region: 'North America',
    lat: 17.0732,
    lon: -96.7266,
    tagline: 'Mexico\'s food capital, built around a candy-coloured centro.',
    description:
      'Oaxaca City is compact, walkable, and arguably the best place to eat in the country — mole, mezcal, and tlayudas from generations-old kitchens. Its centro is a grid of colonial buildings in ochre and blue, and the surrounding valley holds ancient Zapotec ruins and weaving villages.',
    bestTime: 'October to April',
    idealStay: '3 days',
    tags: ['food', 'culture', 'markets', 'day trips'],
    famousPlaces: [
      { name: 'Santo Domingo de Guzmán', type: 'Church', note: 'A gold-leaf baroque interior behind an unassuming stone facade.' },
      { name: 'Monte Albán', type: 'Ruins', note: 'A Zapotec hilltop city with views across the whole valley.' },
      { name: 'Mercado Benito Juárez', type: 'Market', note: 'Chapulines, chocolate, and every mole variation under one roof.' },
      { name: 'Hierve el Agua', type: 'Natural landmark', note: 'Mineral formations that look like frozen waterfalls over the valley.' },
      { name: 'Zócalo', type: 'Plaza', note: 'The shaded main square, busiest just after sunset.' },
    ],
  },
  {
    slug: 'jaipur-india',
    name: 'Jaipur',
    country: 'India',
    region: 'Asia',
    lat: 26.9124,
    lon: 75.7873,
    tagline: 'The Pink City, walled and painted the colour of a desert sunset.',
    description:
      'Jaipur\'s old city was painted terracotta pink in 1876 to welcome a royal visit and never stopped. Forts on the surrounding ridgelines watch over a city of bazaars, block-printing workshops, and some of Rajasthan\'s finest Mughal-era architecture.',
    bestTime: 'October to March',
    idealStay: '2–3 days',
    tags: ['forts', 'culture', 'markets', 'architecture'],
    famousPlaces: [
      { name: 'Amber Fort', type: 'Fort', note: 'A hilltop fort of mirrored halls, reached by a cobbled ramp at dawn.' },
      { name: 'Hawa Mahal', type: 'Palace', note: 'A honeycomb sandstone facade of 953 small windows.' },
      { name: 'City Palace', type: 'Palace', note: 'Still home to the royal family, with courtyards open to visitors.' },
      { name: 'Jantar Mantar', type: 'Observatory', note: 'Giant 18th-century stone instruments for tracking the sky.' },
      { name: 'Johari Bazaar', type: 'Market', note: 'Jaipur\'s gem and jewellery trade, running for generations.' },
    ],
  },
  {
    slug: 'buenos-aires-argentina',
    name: 'Buenos Aires',
    country: 'Argentina',
    region: 'South America',
    lat: -34.6037,
    lon: -58.3816,
    tagline: 'European boulevards, tango on the corner, steak after midnight.',
    description:
      'Buenos Aires wears its European influences openly in wrought-iron balconies and wide avenues, but the city\'s rhythm is entirely its own — long dinners, milonga dance halls, and a café culture that runs late into the night. Each barrio, from bohemian San Telmo to colourful La Boca, feels distinct.',
    bestTime: 'March to May, and September to November',
    idealStay: '3–4 days',
    tags: ['tango', 'food', 'architecture', 'nightlife'],
    famousPlaces: [
      { name: 'Recoleta Cemetery', type: 'Landmark', note: 'A city of ornate mausoleums, including Eva Perón\'s.' },
      { name: 'La Boca / Caminito', type: 'Neighbourhood', note: 'Corrugated houses painted in shipyard leftover colours.' },
      { name: 'Teatro Colón', type: 'Opera house', note: 'One of the world\'s great acoustic spaces, open for tours.' },
      { name: 'San Telmo Market', type: 'Market', note: 'Antiques, tango dancers, and Sunday street performers.' },
      { name: 'Puerto Madero', type: 'Waterfront', note: 'Restored docklands with a modern skyline over the water.' },
    ],
  },
  {
    slug: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    lat: 36.3932,
    lon: 25.4615,
    tagline: 'Whitewashed cliffs over a sunken volcanic caldera.',
    description:
      'Santorini is what remains of a massive volcanic eruption — a crescent of cliffs looking into the flooded caldera it left behind. Whitewashed villages sit right on the rim, and the sunsets from Oia are the island\'s best-known ritual.',
    bestTime: 'Late April to June, and September to October',
    idealStay: '3 days',
    tags: ['islands', 'coastal', 'romantic', 'volcanic'],
    famousPlaces: [
      { name: 'Oia Village', type: 'Village', note: 'Blue-domed churches on the caldera rim, famous at sunset.' },
      { name: 'Fira', type: 'Town', note: 'The island capital, built into the cliff face in stacked terraces.' },
      { name: 'Red Beach', type: 'Beach', note: 'Volcanic red cliffs meeting black-and-red sand.' },
      { name: 'Akrotiri', type: 'Archaeological site', note: 'A Bronze Age settlement preserved under volcanic ash.' },
      { name: 'Ammoudi Bay', type: 'Harbour', note: 'A small fishing port beneath Oia, reached by stone steps.' },
    ],
  },
  {
    slug: 'banff-canada',
    name: 'Banff',
    country: 'Canada',
    region: 'North America',
    lat: 51.1784,
    lon: -115.5708,
    tagline: 'Turquoise lakes ringed by the Canadian Rockies.',
    description:
      'Banff National Park is glacier-fed lakes, dense pine forest, and peaks that seem to close in from every direction. The town itself is small, but it\'s the base for some of the most photographed landscapes in North America, including Lake Louise and the Icefields Parkway.',
    bestTime: 'June to September, or December to March for skiing',
    idealStay: '4 days',
    tags: ['mountains', 'lakes', 'hiking', 'wildlife'],
    famousPlaces: [
      { name: 'Lake Louise', type: 'Lake', note: 'Glacier-fed turquoise water beneath the Victoria Glacier.' },
      { name: 'Moraine Lake', type: 'Lake', note: 'Ten peaks reflected in one of the most vivid lake colours anywhere.' },
      { name: 'Banff Gondola', type: 'Viewpoint', note: 'A ride up Sulphur Mountain for a full range view.' },
      { name: 'Icefields Parkway', type: 'Scenic drive', note: 'Glaciers, waterfalls, and wildlife along one of the world\'s great drives.' },
      { name: 'Johnston Canyon', type: 'Hike', note: 'A catwalk trail through a limestone canyon to twin waterfalls.' },
    ],
  },
  {
    slug: 'hoi-an-vietnam',
    name: 'Hoi An',
    country: 'Vietnam',
    region: 'Asia',
    lat: 15.8801,
    lon: 108.338,
    tagline: 'A lantern-lit trading port frozen somewhere in the 16th century.',
    description:
      'Hoi An\'s ancient town survived the wars that reshaped much of Vietnam, leaving a river port of merchant houses, Chinese assembly halls, and a Japanese covered bridge largely intact. At night, silk lanterns replace streetlights across the old quarter.',
    bestTime: 'February to April',
    idealStay: '2–3 days',
    tags: ['old town', 'food', 'tailoring', 'river'],
    famousPlaces: [
      { name: 'Ancient Town', type: 'Historic quarter', note: 'A UNESCO-listed grid of merchant houses and lantern-lit lanes.' },
      { name: 'Japanese Covered Bridge', type: 'Landmark', note: 'A 400-year-old bridge linking the old Japanese and Chinese quarters.' },
      { name: 'An Bang Beach', type: 'Beach', note: 'A quiet stretch of sand ten minutes from the old town.' },
      { name: 'Hoi An Night Market', type: 'Market', note: 'Silk lanterns, street food, and river boat rides after dark.' },
      { name: 'Tra Que Vegetable Village', type: 'Village', note: 'A working herb farm open for cooking classes.' },
    ],
  },
]

export const regions = [...new Set(destinations.map((d) => d.region))].sort()

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug)
}

// Haversine distance in km — used to suggest destinations near the visitor.
export function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

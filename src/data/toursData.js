// GOLMO Tour Data & Stop Definitions
export const TOURS = [
  {
    id: "seochon-whispering-alleys",
    title: "Seochon: Whispering Alleys",
    titleKr: "서촌의 숨겨진 시간",
    tagline: "Wander through the tranquil hanok pathways where modern poets and old artisans lived.",
    taglineKr: "시인과 예술가들이 거닐던 고즈넉한 한옥 골목과 비밀의 계곡",
    city: "Seoul",
    district: "Seochon (Jongno-gu)",
    price: 4.99,
    priceKr: "₩6,500",
    rating: 4.92,
    reviewsCount: 148,
    durationMinutes: 75,
    distanceKm: 2.2,
    difficulty: "Easy Walk",
    category: "History & Hidden Alleys",
    coverImage: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1200&q=80",
    creator: {
      name: "Minji Song",
      role: "Local Cultural Archivist & Seochon Native",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Born and raised behind Tongin Market. I collect stories etched into stones, roof tiles, and alley corner bakeries."
    },
    stops: [
      {
        id: "stop-1",
        order: 1,
        title: "Yeongchumun: The Gate of Autumn Breeze",
        titleKr: "영추문: 가을 바람의 문",
        lat: 37.5804,
        lng: 126.9723,
        radiusMeters: 25,
        narrationDuration: "2:40",
        audioSeconds: 160,
        imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80",
        summary: "The west entrance to the royal palace, where court astrologers and scholars slipped out into the alleys after dark.",
        fullScript: `Welcome to GOLMO. You are standing in front of Yeongchumun, the Autumn Greeting Gate of Gyeongbokgung Palace. 
Notice how the busy avenues of central Seoul suddenly melt into a quieter rhythm the moment you face west. Centuries ago, while kings and ambassadors used the grand southern gates, court painters, poets, and palace ladies used this very gate to slip quietly into the residential alleyways of Seochon. 
Take a deep breath. From here, we turn our backs to the royal grandeur and step into the living memory of ordinary Seoulites. Let's begin our journey into the labyrinth.`,
        funFact: "Yeongchumun collapsed in 1926 under Japanese rule due to vibrations from tram tracks, and was rebuilt in 1975.",
        ambientTrack: "palace-wind",
        suggestedDocentPrompt: "Why did court officials prefer living in Seochon rather than Bukchon?"
      },
      {
        id: "stop-2",
        order: 2,
        title: "House of Yi Sang: Modernist Solitude",
        titleKr: "이상의 집: 모던 보이의 방황",
        lat: 37.5818,
        lng: 126.9698,
        radiusMeters: 25,
        narrationDuration: "3:10",
        audioSeconds: 190,
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        summary: "The childhood home of Korea's most avant-garde modernist poet, disguised behind an iron gate.",
        fullScript: `Step inside the narrow wooden threshold. This is the spot where poet and architect Yi Sang lived for two decades during the 1920s and 30s. 
Imagine a young man walking these cobblestones in a trench coat, brooding over existential dread in a rapidly modernizing colonized city. Inside, a pitch-black steel chamber awaits you. If you step in and close the heavy door, a subtle beam of light illuminates his manuscripts on the wall. 
Take two minutes to savor the quiet tea smell lingering in the air before you step back out onto Jahamun-ro.`,
        funFact: "Yi Sang originally trained as an architectural engineer before revolutionizing Korean surrealist literature.",
        ambientTrack: "vintage-typewriter",
        suggestedDocentPrompt: "What was 1930s 'Modern Boy' culture in Seoul like?"
      },
      {
        id: "stop-3",
        order: 3,
        title: "Tongin Secret Alleys & Hyojadong Bakery",
        titleKr: "통인시장 뒷골목과 효자베이커리",
        lat: 37.5808,
        lng: 126.9678,
        radiusMeters: 25,
        narrationDuration: "2:50",
        audioSeconds: 170,
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        summary: "Vibrant aromas of sesame oil, vintage brass-coin lunchboxes, and oven-fresh corn bread from 1985.",
        fullScript: `Close your eyes for three seconds and breathe in through your nose. Do you catch the scent of toasted sesame oil, garlic, and hot bread? 
You have entered the lively underbelly of Tongin Market. While day tourists queue with brass 'Yeopjeon' coins for lunchboxes, look at the narrow staircases branching uphill behind the stalls. 
Look for the tiny blue sign of Hyoja Bakery. For over 35 years, they supplied bread to the Blue House (Cheong Wa Dae). The elderly bakers here still insist on handing you a warm, generous bread sample before you even say hello.`,
        funFact: "The marketplace was established in 1941 as a public market for Japanese residents during the occupation, later reclaimed by Korean vendors.",
        ambientTrack: "market-murmur",
        suggestedDocentPrompt: "What is the traditional 'Yeopjeon' lunchbox at Tongin Market?"
      },
      {
        id: "stop-4",
        order: 4,
        title: "Nuha-dong: The Whisper of Curved Roofs",
        titleKr: "누하동: 기와지붕이 맞닿은 골목",
        lat: 37.5794,
        lng: 126.9672,
        radiusMeters: 25,
        narrationDuration: "3:30",
        audioSeconds: 210,
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        summary: "A living labyrinth of residential urban Hanoks where potted chili peppers and laundry still dry in the sun.",
        fullScript: `Slow your walking pace right here. Notice how narrow this alley is—just wide enough for two people to pass without brushing shoulders. 
Unlike the grand aristocratic mansions of Bukchon, the hanoks of Nuha-dong are smaller, cozy 'urban hanoks' built in the 1930s. Look closely at the clay roof tiles; in rainy seasons, water drops from the eaves create a natural rhythm that inspired generations of painters. 
Please keep your voice low; real families live behind these cedar gates, hanging persimmons to dry in autumn and brewing barley tea.`,
        funFact: "Urban hanoks integrated glass window panes and brick chimneys into traditional timber framing to adapt to 20th-century city living.",
        ambientTrack: "hanok-rain",
        suggestedDocentPrompt: "Why are the alleys in Nuha-dong so narrow and maze-like?"
      },
      {
        id: "stop-5",
        order: 5,
        title: "Suseong-dong Valley: Nature Beneath Inwangsan",
        titleKr: "수성동 계곡: 겸재 정선의 산수화 속으로",
        lat: 37.5811,
        lng: 126.9634,
        radiusMeters: 30,
        narrationDuration: "3:00",
        audioSeconds: 180,
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        summary: "The spot where Joseon master Jeong Seon painted mist-covered granite cliffs, restored after 40 years hidden beneath concrete.",
        fullScript: `Look upward toward the dramatic granite face of Mount Inwangsan towering right in front of you. 
Listen to the gurgling water beneath the stones. This is Suseong-dong Valley, which translates to 'Valley of Water Sounds'. In the 18th century, the master painter Jeong Seon sat on this exact rock, painting his immortal ink landscape. 
Yet, in 1971, a massive concrete apartment complex was built directly over this valley! Only in 2012 did the city tear the apartments down and miraculously uncover the original Joseon stone bridge—Girin-gyo—intact beneath the debris.`,
        funFact: "Girin-gyo is the only original Joseon stone arch bridge in Seoul that remains in its authentic historical location.",
        ambientTrack: "valley-stream",
        suggestedDocentPrompt: "Tell me about Jeong Seon and the True-View landscape painting style."
      },
      {
        id: "stop-6",
        order: 6,
        title: "Boan Stay & 80-Year-Old Historic Inn",
        titleKr: "보안여관: 예술가들의 80년 보금자리",
        lat: 37.5786,
        lng: 126.9726,
        radiusMeters: 25,
        narrationDuration: "3:15",
        audioSeconds: 195,
        imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80",
        summary: "A humble vintage inn where penniless poets paid for lodging with freshly written verses, now a gallery and book café.",
        fullScript: `Our final stop brings us back toward the palace wall to Tongui-dong Boan Inn (Boan Yeogwan). 
From 1936 to the mid-2000s, this was a traveler's inn. In 1936, legendary poets like Seo Jeong-ju and Kim Dong-ni founded their literary movement inside Room 10. Back then, starving artists unable to pay their room tab would leave signed manuscripts with the innkeeper. 
Today, the original rough plaster walls, wooden door numbers, and creaking stairs are preserved as a contemporary art haven. Walk up to the 2nd floor Boan Books, pick up a coffee, and gaze back out toward the palace trees. You have completed the Seochon story.`,
        funFact: "Boan Inn operated as an active motel until 2004 before being saved from demolition by cultural preservationists.",
        ambientTrack: "cafe-jazz",
        suggestedDocentPrompt: "What is the best way to spend the evening around Boan 1942?"
      }
    ]
  },
  {
    id: "incheon-cheongna-waterways",
    title: "Cheongna: Waterways & Future Sunset",
    titleKr: "인천 청라: 물길 따라 걷는 노을 산책",
    tagline: "Follow the 4.5km tranquil canal ways and expansive lake park where cutting-edge modern architecture meets the golden sunset of the West Sea.",
    taglineKr: "4.5km 도심 수로와 호수공원을 따라, 첨단 워터프론트 건축과 서해의 황금빛 노을이 빚어내는 감성 산책",
    city: "Incheon",
    district: "Cheongna (Seo-gu)",
    price: 5.99,
    priceKr: "₩7,500",
    rating: 4.96,
    reviewsCount: 112,
    durationMinutes: 85,
    distanceKm: 3.1,
    difficulty: "Breeze Walk",
    category: "Waterfront & Modern Cityscape",
    coverImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    creator: {
      name: "Daniel Kang",
      role: "Urban Architect & Sunset Runner",
      avatar: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80",
      bio: "Born in Incheon, designing water-centric urban living. I know every secret bench along Cheongna's canals where the evening reflection is magical."
    },
    stops: [
      {
        id: "cheongna-stop-1",
        order: 1,
        title: "Cheongna Canal Way Central Promenade",
        titleKr: "청라 커낼웨이 중앙 수변 산책로",
        lat: 37.5332,
        lng: 126.6534,
        radiusMeters: 25,
        narrationDuration: "2:50",
        audioSeconds: 170,
        imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
        summary: "The pedestrian heart of Cheongna, where 4.5km of continuous waterways wind past vibrant waterside cafes and sunken garden terraces.",
        fullScript: `Welcome to Incheon Cheongna. Stand by the water railing and listen to the gentle splash against the stone embankment. You are on Cheongna Canal Way, a 4.5-kilometer artificial waterway that breathes life straight through the center of this international city. 
Unlike busy vehicle boulevards, this sunken walkway is entirely dedicated to pedestrians, cyclists, and families. Notice how modern glass facades reflect off the moving water beneath the bridge arches. Take a gentle breath of fresh air; our water journey has just begun.`,
        fullScriptKr: `청라 커낼웨이에 오신 것을 환영합니다. 난간 너머로 들려오는 잔잔한 물소리에 귀를 기울여보세요. 이곳은 청라국제도시 중심을 가로지르는 4.5km의 수변 보행로입니다. 
차도보다 한 층 아래로 설계된 선큰(Sunken) 산책로는 오직 걷는 사람과 자전거, 가족들을 위한 온전한 쉼터입니다. 수면에 비치는 현대적인 건축물들의 반영을 바라보며, 시원한 물길 산책을 시작해 보세요.`,
        funFact: "The water in Cheongna Canal Way is constantly cycled from the Han River and western sea tributary, filtered through eco-wetland purification systems.",
        ambientTrack: "palace-wind",
        suggestedDocentPrompt: "Why was Cheongna designed as a canal-based water city?"
      },
      {
        id: "cheongna-stop-2",
        order: 2,
        title: "Cheongna Lake Park Musical Fountain",
        titleKr: "청라호수공원 음악분수와 수변 무대",
        lat: 37.5305,
        lng: 126.6432,
        radiusMeters: 30,
        narrationDuration: "3:15",
        audioSeconds: 195,
        imageUrl: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=800&q=80",
        summary: "One of Korea's largest artificial lake parks, featuring an iconic outdoor musical fountain reaching 70 meters into the sky.",
        fullScript: `As you emerge from the canal into this vast expanse of water, the horizon suddenly opens wide. This is Cheongna Lake Park, covering nearly 700,000 square meters. 
Look toward the center of the lake: here stands the legendary Musical Fountain, capable of shooting choreographed water jets 70 meters high into the open sky, synchronized with orchestral music and multi-color laser displays. Even on quiet weekday afternoons, sitting on the tiered wooden deck watching kayaks and solar-powered duck boats glide across the ripples gives an unmatched sense of space.`,
        fullScriptKr: `좁은 수로를 지나 호수에 다다르면 시야가 탁 트입니다. 축구장 수십 개 크기에 달하는 청라호수공원입니다. 
호수 중앙의 음악분수는 최고 70미터 높이까지 물줄기를 쏘아 올리며 오케스트라와 레이저가 어우러지는 화려한 쇼를 선사합니다. 조용한 낮 시간, 탁 트인 나무 데크에 앉아 수면 위를 유유히 떠다니는 카약과 보트를 바라보는 것만으로도 도심 속 완벽한 여유를 느낄 수 있습니다.`,
        funFact: "The lake was designed with four distinct thematic zones: Echo, Tradition, Leisure, and Art, inspired by Korea's four traditional seasons.",
        ambientTrack: "valley-stream",
        suggestedDocentPrompt: "When does the Cheongna Lake Park musical fountain show start?"
      },
      {
        id: "cheongna-stop-3",
        order: 3,
        title: "Ruby-ro Waterfront Coffee Alley",
        titleKr: "루비로 수변 브런치 & 스페셜티 커피 골목",
        lat: 37.5358,
        lng: 126.6575,
        radiusMeters: 25,
        narrationDuration: "2:40",
        audioSeconds: 160,
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        summary: "A cozy neighborhood enclave lined with artisanal micro-roasteries, warm bakeries, and outdoor pet-friendly terrace cafes.",
        fullScript: `Step up the granite staircase from the water onto Ruby-ro. The aroma of freshly baked salt bread and single-origin Ethiopian coffee immediately greets you. 
Unlike the high-rise commercial sectors, this pocket of Cheongna is built with warm red-brick townhouses and tree-lined pedestrian alleys. Local baristas here take pride in slow-drip brews, and you will often find neighborhood residents reading books with their dogs on the sunny outdoor terraces. It is the perfect place to pause for a warm cup before continuing toward the sunset.`,
        fullScriptKr: `물가에서 계단을 올라 루비로 골목으로 들어서면, 갓 구운 소금빵과 스페셜티 원두의 고소한 향이 공기를 채웁니다. 
고층 빌딩숲과 달리 붉은 벽돌과 가로수가 어우러진 이 골목은 청라 주민들이 가장 아끼는 비밀 브런치 골목입니다. 야외 테라스에서 반려견과 함께 책을 읽는 이웃들의 여유를 느끼며, 따뜻한 드립 커피 한 잔의 휴식을 즐겨보세요.`,
        funFact: "Ruby-ro gets its name from Cheongna's jewel-themed street naming system (Diamond-ro, Emerald-ro, Sapphire-ro, and Ruby-ro).",
        ambientTrack: "cafe-jazz",
        suggestedDocentPrompt: "Tell me about the gemstone naming story of Cheongna's avenues."
      },
      {
        id: "cheongna-stop-4",
        order: 4,
        title: "Eco-Bridge Sunset Observatory",
        titleKr: "청라 에코 브릿지 & 석양 전망대",
        lat: 37.5278,
        lng: 126.6385,
        radiusMeters: 25,
        narrationDuration: "3:30",
        audioSeconds: 210,
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        summary: "A wooden panoramic sky-bridge elevated above the water, facing the golden evening glow toward Yeongjong Island and the West Sea.",
        fullScript: `Climb the gently curving wooden ramp of the Eco-Bridge. As you reach the crest, turn your eyes directly westward. The salty sea breeze carrying across from Incheon Harbor touches your face. 
When the afternoon sun dips low, the entire lake surface transforms into liquid copper and molten gold. In the far distance, you can catch the faint silhouette of Yeongjong Grand Bridge spanning the sea toward Incheon International Airport. It is here that photographers and evening joggers pause in total silence to watch the sky melt from tangerine to violet.`,
        fullScriptKr: `완만한 곡선의 에코 브릿지 나무 데크를 따라 올라서면 서해에서 불어오는 시원한 바닷바람이 느껴집니다. 
해 질 무렵, 호수 전체는 눈부신 황금빛으로 물들고, 저 멀리 영종대교의 실루엣 너머로 서해의 붉은 노을이 장관을 이룹니다. 청라 주민들과 러너들이 발걸음을 멈추고 귤빛에서 보랏빛으로 물드는 하늘을 감상하는 최고의 일몰 명소입니다.`,
        funFact: "The Eco-Bridge was engineered to connect fragmented ecological corridors, allowing local birds and amphibians to traverse between lake wetlands safely.",
        ambientTrack: "palace-wind",
        suggestedDocentPrompt: "What is the best spot to view the sunset in Incheon Cheongna?"
      },
      {
        id: "cheongna-stop-5",
        order: 5,
        title: "Simgokcheon Reed Wetlands & Starlight Path",
        titleKr: "심곡천 갈대습지와 별빛 산책로",
        lat: 37.5252,
        lng: 126.6480,
        radiusMeters: 25,
        narrationDuration: "3:00",
        audioSeconds: 180,
        imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
        summary: "A tranquil natural wetland preserve where wild silver grasses whisper in the wind and migratory herons rest.",
        fullScript: `Our final stop leads us to the southern border of Cheongna, where the manicured city gracefully yields to wild nature. Along Simgokcheon Stream, tall silver reeds rustle in the coastal wind. 
White herons and mallard ducks wade quietly through the shallows. At twilight, soft solar-powered ground lanterns illuminate the wooden boardwalk, creating what locals affectionately call the Starlight Path. As you finish your walk, listen closely to the whispering reeds. You have uncovered the serene water soul of Incheon.`,
        fullScriptKr: `청라 투어의 마지막 여정은 도시의 화려함을 지나 자연의 품으로 들어가는 심곡천 갈대습지입니다. 
은빛 갈대가 바람에 스치는 소리와 함께 백로와 청둥오리가 여유롭게 노니는 생태 하천입니다. 해가 지면 데크길을 따라 은은한 조명이 켜지며 마치 별빛 위를 걷는 듯한 낭만을 선사합니다. 바람에 흔들리는 갈대 소리와 함께 청라의 평화로운 밤을 맞이해보세요.`,
        funFact: "Over 30 species of migratory birds winter in Simgokcheon wetlands each year on their journey along the East Asian-Australasian Flyway.",
        ambientTrack: "valley-stream",
        suggestedDocentPrompt: "What kinds of migratory birds visit the wetlands around Cheongna?"
      }
    ]
  },
  {
    id: "euljiro-neon-and-iron",
    title: "Euljiro: Neon, Iron & Twilight Hophouses",
    titleKr: "을지로: 네온과 철공소, 노가리 골목",
    tagline: "Explore the gritty maze of metal workshops that transform into Korea's hippest speakeasies by sunset.",
    taglineKr: "낮에는 쇠 깎는 소리, 밤에는 힙스터들의 맥주잔이 부딪히는 힙지로의 이면",
    city: "Seoul",
    district: "Euljiro (Jung-gu)",
    price: 5.99,
    priceKr: "₩7,900",
    rating: 4.88,
    reviewsCount: 96,
    durationMinutes: 80,
    distanceKm: 2.6,
    difficulty: "Vibrant Night Walk",
    category: "Industrial Heritage & Nightlife",
    coverImage: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=80",
    creator: {
      name: "Junho Park",
      role: "Urban Geographer & Music Producer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Hunting hidden vinyl bars behind unlabelled rusted doors in the industrial printing alleys."
    },
    stops: []
  },
  {
    id: "bukchon-silent-dawn",
    title: "Bukchon: Echoes of Aristocratic Dawn",
    titleKr: "북촌: 고요한 아침의 선비 골목",
    tagline: "Experience the majestic eight scenic views before the city wakes up.",
    taglineKr: "관광객이 몰리기 전, 안개 낀 한옥마을의 진짜 숨결을 듣다",
    city: "Seoul",
    district: "Bukchon (Jongno-gu)",
    price: 4.99,
    priceKr: "₩6,500",
    rating: 4.95,
    reviewsCount: 210,
    durationMinutes: 65,
    distanceKm: 1.9,
    difficulty: "Uphill Walk",
    category: "Tradition & Views",
    coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    creator: {
      name: "Sarah Chen & Tae-min Kim",
      role: "Architectural Storytellers",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      bio: "Guiding mindful travelers through 600 years of Joseon urban planning."
    },
    stops: []
  }
];

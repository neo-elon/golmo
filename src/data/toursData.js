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
        imageUrl: "https://images.unsplash.com/photo-1538669715315-155098f6bbe4?auto=format&fit=crop&w=800&q=80",
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

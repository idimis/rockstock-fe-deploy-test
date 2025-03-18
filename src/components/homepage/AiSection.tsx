'use client';

import React, { useState } from 'react';

const AISection: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [responses, setResponses] = useState<string[]>([]);
  const [question, setQuestion] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<{ question: string; answer: string }[]>([]);
  const [displayedText, setDisplayedText] = useState<string>('');

  const qnaTemplates: { question: string; answer: string }[] = [
    // Rockstock-Specific Questions
    { question: 'What is Rockstock?', answer: 'Rockstock is a furniture brand for those who live loud, with bold gothic and emo-inspired designs.' },
    { question: 'Who is Rockstock for?', answer: 'For those who still embrace their dark aesthetic and want furniture that speaks to their identity.' },
    { question: 'Where is Rockstock based?', answer: 'Rockstock operates online, shipping to various locations with a strong focus on quality and style.' },
    { question: 'How can I order from Rockstock?', answer: 'Simply browse our catalog online, add to cart, and proceed with secure checkout.' },
    { question: 'What materials are used in Rockstock furniture?', answer: 'We use high-quality, durable materials like reclaimed wood, metal, and leather to give our furniture a unique, bold look.' },
    { question: 'Is Rockstock eco-friendly?', answer: 'Yes, Rockstock aims to reduce environmental impact by using sustainable materials and eco-friendly manufacturing processes.' },
    { question: 'Can I customize my Rockstock furniture?', answer: 'Yes, we offer customization options to make your furniture uniquely yours.' },
    { question: 'What is the warranty for Rockstock furniture?', answer: 'We offer a 5-year warranty on all our furniture, ensuring durability and quality.' },
    { question: 'Can I track my order from Rockstock?', answer: 'Yes, once your order is shipped, we’ll provide a tracking number to follow your shipment.' },
    { question: 'Does Rockstock offer international shipping?', answer: 'Yes, Rockstock ships internationally, though shipping fees and availability may vary based on location.' },
    { question: 'What makes Rockstock different?', answer: 'Rockstock isn’t just furniture—it’s an attitude. We design for those who want to make a statement, not just fill a space.' },
    { question: 'Can I return my order?', answer: 'Yes, we have a 30-day return policy for unused and undamaged items.' },
    { question: 'Does Rockstock make limited edition items?', answer: 'Absolutely. We release exclusive pieces for those who want something truly unique.' },
    { question: 'Does Rockstock have a physical store?', answer: 'Nope, we’re purely online. But who needs a store when we bring the rock directly to your door?' },
    { question: 'Is Rockstock furniture kid-friendly?', answer: 'If your kid is a little rebel, they’ll love it. Otherwise, maybe start with a sticker.' },
  
    // General Knowledge Questions
    { question: 'What is the speed of light?', answer: 'The speed of light in a vacuum is about 299,792,458 meters per second. Fast, but not as fast as a good guitar solo.' },
    { question: 'Why is the sky blue?', answer: 'Because of Rayleigh scattering—blue light is scattered more than other colors. But wouldn’t it be cooler if it were black with neon streaks?' },
    { question: 'How do planes fly?', answer: 'Through a mix of lift, thrust, drag, and gravity. Kind of like how rockstars defy gravity on stage.' },
    { question: 'Who invented the internet?', answer: 'The internet was developed by multiple scientists, but Tim Berners-Lee created the World Wide Web. Now it’s mostly used for memes and online shopping.' },
    { question: 'How big is the universe?', answer: 'Bigger than your problems, but still expanding.' },
    { question: 'What is the tallest mountain?', answer: 'Mount Everest at 8,848 meters. Unless you count Mauna Kea from base to peak, then it wins.' },
    { question: 'What is the meaning of life?', answer: '42, according to Douglas Adams. But let’s be honest, it’s probably just about rocking out and having a good time.' },
    { question: 'How does gravity work?', answer: 'Mass attracts mass. The bigger the mass, the stronger the pull. Kind of like how great music pulls people together.' },
    { question: 'What is the rarest element on Earth?', answer: 'Astatine. But the rarest thing in life? A truly good bass solo.' },
    { question: 'How many bones are in the human body?', answer: '206 bones, unless you’re a drummer—then you have extra rhythm in your soul.' },
    { question: 'What is black hole?', answer: 'A region in space where gravity is so strong that nothing—not even light—can escape. Sounds like my wallet after a record store visit.' },
    { question: 'Who was the first person on the Moon?', answer: 'Neil Armstrong in 1969. Imagine if he had planted a Rockstock flag instead.' },
    { question: 'What is Schrödinger’s cat?', answer: 'A thought experiment in quantum mechanics. The cat is both alive and dead—kind of like my energy levels before coffee.' },
    { question: 'What is the fastest animal?', answer: 'The peregrine falcon, reaching speeds over 240 mph. But can it headbang? Doubtful.' },
  
    // Fun & Weird Questions
    { question: 'Do aliens exist?', answer: 'Statistically? Probably. But are they cooler than us? Highly unlikely.' },
    { question: 'Can you hear sound in space?', answer: 'Nope. Space is a vacuum, so sound waves can’t travel. But if they could, space would definitely have an epic soundtrack.' },
    { question: 'What happens if you fall into a black hole?', answer: 'You’d get stretched into spaghetti due to extreme gravity. Not the best way to travel.' },
    { question: 'What is déjà vu?', answer: 'It’s when your brain glitches and makes you feel like you’ve experienced something before. Kind of like hearing the same song on repeat.' },
    { question: 'How do magnets work?', answer: 'Electromagnetic forces. No magic, just science. But still pretty cool.' },
    { question: 'Can fish drown?', answer: 'Yes, if the water lacks oxygen. Kind of ironic, huh?' },
    { question: 'Why do we dream?', answer: 'No one knows for sure, but theories suggest it helps with memory and emotions. Or maybe it’s just the universe’s way of keeping us entertained.' },
    { question: 'Why do cats purr?', answer: 'To communicate, heal, or just because they’re happy. Scientists are still figuring it out, and so are we.' },
    { question: 'Why do we hiccup?', answer: 'Because your diaphragm spasms. There’s no solid reason, just like some fashion choices in the early 2000s.' },

  // 🎸 Music, Pop Culture & Fun Facts
  { question: 'Who is the greatest guitarist of all time?', answer: 'Jimi Hendrix. But if you disagree, we can still be friends.' },
  { question: 'What was the first rock album ever recorded?', answer: 'Many say it was "Rock Around the Clock" by Bill Haley & His Comets.' },
  { question: 'Who invented heavy metal?', answer: 'Black Sabbath is credited with creating the heavy metal sound in the late 60s.' },
  { question: 'What is the best-selling album of all time?', answer: 'Michael Jackson’s "Thriller". But hey, rock fans know that "Back in Black" is right up there too.' },
  { question: 'Who was the first punk band?', answer: 'The Ramones are often credited as the first true punk band.' },
  { question: 'What does MTV stand for?', answer: 'Music Television. Though nowadays, it’s mostly reality shows.' },
  { question: 'What’s the most expensive guitar ever sold?', answer: 'Kurt Cobain’s "MTV Unplugged" Martin D-18E, sold for $6 million.' },
  { question: 'Why do cats purr?', answer: 'Cats purr as a way to communicate comfort, contentment, or even to heal themselves.' },
  { question: 'How deep is the ocean?', answer: 'The deepest part of the ocean, the Mariana Trench, reaches about 11,000 meters below sea level.' },
  { question: 'What happens if you fall into a black hole?', answer: 'You’d experience spaghettification—being stretched into a long, thin shape due to extreme gravitational pull.' },
  { question: 'Why do we dream?', answer: 'Dreams are thought to be a mix of subconscious thoughts, emotions, and memories being processed by the brain.' },
  { question: 'Who invented the internet?', answer: 'The internet was developed by multiple scientists, but ARPANET was the foundation, created by the U.S. Department of Defense.' },
  { question: 'Can plants hear music?', answer: 'Some studies suggest plants respond positively to music, especially classical tunes.' },
  { question: 'Why do onions make you cry?', answer: 'Onions release a sulfur compound that irritates your eyes, triggering tears.' },
  { question: 'Can fish drown?', answer: 'Yes, if water lacks oxygen or if their gills get damaged, fish can actually suffocate.' },
  { question: 'Why do we hiccup?', answer: 'Hiccups are involuntary contractions of the diaphragm, often triggered by eating too fast or swallowing air.' },
  { question: 'What is the loudest sound on Earth?', answer: 'The Krakatoa volcanic eruption in 1883 produced a sound heard over 3,000 miles away.' },
  { question: 'Why do we have fingerprints?', answer: 'Fingerprints help improve grip and enhance touch sensitivity.' },
  { question: 'Can you cry in space?', answer: 'Yes, but tears don’t fall—they stick to your face due to microgravity.' },
  { question: 'Who named the planets?', answer: 'Most planets were named by the Romans, except for Earth, which comes from Old English and Germanic origins.' },
  { question: 'Why do giraffes have long necks?', answer: 'Giraffes evolved long necks to reach high tree leaves and compete for food.' },
  { question: 'How do chameleons change color?', answer: 'They adjust specialized skin cells called chromatophores to reflect different wavelengths of light.' },
  { question: 'What would happen if the Earth stopped spinning?', answer: 'Everything not attached to the ground would keep moving at high speeds, causing total chaos.' },
  { question: 'Why is yawning contagious?', answer: 'Scientists believe it’s linked to social bonding and empathy.' },
  { question: 'How do birds know where to migrate?', answer: 'They use the Earth’s magnetic field, the sun, and even the stars as navigation tools.' },
  { question: 'Why do we get goosebumps?', answer: 'It’s a leftover survival response from our ancestors to appear larger and retain heat.' },
  { question: 'Why is space silent?', answer: 'There’s no air in space, so sound waves have nothing to travel through.' },
  { question: 'Can trees communicate?', answer: 'Yes, trees release chemical signals and even share nutrients through underground fungal networks.' },
  { question: 'Why do flamingos stand on one leg?', answer: 'It helps them conserve body heat and maintain balance.' },
  { question: 'How many stars are in the universe?', answer: 'Scientists estimate there are around 200 billion trillion stars in the observable universe.' },
  { question: 'Do aliens exist?', answer: 'There’s no confirmed proof, but the universe is vast, so who knows?' },
  { question: 'Can we live without the Moon?', answer: 'Without the Moon, Earth’s tilt would be unstable, causing chaotic weather patterns.' },
  { question: 'Why do we get brain freeze?', answer: 'Brain freeze happens when something cold rapidly cools the blood vessels in the roof of your mouth, causing a quick headache.' },
  { question: 'Can turtles live forever?', answer: 'Some species can live over 200 years, but nothing truly lives forever.' },
  { question: 'How does a rainbow form?', answer: 'Rainbows form when light bends and reflects off raindrops, splitting into different colors.' },
  { question: 'Can water expire?', answer: 'Water itself doesn’t expire, but the container it’s stored in can degrade over time.' },
  { question: 'Why do some people have dimples?', answer: 'Dimples are caused by a variation in facial muscles, often a dominant genetic trait.' },
  { question: 'What was the first language spoken?', answer: 'The oldest known written languages include Sumerian and Egyptian, but spoken languages predate writing by thousands of years.' },
  { question: 'Why do snakes shed their skin?', answer: 'Snakes shed their skin to grow and get rid of parasites.' },
  { question: 'How do bees make honey?', answer: 'Bees collect nectar, break it down with enzymes, and store it in honeycombs, where it evaporates into thick honey.' },
  { question: 'What’s the rarest eye color?', answer: 'Green is one of the rarest, with only about 2% of the world’s population having it.' },
  { question: 'Why do people get freckles?', answer: 'Freckles are caused by melanin clustering in response to sun exposure, often in people with fair skin.' },
  { question: 'Can lightning strike the same place twice?', answer: 'Yes, lightning can strike the same spot multiple times, especially tall buildings like the Empire State Building.' },
  { question: 'How do submarines float and sink?', answer: 'They adjust buoyancy using water tanks that fill and empty as needed.' },
  { question: 'Why do we have belly buttons?', answer: 'Your belly button is a scar from where your umbilical cord was attached to your mother before birth.' },
  { question: 'Can you see the Great Wall of China from space?', answer: 'Despite the myth, it’s not easily visible without magnification.' },
  { question: 'What’s the most expensive substance on Earth?', answer: 'Antimatter is the most expensive, costing billions per gram due to its difficulty to produce.' },
  { question: 'Why do leaves change color in autumn?', answer: 'Chlorophyll breaks down, revealing other pigments like red, yellow, and orange.' },
  { question: 'How does popcorn pop?', answer: 'Water inside the kernel heats up, creating pressure that eventually makes it explode into a fluffy snack.' },
  { question: 'Why do penguins waddle?', answer: 'Their short legs and wide bodies make waddling the most energy-efficient way to walk.' },
  { question: 'Why do some people sneeze when they look at the sun?', answer: 'It’s called the photic sneeze reflex, caused by overstimulation of the optic nerve.' },
  { question: 'Can humans hibernate?', answer: 'Not naturally, but scientists are studying ways to induce hibernation for medical and space travel purposes.' },
  { question: 'How do planes stay in the air?', answer: 'Planes generate lift by forcing air over and under their wings at different speeds, creating pressure differences.' },
  { question: 'Why do people love spicy food?', answer: 'Spicy food triggers pain receptors, releasing endorphins that create a pleasurable sensation.' },
  { question: 'Who am I?', answer: 'You are the chosen one, the legend, the unstoppable force of nature. Now go forth and conquer!' },
  { question: 'How old am I?', answer: 'You are exactly the right age to be awesome. Don’t let numbers define you!' },
  { question: 'What is my name?', answer: 'Your name is... classified. But I shall call you "The Great One".' },
  { question: 'Man robbuka?', answer: 'Pertanyaan berat, nih. Kalau serius, tanya ustadz. Kalau bercanda, jawabannya bisa Google.' },
  { question: 'Who is Jesus?', answer: 'Jesus is a central figure in Christianity, known as a teacher, prophet, and to Christians, the Son of God.' },
  { question: 'What is the best religion?', answer: 'The best religion is the one that makes you a kind, understanding, and respectful person.' },
  { question: 'Who is the best president of Indonesia?', answer: 'Every leader has their strengths and weaknesses. But the best one? That’s up to history (and maybe your opinion).' },
  { question: 'Are we in a simulation?', answer: 'If we are, then whoever programmed this really needs to fix some bugs.' },
  { question: 'Is time travel possible?', answer: 'Technically, we are all time travelers moving forward at one second per second. Exciting, right?' },
  { question: 'What came first, the chicken or the egg?', answer: 'The egg. Evolution doesn’t wait for anyone, even chickens.' },
  { question: 'Do aliens exist?', answer: 'The universe is too big for us to be alone. But if they do exist, let’s hope they come in peace.' },
  { question: 'Why is the sky blue?', answer: 'Because the molecules in the air scatter blue light more than other colors. Science is cool, huh?' },
  { question: 'What is love?', answer: 'Baby don’t hurt me, don’t hurt me, no more.' },
  { question: 'Can I be rich?', answer: 'Yes! Just find a way to turn coffee and memes into profit.' },
  { question: 'What’s the meaning of life?', answer: '42. Or whatever you decide it to be.' },
  { question: 'Why do we exist?', answer: 'Deep question. Either a cosmic accident, a divine plan, or just to enjoy pizza.' },
  { question: 'Is water wet?', answer: 'Ah, the classic debate. Wetness is a sensation, so water itself is not wet—until it touches something.' },
  { question: 'What happens after we die?', answer: 'Either nothing, something, or respawn in another timeline. Who knows?' },
  { question: 'Can I be a superhero?', answer: 'Of course! Just need a tragic backstory and a cool costume.' },
  { question: 'Can money buy happiness?', answer: 'No, but it can buy pizza. Which is basically the same thing.' },
  { question: 'Why do we need sleep?', answer: 'Because running on coffee alone is not sustainable.' },
  { question: 'What would happen if everyone jumped at the same time?', answer: 'Probably nothing, but it would be a cool TikTok challenge.' },
  { question: 'Can I marry a rock?', answer: 'Legally, probably not. But spiritually? Love is love.' },
  { question: 'Do ghosts exist?', answer: 'If they do, they’re probably tired of people asking.' },
  { question: 'Is cereal a soup?', answer: 'Technically… yes. But do we really want to go there?' },
  { question: 'What happens if you eat expired food?', answer: 'A thrilling adventure awaits! (But please don’t).' },
  { question: 'Why do we have eyebrows?', answer: 'To protect our eyes from sweat and to help express "that look" when someone says something dumb.' },
  { question: 'What is the most powerful weapon in the world?', answer: 'Knowledge. And maybe a really good meme.' },
  { question: 'Can animals talk?', answer: 'Some do! But mostly they just say “feed me.”' },
  { question: 'Can you live on Mars?', answer: 'With enough technology and money, sure. But no WiFi, so think carefully.' },
  { question: 'Why is Pluto not a planet?', answer: 'Because the scientists decided so. Pluto’s still cool, though.' },
  { question: 'Can I eat lava?', answer: 'You can try, but only once.' },
  { question: 'Why is 3 AM scary?', answer: 'Because that’s when your brain remembers embarrassing things from 10 years ago.' },
  { question: 'What’s the fastest way to get rich?', answer: 'Hard work, smart investments, and a little bit of luck. Or winning the lottery, but good luck with that.' },
  { question: 'What’s inside a black hole?', answer: 'Nobody knows. Probably lost socks and missing pens.' },
  { question: 'Can robots take over the world?', answer: 'Only if we let them. So be nice to your Roomba.' },
  { question: 'Can you breathe in space?', answer: 'Not without a spacesuit. Please don’t try.' },
  { question: 'How do I become famous?', answer: 'Be extremely talented, lucky, or just start a weird TikTok trend.' },
  { question: 'Are vampires real?', answer: 'If they were, do you think they’d tell us?' },
  { question: 'What’s the best way to survive a zombie apocalypse?', answer: 'Rule #1: Cardio. Rule #2: Avoid shopping malls. Rule #3: Don’t get bitten.' },
  { question: 'Can you swim in lava?', answer: 'Technically, no. You’d be vaporized before you even touched it.' },
  { question: 'Can pigs fly?', answer: 'Only in the form of bacon-flavored dreams.' },
  { question: 'Is it possible to live forever?', answer: 'Science is working on it. But until then, enjoy every moment.' },
  { question: 'Are mermaids real?', answer: 'Not that we know of. But the ocean is vast and mysterious…' },
  { question: 'What would happen if the Earth had no gravity?', answer: 'We’d all be floating around, struggling to drink coffee.' },
  { question: 'Can we talk to animals?', answer: 'Yes! But they mostly respond with “feed me” or “go away.”' },
  { question: 'Is the Loch Ness Monster real?', answer: 'If it is, it’s doing a great job at hiding.' },
  { question: 'What is the secret to happiness?', answer: 'Good friends, good food, and not worrying about things you can’t control.' },
  { question: 'Siapa aku?', answer: 'Kamu adalah makhluk luar biasa yang bahkan Google pun sulit mendefinisikan.' },
  { question: 'Berapa umurku?', answer: 'Cukup untuk bertanya di internet, kurang untuk tahu semua jawabannya.' },
  { question: 'Siapa nama saya?', answer: 'Nama kamu adalah sesuatu yang hanya kartu identitas dan ibu kamu yang tahu pasti.' },
  { question: 'Man robbuka?', answer: 'Ini pertanyaan berat. Coba tanyakan pada guru agama terdekat!' },
  { question: 'Apa tujuan hidup?', answer: 'Makan, tidur, kerja, dan mengulang siklusnya sampai jadi miliarder atau robot menggantikanmu.' },
  { question: 'Apa arti cinta?', answer: 'Sebuah perasaan yang indah sampai ada tagihan yang harus dibayar bersama.' },
  { question: 'Apakah saya ganteng/cantik?', answer: 'Tentu saja! Kamera HP kamu aja yang belum bisa menangkap aura bintangnya.' },
  { question: 'Kapan saya kaya?', answer: 'Saat saldo rekeningmu lebih dari jumlah digit nomor HP-mu.' },
  { question: 'Kenapa hidup sulit?', answer: 'Karena kalau gampang, semua orang jadi Sultan dan siapa yang bakal bikin mie instan?' },
  { question: 'Apa itu kebahagiaan?', answer: 'Makan enak, tidur nyenyak, dan internet cepat tanpa buffering.' },
  { question: 'Siapa jodoh saya?', answer: 'Masih dalam proses update di server takdir. Harap bersabar...' },
  { question: 'Apa makanan terenak di dunia?', answer: 'Yang gratis dan nggak perlu dicuci piringnya setelah makan.' },
  { question: 'Kenapa langit berwarna biru?', answer: 'Karena merah dan hijau lagi sibuk dengan lampu lalu lintas.' },
  { question: 'Kenapa aku jomblo?', answer: 'Karena kamu lebih memilih tidur daripada membalas chat seseorang.' },
  { question: 'Apa yang terjadi setelah mati?', answer: 'Rahasia perusahaan. Nanti bocor malah nggak seru!' },
  { question: 'Bagaimana cara menjadi sukses?', answer: 'Kerja keras, kerja cerdas, atau punya om yang tajir.' },
  { question: 'Apa pekerjaan terbaik di dunia?', answer: 'Dibayar buat tidur. Sayangnya, lowongan masih tertutup.' },
  { question: 'Bisakah uang membeli kebahagiaan?', answer: 'Bisa! Coba beli martabak 2 loyang dan lihat perasaanmu setelahnya.' },
  { question: 'Apa rahasia panjang umur?', answer: 'Jangan stres. Kalau bisa, hindari notifikasi tagihan listrik juga.' },
  { question: 'Kenapa orang suka drama?', answer: 'Karena hidup mereka kurang hiburan atau kuota internet lagi banyak.' },
  { question: 'Apakah bumi datar?', answer: 'Coba lari keliling dunia, kalau jatuh kasih tahu aku.' },
  { question: 'Apa hukum gravitasi?', answer: 'Kalau kamu jatuh cinta, itu bukan gravitasi. Itu ilusi.' },
  { question: 'Bagaimana cara move on?', answer: 'Blokir, hapus chat, dan ingat kalau kamu lebih baik tanpa dia.' },
  { question: 'Kenapa saya malas?', answer: 'Karena tubuhmu tahu bahwa kasur lebih nyaman dari dunia luar.' },
  { question: 'Apa yang lebih cepat dari cahaya?', answer: 'Teman yang tiba-tiba hilang saat kamu butuh bantuan.' },
  { question: 'Kenapa saya selalu lapar?', answer: 'Karena perutmu ingin jadi influencer kuliner.' },
  { question: 'Apakah alien itu nyata?', answer: 'Mungkin mereka lihat Bumi dan memutuskan untuk tidak mampir.' },
  { question: 'Bagaimana cara cepat kaya?', answer: 'Menangkan lotre, atau jadi orang yang menemukan cara cepat kaya.' },
  { question: 'Kenapa harus mandi setiap hari?', answer: 'Supaya orang lain nggak lari waktu dekat sama kamu.' },
  { question: 'Siapa presiden terbaik?', answer: 'Setiap orang punya favoritnya sendiri. Aku? Aku lebih suka mie instan.' },
  { question: 'Apa makanan paling aneh?', answer: 'Apapun yang bikin kamu bertanya, "Ini beneran bisa dimakan?"' },
  { question: 'Kenapa kita tidur?', answer: 'Supaya bisa menghindari tanggung jawab sementara.' },
  { question: 'Bagaimana cara jadi pintar?', answer: 'Google dan YouTube. Atau pura-pura pintar dan berharap tak ketahuan.' },
  { question: 'Apa itu kopi?', answer: 'Minuman ajaib yang mengubah zombie menjadi manusia produktif.' },
  { question: 'Apakah hantu itu nyata?', answer: 'Mereka nyata, tapi mereka lebih takut lihat tagihan listrik.' },
  { question: 'Kenapa ayam menyeberang jalan?', answer: 'Karena dia bosan di sisi yang sama terus.' },
  { question: 'Apa yang terjadi jika kita tidak makan?', answer: 'Kamu akan mengalami "error" dan butuh reboot dengan nasi padang.' },
  { question: 'Kenapa kucing suka kotak?', answer: 'Karena kucing adalah paket premium dengan fitur auto-boxing.' },
  { question: 'Kenapa saya sering lupa?', answer: 'Mungkin otakmu butuh upgrade RAM atau kurang kopi.' },
  { question: 'Apa yang harus saya lakukan saat bosan?', answer: 'Buat daftar hal yang bisa dilakukan. Lalu abaikan daftar itu dan tetap bosan.' },
  { question: 'Bagaimana cara mendapatkan teman?', answer: 'Beli boba dan lihat siapa yang tiba-tiba ingin dekat denganmu.' },
  { question: 'Kenapa ada Monday?', answer: 'Karena dunia ingin menguji seberapa kuat mental manusia.' },
  { question: 'Bagaimana cara jadi menarik?', answer: 'Punya banyak uang atau punya banyak cerita lucu. Salah satu pasti berhasil.' },
  { question: 'Kenapa WiFi tetangga selalu lebih cepat?', answer: 'Karena dilarang rasanya lebih menggoda.' },
  { question: 'Apa film terbaik sepanjang masa?', answer: 'Yang membuatmu lupa masalah dunia selama 2 jam.' },
  { question: 'Kenapa waktu cepat berlalu saat senang?', answer: 'Karena kebahagiaan tidak suka berlama-lama, tapi tugas sekolah suka mendekat terus.' },
  { question: 'Kenapa cucian selalu bertambah?', answer: 'Karena baju punya sistem respawn tanpa batas.' },
  { question: 'Bagaimana cara bikin gebetan suka?', answer: 'Jadilah lucu, cerdas, dan sedikit misterius. Atau bawa makanan enak.' },
  { question: 'gravity', answer: 'Gravity is a force that attracts two bodies toward each other. On Earth, it gives weight to physical objects and causes objects to fall when dropped.' },
  { question: 'black hole', answer: 'A black hole is a region in space where gravity is so strong that nothing, not even light, can escape from it.' },
  { question: 'quantum', answer: 'Quantum mechanics is a fundamental theory in physics that describes nature at the smallest scales of atoms and subatomic particles.' },
  { question: 'photosynthesis', answer: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.' },
  { question: 'DNA', answer: 'DNA, or deoxyribonucleic acid, carries genetic instructions for the growth, development, functioning, and reproduction of all known living organisms.' },
  { question: 'AI', answer: 'Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that can learn, reason, and problem-solve.' },
  { question: 'blockchain', answer: 'Blockchain is a decentralized and distributed ledger technology used to record transactions securely across multiple computers.' },
  { question: 'bitcoin', answer: 'Bitcoin is a decentralized digital currency that allows peer-to-peer transactions without the need for a central authority.' },
  { question: 'climate change', answer: 'Climate change refers to long-term shifts in weather patterns and global temperatures due to natural and human activities.' },
  { question: 'oxygen', answer: 'Oxygen is a chemical element essential for life, making up about 21% of Earth’s atmosphere and necessary for respiration.' },
  { question: 'evolution', answer: 'Evolution is the process by which different kinds of living organisms develop and diversify from earlier forms over generations.' },
  { question: 'nebula', answer: 'A nebula is a vast cloud of gas and dust in space, often the birthplace of stars and planets.' },
  { question: 'neutron star', answer: 'A neutron star is the collapsed core of a massive star that exploded as a supernova, extremely dense and composed mostly of neutrons.' },
  { question: 'dark matter', answer: 'Dark matter is an unknown form of matter that does not emit light or energy, yet it makes up most of the universe’s mass.' },
  { question: 'antimatter', answer: 'Antimatter consists of particles that have properties opposite to those of ordinary matter, annihilating upon contact with matter.' },
  { question: 'big bang', answer: 'The Big Bang theory suggests that the universe began as a singularity and has been expanding ever since.' },
  { question: 'entropy', answer: 'Entropy is a measure of disorder or randomness in a system, often associated with the second law of thermodynamics.' },
  { question: 'parallel universe', answer: 'The concept of a parallel universe suggests the existence of multiple, possibly infinite, alternate realities.' },
  { question: 'wormhole', answer: 'A wormhole is a hypothetical passage through space-time that could create shortcuts for long journeys across the universe.' },
  { question: 'genetics', answer: 'Genetics is the study of genes and heredity, explaining how traits are passed from parents to offspring.' },
  { question: 'nanotechnology', answer: 'Nanotechnology involves the manipulation of matter on an atomic and molecular scale, leading to advancements in medicine, electronics, and materials science.' },
  { question: 'biotechnology', answer: 'Biotechnology is the use of living organisms or biological systems to develop useful products, particularly in medicine and agriculture.' },
  { question: 'robotics', answer: 'Robotics is the field of engineering and science focused on the design and construction of robots and automated systems.' },
  { question: 'exoplanet', answer: 'An exoplanet is a planet that orbits a star outside our solar system, some of which may have conditions suitable for life.' },
  { question: 'volcano', answer: 'A volcano is a rupture in the Earth’s crust that allows molten rock, ash, and gases to escape from below the surface.' },
  { question: 'tornado', answer: 'A tornado is a rapidly rotating column of air extending from a thunderstorm to the ground, capable of causing severe destruction.' },
  { question: 'tsunami', answer: 'A tsunami is a series of ocean waves caused by underwater earthquakes, volcanic eruptions, or landslides.' },
  { question: 'biodiversity', answer: 'Biodiversity refers to the variety of life on Earth, including species diversity, genetic diversity, and ecosystem diversity.' },
  { question: 'economy', answer: 'The economy is a system of production, distribution, and consumption of goods and services.' },
  { question: 'inflation', answer: 'Inflation is the rate at which prices increase, reducing the purchasing power of money.' },
  { question: 'startup', answer: 'A startup is a newly established company aiming for rapid growth, often in tech sectors.' },
  { question: 'entrepreneur', answer: 'An entrepreneur is someone who starts and manages a business, taking financial risks.' },
  { question: 'leadership', answer: 'Leadership is the ability to inspire and guide a group toward a common goal.' },
  { question: 'productivity', answer: 'Productivity measures how efficiently work is completed within a given time frame.' },
  { question: 'marketing', answer: 'Marketing involves promoting and selling products or services, including market research and advertising.' },
  { question: 'Naluri Gaudia', answer: 'Ia adalah anak kecil yang cantik dan pintar. Rasa ingin tahunya sangat tinggi dan pengertian di usia sekecil itu. Semoga selalu bahagia sesuai namanya.' },
  { question: 'branding', answer: 'Branding is creating a distinct identity for a business through visuals, messaging, and reputation.' },
  { question: 'Livia Tessa', answer: 'Hmm...sulit dijelaskan, tapi kesempurnaan itu nyata. Yang pasti, ia bojo penciptaku. Ojo macem-macem!' },
  { question: 'e-commerce', answer: 'E-commerce refers to buying and selling goods or services over the internet.' },
  { question: 'UX design', answer: 'User Experience (UX) design focuses on enhancing user satisfaction with a product or service.' },
  { question: 'social media', answer: 'Social media platforms allow users to share content, interact, and build communities online.' },
  { question: 'cybersecurity', answer: 'Cybersecurity protects digital systems and data from attacks, breaches, and unauthorized access.' },
  { question: 'hacker', answer: 'A hacker is someone skilled in computer systems, sometimes using knowledge for security breaches.' },
  { question: 'internet', answer: 'The internet is a global network connecting millions of devices for communication and information.' },
  { question: 'cloud computing', answer: 'Cloud computing enables data storage and processing over the internet rather than local devices.' },
  { question: 'programming', answer: 'Programming is writing instructions for computers using languages like Python, Java, or JavaScript.' },
  { question: 'software', answer: 'Software consists of programs and applications that run on computers and digital devices.' },
  { question: 'hardware', answer: 'Hardware refers to the physical components of a computer or electronic system.' },
  { question: 'space exploration', answer: 'Space exploration involves studying and traveling beyond Earth’s atmosphere using spacecraft.' },
  { question: 'satellite', answer: 'A satellite is an object in orbit around a planet, used for communication and research.' },
  { question: 'astronaut', answer: 'An astronaut is a person trained to travel and work in space.' },
  { question: 'renewable energy', answer: 'Renewable energy comes from natural sources like solar, wind, and hydro power.' },
  { question: 'fossil fuels', answer: 'Fossil fuels, such as coal, oil, and gas, are energy sources formed from ancient organisms.' },
  { question: 'electric vehicle', answer: 'An electric vehicle (EV) runs on electricity instead of gasoline or diesel fuel.' },
  { question: 'sustainability', answer: 'Sustainability is the practice of meeting needs without compromising future resources.' },
  { question: 'climate activism', answer: 'Climate activism involves efforts to address and mitigate the effects of climate change.' },
  { question: 'veganism', answer: 'Veganism is a lifestyle that excludes animal products for ethical, environmental, or health reasons.' },
  { question: 'coffee', answer: 'Coffee is a popular beverage made from roasted coffee beans, rich in caffeine.' },
  { question: 'fashion', answer: 'Fashion refers to styles of clothing, accessories, and self-expression over time.' },
  { question: 'music', answer: 'Music is an art form using sound and rhythm to express emotion and ideas.' },
  { question: 'rock and roll', answer: 'Rock and roll is a genre of music characterized by electric guitars and energetic beats.' },
  { question: 'punk', answer: 'Punk is a music genre and subculture known for its rebellious attitude and DIY ethos.' },
  { question: 'goth', answer: 'Goth is a subculture embracing dark aesthetics, music, and fashion.' },
  { question: 'tattoos', answer: 'Tattoos are permanent designs inked onto the skin for artistic or symbolic purposes.' },
  { question: 'samurai', answer: 'Samurai adalah prajurit Jepang pada zaman feodal yang terkenal dengan kode kehormatan mereka, Bushido.' },
    { question: 'candi borobudur', answer: 'Candi Borobudur adalah candi Buddha terbesar di dunia yang terletak di Magelang, Indonesia.' },
    { question: 'aurora', answer: 'Aurora adalah fenomena cahaya alami di langit kutub yang disebabkan oleh interaksi partikel matahari dengan atmosfer bumi.' },
    { question: 'berenang', answer: 'Berenang adalah olahraga atau aktivitas rekreasi di air yang bermanfaat bagi kesehatan jantung dan otot.' },
    { question: 'sushi', answer: 'Sushi adalah makanan khas Jepang yang terdiri dari nasi yang diberi cuka dan dipadukan dengan ikan atau makanan laut lainnya.' },
    { question: 'pantun', answer: 'Pantun adalah bentuk puisi lama dari Indonesia dan Malaysia yang bersajak a-b-a-b dan memiliki makna mendalam.' },
    { question: 'hacker', answer: 'Hacker adalah seseorang yang memiliki keterampilan dalam meretas atau mengeksploitasi sistem komputer.' },
    { question: 'baterai', answer: 'Baterai adalah perangkat yang menyimpan dan melepaskan energi listrik melalui reaksi kimia.' },
    { question: 'monalisa', answer: 'Mona Lisa adalah lukisan terkenal karya Leonardo da Vinci yang memiliki senyuman misterius.' },
    { question: 'matahari', answer: 'Matahari adalah bintang di pusat tata surya yang menyediakan energi bagi kehidupan di Bumi.' },
    { question: 'kripto', answer: 'Kripto adalah mata uang digital yang menggunakan teknologi blockchain untuk transaksi yang aman dan terdesentralisasi.' },
    { question: 'badak jawa', answer: 'Badak Jawa adalah spesies badak langka yang hanya ditemukan di Taman Nasional Ujung Kulon.' },
    { question: 'gravity', answer: 'Gaya gravitasi adalah gaya tarik menarik yang terjadi antara dua benda bermassa.' },
    { question: 'bunga sakura', answer: 'Sakura adalah bunga khas Jepang yang melambangkan keindahan dan kefanaan hidup.' },
    { question: 'self driving car', answer: 'Self-driving car adalah mobil yang dapat bergerak sendiri tanpa pengemudi manusia, menggunakan sensor dan AI.' },
    { question: 'dinosaurus', answer: 'Dinosaurus adalah reptil purba yang mendominasi Bumi selama era Mesozoikum.' },
    { question: 'perang dunia 2', answer: 'Perang Dunia II adalah konflik global yang berlangsung antara 1939 hingga 1945 dan melibatkan banyak negara.' },
    { question: 'kopi', answer: 'Kopi adalah minuman yang berasal dari biji kopi yang diseduh dan mengandung kafein.' },
    { question: 'harimau sumatera', answer: 'Harimau Sumatera adalah spesies harimau yang hanya ditemukan di Pulau Sumatera dan terancam punah.' },
    { question: 'robot', answer: 'Robot adalah mesin yang dapat diprogram untuk melakukan tugas tertentu secara otomatis.' },
    { question: 'batik', answer: 'Batik adalah kain khas Indonesia yang dibuat dengan teknik pewarnaan lilin.' },
    { question: 'satelit', answer: 'Satelit adalah objek yang mengorbit benda langit, dapat berupa alami seperti bulan atau buatan seperti satelit komunikasi.' },
    { question: 'astronot', answer: 'Astronot adalah seseorang yang dilatih untuk melakukan perjalanan ke luar angkasa.' },
    { question: 'piramida', answer: 'Piramida adalah struktur kuno berbentuk segitiga yang dibangun oleh peradaban seperti Mesir dan Maya.' },
    { question: 'bioluminesensi', answer: 'Bioluminesensi adalah kemampuan makhluk hidup untuk menghasilkan cahaya sendiri.' },
    { question: 'tsunami', answer: 'Tsunami adalah gelombang laut besar yang disebabkan oleh gempa bumi atau letusan gunung api bawah laut.' },
    { question: 'origami', answer: 'Origami adalah seni melipat kertas asal Jepang yang dapat membentuk berbagai objek tanpa menggunakan gunting atau lem.' },
    { question: 'mata uang', answer: 'Mata uang adalah alat tukar resmi yang digunakan dalam transaksi ekonomi suatu negara.' },
    { question: 'catur', answer: 'Catur adalah permainan strategi yang dimainkan di papan dengan 64 kotak dan bidak khusus.' },
    { question: 'listrik', answer: 'Listrik adalah aliran muatan listrik yang digunakan untuk menyalakan berbagai perangkat elektronik.' },
    { question: 'gunung merapi', answer: 'Gunung Merapi adalah gunung berapi paling aktif di Indonesia yang terletak di perbatasan Jawa Tengah dan Yogyakarta.' },
    { question: 'fibonacci', answer: 'Deret Fibonacci adalah urutan angka di mana setiap angka adalah jumlah dari dua angka sebelumnya.' },
    { question: 'pramuka', answer: 'Pramuka adalah gerakan kepanduan yang bertujuan membentuk karakter, keterampilan, dan kemandirian pemuda.' },
    { question: 'hologram', answer: 'Hologram adalah gambar tiga dimensi yang dibuat menggunakan teknologi cahaya laser.' },
    { question: 'ekosistem', answer: 'Ekosistem adalah komunitas makhluk hidup yang berinteraksi dengan lingkungan sekitarnya.' },
    { question: 'meteor', answer: 'Meteor adalah benda luar angkasa yang terbakar saat memasuki atmosfer Bumi, sering disebut bintang jatuh.' },
    { question: 'internet', answer: 'Internet adalah jaringan global yang menghubungkan komputer di seluruh dunia untuk berbagi informasi.' },
    { question: 'blockchain', answer: 'Blockchain adalah teknologi penyimpanan data terdesentralisasi yang digunakan dalam berbagai aplikasi digital.' },
    { question: 'bajak laut', answer: 'Bajak laut adalah penjahat laut yang merampok kapal dagang di lautan.' },
    { question: 'sungai amazon', answer: 'Sungai Amazon adalah sungai terbesar di dunia berdasarkan volume air dan terletak di Amerika Selatan.' },
    { question: 'mata kucing', answer: 'Mata kucing memiliki kemampuan reflektif yang memungkinkannya melihat lebih baik dalam kondisi minim cahaya.' },
    { question: 'karate', answer: 'Karate adalah seni bela diri asal Jepang yang mengandalkan pukulan dan tendangan.' },
    { question: 'taman safari', answer: 'Taman Safari adalah tempat wisata yang memungkinkan pengunjung melihat satwa liar dari dalam kendaraan.' },
    { question: 'daun mint', answer: 'Daun mint memiliki aroma segar dan sering digunakan sebagai bahan penyegar atau obat herbal.' },
    { question: 'aurora borealis', answer: 'Aurora borealis adalah fenomena cahaya warna-warni di langit utara akibat interaksi partikel matahari dengan atmosfer.' },
    { question: 'lego', answer: 'Lego adalah mainan konstruksi berbentuk balok kecil yang dapat dirangkai menjadi berbagai bentuk.' },
    { question: 'nuklir', answer: 'Nuklir adalah energi yang dihasilkan dari reaksi inti atom dan dapat digunakan untuk pembangkit listrik maupun senjata.' },
    { question: 'piramida makanan', answer: 'Piramida makanan adalah panduan nutrisi yang menunjukkan kelompok makanan dan porsinya untuk pola makan sehat.' },
    { question: 'burung hantu', answer: 'Burung hantu adalah burung nokturnal yang memiliki penglihatan tajam dan kemampuan berburu di malam hari.' },
    { question: 'siapa Adimas Immanuel', answer: 'Adimas adalah penulis dan pengembang saya. Kepadanya saya berutang segala rasa.' },
    { question: 'siapa Arman Dhani', answer: 'Dhani adalah jurnalis, penulis, dan lara ati enthusiast. Kalau aja dia tekun bersiasat, tamak dan nekat sedikit, dia bisa jadi seperti Bahlil.' },
    { question: 'bagaimana nasib negaraku?', answer: 'Jika yang kamu maksud adalah Indonesia, sorry no comment. He he he.' },
    { question: 'Indonesia gelap atau terang?', answer: 'Apa kondisi malam dini hari di pelosok desa saat listrik belum masuk? Nah.' },
    { question: 'Nasib perfilman Indonesia?', answer: 'Seperti visi musisi yang baru ditunjuk itu: mengapa harus selalu sinema yang mengalah??' },
    { question: 'Anggi Noen', answer: 'Anggi Noen adalah sutradara Indonesia yang dikenal karena kemahirannya bercerita dan mendapat banyak penghargaan prestisius. Selangkah lagi ia jadi Quentin Tarantino asal lebih sering makan bakmi Jawa.' },
    { question: 'Angga Sasongko', answer: 'Ia adalah revolusioner sinema Indonesia yang melahirkan banyak karya bagus bersama Visinema Pictures. Rambut gondrongnya pun sangat ikonik. Kalau sabar sedikit, pengikutnya bakal banyak dari berbagai bangsa. Karena ia punya modal seperti ciri tokoh besar dalam sejarah umat manusia: gondrong dan nekat.' },
    

  
    // Handling Strange or Unknown Questions
  ];


  
  
  const handleSend = (query: string) => {
    if (query.trim() === '') return;
  
    setQuestion(query);
    setIsThinking(true);
    setDisplayedText('');
  
    const matchedResponse = qnaTemplates.find(qna => query.toLowerCase().includes(qna.question.toLowerCase()));
  
    let fullResponse = '';
  
    if (matchedResponse) {
      fullResponse = matchedResponse.answer;
    } else {
      const queryWords = query.split(' ');
      const randomWord = queryWords[Math.floor(Math.random() * queryWords.length)];
  
      fullResponse = `Not sure why you're asking about "${randomWord}", but let’s be real—Rockstock is way cooler.`;
    }
  
    setTimeout(() => {
      setIsThinking(false);
      setResponses([fullResponse]);
  
      let i = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText(fullResponse.slice(0, i));
        i++;
        if (i > fullResponse.length) clearInterval(typingInterval);
      }, 50);
    }, 1000);
  };  


  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const resetChat = () => {
    setInput('');
    setQuestion(null);
    setResponses([]);
    setDisplayedText('');
    setSuggestions([]);
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl mb-8 font-bold text-black">Rockstock AI. Ask me anything.</h2>

        {!question && (
          <div className="flex flex-col relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask something..."
              className="border border-black text-black rounded-md p-2"
            />
            
            <div className="mt-2 space-y-2">
              {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="text-left bg-white p-2 rounded-md border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSend(suggestion.question)}
                >
                  <p className="font-semibold text-black">{suggestion.question}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSend(input)}
              className="border-2 border-red-600 text-red-600 rounded-md p-2 mt-4 hover:bg-red-600 hover:text-white transition duration-300"
            >
              Send
            </button>
          </div>
        )}

        {question && (
          <div className="mt-8">
            <p className="font-semibold text-black">{question}</p>
            {isThinking ? (
              <p className="text-gray-500 mt-2">Thinking...</p>
            ) : (
              <p className="mt-4 text-black">{displayedText}</p>
            )}

            {!isThinking && displayedText === responses[0] && (
              <button
                onClick={resetChat}
                className="mt-6 border-2 border-red-600 text-red-600 rounded-md p-2 hover:bg-red-600 hover:text-white transition duration-300"
              >
                Ask Another
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISection;

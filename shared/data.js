// ============================================================
// COCINERO NOMADA — Shared Content Data
// Used by both App and eBook versions
// Recipes sourced exclusively from libro.md (2026)
// ============================================================

const BRAND = {
  name: "Cocinero Nomada",
  tagline: "Sabores sin fronteras",
  youtube: "https://youtube.com/@cocineronomadapr",
  instagram: "@cocineronomada",
  colors: {
    black: "#0f0d0b",
    darkBrown: "#1a1612",
    midBrown: "#211d18",
    border: "#2e2820",
    red: "#b83220",
    orange: "#d4622a",
    gold: "#c9973f",
    cream: "#e8dcc8",
    muted: "#7a6e62",
    teal: "#8ab",
  },
  assets: {
    isologoBlack: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-ISOLOGO-BLACK.png",
    isologoWhite: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-ISOLOGO-WHITE.png",
    logotipoBlack: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-LOGOTIPO-BLACK.png",
    logotipoWhite: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-LOGOTIPO-WHITE.png",
    alternativeBlack: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-ALTERNATIVE-BLACK.png",
    alternativeWhite: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-ALTERNATIVE-WHITE.png",
    palmsPatternBlack: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-PALMS-PATTERN-BLACK.png",
    palmsPatternWhite: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-PALMS-PATTERN-WHITE.png",
    wallpaperUno: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-WALLPAPER-UNO.png",
    wallpaperDos: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-WALLPAPER-DOS.png",
    wallpaperTres: "../assets/COCINERO_NOMADA/COCINERO-NOMADA-WALLPAPER-TRES.png",
  }
};

const COUNTRY_COLORS = {
  "Puerto Rico": "#b83220",
  "Estados Unidos": "#5a7d9a",
  "Colombia": "#c9973f",
  "Peru": "#d4622a",
  "Mexico": "#4a7a5f",
  "Ecuador": "#6a5acd"
};

const LOCATIONS = [
  {
    id: "san-juan",
    city: "San Juan",
    country: "Puerto Rico",
    flag: "\u{1f1f5}\u{1f1f7}",
    mapX: 96, mapY: 14,
    chapter: 1,
    subtitle: "El desgaste romantico",
    story: "La isla donde todo comenzo. El sofrito de mi abuela, el mofongo con camarones al ajillo, las alcapurrias de la playa \u2014 estos sabores son mi norte, mi punto de partida.",
    fullStory: "Naci en una cocina. No literalmente, pero casi. Mi abuela tenia siempre algo en el fogon \u2014 un caldero de arroz con gandules, un pernil marinandose desde la noche anterior, o el olor del sofrito que despertaba a toda la casa antes que el gallo.\n\nSan Juan es ruidoso, caliente, humedo. Huele a mar y a fritura. Las calles del Viejo San Juan tienen ese encanto colonial, pero la magia esta en los chinchorritos de Pinones, en La Placita de noche, en la senora que vende bacalaitos en la esquina con una salsa que no le da la receta a nadie.\n\nRecuerdo claramente el dia que visite lo que fue la Pernileria los Proceres en Lote 23, un proyecto innovador para ese momento que formo parte de un movimiento de nuevos emprendimientos gastronomicos en la zona de Santurce. Yo lo veia como un new age era, un resurgir de una generacion de cocineros que a pesar de las dificultades de Puerto Rico vieron en Santurce una oportunidad \u2014 y resulto. Hoy dia podemos ver como de ver Santurce con edificios abandonados, vemos una nueva ola de cafes y restaurantes. En hora buena.\n\nAhi conoci a Pedro y Miguel de The Lemon Experience, dos chefs de Murcia, Espana. Fue como si el destino hubiera conspirado para que nos cruzaramos justo cuando estaba planeando mi viaje, lleno de miedos y metas por cumplir. Su presencia motivadora fue el impulso que necesitaba para lanzarme a la aventura. Pedro, Miguel y el chef Mario Juan habian creado juntos un sandwich de pernil especial con escalivada catalana \u2014 lo llamaron el 'Acho Pijo'. Yo tuve la oportunidad de grabar y que me mostraran la historia detras de su creacion. Fue un momento de compartir y aprendizaje, donde cada bocado nos transporto a los sabores de Cataluna y Murcia.\n\nDe aqui sali con un cuchillo, un pasaporte y hambre. No hambre de comer \u2014 hambre de entender. De saber como sabe el mundo.",
    recipes: [
      {
        name: "El Acho Pijo",
        desc: "Sandwich de pernil boricua con escalivada catalana. Fusion de Puerto Rico y Espana nacida en Lote 23, Santurce.",
        tags: ["Fusion", "Pernil", "Escalivada"],
        emoji: "\u{1f96a}",
        bookChapter: 2,
        fullRecipe: {
          servings: "4 sandwiches",
          time: "1 hora (+ marinado del pernil)",
          difficulty: "Media",
          ingredients: [
            "1 lb pernil de cerdo desmechado con chicharron crujiente",
            "2 pimientos rojos grandes",
            "1 berenjena grande",
            "2 cebollas medianas",
            "4 cdas aceite de oliva extra virgen",
            "Hierbas aromaticas frescas (romero, tomillo)",
            "4 panes crujientes tipo baguette",
            "Sal y pimienta al gusto"
          ],
          steps: [
            "Prepara el pernil: marina la carne de cerdo con adobo criollo y hornea lento hasta que se deshaga. Reserva el chicharron crujiente.",
            "Para la escalivada: asa los pimientos, berenjenas y cebollas enteros al horno a 400F hasta que la piel se separe y la carne quede dulce y suave (40-50 min).",
            "Pela los vegetales asados y corta en tiras. Alina con aceite de oliva, sal y hierbas aromaticas.",
            "Ensambla: pan crujiente, base generosa de pernil desmechado con chicharron, escalivada encima.",
            "Sirve caliente. Dos mundos en un bocado \u2014 Puerto Rico y Cataluna."
          ]
        }
      }
    ]
  },
  {
    id: "vieques",
    city: "Vieques",
    country: "Puerto Rico",
    flag: "\u{1f1f5}\u{1f1f7}",
    mapX: 99, mapY: 15,
    chapter: 2,
    subtitle: "Antes de saber adonde ir",
    story: "La isla colonia de la colonia. Seis meses en una carpa, con el sonido del mar como unica constante. Aqui aprendi a ralentizar antes de aprender a cocinar.",
    fullStory: "Hay cosas que uno hace sin poder explicarlas todavia. Cuando me fui a Vieques no tenia una razon articulada \u2014 solo necesitaba parar. No en el sentido de descansar. En el sentido de salir del circuito.\n\nSeis meses. En una carpa. El suelo de las playas de Vieques tiene una arena distinta a la de las playas mas turisticas de Puerto Rico: mas fina, mas suave, de ese color que el Caribe oriental tiene y que el occidental no tiene de la misma manera. Dormia con el sonido del mar como unica constante y me despertaba con una luz que entraba por las costuras de la tela.\n\nTrabaje en un restaurante del pueblo con una chef de San Juan que habia salido del circuito. En San Juan, si necesitabas un producto especifico, lo conseguias. En Vieques, lo que llegaba en el ferry era lo que habia. El menu no podia ser un documento fijo. Tenia que ser una respuesta a lo que estaba disponible.\n\nDespues estuve en La Esperanza. El otro pueblo de Vieques, mas pequeno, mas tranquilo. Ahi aprendi que la velocidad del fine dining no es la velocidad universal de la cocina. Es una velocidad especifica para un contexto especifico.\n\nLa bahia bioluminiscente. Microorganismos que producen luz como respuesta al movimiento. Si metes la mano en el agua, la mano brilla. Si nadas, el cuerpo deja una estela de luz verde-azul. El turista la ve una noche y la fotografia. Quien se queda la ve muchas noches y aprende a tenerla.\n\nEsa diferencia la entendi en Vieques antes de entenderla en la cocina.",
    recipes: []
  },
  {
    id: "new-york",
    city: "New York",
    country: "Estados Unidos",
    flag: "\u{1f5fd}",
    mapX: 92, mapY: 5,
    chapter: 4,
    video: "kRfYRHU6n68",
    subtitle: "El lugar del que vengo",
    story: "Naci en el Bronx. 27 de noviembre de 1989. La ciudad no me crio, pero cada verano me reclamaba. Entre los bloques del Bronx y los cuchifritos de la avenida, entendi la comida como identidad.",
    fullStory: "Naci en el Bronx. Hospital Mount Sinai. Pero esa ciudad no me crio. Me tuvo dos anos y me solto hacia el Caribe. Me llevaron a Puerto Rico cuando todavia no tenia palabras para entender lo que estaba pasando.\n\nY ahi fue donde creci. La isla me formo. Pero cada verano, el Bronx me reclamaba. Era un ritual. Verano tras verano en los bloques del Bronx.\n\nLo que mas marcaba cada visita eran los cuchifritos. El puesto de cuchifritos en el Bronx no es un lugar donde la gente va a sentarse. Es un lugar donde la gente para en movimiento, pide, come de pie o caminando, y sigue. Morcilla, rellenos de papa, alcapurrias, tostones, chicharron. Todo en una bandeja de carton caliente.\n\nComer cuchifritos en el Bronx siendo puertorriqueno nacido en ese mismo barrio pero criado en la isla es un acto de reconocimiento. El sabor te dice quien eres. La diaspora boricua tiene una geografia particular \u2014 circular, de ida y vuelta. Con dos acentos que negociaban entre si. Con la salsa y el hip-hop como el mismo idioma en dos dialectos diferentes.\n\nNueva York no te da la bienvenida. Te reconoce.",
    recipes: [
      {
        name: "Cuchifritos del Bronx",
        desc: "Frituras boricuas de la diaspora. Morcilla, rellenos de papa, alcapurrias, tostones y chicharron. Comidos de pie, en movimiento.",
        tags: ["Diaspora", "Frituras", "Callejero"],
        emoji: "\u{1f35f}",
        bookChapter: 3,
        fullRecipe: {
          servings: "6-8 porciones para compartir",
          time: "1.5 horas",
          difficulty: "Media-Alta",
          ingredients: [
            "Para alcapurrias: 2 lbs platano verde y yautia rallados, 1/2 lb carne molida sazonada",
            "Para rellenos de papa: 6 papas, 1/2 lb carne molida con sofrito",
            "Para tostones: 4 platanos verdes, sal, aceite",
            "1 lb chicharron de cerdo",
            "1 lb morcilla",
            "Aceite vegetal para freir",
            "Sofrito, sazon, sal al gusto"
          ],
          steps: [
            "Alcapurrias: mezcla platano y yautia rallados con achiote. Forma ovals, rellena con carne, cierra y frie en aceite caliente hasta dorar.",
            "Rellenos de papa: sancoca papas, prensa en pure, forma bolitas rellenas de carne, empaniza y frie.",
            "Tostones: corta platano en rodajas de 1 pulgada, frie, aplasta, frie de nuevo hasta crujir.",
            "Chicharron: frie la piel de cerdo hasta que cruja. Morcilla: frie entera hasta que la piel este crujiente.",
            "Sirve todo junto en bandeja de carton. Se come de pie, en la avenida, con salsa picante."
          ]
        }
      }
    ]
  },
  {
    id: "cartagena",
    city: "Cartagena",
    country: "Colombia",
    flag: "\u{1f1e8}\u{1f1f4}",
    mapX: 44, mapY: 37,
    chapter: 5,
    subtitle: "La diferencia entre lo que se muestra y lo que es",
    story: "Colombia fue mi primer destino cuando la idea de ser un cocinero nomada comenzo a tomar forma. La calidez de Cartagena me hizo sentir como en casa desde el primer momento.",
    fullStory: "Cartagena de Indias \u2014 fundada el 1 de junio de 1533 por Pedro Heredia \u2014 se convirtio rapidamente en un centro prospero gracias a la exportacion de oro, esmeraldas y otras riquezas que la posicionaron como un puerto comercial vital para las rutas que conectaban Peru con Cuba y Espana. Mi viaje a Cartagena en 2019 marco el inicio de mi aventura como cocinero nomada, y fue un verdadero tesoro de experiencias y sabores que quedaron grabados en mi memoria.\n\nColombia fue mi primer destino cuando la idea de ser un cocinero nomada comenzo a tomar forma. La calidez y amabilidad de la gente de Cartagena me hicieron sentir como en casa desde el primer momento. La esencia caribena que impregna cada rincon de esta ciudad me recordaba a mis propias raices, creando un lazo especial que se reflejaba en cada sonrisa y gesto de hospitalidad.\n\nDurante mi semana en Cartagena, quede maravillado por la diversidad y frescura de los productos locales. Los vendedores de frutas y jugos ofrecian una explosion de colores y sabores en cada esquina, algo completamente nuevo para mi. Descubri los 'menu' locales, lugares donde la autenticidad de la cocina cartagenera se revelaba en platos como el salpicon de pescado, una delicia marinera que cautivo mi paladar y desperto mi curiosidad gastronomica.\n\nUno de los encantos mas emblematicos de Cartagena son las palenqueras, mujeres hermosamente vestidas con ropas coloridas que llevan consigo la tradicion y el legado de la cultura afrodescendiente. Su presencia en las calles es un recordatorio de la diversidad y la historia viva que define a esta ciudad.\n\nEl costo accesible de la comida tambien fue una grata sorpresa. Por solo 5,000 pesos colombianos, pude disfrutar de autenticos sabores locales y explorar las delicias de la gastronomia cartagenera. Si hay un lugar al que estoy seguro de volver, ese sera Cartagena \u2014 una ciudad que cautiva corazones y paladares por igual.",
    localVideos: [
      { file: "../assets/videos/cartagena/DSCN1051.MOV", title: "Calles de Cartagena", intro: "Un paseo por las calles coloniales de la ciudad amurallada, donde cada esquina esconde historia y sabor.", nico: "Cartagena me recibio con los brazos abiertos. Esta caminata fue mi primer dia como cocinero nomada." },
      { file: "../assets/videos/cartagena/DSCN1055.MOV", title: "Sabores del Caribe", intro: "Los mercados y puestos callejeros donde la comida cartagenera cobra vida.", nico: "La frescura de los ingredientes aqui no se compara con nada. Todo huele a mar y a especias." },
      { file: "../assets/videos/cartagena/DSCN1056.MOV", title: "Getsemani Vivo", intro: "El barrio mas autentico de Cartagena, lleno de color, musica y comida real.", nico: "Getsemani es donde late el corazon verdadero de Cartagena. Lejos del turismo, cerca de la gente." },
      { file: "../assets/videos/cartagena/DSCN1060.MOV", title: "Mercado Local", intro: "Dentro de los mercados donde los cartageneros compran y comen cada dia.", nico: "Aqui encontre los menus de 5,000 pesos que cambiaron mi manera de ver la comida callejera." },
      { file: "../assets/videos/cartagena/DSCN1072.MOV", title: "Atardecer Cartagenero", intro: "Los colores del atardecer sobre las murallas de la ciudad.", nico: "Ese momento donde el sol cae sobre la muralla y todo se vuelve dorado. Cartagena pura magia." },
      { file: "../assets/videos/cartagena/Menu-Colombia.MOV", title: "Menu Colombia", intro: "La experiencia completa de un menu colombiano — arroz, proteina, ensalada, jugo y sopa.", nico: "Por menos de 2 dolares te comes un almuerzo completo. Eso es Colombia." }
    ],
    recipes: []
  },
  {
    id: "rincon-del-mar",
    city: "Rincon del Mar",
    country: "Colombia",
    flag: "\u{1f1e8}\u{1f1f4}",
    mapX: 50, mapY: 32,
    chapter: 6,
    subtitle: "El paraiso escondido",
    story: "Un pueblo pesquero donde el tiempo se detuvo. Rincon del Mar es el secreto mejor guardado del Caribe colombiano.",
    fullStory: "Proximamente...",
    localVideos: [
      { file: "../assets/videos/rincon-del-mar/DSCN1027.MOV", title: "Rincon del Mar", intro: "Un pueblo pesquero donde el Caribe colombiano se muestra en su forma mas pura y autentica.", nico: "Rincon del Mar es de esos lugares que no salen en las guias. Llegue por recomendacion de un local y fue de lo mejor del viaje." }
    ],
    recipes: []
  },
  {
    id: "palomino",
    city: "Palomino",
    country: "Colombia",
    flag: "\u{1f1e8}\u{1f1f4}",
    mapX: 59, mapY: 25,
    chapter: 9,
    subtitle: "Donde el rio baja al mar",
    story: "Palomino es donde la Sierra Nevada de Santa Marta se encuentra con el Caribe. Arena, selva, rio y comida de pueblo.",
    fullStory: "Proximamente...",
    localPhotos: [
      { file: "../assets/videos/palomino/DSCN1412.JPG", title: "Mercado de Frutas", intro: "El puesto de frutas tropicales en Palomino — papaya, mango, aguacate, maracuya, todo fresco del campo.", nico: "Este puesto tenia frutas que nunca habia visto. La variedad de Colombia es increible." },
      { file: "../assets/videos/palomino/DSCN1416.JPG", title: "Letreros de Palomino", intro: "La entrada al pueblo con sus letreros pintados a mano. Cada hostal, cada restaurante, con su propia identidad artesanal.", nico: "Los letreros de Palomino cuentan su historia — un pueblo de mochileros, surf y buena onda." }
    ],
    recipes: []
  },
  {
    id: "taganga",
    city: "Santa Marta",
    country: "Colombia",
    flag: "\u{1f1e8}\u{1f1f4}",
    mapX: 54, mapY: 29,
    chapter: 7,
    video: "o2fJLNUMpHQ",
    subtitle: "El calor que precede al ascenso",
    story: "Santa Marta no es el destino. Es el punto de partida. En el mercado de los carros publicos, entre el ruido y el calor, encontre el pastel de arroz y el guarapo de cana.",
    fullStory: "Taganga es un pueblo que todavia vive del mar. La bahia rodeada de montanas verdes, los botes de colores amarrados en la orilla, los pescadores que salen antes del amanecer y regresan con la pesca del dia. Aqui no hay pretension \u2014 hay estaderos con techos de zinc donde te sirven el pescado que salio del agua esa manana.\n\nEn la playa probe el pastel de arroz \u2014 envuelto en hoja de platano, cocido al vapor, con su salsa por encima. Comido con los pies en la arena, bajo la sombra de una palmera, con el sonido de las olas de fondo. Eso es lujo real.\n\nEl raspao \u2014 hielo raspado con sirope de colores \u2014 es la tradicion callejera que refresca las tardes calientes del Caribe colombiano. Los carritos con sus sombrillas de colores son parte del paisaje tanto como las montanas.\n\nSanta Marta tiene ese encanto de ciudad antigua. Los 'menu' locales donde comes mojarra en coco, salpicon de pescado, o carne guisada con arroz de frijoles y tajadas maduras \u2014 todo por precios que no existen en el resto del mundo. Los techos de zinc de los estaderos, las letras pintadas a mano, el olor a pescado frito \u2014 eso es el Caribe real.",
    recipes: [
      {
        name: "Pastel de Arroz",
        desc: "Arroz cocinado con especias, envuelto en hoja de bijao, cocido al vapor. Precision popular de siglos.",
        tags: ["Arroz", "Hoja de Platano", "Costeno"],
        emoji: "\u{1f35a}",
        bookChapter: 6,
        fullRecipe: {
          servings: "8-10 pasteles",
          time: "2 horas",
          difficulty: "Media-Alta",
          ingredients: [
            "2 tazas arroz cocido", "1/2 lb pollo desmechado",
            "Hogao (cebolla y tomate sofrito)", "Aceitunas",
            "1 zanahoria rallada", "Hojas de platano o bijao",
            "Aji dulce, comino, sal", "Hilo para amarrar"
          ],
          steps: [
            "Licua el arroz cocido con un poco de caldo hasta hacer una masa suave.",
            "Prepara el relleno: pollo con hogao, zanahoria, aceitunas y especias.",
            "Corta las hojas de platano en cuadros y pasalas por fuego para suavizarlas.",
            "Pon una capa de masa de arroz en la hoja, agrega relleno, cierra y amarra con hilo.",
            "Cocina al vapor por 45 minutos. Sirve con salsa de tomate o aji."
          ]
        }
      },
      {
        name: "Guarapo de Cana",
        desc: "Jugo de cana prensada al momento. Dulzura que no es azucar refinada sino cana entera, con ese fondo terroso que recuerda la tierra.",
        tags: ["Bebida", "Callejero", "Natural"],
        emoji: "\u{1f9c3}",
        bookChapter: 6,
        fullRecipe: {
          servings: "4 vasos",
          time: "5 min",
          difficulty: "Facil",
          ingredients: [
            "4-5 tallos de cana de azucar fresca",
            "Hielo",
            "Jugo de limon (opcional)",
            "Jengibre fresco (opcional)"
          ],
          steps: [
            "Pela los tallos de cana y corta en trozos que quepan en el trapiche o prensa.",
            "Pasa la cana por el trapiche para extraer el jugo. Repite para sacar todo el liquido.",
            "Cuela el jugo para remover fibras.",
            "Sirve frio con hielo. Opcionalmente agrega un toque de limon o jengibre.",
            "Se toma de pie, en el mercado, como combustible para lo que viene."
          ]
        }
      }
    ]
  },
  {
    id: "bogota",
    city: "Bogota",
    country: "Colombia",
    flag: "\u{1f1e8}\u{1f1f4}",
    mapX: 52, mapY: 48,
    chapter: 10,
    subtitle: "La Puerta Falsa y el sabor del tiempo",
    story: "En la Candelaria probe mi primer ajiaco y entendi por que los bogotanos lo defienden con tanta pasion. Tres tipos de papa, pollo, guascas \u2014 un solo plato que cuenta toda una cultura.",
    fullStory: "Bogota es fria y gris, pero la comida te calienta el alma. En la Candelaria, entre grafitis y casas coloniales, encontre un restaurante donde servian ajiaco en ollas de barro. Tres papas diferentes \u2014 criolla, pastusa y sabanera \u2014 cada una con su textura, derritiendose en un caldo con guascas, esa hierba que solo existe en Colombia.\n\nEl desayuno bogotano es otro mundo. Changua: leche hervida con huevo pochado y cilantro. Suena raro, sabe a casa. Tamal con chocolate caliente. Almojabanas. Esta ciudad come en serio.\n\nBogota me enseno que la cocina andina no tiene nada que envidiarle a la costera.",
    recipes: [
      {
        name: "Bandeja Paisa",
        desc: "Frijoles, arroz, carne molida, chicharron, huevo frito, platano maduro, aguacate, arepa. Abundancia sin pretension, nacida de alimentar gente que hacia trabajo fisico duro.",
        tags: ["Paisa", "Completo", "Tradicion"],
        emoji: "\u{1fad8}",
        bookChapter: 9,
        fullRecipe: {
          servings: "2 porciones",
          time: "2 horas",
          difficulty: "Alta",
          ingredients: [
            "1 taza frijoles rojos (remojados)", "1 taza arroz blanco",
            "1/2 lb carne molida", "200g chicharron", "2 huevos",
            "1 aguacate", "2 arepas blancas",
            "2 tajadas de platano maduro",
            "Hogao (tomate y cebolla sofrita)"
          ],
          steps: [
            "Cocina los frijoles con sal hasta que esten tiernos (1.5 horas o en presion 30 min).",
            "Prepara el arroz blanco. Frie el chicharron hasta que cruja.",
            "Cocina la carne molida con hogao.",
            "Frie los huevos y las tajadas de platano maduro.",
            "Ensambla: cada plato lleva todos los componentes. Sirve con aguacate y arepa. Un plato que es una declaracion."
          ]
        }
      },
      {
        name: "Ajiaco Bogotano",
        desc: "Bogota en un plato. Tres tipos de papa, pollo, mazorca, guasca, alcaparras. Un caldo con profundidad que solo dan los ingredientes que llevan tiempo juntos.",
        tags: ["Sopa", "Pollo", "Bogotano"],
        emoji: "\u{1f357}",
        bookChapter: 9,
        fullRecipe: {
          servings: "6 porciones",
          time: "1.5 horas",
          difficulty: "Media",
          ingredients: [
            "1 pollo entero en presas", "3 papas criollas",
            "3 papas pastusas", "3 papas sabaneras",
            "3 mazorcas", "Guascas frescas o secas",
            "Crema de leche", "Alcaparras", "Aguacate"
          ],
          steps: [
            "Hierve el pollo en agua con sal hasta cocinar (40 min). Saca y desmecha.",
            "En el mismo caldo, agrega las tres papas cortadas. La criolla se deshace y espesa el caldo naturalmente.",
            "Agrega mazorcas y cocina 20 min. Agrega guascas al final.",
            "Sirve con pollo desmechado, crema, alcaparras y aguacate."
          ]
        }
      },
      {
        name: "Chocolate Santafereno",
        desc: "Espeso, caliente, con queso adentro y pan al lado. No es postre \u2014 es ritual. La forma en que Bogota ha cerrado la tarde durante siglos.",
        tags: ["Bebida", "Ritual", "Bogotano"],
        emoji: "\u{2615}",
        bookChapter: 9,
        fullRecipe: {
          servings: "2 porciones",
          time: "15 min",
          difficulty: "Facil",
          ingredients: [
            "2 pastillas de chocolate santafereno (o chocolate de mesa colombiano)",
            "2 tazas de leche",
            "1 taza de agua",
            "100g queso campesino o queso fresco",
            "Pan artesanal para acompanar",
            "Azucar al gusto (opcional)"
          ],
          steps: [
            "Hierve el agua con la leche a fuego medio.",
            "Agrega las pastillas de chocolate y revuelve con molinillo o batidor hasta que se disuelvan y espumen.",
            "Corta el queso en cubos y ponlo directamente dentro de la taza de chocolate caliente.",
            "Sirve con pan al lado. El queso se funde lentamente \u2014 la grasa contra la acidez del cacao. El equilibrio entre dulce y salado que no deberia funcionar y funciona perfectamente."
          ]
        }
      }
    ]
  },
  {
    id: "barichara",
    city: "Barichara",
    country: "Colombia",
    flag: "\u{1f1e8}\u{1f1f4}",
    mapX: 58, mapY: 45,
    chapter: 12,
    video: "o2fJLNUMpHQ",
    subtitle: "Romper lo que crees saber",
    story: "El pueblo mas hermoso de Colombia. Piedra sobre piedra, silencioso y brillante al sol. Pero yo vine por las hormigas culonas.",
    fullStory: "Barichara esta hecho de piedra. Las calles, las casas, las iglesias \u2014 todo es piedra tallada a mano bajo un sol que no perdona. Es el pueblo mas hermoso de Colombia, dicen. Yo no discuto.\n\nPero no vine por la vista. Vine por las hormigas culonas. Si, hormigas. Las tostadas con sal son crujientes como corn nuts pero con un sabor terroso, casi a nuez. Los Guane las comian hace mil anos. Hoy las venden en bolsitas en la plaza.\n\nEl camino real de Barichara a Guane es de piedra tambien. Dos horas caminando entre montanas, y al llegar a Guane, una senora te vende limonada con panela y hormigas culonas de postre. Colombia es asi \u2014 te sorprende cuando menos lo esperas.",
    recipes: [
      {
        name: "Hormigas Culonas",
        desc: "Crujientes como mani bien tostado. Saladas con precision. Un fondo de sabor terroso y graso. Mil anos de tradicion Guane \u2014 el limite no es el sabor, es la idea que tienes antes de probarlo.",
        tags: ["Ancestral", "Proteina", "Santander"],
        emoji: "\u{1f41c}",
        bookChapter: 11,
        fullRecipe: {
          servings: "Snack para compartir",
          time: "20 min",
          difficulty: "Facil (si las consigues)",
          ingredients: [
            "1 taza de hormigas culonas frescas (hormigas reina, temporada lluviosa)",
            "Sal al gusto",
            "1 cda aceite (opcional)"
          ],
          steps: [
            "Remueve las alas y patas de las hormigas.",
            "En un sarten seco o con minimo aceite, tuesta a fuego medio.",
            "Agrega sal. Tuesta hasta que esten crujientes (5-8 min).",
            "El abdomen es la parte principal \u2014 robusto, casi esferico.",
            "Sirve como snack. La primera es dificil por la idea. Despues, el sabor habla por si mismo."
          ]
        }
      }
    ]
  },
  {
    id: "quito",
    city: "Quito",
    country: "Ecuador",
    flag: "\u{1f1ea}\u{1f1e8}",
    mapX: 33, mapY: 59,
    chapter: 14,
    subtitle: "La transicion que no siempre es destino",
    story: "En la mitad del mundo, la cocina tiene un pie en el Pacifico y otro en los Andes. El ceviche ecuatoriano, el locro de papa \u2014 Ecuador sorprende.",
    fullStory: "Quito te quita el aliento \u2014 literal. A 2,800 metros, caminar cuesta arriba es un deporte. Pero la ciudad compensa con una belleza colonial brutal y una comida que no esperaba.\n\nEl ceviche ecuatoriano es completamente diferente al peruano. Lleva tomate, se sirve con chifles y canguil (palomitas). La primera vez que lo probe pense que era otra cosa. Y es otra cosa \u2014 igual de buena pero distinta.\n\nEn el mercado central de Quito almorce un locro de papa que me calento hasta los huesos. Papa, queso, aguacate, aji \u2014 simple, profundo, honesto. Ecuador no grita su cocina como Peru o Mexico, pero cuando la pruebas, entiendes.",
    recipes: [
      {
        name: "Bolon de Verde",
        desc: "Platano verde aplastado y moldeado, relleno de queso o chicharron, frito hasta crujir afuera y quedar suave adentro. Desayuno popular que nacio de la necesidad y termino siendo indispensable.",
        tags: ["Platano", "Desayuno", "Guayaquil"],
        emoji: "\u{1f34c}",
        bookChapter: 13,
        fullRecipe: {
          servings: "4 bolones",
          time: "30 min",
          difficulty: "Media",
          ingredients: [
            "4 platanos verdes grandes",
            "200g queso fresco o chicharron desmenuzado",
            "2 cdas mantequilla o manteca",
            "Sal al gusto",
            "Aceite para freir"
          ],
          steps: [
            "Pela los platanos y cocina en agua con sal hasta que esten suaves (15 min).",
            "Escurre y machaca los platanos calientes con mantequilla hasta formar una masa.",
            "Toma porciones, aplana, pon queso o chicharron en el centro, cierra y moldea en bola.",
            "Frie en aceite caliente hasta que la superficie quede crujiente y dorada.",
            "Sirve caliente. Barato, nutritivo, satisfactorio de una manera que los platos complicados no alcanzan."
          ]
        }
      },
      {
        name: "Locro de Papa",
        desc: "Sopa del altiplano ecuatoriano. Papa cocinada hasta deshacerse y volver a formar algo diferente. Con queso, con aguacate. Calor y nutricion densa a casi 3,000 metros.",
        tags: ["Sopa", "Papa", "Andino"],
        emoji: "\u{1f963}",
        bookChapter: 13,
        fullRecipe: {
          servings: "4 porciones",
          time: "40 min",
          difficulty: "Facil",
          ingredients: [
            "6 papas grandes", "1 litro leche",
            "200g queso fresco", "1 aguacate",
            "Cebolla, ajo, comino", "Aji para servir",
            "Achiote"
          ],
          steps: [
            "Sofrie cebolla y ajo con achiote. Agrega papas cortadas y agua.",
            "Cocina hasta que las papas se deshagan. Agrega leche y queso.",
            "Cocina 10 min mas. La papa se incorpora al caldo naturalmente.",
            "Sirve con aguacate y aji. En la altura tiene un sentido diferente \u2014 es el cuerpo pidiendote que lo cuides."
          ]
        }
      }
    ]
  },
  {
    id: "mancora",
    city: "Mancora",
    country: "Peru",
    flag: "\u{1f1f5}\u{1f1ea}",
    mapX: 30, mapY: 65,
    chapter: 15,
    video: "bll5LAql22s",
    subtitle: "Cuando la pausa se vuelve vida",
    story: "Mancora es el norte peruano donde el desierto se encuentra con el Pacifico. Playa, ceviche, y una noche fria donde descubri el emoliente \u2014 un tesoro de la cultura peruana.",
    fullStory: "Mancora es arena, sol y sal. El norte del Peru es otro Peru \u2014 mas caliente, mas relajado, mas surfer. Aqui el ceviche se hace con el pescado que salio del mar hace una hora. No hay intermediarios.\n\nUn senor con una carretilla en la playa me vendio el mejor ceviche de mi vida. Corvina fresca, limon de la zona (mas acido que el de Lima), aji limo que te hace llorar de felicidad, cebolla morada cortada en plumas perfectas. Comido de pie, con los pies en la arena, viendo el Pacifico.\n\nPero fue en las noches frias de invierno donde Mancora me regalo su mayor tesoro. Mientras exploraba las calles, conoci a un emolientero \u2014 esa figura tan peruana que carga su carrito con termos, hierbas y limones. El emoliente es mucho mas que una bebida reconfortante; es un reflejo de la rica historia y tradicion culinaria de Peru. Sus raices se remontan a las culturas indigenas precolombinas, donde se utilizaban hierbas y plantas medicinales para crear infusiones con propiedades curativas. Con el tiempo, esta bebida se fusiono con influencias espanolas y africanas.\n\nLa preparacion es todo un arte. Comienza con una mezcla de hierbas como la cola de caballo, la hoja de guayaba, el llanten y la linaza, que se hierven para extraer sus beneficios medicinales y aromaticos. Se le anade jugo de limon, azucar o miel, y opcionalmente pisco para los que quieren un toque festivo.\n\nAquel emolientero no solo me ofrecio una deliciosa bebida, sino que me sumergio en una experiencia unica. Me conto historias sobre la importancia del emoliente en la vida cotidiana de los peruanos, especialmente durante los meses mas frios. Su carisma y dedicacion dejaron una marca imborrable en mi memoria, convirtiendo al emoliente en mi bebida peruana favorita.\n\nY al atardecer, langosta a la parrilla en un chiringuito con techo de palma. Con mantequilla de ajo y una cerveza Cusquena helada. Mancora es eso \u2014 lujo simple, tesoros inesperados.",
    recipes: [
      {
        name: "Ceviche de Mancora",
        desc: "Pescado del dia en limon acido del norte. Aji limo, cebolla morada, cilantro. Comido de pie con los pies en la arena.",
        tags: ["Ceviche", "Playa", "Fresco"],
        emoji: "\u{1f41f}",
        bookChapter: 14,
        fullRecipe: {
          servings: "2 porciones",
          time: "15 min",
          difficulty: "Facil",
          ingredients: [
            "1 lb corvina fresca del dia",
            "8-10 limones (los del norte son mas acidos)",
            "1 aji limo rojo",
            "1 cebolla morada",
            "Cilantro fresco",
            "Sal, pimienta",
            "Choclo y camote para servir"
          ],
          steps: [
            "Corta el pescado en cubos de 1 pulgada. Sazona con sal.",
            "Exprime los limones sobre el pescado. Agrega aji limo picado fino.",
            "Agrega cebolla en plumas perfectas y cilantro.",
            "Mezcla y sirve inmediatamente. La frescura es todo.",
            "Acompana con choclo y camote sancochado. Se come de pie, viendo el Pacifico."
          ]
        }
      }
    ]
  },
  {
    id: "huaraz",
    city: "Huaraz",
    country: "Peru",
    flag: "\u{1f1f5}\u{1f1ea}",
    mapX: 28, mapY: 72,
    chapter: 16,
    video: "5OYa4rcfUBQ",
    subtitle: "El cuerpo no siempre manda",
    story: "A casi cuatro mil metros, con el soroche como companero, el choclo con queso en un paso andino y el te de coca en Huaraz fueron la comida correcta en el lugar correcto.",
    fullStory: "Salir de Mancora de noche no se siente como un viaje. Se siente como una decision. Doce horas de bus. El cuerpo ya no estaba en su mejor momento.\n\nEl trayecto de Chimbote a Huaraz sube desde casi el nivel del mar hasta casi los cuatro mil metros. El mal de altura no avisa. Primero la respiracion que se vuelve mas consciente. Despues un cansancio que no corresponde al esfuerzo. Un dolor de cabeza suave que se instala y no se va.\n\nEn una parada de carretera, una senora vendiendo choclo con queso. Maiz andino cocido al vapor, grande, de granos anchos, con queso blanco salado que se derretia con el calor. No porque tuviera hambre. Porque el cuerpo pedia algo simple.\n\nEn Huaraz, la ciudad estaba de fiesta. Y yo llegaba muriendo. Sali buscando lo unico que sabia que necesitaba: un te de coca. El primer sorbo no es agradable. Amargo, vegetal. Pero funciona. Cinco minutos. Diez. La cabeza empieza a aliviarse.\n\nAl dia siguiente, con el cuerpo recuperado, fui a ver la Cordillera Blanca. El Huascaran. Los nevados no son bonitos de la manera en que un atardecer de playa es bonito. Son grandes de una manera que reordena tu sentido de la escala.",
    recipes: [
      {
        name: "Choclo con Queso",
        desc: "Maiz andino cocido al vapor. Grande, de granos anchos, menos dulce. Con queso blanco salado que se derrite con el calor. La comida correcta en el lugar correcto.",
        tags: ["Andino", "Simple", "Callejero"],
        emoji: "\u{1f33d}",
        bookChapter: 15,
        fullRecipe: {
          servings: "4 porciones",
          time: "30 min",
          difficulty: "Facil",
          ingredients: [
            "4 choclos andinos grandes (mazorcas de maiz serrano)",
            "200g queso fresco andino salado",
            "Sal al gusto",
            "Agua suficiente para hervir"
          ],
          steps: [
            "Pela los choclos y coloca en una olla grande con agua y sal.",
            "Hierve a fuego medio por 20-25 minutos hasta que los granos esten tiernos.",
            "Corta el queso en rebanadas gruesas.",
            "Sirve el choclo caliente con el queso encima \u2014 se derrite lentamente con el calor.",
            "Se come en la carretera, en un paso andino, con el frio empezando a sentirse. No hay sofisticacion que mejore eso."
          ]
        }
      },
      {
        name: "Te de Coca",
        desc: "La hoja sagrada de los Andes. Medicina popular contra el soroche. Amargo, vegetal, con un ligero efecto anestesico. No es agradable. Pero funciona.",
        tags: ["Bebida", "Medicinal", "Andino"],
        emoji: "\u{1f375}",
        bookChapter: 15,
        fullRecipe: {
          servings: "2 tazas",
          time: "10 min",
          difficulty: "Facil",
          ingredients: [
            "Un punado generoso de hojas de coca secas (o 2 bolsitas de te de coca)",
            "2 tazas de agua hirviendo",
            "Miel o azucar al gusto (opcional)",
            "Rodaja de limon (opcional)"
          ],
          steps: [
            "Hierve el agua. Coloca las hojas de coca en la taza o tetera.",
            "Vierte el agua hirviendo sobre las hojas. Deja reposar 5-8 minutos.",
            "El color se vuelve verde amarillento. El aroma es herbal, terroso.",
            "Bebe caliente, lentamente. La cabeza empieza a aliviarse de a poco. La respiracion se regula.",
            "El cuerpo que llevaba horas peleando contra la altitud empieza a negociar en mejores terminos."
          ]
        }
      }
    ]
  },
  {
    id: "lima",
    city: "Lima",
    country: "Peru",
    flag: "\u{1f1f5}\u{1f1ea}",
    mapX: 23, mapY: 77,
    chapter: 17,
    subtitle: "Donde todo hace sentido",
    story: "Lima es la capital gastronomica de America Latina y no exagero. En ninguna otra ciudad del continente encontre tanta profundidad, tanta variedad, tanta pasion por la comida.",
    fullStory: "Lima es la capital gastronomica de America Latina y no exagero. En ninguna otra ciudad del continente encontre tanta profundidad, tanta variedad, tanta pasion por la comida.\n\nEl ceviche limeno es religion. La leche de tigre \u2014 ese jugo que queda despues de marinar el pescado \u2014 se toma como shot en los mercados. Algunos lo llaman 'levanta muertos'. La causa rellena, la papa amarilla peruana con aji amarillo, es arte en un plato.\n\nPero Lima no es solo ceviche. La cocina nikkei (japonesa-peruana) es unica en el mundo. El chifa (china-peruana) tambien. Y los anticuchos de carretilla a las 2am en Miraflores son experiencias que cambian tu relacion con la comida callejera para siempre.",
    recipes: [
      {
        name: "Sudado de Pescado",
        desc: "Cebolla, ajo, aji amarillo, tomate, pescado, yuca, limon. Un caldo con profundidad sin ser pesado, que sabe a mar y a tierra peruana.",
        tags: ["Pescado", "Caldo", "Limeno"],
        emoji: "\u{1f41f}",
        bookChapter: 18,
        fullRecipe: {
          servings: "4 porciones",
          time: "35 min",
          difficulty: "Media",
          ingredients: [
            "4 filetes de pescado blanco fresco (corvina o mero)",
            "2 cebollas moradas en plumas",
            "6 dientes de ajo picados",
            "3 ajies amarillos en tiras",
            "3 tomates en gajos",
            "2 yucas peladas y cortadas",
            "Jugo de 4 limones",
            "Aceite, sal, pimienta",
            "Cilantro fresco"
          ],
          steps: [
            "Sofrie cebolla y ajo en aceite caliente hasta que los aromaticos se suavicen y liberen sus azucares.",
            "Agrega el aji amarillo. El color cambia. El aroma cambia. Esa frescura particular, esa acidez luminosa.",
            "Agrega tomate en gajos. El caldo empieza a tomar forma. Anade agua o caldo de pescado y la yuca.",
            "Cuando la yuca este casi tierna, coloca los filetes de pescado encima. No se cocina demasiado \u2014 se respeta. Solo el calor necesario para cambiar de estado.",
            "Agrega limon y sal. Sirve con cilantro. Un caldo que tiene profundidad sin ser pesado, que sabe a mar y a aji."
          ]
        }
      },
      {
        name: "Chupe de Pescado",
        desc: "Mas denso que el sudado. Con papa amarilla incorporada al caldo, choclo y hierbas. Una sopa que no sirve para impresionar sino para sostener.",
        tags: ["Sopa", "Pescado", "Reconfortante"],
        emoji: "\u{1f372}",
        bookChapter: 18,
        fullRecipe: {
          servings: "4 porciones",
          time: "45 min",
          difficulty: "Media",
          ingredients: [
            "1 lb pescado blanco en trozos",
            "4 papas amarillas peladas y cortadas",
            "2 mazorcas de choclo cortadas",
            "2 ajies amarillos",
            "1 taza de leche evaporada",
            "1 huevo por porcion",
            "Hierbas frescas (huacatay, cilantro)",
            "Cebolla, ajo, aceite, sal"
          ],
          steps: [
            "Sofrie cebolla, ajo y aji amarillo en aceite.",
            "Agrega agua o caldo de pescado, papa y choclo. Cocina hasta que la papa se incorpore al caldo naturalmente.",
            "Agrega la leche evaporada para darle densidad.",
            "Coloca el pescado y los huevos. Cocina 5-8 min, justo lo necesario.",
            "Agrega hierbas frescas al final. Sirve caliente \u2014 una sopa que sostiene."
          ]
        }
      },
      {
        name: "Picarones con Chancaca",
        desc: "Donuts peruanos de zapallo y camote, banados en chancaca. Masa, fuego, tiempo, y alguien que sabe repetirlo bien todos los dias.",
        tags: ["Dulce", "Callejero", "Limeno"],
        emoji: "\u{1f369}",
        bookChapter: 19,
        fullRecipe: {
          servings: "12-15 picarones",
          time: "1 hora",
          difficulty: "Media",
          ingredients: [
            "1/2 lb zapallo cocido y hecho pure",
            "1/2 lb camote cocido y hecho pure",
            "2 tazas harina", "1 sobre levadura",
            "1/2 taza agua tibia", "Aceite para freir",
            "Para la chancaca: 1 tapa de panela, cascara de naranja, cascara de pina, clavo, canela, agua"
          ],
          steps: [
            "Mezcla zapallo y camote con harina, levadura activada en agua tibia. Amasa hasta obtener una masa suave. Deja fermentar 1 hora.",
            "Para la chancaca: hierve la panela con agua, cascara de naranja, pina, clavo y canela hasta obtener un sirope espeso y oscuro.",
            "Calienta aceite. Toma porciones de masa, forma anillos con las manos (como lo hace el vendedor con precision de miles de repeticiones).",
            "Frie hasta que doren por ambos lados. La masa cede con la presion justa \u2014 adentro suave, afuera crujiente.",
            "Bana generosamente con chancaca. Sirve caliente, de pie en la acera, con las manos pegajosas y el ruido de Lima alrededor."
          ]
        }
      },
      {
        name: "Pato Pekin Chifa",
        desc: "El tercer camino que emerge cuando dos tradiciones llevan suficiente tiempo conviviendo. Pato con condimentos latinoamericanos, aji y limon que el pekin tradicional no tiene.",
        tags: ["Chifa", "Fusion", "Barrio Chino"],
        emoji: "\u{1f986}",
        bookChapter: 20,
        fullRecipe: {
          servings: "4 porciones",
          time: "3+ horas",
          difficulty: "Alta",
          ingredients: [
            "1 pato entero (2-3 kg)",
            "3 cdas salsa de soya",
            "2 cdas salsa hoisin",
            "1 cda five spice (cinco especias chinas)",
            "2 ajies amarillos",
            "Jugo de 2 limones",
            "4 dientes de ajo", "Jengibre fresco",
            "Miel, sal, pimienta"
          ],
          steps: [
            "Marina el pato con soya, hoisin, cinco especias, ajo, jengibre y miel. Refrigera minimo 4 horas.",
            "Hornea a 350F por 2.5-3 horas, banando con sus jugos. La piel debe quedar crujiente y laceada.",
            "Prepara la salsa chifa: mezcla aji amarillo licuado con soya, limon y un toque de jengibre.",
            "Corta el pato. Sirve con la salsa chifa al lado.",
            "No es mejor ni peor que el pekin clasico. Es otra cosa \u2014 ese tercer camino de la mezcla real."
          ]
        }
      }
    ]
  },
  {
    id: "barranco",
    city: "Barranco",
    country: "Peru",
    flag: "\u{1f1f5}\u{1f1ea}",
    mapX: 27, mapY: 82,
    chapter: 18,
    subtitle: "Isolina y la tradicion que no pide permiso",
    story: "Barranco es Lima sin corbata. En Isolina Taberna Peruana, la comida viene de recetas de casa, de abuela, de esa memoria culinaria que las familias peruanas han transmitido sin escribirla.",
    fullStory: "Barranco es Lima sin corbata. Grafitis en cada pared, musica en vivo saliendo de bares escondidos, casas coloniales pintadas de colores que no deberian combinar pero combinan. Aqui la cocina es mas atrevida.\n\nLos anticuchos de corazon en la esquina de la Bajada de Banos son legendarios. Marinados en aji panca, asados en carbon, servidos con papa y una salsa de mani que no olvidaras. A las 2am, despues de unos piscos, es cuando mejor saben.\n\nY el tiradito nikkei \u2014 esa fusion japonesa-peruana que solo existe aqui \u2014 es poesia en un plato. Laminas de pescado tan finas que son transparentes, banadas en leche de tigre con soya y jengibre.",
    recipes: [
      {
        name: "Causa con Pejerrey",
        desc: "Papa amarilla sazonada con aji amarillo y limon, refrigerada y usada como base para pejerrey. Una preparacion que requiere mas tecnica de la que parece.",
        tags: ["Papa", "Pescado", "Isolina"],
        emoji: "\u{1f954}",
        bookChapter: 17,
        fullRecipe: {
          servings: "4 porciones",
          time: "45 min",
          difficulty: "Media",
          ingredients: [
            "1 kg papa amarilla",
            "3 cdas pasta de aji amarillo",
            "Jugo de 3 limones",
            "3 cdas aceite vegetal",
            "1/2 lb pejerrey fresco",
            "Sal al gusto",
            "Aguacate y aceituna para decorar"
          ],
          steps: [
            "Sancoca las papas. Pela y prensa hasta hacer pure liso \u2014 debe quedar exactamente en el punto que la hace moldeable sin que se rompa.",
            "Mezcla con aji amarillo, limon, aceite y sal. Debe quedar una masa manejable y sazonada con precision.",
            "Prepara el pejerrey: cocina brevemente o marina en limon. Delicadeza que el pescado blanco requiere.",
            "En molde, pon capa de papa, pejerrey, y otra capa de papa.",
            "Decora con aguacate y aceituna. Refrigera. El equilibrio entre papa, acidez del aji y pejerrey funciona como unidad."
          ]
        }
      },
      {
        name: "Tiraditos",
        desc: "El primo peruano del ceviche, con herencia japonesa visible. Pescado en laminas finas marinado en leche de tigre con variaciones infinitas.",
        tags: ["Tiradito", "Nikkei", "Isolina"],
        emoji: "\u{1f420}",
        bookChapter: 17,
        fullRecipe: {
          servings: "2 porciones",
          time: "20 min",
          difficulty: "Media-Alta",
          ingredients: [
            "1/2 lb pescado blanco fresco (corvina)",
            "6 limones sutiles",
            "1 aji amarillo",
            "1 diente de ajo",
            "Un trozo de pescado extra para la leche de tigre",
            "Cilantro, sal",
            "Cebolla china para decorar"
          ],
          steps: [
            "Corta el pescado en laminas finas como sashimi \u2014 el corte es fundamental.",
            "Prepara la leche de tigre: licua limon, aji amarillo, ajo, cilantro y un trozo de pescado hasta una salsa fluida.",
            "Dispone las laminas en plato frio.",
            "Bana con la leche de tigre. Decora con cebolla china.",
            "Sirve inmediatamente \u2014 debe estar frio. La precision de quien ha hecho este plato muchas veces."
          ]
        }
      },
      {
        name: "Aji de Gallina",
        desc: "Pollo desmenuzado en salsa de aji amarillo, pan, leche, nueces. Cremosa, profunda, con ese color amarillo emblematico. Exactamente lo que promete ser.",
        tags: ["Pollo", "Aji Amarillo", "Clasico"],
        emoji: "\u{1f414}",
        bookChapter: 17,
        fullRecipe: {
          servings: "4 porciones",
          time: "1 hora",
          difficulty: "Media",
          ingredients: [
            "1 pechuga de pollo grande (o muslos)",
            "3 ajies amarillos",
            "3 rebanadas de pan de molde",
            "1 taza de leche evaporada",
            "1/2 taza nueces o pecanas",
            "1 cebolla, 3 dientes de ajo",
            "Aceite, sal, comino",
            "Arroz blanco, huevo duro, aceituna"
          ],
          steps: [
            "Sancoca el pollo, reserva el caldo. Desmenuza la carne.",
            "Remoja el pan en leche. Licua con aji amarillo, nueces y un poco de caldo hasta obtener una salsa cremosa.",
            "Sofrie cebolla y ajo. Agrega la salsa licuada y cocina a fuego bajo 15 min.",
            "Incorpora el pollo desmenuzado. Ajusta sal y comino. El color amarillo del aji es emblematico.",
            "Sirve sobre arroz blanco con huevo duro y aceituna. No porque sea innovador \u2014 porque es exactamente lo que promete ser."
          ]
        }
      }
    ]
  },
  {
    id: "lince",
    city: "Lince",
    country: "Peru",
    flag: "\u{1f1f5}\u{1f1ea}",
    mapX: 20, mapY: 89,
    chapter: 22,
    subtitle: "El corazon que el fuego no disimula",
    story: "Mi ultima noche en Lima. Benja me llevo al puesto de Marthitha \u2014 sin sillas, sin menu, solo humo de carbon y anticuchos. La comida que existe simplemente para alimentar.",
    fullStory: "Lince no es el barrio que aparece en las guias de Lima. No tiene el atractivo arquitectonico del centro historico ni la energia bohemia de Barranco ni el skyline moderno de Miraflores. Lince es un barrio de trabajo. De clase media limena que tiene sus rutinas y sus lugares y que no necesita que nadie de afuera venga a validarlos.\n\nEl puesto de Marthitha no tiene aviso de neon. Tiene humo. Una columna que sube desde la vereda \u2014 carbon encendido, grasa animal que cae sobre las brasas, aji que se carameliza en el calor. Un olor que no pide permiso.\n\nLa parrilla era una sola pieza larga, de metal negro de tanto uso, levantada sobre brasas de carbon que Marthitha manejaba con un abanico de palma con una economia de movimiento que venia de anos. No de semanas. De anos.\n\nEl anticucho no se hace con lo que sobra. Se hace con corazon de res. El corazon es un musculo diferente a cualquier otro musculo del animal. Trabaja constantemente, desde el primer latido hasta el ultimo, sin descansar. Eso lo hace denso. Compacto. Con caracter.\n\nLa marinada: aji panca \u2014 oscuro, seco, con un calor que llega despues, con un fondo ahumado casi terroso. Con ajo, comino, vinagre, sal. El tiempo hace lo que el cocinero no puede acelerar.\n\nAhi, en ese puesto sin sillas en Lince, a las diez de la noche de mi ultima noche en Lima, entendi algo. Que hay una forma de cocinar que no busca ser entendida. Que no tiene sistema ni concepto ni filosofia articulada. Que existe porque existe, porque alguien lo aprendio de alguien, y porque funciona.\n\nEl fuego es la tecnologia mas antigua de la cocina. Y en manos de alguien que lo conoce de verdad, no necesita nada mas.",
    recipes: [
      {
        name: "Anticuchos de corazon",
        desc: "Corazon de res marinado en aji panca, ajo, comino y vinagre. A la parrilla de carbon hasta que la marinada se carameliza y el carbon tine todo de humo.",
        tags: ["Callejero", "Parrilla", "Limeno"],
        emoji: "\u{1f356}",
        bookChapter: 22,
        fullRecipe: {
          servings: "4 porciones",
          time: "4 horas (con marinada)",
          difficulty: "Media",
          ingredients: [
            "1 kg corazon de res limpio, cortado en cubos de 3 cm",
            "4 cucharadas de pasta de aji panca",
            "6 dientes de ajo molidos",
            "2 cucharaditas de comino molido",
            "1/4 taza de vinagre tinto",
            "2 cucharadas de aceite vegetal",
            "Sal y pimienta al gusto",
            "Papa sancochada y salsa de aji amarillo para acompanar"
          ],
          steps: [
            "Limpia bien el corazon quitando grasa y membranas. Corta en cubos de 3 cm.",
            "Mezcla aji panca, ajo, comino, vinagre, aceite y sal. Marina el corazon minimo 3 horas, idealmente toda la noche.",
            "Ensarta 3-4 trozos en cada palito. Precalienta brasas de carbon.",
            "Asa sobre brasas fuertes: no los muevas mucho. Da vuelta una sola vez cuando la marinada se caramelice. 2-3 min por lado.",
            "Sirve con papa sancochada y salsa cremosa de aji amarillo. El carbon por encima de todo."
          ]
        }
      }
    ]
  },
  {
    id: "ica",
    city: "Ica",
    country: "Peru",
    flag: "\u{1f1f5}\u{1f1ea}",
    mapX: 22, mapY: 87,
    chapter: 23,
    subtitle: "El desierto tiene su propia profundidad",
    story: "Un oasis en medio del desierto. Huacachina es uno de esos lugares que no parecen reales hasta que estas ahi.",
    fullStory: "Huacachina no deberia existir. Un oasis de verdad \u2014 palmeras, laguna, dunas de arena blanca que se extienden hasta el horizonte. Parece sacado de una pelicula.\n\nLlegue en buggy, cruzando dunas a toda velocidad, gritando como loco. Hice sandboard (mal). Y despues, sentado en un restaurante frente a la laguna, comi Papa a la Huancaina con el sol cayendo.\n\nLa Huancaina es de Ica originalmente. La salsa cremosa de aji amarillo, queso fresco y galletas de soda \u2014 banando papas amarillas perfectas. Simple, adictiva, imposible de replicar exactamente fuera del Peru.\n\nY la sopa seca de Chincha \u2014 que no es sopa y no es seca \u2014 es fideos cocinados en salsa de albahaca y aji panca. Un nombre confuso para un plato perfecto.",
    recipes: [
      {
        name: "Pallares de Ica",
        desc: "Frijol de grano grande, sabor suave, textura mantecosa. Los habitantes precolombinos lo cultivaban hace miles de anos. Sabe exactamente a lo que es y nada mas.",
        tags: ["Legumbres", "Iqueno", "Ancestral"],
        emoji: "\u{1fad8}",
        bookChapter: 21,
        fullRecipe: {
          servings: "4 porciones",
          time: "1.5 horas (+ remojo)",
          difficulty: "Media",
          ingredients: [
            "2 tazas de pallares secos (remojados toda la noche)",
            "1 cebolla morada picada",
            "4 dientes de ajo",
            "2 ajies amarillos",
            "2 tomates",
            "Aceite, sal, comino, oregano",
            "Cilantro fresco"
          ],
          steps: [
            "Remoja los pallares toda la noche. Escurre y cocina en agua fresca hasta que esten tiernos (1 hora aprox).",
            "Sofrie cebolla, ajo y aji amarillo en aceite. Agrega tomate picado.",
            "Incorpora los pallares cocidos con un poco de su caldo. Sazona con sal, comino y oregano.",
            "Cocina a fuego bajo 15 min para que absorban los sabores.",
            "Sirve con cilantro fresco. Textura mantecosa, sabor suave \u2014 la paciencia que requieren todos los legumbres."
          ]
        }
      }
    ]
  },
  {
    id: "cusco",
    city: "Cusco",
    country: "Peru",
    flag: "\u{1f1f5}\u{1f1ea}",
    mapX: 38, mapY: 84,
    chapter: 24,
    subtitle: "El respeto que se aprende",
    story: "Cusco es magia antigua. A 3,400 metros, el aire es delgado pero la cultura inca esta mas viva que nunca. Aqui entendi algo profundo sobre mis propias raices.",
    fullStory: "En Puerto Rico no sabemos mucho sobre la historia nativa de nuestros primeros pueblos. Las historias sobre los pueblos originarios nativos fueron borradas por el colonialismo. Lo que se nos ha contado son un punado de relatos y leyendas \u2014 sabemos muy poco. Nuestra realidad colonial hace que calles, heroes y leyendas que resalten sean las del colonialismo. Explorar Cusco y conocer sus origenes me hizo ver que aqui es distinto. En Cusco, a pesar de haber vivido al igual el colonialismo, aun vive la cultura inca y esta muy presente.\n\nCusco, la capital historica del Peru, se remonta a los siglos XI y XII. Segun la leyenda, el primer Inca, Manco Capac, fundo la ciudad en cumplimiento de un mandato del Dios Sol. Los incas controlaban el territorio desde Quito hasta Santiago, por lo que su imperio era el mas grande jamas visto en las Americas y el mayor del mundo para la epoca.\n\nCusco te golpea de dos maneras: con la altitud y con la belleza. 3,400 metros sobre el nivel del mar. Cada escalera es una prueba. Cada respiro es consciente. Pero miras alrededor y todo vale la pena \u2014 piedras incas perfectas, iglesias coloniales sobre templos, y un cielo tan azul que parece falso.\n\nEl mejor lugar para explorarlo son los mercados. Tuve la oportunidad de visitar el mercado de San Pedro \u2014 ropas, comidas, dulces, artefactos religiosos, artesanias, puestos de jugos. Almorce lomo saltado por 8 soles. Carne salteada en wok con tomate, cebolla, aji amarillo y sillao, sobre arroz y papas fritas. Fusion chino-peruana nacida en las calles de Lima, perfeccionada en los Andes.\n\nY despues, mate de coca. La hoja sagrada de los Incas que te ayuda con el soroche y que sabe a hierba fresca con miel. En Cusco, entre su gente y costumbres, aun esta muy presente esa gran cultura inca de muchas formas. Eso me hizo reflexionar sobre lo que perdimos en Puerto Rico y lo que aqui se logro preservar.",
    recipes: [
      {
        name: "Pan con Butifarra",
        desc: "Pan de panaderia local con corteza perfecta y butifarra. Caliente, en el mercado San Pedro, con el frio de la manana cusquena.",
        tags: ["Pan", "Embutido", "Mercado"],
        emoji: "\u{1f956}",
        bookChapter: 22,
        fullRecipe: {
          servings: "4 porciones",
          time: "15 min (con pan comprado)",
          difficulty: "Facil",
          ingredients: [
            "4 panes artesanales crujientes (de panaderia local, con corteza y peso en la mano)",
            "400g butifarra (embutido peruano, curado y especiado)",
            "Salsa criolla (cebolla morada, aji amarillo, limon, cilantro)",
            "Lechuga (opcional)",
            "Sal y pimienta"
          ],
          steps: [
            "Calienta los panes en horno o plancha hasta que la corteza cruja.",
            "Corta la butifarra en rebanadas generosas.",
            "Prepara salsa criolla: cebolla morada en plumas, aji amarillo picado, limon, cilantro y sal.",
            "Ensambla: pan abierto, butifarra, salsa criolla encima.",
            "Come de pie en el mercado a mas de 3,400 metros. No es la sofisticacion \u2014 es la calidez."
          ]
        }
      },
      {
        name: "Maca con Leche",
        desc: "Tuberculo de las alturas andinas, en bebida con leche. Dulce pero terrosa, espesa pero no pesada. No busca gustar \u2014 busca sostener.",
        tags: ["Bebida", "Andino", "Energetico"],
        emoji: "\u{1f95b}",
        bookChapter: 22,
        fullRecipe: {
          servings: "2 porciones",
          time: "10 min",
          difficulty: "Facil",
          ingredients: [
            "2 cdas de maca en polvo (o harina de maca)",
            "2 tazas de leche caliente",
            "Miel o azucar al gusto",
            "Canela en polvo (opcional)",
            "1/2 cdita de vainilla (opcional)"
          ],
          steps: [
            "Calienta la leche sin dejar hervir.",
            "Disuelve la maca en polvo en un poco de leche tibia para evitar grumos.",
            "Incorpora al resto de la leche caliente. Endulza al gusto.",
            "Sirve caliente. Espesa pero no pesada, dulce pero terrosa.",
            "Una bebida que no busca gustar \u2014 busca sostener. En la altura tiene sentido."
          ]
        }
      }
    ]
  },
  {
    id: "cdmx",
    city: "Ciudad de Mexico",
    country: "Mexico",
    flag: "\u{1f1f2}\u{1f1fd}",
    mapX: 18, mapY: 16,
    chapter: 26,
    subtitle: "La maldicion, los tacos y la calle",
    story: "Si hay algo que Ciudad de Mexico hace mejor que casi cualquier otra ciudad del mundo es la comida de calle. Los tacos son el lenguaje mas honesto de Mexico.",
    fullStory: "Dicen que cuando llegas a Ciudad de Mexico hay algo que te espera. La maldicion de Moctezuma. Me toco. No voy a dar detalles. Pero me toco.\n\nY aun asi, no fue suficiente para detenerme. Porque la calle en Ciudad de Mexico no solo se camina. Se come. Cada esquina tiene un carrito. Cada cuadra tiene un comal encendido.\n\nLos tacos son el lenguaje mas honesto de Mexico. Un taco de canasta que lleva quince horas en el canasto dice exactamente lo que es: comida de trabajadores. Un taco al pastor, con esa carne que gira en el trompo y que nadie ha logrado replicar fuera de Mexico, dice otra cosa: tradicion del Libano llegando a Mexico, transformandose.\n\nEn un mercado encontre un puesto de insectos. Chapulines, gusanos de maguey, escorpiones, hormigas chicatanas. Cinco siglos antes de que alguien decidiera que los insectos eran asquerosos, las culturas mesoamericanas los incluian en su dieta. Probe los gusanos de maguey primero. Crujientes, salados, con un fondo de nuez y tierra. Despues el escorpion. La repulsion no es instintiva. Es cultural.\n\nEn Coyoacan, en el mercado bajo los arcos coloniales, encontre la tlayuda de Oaxaca. Y en la Casa Azul de Frida Kahlo entendi que el arte no es perfeccion \u2014 es honestidad. Lo mismo pasa con la comida.",
    recipes: [
      {
        name: "Tacos al Pastor",
        desc: "Tradicion del Libano llegando a Mexico, transformandose, volviendose este taco que ahora es tan mexicano como el maiz. La carne que gira en el trompo.",
        tags: ["Tacos", "Calle", "Pastor"],
        emoji: "\u{1f32e}",
        bookChapter: 24,
        fullRecipe: {
          servings: "8-10 tacos",
          time: "3+ horas (marinado + coccion)",
          difficulty: "Media-Alta",
          ingredients: [
            "1 lb carne de cerdo en laminas finas",
            "4 chiles guajillo secos", "2 chiles ancho",
            "1/4 pina fresca",
            "2 cdas achiote", "3 dientes de ajo",
            "1 cda comino", "1 cda oregano",
            "Vinagre, sal",
            "Tortillas de maiz", "Cebolla, cilantro, limon, salsa verde"
          ],
          steps: [
            "Hidrata los chiles en agua caliente. Licua con achiote, ajo, comino, oregano, vinagre y sal hasta una pasta roja.",
            "Marina la carne en la pasta por minimo 2 horas (mejor toda la noche).",
            "Asa la carne en plancha o trompo a fuego alto hasta dorar. Corta en trozos pequenos.",
            "Asa rodajas de pina en la misma plancha.",
            "Sirve en tortillas de maiz calientes con pina, cebolla, cilantro, limon y salsa. El taco que ya no necesita mejorar."
          ]
        }
      },
      {
        name: "Insectos del Mercado",
        desc: "Chapulines, gusanos de maguey, escorpiones tostados. Cinco siglos de tradicion mesoamericana. La repulsion no es instintiva \u2014 es cultural.",
        tags: ["Insectos", "Ancestral", "Mercado"],
        emoji: "\u{1f997}",
        bookChapter: 24,
        fullRecipe: {
          servings: "Snack para compartir",
          time: "15-20 min",
          difficulty: "Facil",
          ingredients: [
            "1 taza de chapulines limpios",
            "1/2 taza de gusanos de maguey",
            "Aceite vegetal",
            "Sal, chile en polvo, limon",
            "Ajo picado fino (opcional)"
          ],
          steps: [
            "Limpia los chapulines y gusanos. Remoja brevemente si estan secos.",
            "En sarten con poco aceite, tuesta los chapulines a fuego medio hasta crujir (5 min). Reserva.",
            "En el mismo sarten, frie los gusanos de maguey hasta crujientes y dorados (3-4 min).",
            "Sazona con sal, chile en polvo y un toque de limon.",
            "Sirve como snack o sobre guacamole y tacos. La primera es dificil por la idea. Despues, el sabor habla."
          ]
        }
      },
      {
        name: "Tlayuda",
        desc: "Tortilla grande de Oaxaca, casi tostada, con frijoles, tasajo, quesillo, aguacate. No es pizza. No es taco gigante. Es una tlayuda. Y eso es suficiente.",
        tags: ["Oaxaca", "Maiz", "Completo"],
        emoji: "\u{1fad3}",
        bookChapter: 25,
        fullRecipe: {
          servings: "2 tlayudas",
          time: "30 min",
          difficulty: "Media",
          ingredients: [
            "2 tortillas grandes de maiz tipo tlayuda (30 cm)",
            "1 taza de frijoles negros refritos (pasta concentrada)",
            "200g tasajo o cecina oaxaquena",
            "200g quesillo de Oaxaca (queso de hebras)",
            "1 aguacate",
            "Hierba santa (opcional)",
            "Sal"
          ],
          steps: [
            "Calienta la tlayuda en comal hasta que pierda la flexibilidad y adquiera rigidez \u2014 eso es estructura, arquitectura.",
            "Unta generosamente con la pasta de frijoles negros.",
            "Agrega tasajo asado en tiras y quesillo deshebrado. El quesillo se derrite con una lentitud casi cinematografica.",
            "Agrega aguacate y hierba santa. Dobla a la mitad o sirve abierta.",
            "Come de pie en el mercado de Coyoacan. La base rigida con la suavidad del quesillo y la profundidad de los frijoles \u2014 no tiene equivalente."
          ]
        }
      }
    ]
  }
];

const CHRONICLES = [
  {
    id: "santurce-lote23",
    title: "El Renacimiento de Santurce",
    country: "Puerto Rico",
    region: "Santurce, San Juan",
    flag: "\u{1f1f5}\u{1f1f7}",
    route: "Lote 23 \u2022 Pernileria los Proceres \u2022 The Lemon Experience",
    epigraph: "Yo lo veia como un new age era, un resurgir de una generacion de cocineros que a pesar de las dificultades vieron en Santurce una oportunidad.",
    body: [
      "Recuerdo claramente el dia que visite lo que fue la Pernileria los Proceres en Lote 23, un proyecto innovador para ese momento que formo parte de un movimiento de nuevos emprendimientos gastronomicos en la zona de Santurce.",
      "Yo lo veia como un new age era, un resurgir de una generacion de cocineros que a pesar de las dificultades de Puerto Rico vieron en Santurce una oportunidad \u2014 y resulto. Hoy dia podemos ver como de ver Santurce con edificios abandonados, vemos una nueva ola de cafes y restaurantes. En hora buena.",
      "Ahi conoci a Pedro y Miguel de The Lemon Experience, dos chefs apasionados originarios de Murcia, Espana. Fue como si el destino hubiera conspirado para que nos cruzaramos justo en el momento en que estaba planeando mi viaje, lleno de miedos y metas por cumplir. Su presencia motivadora fue el impulso que necesitaba para lanzarme de lleno a la aventura gastronomica.",
      "Pedro, Miguel y el talentoso chef Mario Juan habian creado juntos un sandwich de pernil especial que fusionaba lo mejor de la cocina espanola y el toque unico de Mario Juan con su pernil. Lo llamaron 'Acho Pijo'. Consistia en una escalivada \u2014 un plato tipico de Cataluna \u2014 esa exquisita mezcla de verduras asadas como pimientos, berenjenas y cebollas, alinadas con aceite de oliva y hierbas aromaticas, que realzo el sabor y la frescura del sandwich de pernil especial. Yo tuve la oportunidad de grabar y que me mostraran toda la historia detras de su creacion.",
      "Fue un momento de compartir y aprendizaje, donde cada bocado nos transporto a los sabores de Cataluna y Murcia, celebrando la creatividad y la conexion que la gastronomia puede brindar."
    ]
  },
  {
    id: "cartagena-origen",
    title: "Cartagena: Donde Todo Comenzo",
    country: "Colombia",
    region: "Cartagena de Indias",
    flag: "\u{1f1e8}\u{1f1f4}",
    route: "Ciudad Amurallada \u2022 Bazurto \u2022 Getsemani",
    epigraph: "Colombia fue mi primer destino cuando la idea de ser un cocinero nomada comenzo a tomar forma.",
    body: [
      "Mi viaje a Cartagena en 2019 marco el inicio de mi aventura como cocinero nomada. Cartagena de Indias, fundada el 1 de junio de 1533 por Pedro Heredia, se convirtio rapidamente en un centro prospero gracias a la exportacion de oro, esmeraldas y otras riquezas.",
      "La calidez y amabilidad de la gente de Cartagena me hicieron sentir como en casa desde el primer momento. La esencia caribena que impregna cada rincon de esta ciudad me recordaba a mis propias raices puertorriquenas, creando un lazo especial que se reflejaba en cada sonrisa y gesto de hospitalidad.",
      "Durante mi semana en Cartagena, quede maravillado por la diversidad y frescura de los productos locales. Descubri los 'menu' locales, donde la autenticidad de la cocina cartagenera se revelaba en platos como el salpicon de pescado. Por solo 5,000 pesos colombianos, pude disfrutar de autenticos sabores locales.",
      "Uno de los encantos mas emblematicos son las palenqueras, mujeres hermosamente vestidas con ropas coloridas que llevan consigo la tradicion y el legado de la cultura afrodescendiente. Su presencia en las calles es un recordatorio de la diversidad y la historia viva que define a esta ciudad.",
      "Si hay un lugar al que estoy seguro de volver, ese sera Cartagena \u2014 una ciudad que cautiva corazones y paladares por igual."
    ]
  },
  {
    id: "emoliente-peruano",
    title: "El Emoliente: Tesoro de la Cultura Gastronomica",
    country: "Peru",
    region: "Mancora",
    flag: "\u{1f1f5}\u{1f1ea}",
    route: "Mancora \u2022 Noches de invierno \u2022 El emolientero",
    epigraph: "Esta figura no solo me ofrecio una deliciosa bebida, sino que me sumergio en una experiencia unica que marco mi paladar y mi corazon para siempre.",
    body: [
      "Mi travesia como cocinero nomada me llevo a descubrir un verdadero tesoro en la cultura peruana: el emoliente. En mi primera visita a Peru, mientras exploraba las calles de Mancora \u2014 una playa de ensueno que adquiere un encanto especial en las noches frias de invierno \u2014 tuve el placer de conocer a un emolientero.",
      "El emoliente es mucho mas que una bebida reconfortante; es un reflejo de la rica historia y tradicion culinaria de Peru. Sus raices se remontan a las culturas indigenas precolombinas, donde se utilizaban hierbas y plantas medicinales para crear infusiones con propiedades curativas. Con el paso del tiempo, esta bebida se fusiono con influencias espanolas y africanas.",
      "La preparacion del emoliente es todo un arte. Comienza con una mezcla de hierbas como la cola de caballo, la hoja de guayaba, el llanten y la linaza, que se hierven para extraer sus beneficios medicinales y aromaticos. A esta base se le anade jugo de limon, azucar o miel para endulzar, y opcionalmente pisco o aguardiente.",
      "Las hierbas tienen propiedades digestivas, antiinflamatorias y antioxidantes. Es una bebida que ayuda a aliviar malestares estomacales, mejorar la circulacion sanguinea y fortalecer el sistema inmunologico.",
      "Aquel emolientero me conto historias sobre la importancia del emoliente en la vida cotidiana de los peruanos. Su carisma y dedicacion dejaron una marca imborrable en mi memoria, convirtiendo al emoliente en mi bebida peruana favorita. Cada sorbo es un viaje sensorial que nos conecta con las raices ancestrales y el espiritu acogedor de este maravilloso pais. Salud por el emoliente peruano."
    ]
  },
  {
    id: "cusco-raices",
    title: "Cusco: Raices Que Sobrevivieron",
    country: "Peru",
    region: "Cusco",
    flag: "\u{1f1f5}\u{1f1ea}",
    route: "Mercado de San Pedro \u2022 Plaza de Armas \u2022 Sacsayhuaman",
    epigraph: "En Puerto Rico no sabemos mucho sobre la historia nativa de nuestros primeros pueblos. Las historias fueron borradas por el colonialismo.",
    body: [
      "En Puerto Rico no sabemos mucho sobre la historia nativa de nuestros primeros pueblos. Las historias sobre los pueblos originarios nativos fueron borradas por el colonialismo. Lo que se nos ha contado son un punado de relatos y leyendas \u2014 sabemos muy poco. Nuestra realidad colonial hace que calles, heroes y leyendas que resalten sean las del colonialismo.",
      "Explorar Cusco y conocer sus origenes me hizo ver que aqui es distinto. En Cusco, a pesar de haber vivido al igual el colonialismo, aun vive la cultura inca y esta muy presente.",
      "Cusco, la capital historica del Peru, se remonta a los siglos XI y XII. Segun la leyenda, el primer Inca, Manco Capac, fundo la ciudad en cumplimiento de un mandato del Dios Sol. Los incas controlaban el territorio desde Quito hasta Santiago \u2014 su imperio era el mas grande jamas visto en las Americas y el mayor del mundo para la epoca.",
      "El mejor lugar para explorar esa cultura viva son los mercados. En el mercado de San Pedro encontre de todo \u2014 ropas, comidas, dulces, artefactos religiosos, artesanias, puestos de jugos. Entre su gente y costumbres aun esta muy presente esa gran cultura inca de muchas formas.",
      "Eso me hizo reflexionar sobre lo que perdimos en Puerto Rico y lo que aqui se logro preservar. La comida es una de esas formas de preservacion \u2014 el lomo saltado, el mate de coca, los sabores andinos que llevan siglos sin cambiar."
    ]
  },
  {
    id: "colombia-hormigas",
    title: "De la Costa a las Hormigas Culonas",
    country: "Colombia",
    region: "Santander",
    flag: "\u{1f1e8}\u{1f1f4}",
    route: "Palomino \u2022 Minca \u2022 Santa Marta \u2022 San Gil \u2022 Barichara",
    epigraph: "Algo dentro empieza a picar, a incomodar, a empujar hacia el sur, hacia lo desconocido.",
    body: [
      "Ya llevaba semanas entre la arena de Palomino, la selva de Minca y el calor pegajoso de Santa Marta. El Caribe me habia tratado bien... tal vez demasiado bien.",
      "Algo dentro empieza a picar, a incomodar, a empujar hacia el sur, hacia lo desconocido. Colombia tiene eso \u2014 te da tanto que empiezas a querer mas. Asi que agarre mi mochila, un bus nocturno, y me tire para Santander.",
      "San Gil fue la transicion. Rafting, canyoning, adrenalina pura. Pero Barichara fue la recompensa \u2014 silencio, piedra, y un pueblo que parece detenido en el tiempo.",
      "Las hormigas culonas las probe con miedo y termine pidiendolas de nuevo. Crujientes, saladas, con un sabor a tierra que no se parece a nada. Mil anos de tradicion Guane en cada mordida.",
      "Colombia no te deja ir. Te agarra por el estomago y no te suelta."
    ]
  }
];

const LOCATION_PHOTOS = {
  "cartagena": [
    { file: "../assets/fotos/colombia-cartagena/DSCN1045.JPG", caption: "Vendedor de frutas en la ciudad amurallada \u2014 pinas, mangos, la explosion de colores del Caribe" },
    { file: "../assets/fotos/colombia-cartagena/DSCN1061.JPG", caption: "Vendedor de sandia con su carrito pintado y sombrero vueltiao en Getsemani" },
    { file: "../assets/fotos/colombia-cartagena/DSCN1063.JPG", caption: "Iglesia colonial en Getsemani \u2014 la arquitectura amarilla que define a Cartagena" },
    { file: "../assets/fotos/colombia-cartagena/DSCN1067.JPG", caption: "Arroz con coco \u2014 la base de la cocina cartagenera" },
    { file: "../assets/fotos/colombia-cartagena/DSCN1110.JPG", caption: "El menu del dia: Mojarra en coco 9,500, Salpicon de pescado 7,500, Sopas 5,000 pesos" },
    { file: "../assets/fotos/colombia-cartagena/DSCN1112.JPG", caption: "Restaurante local en Getsemani \u2014 donde se come la comida real de Cartagena" }
  ],
  "taganga": [
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1255.JPG", caption: "Bahia de Taganga desde el mirador \u2014 pueblo de pescadores rodeado de montanas" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1236.JPG", caption: "Playa de Taganga con los botes de colores de los pescadores" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1229.JPG", caption: "Pastel de arroz en hoja de platano con salsa \u2014 comida de playa" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1223.JPG", caption: "Puesto de raspados \u2014 hielo raspado con sirope, tradicion callejera" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1232.JPG", caption: "Triciclo de vendedor ambulante en Santa Marta" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1251.JPG", caption: "Bote pesquero viejo en la bahia de Taganga" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1271.JPG", caption: "Cabanas con techos de palma en la montana" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1272.JPG", caption: "Estadero Carola \u2014 pescado frito frente al mar" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1277.JPG", caption: "Canoa solitaria en playa escondida" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1303.JPG", caption: "Sendero con vista a la bahia" },
    { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1300.JPG", caption: "Escaleras de piedra entre playas" }
  ],
  "san-juan": [],
  "new-york": [],
  "bogota": [],
  "barichara": [],
  "quito": [],
  "mancora": [],
  "huaraz": [],
  "lima": [],
  "barranco": [],
  "ica": [],
  "cusco": [],
  "cdmx": [],
  "rincon-del-mar": [],
  "palomino": []
};

const TAGANGA_SANTA_MARTA_PHOTOS = [
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1255.JPG", caption: "Bahia de Taganga desde el mirador \u2014 pueblo de pescadores rodeado de montanas" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1236.JPG", caption: "Playa de Taganga con los botes de colores de los pescadores" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1229.JPG", caption: "Pastel de arroz en hoja de platano con salsa \u2014 comida de playa en Santa Marta" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1230.JPG", caption: "Otro angulo del pastel de arroz \u2014 la sombra de las palmeras sobre la arena" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1223.JPG", caption: "Puesto de raspados (raspao) \u2014 hielo raspado con sirope, tradicion callejera" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1232.JPG", caption: "Triciclo de vendedor ambulante en Santa Marta" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1251.JPG", caption: "Bote pesquero viejo en la bahia de Taganga" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1271.JPG", caption: "Cabanas con techos de palma en la montana \u2014 arquitectura organica de Taganga" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1272.JPG", caption: "Estadero Carola \u2014 donde se come pescado frito frente al mar" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1277.JPG", caption: "Canoa solitaria en una playa escondida entre los cerros" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1303.JPG", caption: "Sendero con vista a la bahia de Taganga" },
  { file: "../assets/fotos/colombia-taganga-santa-marta/DSCN1300.JPG", caption: "Escaleras de piedra en el camino entre playas" }
];

const VIDEOS = [
  {
    id: "kRfYRHU6n68",
    title: "Mi Historia \u2014 New York",
    desc: "Quien es el Cocinero Nomada. Un chef puertorriqueno en Nueva York.",
    country: "\u{1f5fd} New York \u2022 Mi Historia"
  },
  {
    id: "vBTUVKh19Wo",
    title: "La Casita Blanca \u2014 Puerto Rico",
    desc: "Un clasico de la cocina criolla puertorriquena en San Juan.",
    country: "\u{1f1f5}\u{1f1f7} Puerto Rico \u2022 San Juan"
  },
  {
    id: "5OYa4rcfUBQ",
    title: "De Mancora a Huaraz",
    desc: "Del calor del Pacifico a las alturas de los Andes.",
    country: "\u{1f1f5}\u{1f1ea} Peru \u2022 Mancora \u2192 Huaraz"
  },
  {
    id: "E9mZMVZZHLA",
    title: "Mancora, un Encanto Culinario",
    desc: "El norte del Peru en su maxima expresion. Playa, sol, ceviche.",
    country: "\u{1f1f5}\u{1f1ea} Peru \u2022 Mancora"
  },
  {
    id: "o2fJLNUMpHQ",
    title: "Descubriendo Minca",
    desc: "Minca, el pueblo escondido en la Sierra Nevada de Santa Marta.",
    country: "\u{1f1e8}\u{1f1f4} Colombia \u2022 Minca"
  },
  {
    id: "bzG-vmi6ba0",
    title: "Santa Marta \u2014 La Perla del Caribe",
    desc: "Santa Marta, la ciudad mas antigua de Colombia.",
    country: "\u{1f1e8}\u{1f1f4} Colombia \u2022 Santa Marta"
  }
];
